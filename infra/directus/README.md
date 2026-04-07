# Podgoroy CMS (Directus)

This setup gives a clean self-hosted CMS stack with predictable container names:

- `podgoroy-cms-db`
- `podgoroy-cms-redis`
- `podgoroy-cms-app`

## 1) Prepare Environment

```bash
cd infra/directus
cp .env.example .env
```

Edit `.env` and set strong values for:

- `DIRECTUS_KEY`
- `DIRECTUS_SECRET`
- `DIRECTUS_ADMIN_PASSWORD`
- `DIRECTUS_DB_PASSWORD`
- `DIRECTUS_PUBLIC_URL`
- `DIRECTUS_CORS_ORIGIN`

## 2) Start CMS

```bash
docker compose --env-file .env up -d
docker compose ps
```

Directus will be available on `127.0.0.1:${DIRECTUS_PORT}`.

## 3) Apply Content Model + Seed `/pereslavl`

Run from project root:

```bash
DIRECTUS_URL=http://127.0.0.1:8055 \
DIRECTUS_ADMIN_EMAIL=admin@podgoroy.local \
DIRECTUS_ADMIN_PASSWORD='your-password' \
node infra/directus/bootstrap/apply.mjs
```

What this script does:

- creates collection `pages` (if missing),
- creates fields (`slug`, `title`, `meta_title`, `meta_description`, `sections`, `practical_info`),
- inserts or updates the `pereslavl` page from:
  - `infra/directus/bootstrap/content/pereslavl-page.json`

The script is idempotent and can be re-run safely.

## 4) API Check

```bash
curl "http://127.0.0.1:8055/items/pages?filter[slug][_eq]=pereslavl&limit=1"
```

## 5) Optional Nginx Proxy (VPS)

Proxy your CMS admin internally (for example, `cms.podgoroy.stasis-wp.ru`) to `127.0.0.1:8055`.
Keep Directus bound to localhost unless public access is intentionally needed.
