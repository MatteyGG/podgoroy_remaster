# Homepage Visual Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing site into a polished, accessible one-page homepage whose sections remain separate components, then independently review the branch and open an MR.

**Architecture:** A server-rendered `src/app/page.tsx` loads Pereslavl content and composes focused section components. A client navigation layer handles anchors, active-section state and mobile navigation; old public routes become temporary redirects to those anchors. Existing Tailwind, Framer Motion and Embla provide the visual cleanup without new dependencies.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, Framer Motion 12, Embla Carousel 8.

**Spec:** `docs/superpowers/specs/2026-11-09-homepage-visual-cleanup-design.md`

## Global Constraints

- Work only on branch `feat/homepage-visual-cleanup`; do not deploy or change production.
- Use no new dependencies, stock photos, invented social links or invented reviews.
- Preserve current texts, Nunito, HomeReserve, Directus and the Directus fallback.
- Real contacts only: «Подгорая ул., 32, Переславль-Залесский, Ярославская обл., 152024», `podgoroy.pz@gmail.com`, `+7 909 997 55 97`, `tel:+79099975597`.
- Keep natural scrolling; no fullpage.js, forced scroll snapping, infinite content repetition or mouse-wheel interception.
- Comment out login/registration in navigation without deleting their code.
- Old routes use temporary 307 redirects, never permanent 308 in this change.
- Do not add test scaffolding to a project that has no tests; use standard lint/build and real browser scenarios.
- Do not include `.superpowers/` or other untracked mockup artifacts in commits or the MR.

## Review Focus

- Reduced motion or disabled JavaScript: all content remains visible and readable; checked in Task 4.
- Missing HomeReserve/Directus configuration: visitors get a useful fallback rather than technical errors; checked in Tasks 3 and 5.
- Small viewport and long embedded widgets: no horizontal page overflow or trapped page scrolling; checked in Tasks 2, 3 and 4.
- Direct old URLs and hashes: visitors land at the correct section without it hiding under the sticky navbar; checked in Tasks 1 and 2.
- Dark theme across every section: body copy, muted text, buttons, borders and embedded-content surroundings stay readable; checked in Task 3.

---

### Task 1: One-page section composition and compatibility redirects

**Files:**
- Create: `src/content/site.ts`
- Create: `src/app/components/sections/intro-section.tsx`
- Create: `src/app/components/sections/news-section.tsx`
- Create: `src/app/components/sections/booking-section.tsx`
- Create: `src/app/components/sections/pereslavl-section.tsx`
- Create: `src/app/components/sections/contacts-section.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/news/page.tsx`
- Modify: `src/app/booking/page.tsx`
- Modify: `src/app/pereslavl/page.tsx`
- Modify: `src/app/contacts/page.tsx`

**Interfaces:**
- Produces: `type SectionId = "home" | "news" | "booking" | "pereslavl" | "contacts"` and `HOME_SECTIONS: ReadonlyArray<{ id: SectionId; label: string }>` in `src/content/site.ts`.
- Produces: `SITE_CONTACTS` with the exact address, email, display phone and `tel:+79099975597` values from Global Constraints.
- Produces: `PereslavlSection({ content, source }: { content: PereslavlPageContent; source: "directus" | "fallback" })`.
- Consumes: existing `getPereslavlContent(): Promise<PereslavlContentResponse>` without changing its API.

- [ ] **Step 1: Record the failing navigation baseline**

Run the existing app and request `/news`, `/booking`, `/pereslavl`, `/contacts`. Record that they return full separate documents rather than temporary redirects to `/#news`, `/#booking`, `/#pereslavl`, `/#contacts`.

- [ ] **Step 2: Move existing content into focused section components**

Move the current markup into the five section files with outer IDs from `SectionId`. Keep existing text, images, HomeReserve behavior, SociableKit URL and Pereslavl fallback behavior. Make the homepage assemble these components and load Pereslavl data on the server. Add the shared contact and navigation constants.

- [ ] **Step 3: Redirect old routes without removing deep links**

Replace the four old route bodies with Next.js temporary redirects to their corresponding homepage hashes. Leave `/api/content/pereslavl`, login code and all Directus files unchanged.

- [ ] **Step 4: Verify composition and redirect contracts**

Run `npm run lint && npm run build` and expect success. In the running app expect all four old routes to return 307 with the correct `Location` hash, and expect `/` to contain all five section IDs and the existing Pereslavl fallback content.

- [ ] **Step 5: Commit**

```bash
git add src/content/site.ts src/app/page.tsx src/app/components/sections src/app/news/page.tsx src/app/booking/page.tsx src/app/pereslavl/page.tsx src/app/contacts/page.tsx
git commit -m "feat: compose homepage from anchored sections"
```

### Task 2: Anchor navbar, active section and mobile menu

**Files:**
- Create: `src/hooks/useActiveSection.ts`
- Modify: `src/app/components/navbar.tsx`
- Modify: `src/app/components/footer.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `HOME_SECTIONS`, `SectionId` and `SITE_CONTACTS` from Task 1.
- Produces: `useActiveSection(ids: readonly SectionId[]): SectionId`, using `IntersectionObserver` and updating hash without adding a history entry for every scroll.
- Produces: navbar/footer links of the form `/#${SectionId}`.

- [ ] **Step 1: Reproduce the current navigation mismatch**

In the browser show that the current navbar loads separate routes, registration is present but returns 404, and no active-section state exists.

- [ ] **Step 2: Implement the navigation behavior**

Make navbar a focused client component using Task 1 constants and `useActiveSection`. Comment out login/registration, add a keyboard-operable compact mobile menu, close it after selection, and offset section scroll margins for the sticky header. Replace footer template links with the same anchors and remove `[В разработке]` and placeholder social links.

- [ ] **Step 3: Verify desktop, mobile and direct-hash navigation**

In the browser click every navbar/footer destination and confirm scrolling, readable section headings, correct hash and active item. Open each old URL and each direct `/#id`, then repeat at 390px. Confirm no horizontal page overflow and no history spam while scrolling.

- [ ] **Step 4: Run standard checks and commit**

Run `npm run lint && npm run build` and expect success, then commit:

```bash
git add src/hooks/useActiveSection.ts src/app/components/navbar.tsx src/app/components/footer.tsx src/app/globals.css
git commit -m "feat: add seamless section navigation"
```

### Task 3: Visual system, dark theme and truthful visitor content

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: all files in `src/app/components/sections/`
- Modify: `src/app/components/themeSwitcher.tsx`
- Modify: `src/app/components/footer.tsx`

**Interfaces:**
- Consumes: section markup from Task 1 and shared contacts from `SITE_CONTACTS`.
- Produces: reusable light/dark tokens for page surfaces, primary text, muted text, borders, buttons and focus states.
- Produces: a non-technical booking fallback with the real phone when `NEXT_PUBLIC_HOMERESERVE_TOKEN` is absent.

- [ ] **Step 1: Capture failing visual and content scenarios**

In the browser confirm low dark-theme contrast, inconsistent contacts and technical token messaging before editing. Record desktop and 390px screenshots for comparison.

- [ ] **Step 2: Apply the agreed visual cleanup**

Use the existing Nunito and current content. Normalize container widths, readable line lengths, heading scale, section rhythm, image aspect ratios, buttons and focus states. Define explicit light/dark surface and text colors, including muted text. Keep the arch out of this task and do not introduce a new component library.

- [ ] **Step 3: Unify visitor-facing contacts and fallbacks**

Use `SITE_CONTACTS` everywhere, fix telephone/mail links, replace technical HomeReserve token text with the real-phone fallback, and ensure Directus fallback messaging does not expose setup instructions to visitors.

- [ ] **Step 4: Verify both themes and responsive layouts**

Run `npm run lint && npm run build`. In the browser inspect every section at desktop and 390px in light and dark modes. Expect readable body/muted text, consistent real contacts, working CTA links, no technical setup messages and no horizontal page overflow.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/app/components/sections src/app/components/themeSwitcher.tsx src/app/components/footer.tsx
git commit -m "fix: unify homepage visuals and contact details"
```

### Task 4: Arch, synchronized shadow and controlled motion

**Files:**
- Create: `src/app/components/animated-slider-frame.tsx`
- Modify: `src/app/components/slider.tsx`
- Modify: `src/app/components/sections/intro-section.tsx`
- Modify: `src/app/components/sections/news-section.tsx`
- Modify: `src/app/components/sections/booking-section.tsx`
- Modify: `src/app/components/sections/pereslavl-section.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: `AnimatedSliderFrame({ children, direction, arched }: { children: React.ReactNode; direction: "left" | "right"; arched?: boolean })`.
- Produces: an Embla `Slider` with a labelled pause/resume control and reduced-motion-aware autoplay.
- Consumes: existing images and section content; no new image assets or animation libraries.

- [ ] **Step 1: Reproduce the shadow race and uncontrolled autoplay**

Reload the homepage and confirm that the independently timed shadow can appear before the sliding photograph. Confirm that autoplay has no visitor pause control and that reduced-motion behavior is incomplete.

- [ ] **Step 2: Check current motion and accessibility guidance**

Run `npx -y modern-web-guidance@latest retrieve "motion,responsive-design,accessibility"` and apply the relevant compositor, reduced-motion, focus and pause requirements.

- [ ] **Step 3: Implement one coordinated animation frame**

Replace independent photo/shadow timelines with a parent variant sequence in `AnimatedSliderFrame`. Apply `arched` only to the first slider container so every slide keeps the same shape. Add accessible pause/resume behavior, visible-content reduced-motion fallbacks, informative image alts, iframe `title`/`loading="lazy"`, and defer HomeReserve initialization until its section approaches the viewport.

- [ ] **Step 4: Verify motion and external-content scenarios**

In the browser reload repeatedly and confirm the shadow never leads the photo, slide shapes do not jump, pause/resume works, and reduced motion leaves static visible content. Check 390px layout, lazy iframe behavior and missing-token HomeReserve fallback.

- [ ] **Step 5: Run standard checks and commit**

Run `npm run lint && npm run build` and expect success, then commit:

```bash
git add src/app/components/animated-slider-frame.tsx src/app/components/slider.tsx src/app/components/sections src/app/globals.css
git commit -m "fix: synchronize slider motion and support reduced motion"
```

### Task 5: Full verification, independent review and MR

**Files:**
- Review the complete diff against `main`.
- Modify only files needed for confirmed review findings.

**Interfaces:**
- Consumes: all preceding tasks and the approved spec.
- Produces: verified branch `feat/homepage-visual-cleanup` and a GitHub MR targeting `main`.

- [ ] **Step 1: Run the complete deliverable verification**

Run `npm run lint && npm run build`. Start the production build and repeat the critical desktop/mobile, light/dark, anchor/hash, old-route, CTA, shadow, pause, reduced-motion and missing-configuration checks. Confirm real external-token behavior is not claimed without actual credentials.

- [ ] **Step 2: Request a fresh full-diff review**

Dispatch a new coder subagent with no prior implementation context. Provide the approved spec and ask for correctness, regression, accessibility and requirement-coverage findings across `git diff main...HEAD`. Triage findings against the spec rather than applying suggestions blindly.

- [ ] **Step 3: Resolve confirmed findings and reverify**

Make only justified fixes, then rerun `npm run lint && npm run build` and every affected browser scenario. Inspect `git status` and ensure no build output, logs or `.superpowers/` files entered the branch.

- [ ] **Step 4: Publish the branch and open the MR**

```bash
git push -u origin feat/homepage-visual-cleanup
gh pr create --base main --head feat/homepage-visual-cleanup --title "Polish homepage visuals and one-page navigation" --body "Implements the approved one-page visual cleanup, accessibility fixes, real contact details and controlled slider motion. Includes implementation plan and verification notes."
```

Report the MR URL, verification evidence and any unverified external integration explicitly.
