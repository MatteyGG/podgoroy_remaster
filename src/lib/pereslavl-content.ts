import {
  pereslavlFallbackContent,
  type PereslavlPageContent,
} from "@/content/pereslavl-page";

export type PereslavlContentResponse = {
  source: "directus" | "fallback";
  data: PereslavlPageContent;
};

type DirectusCardItem = {
  section_id?: string;
  title?: string;
  body_text?: string;
  tags_text?: string;
  image_1?: unknown;
  image_2?: unknown;
  image_3?: unknown;
  images_json?: unknown;
  sort?: number;
};

function extractFileId(value: unknown): string | null {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }
  if (value && typeof value === "object") {
    const id = (value as { id?: unknown }).id;
    if (typeof id === "string" && id.trim().length > 0) {
      return id.trim();
    }
  }
  return null;
}

function toAssetUrl(fileId: string, directusPublicUrl: string): string {
  return `${directusPublicUrl.replace(/\/+$/, "")}/assets/${fileId}`;
}

function normalizeContent(raw: unknown): PereslavlPageContent | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Record<string, unknown>;
  if (value.slug !== "pereslavl") return null;

  const sections = Array.isArray(value.sections) ? value.sections : [];
  const practical = value.practical_info;

  if (!Array.isArray(sections) || !practical || typeof practical !== "object") {
    return null;
  }

  return value as PereslavlPageContent;
}

function normalizeCards(
  raw: unknown,
  directusPublicUrl: string | null,
): PereslavlPageContent["sections"] | null {
  if (!Array.isArray(raw)) return null;

  const sections = raw
    .map((item, index) => {
      const card = item as DirectusCardItem;
      const body = (card.body_text ?? "")
        .split(/\n\s*\n/g)
        .map((line) => line.trim())
        .filter(Boolean);
      const tags = (card.tags_text ?? "")
        .split(/\n|,/g)
        .map((line) => line.trim())
        .filter(Boolean);
      const imageIds = [card.image_1, card.image_2, card.image_3]
        .map(extractFileId)
        .filter(Boolean) as string[];
      const fileImages =
        directusPublicUrl && imageIds.length > 0
          ? imageIds.map((id) => toAssetUrl(id, directusPublicUrl))
          : [];
      const legacyImages = Array.isArray(card.images_json)
        ? (card.images_json as string[])
        : [];
      const images = [...fileImages, ...legacyImages].filter(Boolean);

      if (!card.title) return null;

      return {
        id: card.section_id?.trim() || `section-${index + 1}`,
        title: card.title,
        body,
        tags,
        images,
      };
    })
    .filter(Boolean) as PereslavlPageContent["sections"];

  return sections.length > 0 ? sections : null;
}

export async function getPereslavlContent(): Promise<PereslavlContentResponse> {
  const url = process.env.DIRECTUS_INTERNAL_URL ?? process.env.NEXT_PUBLIC_DIRECTUS_URL;
  const publicUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL ?? null;
  const token = process.env.DIRECTUS_STATIC_TOKEN;

  if (!url || !token) {
    return { source: "fallback", data: pereslavlFallbackContent };
  }

  try {
    const pageEndpoint =
      `${url.replace(/\/+$/, "")}/items/pages` +
      "?filter[slug][_eq]=pereslavl&limit=1" +
      "&fields=slug,title,meta_title,meta_description,sections,practical_info";

    const cardsEndpoint =
      `${url.replace(/\/+$/, "")}/items/pereslavl_cards` +
      "?filter[page_slug][_eq]=pereslavl&sort=sort" +
      "&fields=section_id,title,body_text,tags_text,image_1,image_2,image_3,images_json,sort";

    const [pageResponse, cardsResponse] = await Promise.all([
      fetch(pageEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }),
      fetch(cardsEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }),
    ]);

    if (!pageResponse.ok) {
      return { source: "fallback", data: pereslavlFallbackContent };
    }

    const pagePayload = (await pageResponse.json()) as {
      data?: unknown[];
    };
    const pageContent = normalizeContent(pagePayload.data?.[0]);
    if (!pageContent) {
      return { source: "fallback", data: pereslavlFallbackContent };
    }

    if (cardsResponse.ok) {
      const cardsPayload = (await cardsResponse.json()) as {
        data?: unknown[];
      };
      const sections = normalizeCards(cardsPayload.data, publicUrl);
      if (sections) {
        return {
          source: "directus",
          data: {
            ...pageContent,
            sections,
          },
        };
      }
    }

    return { source: "directus", data: pageContent };
  } catch {
    return { source: "fallback", data: pereslavlFallbackContent };
  }
}
