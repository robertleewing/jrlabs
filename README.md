# JR Labs — Website V1

Pre-launch credibility website for **JR Labs Ltd** (jrlabs.co.uk).

Static HTML, CSS and vanilla JavaScript. No build step, no framework, no
dependencies, no backend. Every page is deployable exactly as it sits in this
folder.

---

## 1. File structure

    jr-labs-website-v1/
    ├── index.html                     Home
    ├── our-story.html                 Our Story
    ├── our-standard.html              Our Standard (JQLS)
    ├── creatine.html                  Creatine (pre-launch product page)
    ├── science-transparency.html      Science & Transparency
    ├── contact.html                   Contact
    ├── privacy-policy.html            Legal placeholder
    ├── cookie-policy.html             Legal placeholder
    ├── terms.html                     Legal placeholder
    ├── 404.html                       Not-found page
    ├── robots.txt
    ├── sitemap.xml
    ├── README.md                      This file
    └── assets/
        ├── css/styles.css             Complete design system (single file)
        ├── js/main.js                 Progressive enhancement only
        └── img/
            ├── logo-placeholder.svg   TEMPORARY brand mark — see section 4
            ├── favicon.svg
            ├── og-image.svg           Social share image — see section 4
            └── product-concept.webp   Photorealistic development concept visual

## 2. Running and previewing locally

The site uses relative paths only, so you can simply open `index.html` in a
browser.

For a more realistic local preview (correct handling of `404.html`, absolute
paths and caching), serve the folder over HTTP with any static server, for
example:

    npx serve .
    # or
    python3 -m http.server 8080

Then visit `http://localhost:8080`.

## 3. Design system

All design tokens live at the top of `assets/css/styles.css` under `:root` —
surfaces, brand colours, text colours, hairlines, spacing and type. Changing a
token updates the whole site.

    --ink        #0A0B0D   near-black page base
    --charcoal   #111318   alternate dark section
    --graphite   #171A1F   alternate dark section
    --paper      #F6F4F0   warm off-white section
    --gold       #C2A15B   restrained premium gold
    --red        #C1272D   JR Labs red — accent only

Reusable components (all documented by section number in the stylesheet):
`.btn`, `.pill`, `.eyebrow`, `.card`, `.principle`, `.pathway`, `.compare`,
`.spec`, `.pillar`, `.future`, `.status-box`, `.note`, `.form`.

Typography uses a system font stack for performance and privacy (no external
font requests). If JR Labs licenses a display typeface, swap the `--ff` token
and self-host the font files in `assets/fonts/` — nothing else needs to change.

## 4. Assets requiring replacement before launch

**Brand mark.** The supplied `logo.png` was not available to this build, so the
header and footer currently use an inline SVG placeholder mark (gold hexagon,
red accent). To install the real logo, place the approved file at
`assets/img/logo.png` (or `.svg`) and replace the inline `<svg class="mark">…</svg>`
block in each HTML page with:

    <img class="mark" src="assets/img/logo.png" alt="" width="30" height="33">

The `.mark` class already controls sizing, so no CSS change is required.

**Product concept visual.** `assets/img/product-concept.webp` is a deliberate,
clearly labelled development concept — not photography. It appears on the home
page and the creatine page inside a `<figure class="concept">` element carrying
a "CONCEPT VISUAL" tag and a caption. When approved product photography exists,
replace the `<img>` inside those two figures, remove the `.concept-tag` and
`.concept-note` elements, and update the `alt` text.

**Social share image.** `assets/img/og-image.svg` is a placeholder. Most social
platforms require a raster image; export a 1200 × 630 PNG or JPG, save it as
`assets/img/og-image.jpg`, and update the `og:image` / `twitter:image` tags in
the `<head>` of every page.

## 5. Connecting the contact form

`contact.html` contains a fully designed, accessible, client-validated form. It
is **not** connected to any submission service. On submit, `main.js` blocks the
default action and displays an honest notice that the message was not sent.

To connect it later, pick one of:

- **Form service (simplest, still static).** Formspree, Basin, Netlify Forms or
  Cloudflare Pages Forms. Set `action` to the endpoint, set `method="post"`,
  and delete the submit handler in `main.js` (section 4).
- **Serverless function.** A single function (Netlify / Cloudflare / Vercel)
  that validates and forwards to the JR Labs mailbox. Change the handler in
  `main.js` to `fetch()` the endpoint and show a success message.

Whichever route is chosen, add spam protection (honeypot field or the provider's
built-in), and publish the privacy policy before the form goes live.

## 6. Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`, `section` + labels).
- Skip link, visible focus states, logical heading order (one `h1` per page).
- Mobile navigation sets `aria-expanded`, traps scroll, closes on `Esc` and
  returns focus to the toggle. The panel is `inert` while closed.
- Form labels are explicit, required fields use `aria-required`, and the status
  message is an `aria-live` region.
- `prefers-reduced-motion` disables all transitions, animations and reveals.

## 7. Performance

Two static assets total (one CSS file, one JS file), no fonts, no images larger
than a few kilobytes, no third-party requests, no tracking. All decorative
artwork is SVG. JavaScript is deferred and purely enhancement — the site is
fully readable with JS disabled.

## 8. SEO

Unique titles and meta descriptions per page, canonical tags, Open Graph and
Twitter metadata, semantic headings, `robots.txt` and `sitemap.xml`.

`index.html` carries a minimal `Organization` JSON-LD block containing only
confirmed facts (name, URL, country). Address, company number, contact points
and social profiles are deliberately omitted until JR Labs confirms them.

**Before going live:** update the `<lastmod>` dates in `sitemap.xml` and confirm
the canonical URL format (with or without `.html`) matches the chosen host.

## 9. Deployment

The site is a plain static folder and can be deployed to any static host.
Recommended: Cloudflare Pages or Netlify (free tier, global CDN, automatic
HTTPS, instant rollback, preview deployments).

Outline process — **to be executed only with JR Labs approval**:

1. Put this folder in a private Git repository.
2. Connect the repository to the chosen host. Build command: none.
   Publish directory: the repository root.
3. Add `jrlabs.co.uk` and `www.jrlabs.co.uk` as custom domains, then point the
   domain's DNS at the host (usually a `CNAME` for `www` and an apex `ALIAS`/`A`
   record — the host provides exact values).
4. Enable automatic HTTPS and force a single canonical hostname (redirect
   `www` → apex, or the reverse; keep it consistent with the canonical tags).
5. Verify: all six pages, mobile navigation, 404 handling, Lighthouse pass,
   and that `robots.txt` and `sitemap.xml` resolve.

No domain, hosting or third-party service has been purchased, registered or
configured as part of this build.

## V1.2 refinement pass

This package includes the approved final visual-refinement pass:
- header logo reduced and vertically balanced;
- homepage supporting line simplified to “Sports nutrition built on evidence, transparency and trust.”;
- hero concept product enlarged and given slightly stronger visual presence;
- homepage product concept enlarged/brightened while retaining all concept/disclosure treatment;
- responsive adjustments added for tablet and mobile;
- no new sections, claims, specifications or structural redesign introduced.

## V1.2.1 Contact Page Update

- Public enquiry email set to `contact@jrlabs.co.uk`.
- Registered office set to Office 582, 60 Tottenham Court Road, Fitzrovia, London, W1T 2EW, United Kingdom.
- Company number set to 16776000.
- Manufacturing & Supply remains an enquiry category rather than a separate mailbox.
- Added Product enquiry category.
- Improved native dropdown option contrast for Windows/Edge.
- Form remains intentionally unconnected until deployment; direct email fallback is shown.


## V1.2.2 Product Concept Visual

The original line-art product concept has been replaced with a photorealistic JR Labs creatine tub development render. The website continues to label it clearly as a concept and states that approved product photography will replace it.

## Google Analytics 4 and cookie consent

This build includes a privacy-first GA4 implementation using measurement ID `G-3C5567SET1`.

- Analytics is disabled by default.
- `assets/js/consent.js` displays the cookie banner and stores the visitor's choice locally.
- The Google Analytics script is loaded only after the visitor chooses **Accept analytics**.
- Advertising storage, advertising user data and advertising personalisation remain denied.
- Visitors can reopen the banner using **Cookie settings** in the footer.
- The Cookie Policy and Privacy Policy pages have been updated to describe the current pre-launch implementation.

After deploying to GitHub Pages, visit the live site, accept analytics, then use Google Analytics **Test installation** / **Realtime** to confirm data is being received.

