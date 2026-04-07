import {
  pereslavlFallbackContent,
  type PereslavlPageContent,
} from "@/content/pereslavl-page";

export type PereslavlContentResponse = {
  source: "directus" | "fallback";
  data: PereslavlPageContent;
};

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

export async function getPereslavlContent(): Promise<PereslavlContentResponse> {
  const url = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  const token = process.env.DIRECTUS_STATIC_TOKEN;

  if (!url || !token) {
    return { source: "fallback", data: pereslavlFallbackContent };
  }

  try {
    const endpoint =
      `${url.replace(/\/+$/, "")}/items/pages` +
      "?filter[slug][_eq]=pereslavl&limit=1" +
      "&fields=slug,title,meta_title,meta_description,sections,practical_info";

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return { source: "fallback", data: pereslavlFallbackContent };
    }

    const payload = (await response.json()) as {
      data?: unknown[];
    };
    const content = normalizeContent(payload.data?.[0]);
    if (!content) {
      return { source: "fallback", data: pereslavlFallbackContent };
    }

    return { source: "directus", data: content };
  } catch {
    return { source: "fallback", data: pereslavlFallbackContent };
  }
}
