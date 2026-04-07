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

async function ensureCollection(token) {
  const exists = await hasCollection(token, "pages");
  if (exists) {
    console.log("Collection 'pages' already exists.");
    return;
  }

  await request(
    "POST",
    "/collections",
    {
      collection: "pages",
      meta: {
        icon: "article",
        note: "Site pages managed as content JSON.",
      },
      schema: {
        name: "pages",
      },
    },
    token,
  );

  console.log("Collection 'pages' created.");
}

async function fieldExists(token, collection, field) {
  const response = await fetch(`${DIRECTUS_URL}/fields/${collection}/${field}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.ok;
}

async function ensureField(token, payload) {
  const exists = await fieldExists(token, "pages", payload.field);
  if (exists) {
    console.log(`Field 'pages.${payload.field}' already exists.`);
    return;
  }
  await request("POST", "/fields/pages", payload, token);
  console.log(`Field 'pages.${payload.field}' created.`);
}

async function ensureFields(token) {
  await ensureField(token, {
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

  await ensureField(token, {
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

  await ensureField(token, {
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

  await ensureField(token, {
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

  await ensureField(token, {
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

  await ensureField(token, {
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

async function main() {
  const token = await login();
  await ensureCollection(token);
  await ensureFields(token);
  await upsertPereslavlPage(token);
  console.log("Directus bootstrap completed.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
