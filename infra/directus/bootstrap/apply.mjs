#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DIRECTUS_URL = process.env.DIRECTUS_URL ?? "http://127.0.0.1:8055";
const DIRECTUS_ADMIN_EMAIL = process.env.DIRECTUS_ADMIN_EMAIL;
const DIRECTUS_ADMIN_PASSWORD = process.env.DIRECTUS_ADMIN_PASSWORD;

if (!DIRECTUS_ADMIN_EMAIL || !DIRECTUS_ADMIN_PASSWORD) {
  console.error(
    "Missing credentials. Set DIRECTUS_ADMIN_EMAIL and DIRECTUS_ADMIN_PASSWORD.",
  );
  process.exit(1);
}

const contentPath = path.resolve(
  process.cwd(),
  "infra/directus/bootstrap/content/pereslavl-page.json",
);

async function request(method, endpoint, body, token) {
  const response = await fetch(`${DIRECTUS_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${method} ${endpoint} failed: ${response.status} ${text}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

async function login() {
  const result = await request("POST", "/auth/login", {
    email: DIRECTUS_ADMIN_EMAIL,
    password: DIRECTUS_ADMIN_PASSWORD,
  });
  return result.data.access_token;
}

async function hasCollection(token, name) {
  const response = await fetch(`${DIRECTUS_URL}/collections/${name}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.ok;
}

async function ensureCollection(token, name, meta) {
  const exists = await hasCollection(token, name);
  if (exists) {
    console.log(`Collection '${name}' already exists.`);
    return;
  }

  await request(
    "POST",
    "/collections",
    {
      collection: name,
      meta,
      schema: {
        name,
      },
    },
    token,
  );

  console.log(`Collection '${name}' created.`);
}

async function fieldExists(token, collection, field) {
  const response = await fetch(`${DIRECTUS_URL}/fields/${collection}/${field}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.ok;
}

async function ensureField(token, collection, payload) {
  const exists = await fieldExists(token, collection, payload.field);
  if (exists) {
    console.log(`Field '${collection}.${payload.field}' already exists.`);
    return;
  }
  await request("POST", `/fields/${collection}`, payload, token);
  console.log(`Field '${collection}.${payload.field}' created.`);
}

async function patchFieldMetaIfExists(token, collection, field, metaPatch) {
  const exists = await fieldExists(token, collection, field);
  if (!exists) return;

  await request(
    "PATCH",
    `/fields/${collection}/${field}`,
    {
      meta: metaPatch,
    },
    token,
  );
  console.log(`Field '${collection}.${field}' metadata updated.`);
}

async function ensurePagesFields(token) {
  await ensureField(token, "pages", {
    field: "slug",
    type: "string",
    meta: {
      interface: "input",
      width: "half",
      required: true,
      note: "Unique page slug",
      sort: 1,
    },
    schema: {
      is_nullable: false,
      is_unique: true,
      max_length: 255,
    },
  });

  await ensureField(token, "pages", {
    field: "title",
    type: "string",
    meta: {
      interface: "input",
      width: "half",
      required: true,
      sort: 2,
    },
    schema: {
      is_nullable: false,
      max_length: 255,
    },
  });

  await ensureField(token, "pages", {
    field: "meta_title",
    type: "string",
    meta: {
      interface: "input",
      width: "half",
      sort: 3,
    },
    schema: {
      is_nullable: true,
      max_length: 255,
    },
  });

  await ensureField(token, "pages", {
    field: "meta_description",
    type: "text",
    meta: {
      interface: "input-multiline",
      width: "full",
      sort: 4,
    },
    schema: {
      is_nullable: true,
    },
  });

  await ensureField(token, "pages", {
    field: "sections",
    type: "json",
    meta: {
      interface: "input-code",
      options: {
        language: "json",
        template: "[]",
      },
      width: "full",
      sort: 5,
    },
    schema: {
      is_nullable: true,
    },
  });

  await ensureField(token, "pages", {
    field: "practical_info",
    type: "json",
    meta: {
      interface: "input-code",
      options: {
        language: "json",
        template: "{}",
      },
      width: "full",
      sort: 6,
    },
    schema: {
      is_nullable: true,
    },
  });
}

async function ensurePereslavlCardsFields(token) {
  await ensureField(token, "pereslavl_cards", {
    field: "page_slug",
    type: "string",
    meta: {
      interface: "input",
      width: "half",
      required: true,
      sort: 1,
      note: "Page slug. Keep 'pereslavl' for this page.",
    },
    schema: {
      is_nullable: false,
      max_length: 255,
    },
  });

  await ensureField(token, "pereslavl_cards", {
    field: "section_id",
    type: "string",
    meta: {
      interface: "input",
      width: "half",
      required: true,
      sort: 2,
      note: "Anchor id, example: history, museums.",
    },
    schema: {
      is_nullable: false,
      max_length: 255,
    },
  });

  await ensureField(token, "pereslavl_cards", {
    field: "title",
    type: "string",
    meta: {
      interface: "input",
      width: "full",
      required: true,
      sort: 3,
    },
    schema: {
      is_nullable: false,
      max_length: 255,
    },
  });

  await ensureField(token, "pereslavl_cards", {
    field: "body_text",
    type: "text",
    meta: {
      interface: "input-multiline",
      width: "full",
      sort: 4,
      note: "Paragraph generator: separate paragraphs with an empty line.",
    },
    schema: {
      is_nullable: true,
    },
  });

  await ensureField(token, "pereslavl_cards", {
    field: "tags_text",
    type: "text",
    meta: {
      interface: "input-multiline",
      width: "full",
      sort: 5,
      note: "One tag per line.",
    },
    schema: {
      is_nullable: true,
    },
  });

  await ensureField(token, "pereslavl_cards", {
    field: "images_files",
    type: "alias",
    meta: {
      special: ["m2m"],
      interface: "files",
      width: "full",
      sort: 6,
      note: "Main image set. Supports multiple files from File Library.",
    },
    schema: null,
  });

  await ensureField(token, "pereslavl_cards", {
    field: "images_json",
    type: "json",
    meta: {
      interface: "input-code",
      options: {
        language: "json",
        template: "[]",
      },
      width: "full",
      sort: 7,
      note: "Legacy fallback image array. Can stay empty.",
    },
    schema: {
      is_nullable: true,
    },
  });

  await ensureField(token, "pereslavl_cards", {
    field: "sort",
    type: "integer",
    meta: {
      interface: "input",
      width: "half",
      sort: 8,
      note: "Card order. Chess layout is derived from this order.",
    },
    schema: {
      is_nullable: true,
    },
  });

  await patchFieldMetaIfExists(token, "pereslavl_cards", "image_1", {
    hidden: true,
    readonly: true,
    note: "Deprecated. Use images_files.",
    sort: 90,
  });
  await patchFieldMetaIfExists(token, "pereslavl_cards", "image_2", {
    hidden: true,
    readonly: true,
    note: "Deprecated. Use images_files.",
    sort: 91,
  });
  await patchFieldMetaIfExists(token, "pereslavl_cards", "image_3", {
    hidden: true,
    readonly: true,
    note: "Deprecated. Use images_files.",
    sort: 92,
  });
}

async function upsertPereslavlPage(token) {
  const contentRaw = await fs.readFile(contentPath, "utf8");
  const content = JSON.parse(contentRaw);

  const result = await request(
    "GET",
    `/items/pages?filter[slug][_eq]=${encodeURIComponent(content.slug)}&limit=1`,
    undefined,
    token,
  );

  const existing = result.data?.[0];

  if (existing) {
    await request("PATCH", `/items/pages/${existing.id}`, content, token);
    console.log("Updated existing page 'pereslavl'.");
    return;
  }

  await request("POST", "/items/pages", content, token);
  console.log("Inserted page 'pereslavl'.");
}

async function seedPereslavlCards(token) {
  const contentRaw = await fs.readFile(contentPath, "utf8");
  const content = JSON.parse(contentRaw);

  const existing = await request(
    "GET",
    `/items/pereslavl_cards?filter[page_slug][_eq]=${encodeURIComponent(
      content.slug,
    )}&limit=1`,
    undefined,
    token,
  );

  if (existing.data?.length > 0) {
    console.log("Cards for 'pereslavl' already exist.");
    return;
  }

  for (let i = 0; i < content.sections.length; i += 1) {
    const section = content.sections[i];
    await request(
      "POST",
      "/items/pereslavl_cards",
      {
        page_slug: content.slug,
        section_id: section.id,
        title: section.title,
        body_text: (section.body ?? []).join("\n\n"),
        tags_text: (section.tags ?? []).join("\n"),
        images_json: section.images ?? [],
        sort: i + 1,
      },
      token,
    );
  }

  console.log("Seeded pereslavl cards from default content.");
}

async function main() {
  const token = await login();
  await ensureCollection(token, "pages", {
    icon: "article",
    note: "Site pages managed as content JSON.",
  });
  await ensureCollection(token, "pereslavl_cards", {
    icon: "view_agenda",
    note: "Section cards for /pereslavl page editor.",
  });
  await ensurePagesFields(token);
  await ensurePereslavlCardsFields(token);
  await upsertPereslavlPage(token);
  await seedPereslavlCards(token);
  console.log("Directus bootstrap completed.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
