# Akash Pump Sales & Services

Responsive enquiry website focused on Pune. No ecommerce, payment gateway, frontend framework build, or database.

## Included
- Responsive landing page with services from the provided signboard.
- Separate `styles.css` and `script.js` files so browser caching and future maintenance are easier without introducing a frontend framework or build step.
- WhatsApp and phone links for 9822791005 and 9850030224.
- Vercel serverless contact endpoint using Resend.
- SEO title and description, canonical URL, LocalBusiness JSON-LD, sitemap, robots.txt, SVG logo/favicon/social cover.
- Static-first delivery with no runtime frontend dependencies; the contact form is the only serverless API endpoint.
- Open Graph metadata for Facebook/WhatsApp and Twitter/X large-image cards.
- Pune-focused homepage copy, expanded service descriptions and five customer FAQs.
- Owner-provided business details: 30 years of experience, Pune City service area, business hours 10:00 AM–8:00 PM (operating days not supplied).
- Keyboard-operable service carousel and embedded Google Map from the coordinates supplied by the client.
- Privacy notice.

## Email notifications
Configure these in Vercel → Project Settings → Environment Variables:
- `RESEND_API_KEY`: Resend API key.
- `NOTIFICATION_EMAIL`: the recipient address chosen by the business.
- `RESEND_FROM_EMAIL`: required sender address on a domain verified in Resend, e.g. `Website Enquiries <website@your-verified-domain.example>`.
- `RESEND_REPLY_TO` (optional): reply-to address.

Redeploy after adding variables. The form reports an error and offers WhatsApp until required variables are configured. Test a real submission before treating email delivery as working. Never commit API keys.

## Google Search and SEO launch checklist

1. Confirm the production domain. The canonical URL, Open Graph URLs, JSON-LD URL, `robots.txt` sitemap URL and `sitemap.xml` URLs must all use the same final HTTPS domain.
2. Verify the domain in [Google Search Console](https://search.google.com/search-console/about), submit `/sitemap.xml`, and use URL Inspection to check the homepage and privacy page. A sitemap helps discovery but does not guarantee indexing or ranking.
3. Create or verify the business's Google Business Profile using the real-world business name and accurate service area. Do not invent a street address, use an unstaffed virtual address, or claim operating days that the owner has not confirmed. Follow [Google's Business Profile guidelines](https://support.google.com/business/answer/3038177?hl=en-IN).
4. Measure the deployed site with [PageSpeed Insights](https://pagespeed.web.dev/) and monitor Core Web Vitals in Search Console. Prioritise mobile performance and layout stability; do not claim a score until measured.
5. Add genuine project photos once supplied. Resize/compress each image, use descriptive filenames and meaningful alt text, and place the images next to accurate project descriptions. Do not imply a photo is a client project unless it is genuine.
6. Build separate service pages only when there is enough distinct, accurate information to help customers with that service. Avoid thin pages that repeat the same copy with only a service keyword changed.
7. Do not add `openingHoursSpecification` until the owner confirms the days of operation. Do not add a postal address until the owner provides the verified address.

Google's [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) and [Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals) are the reference points for ongoing checks.
## Deployment
1. Connect this repository to Vercel; use framework preset Other, no build command, no output directory.
2. Configure email environment variables above.
3. Deploy and test both phone links, WhatsApp, form submission and email delivery.
4. If Vercel assigns another domain, update canonical/Open Graph/JSON-LD URLs in `index.html`, plus `robots.txt` and `sitemap.xml`.

## Social previews and map
- Open Graph and Twitter Card metadata are defined in `index.html`; preview images use `og-cover.svg`.
- Social platforms may cache previews. After deployment, use each platform's link preview/debugging tool to request a refresh.
- SVG preview support varies by crawler. For the most consistent Facebook/WhatsApp/X preview support, replace `og-cover.svg` with a 1200×630 PNG or JPEG and update `og:image` and `twitter:image` to that public asset.
- The map is centered on 18.524472, 73.963778 (18°31'28.1\"N, 73°57'49.6\"E). Confirm that the pin represents the business location before launch.

## Competitive review and UX notes

A public-web review of Pune pump and motor service websites found recurring useful patterns: clearly separated repair/service lists, visible phone and business hours, and genuine workshop/project photography. Examples reviewed include:
- [Shri Krishna Engineering Services](https://www.skespune.com/Our-Services) — explicit pump installation, servicing, overhauling and rewinding scope.
- [The Indian Electric Company](https://www.indianelectric.com/contact-us.html) — separates office and repair locations and publishes contact details/hours.
- [Avihas Equipments](https://aeplpune.in/) — uses service-specific content and a real-work gallery.

Implementation priorities for Akash Pump Sales & Services:
- Keep phone and WhatsApp actions prominent on mobile.
- Show the owner-confirmed 30 years of experience, Pune City coverage, and 10:00 AM–8:00 PM hours without implying unconfirmed operating days.
- Use only real, owner-approved project photos when those files are supplied.
- Keep the coordinate pin clearly distinguished from a verified postal address.
- Avoid copying competitor wording, unsupported guarantees, ratings, brands, or technical capabilities.

The supplied coordinates appear near Manjari Budruk in map/business search results. The owner should verify that the pin marks the actual premises before launch.

## SEO launch checklist
- Confirm final deployment domain and update canonical, Open Graph, JSON-LD, sitemap and robots URLs consistently.
- Replace the SVG social cover with a 1200×630 PNG/JPEG for more reliable social crawler support.
- Confirm the supplied map pin is the business location before publishing it as a business geo coordinate.
- Public business address was not supplied; do not invent one.
- Confirm operating days before adding structured opening-hours data; only 10:00 AM–8:00 PM was supplied.
- Owner says real project photos are available, but photo files are not currently present in the repository. Add the approved originals under an `/images/projects/` directory and use them in a project gallery only after the files are provided.
- Consider separate service landing pages only after confirming the services and enough unique, useful information for each page.
- Keep FAQs aligned with actual business policies; the current copy intentionally does not promise response times, prices or availability.
- Add a public business address only with owner approval; none was supplied.
- Confirm service wording and service coverage with the owner.
- Link from the business Google Business Profile if applicable.
- Verify in Google Search Console and submit sitemap.
- Check mobile usability and Core Web Vitals after launch.

## Security and verification
The API validates required fields and length limits, checks request origin, and uses environment variables for secrets. The sender address must be verified in Resend. Enquiries are not stored in a database. Add rate limiting or bot protection if spam becomes an issue.

Before launch, test missing fields, oversized fields, missing environment variables, Resend failure, keyboard-only navigation, mobile sticky buttons, and both WhatsApp destinations.
