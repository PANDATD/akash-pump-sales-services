# Akash Pump Sales & Services

Responsive enquiry website focused on Pune. No ecommerce, payment gateway, frontend framework build, or database.

## Included
- Responsive landing page with services from the provided signboard.
- WhatsApp and phone links for 9822791005 and 9850030224.
- Vercel serverless contact endpoint using Resend.
- SEO metadata, LocalBusiness JSON-LD, sitemap, robots.txt, SVG logo/favicon/social cover.
- Privacy notice.

## Email notifications
Configure these in Vercel → Project Settings → Environment Variables:
- `RESEND_API_KEY`: Resend API key.
- `NOTIFICATION_EMAIL`: the recipient address chosen by the business.
- `RESEND_FROM_EMAIL`: a sender address on a domain verified in Resend, e.g. `Website Enquiries <website@your-verified-domain.example>`.
- `RESEND_REPLY_TO` (optional): reply-to address.

Redeploy after adding variables. The form reports an error and offers WhatsApp until required variables are configured. Test a real submission before treating email delivery as working. Never commit API keys.

## Deployment
1. Connect this repository to Vercel; use framework preset Other, no build command, no output directory.
2. Configure email environment variables above.
3. Deploy and test both phone links, WhatsApp, form submission and email delivery.
4. If Vercel assigns another domain, update canonical/Open Graph/JSON-LD URLs in `index.html`, plus `robots.txt` and `sitemap.xml`.

## SEO launch checklist
- Confirm final deployment domain and update URLs consistently.
- Add a public business address only with owner approval; none was supplied.
- Confirm service wording and service coverage with the owner.
- Link from the business Google Business Profile if applicable.
- Verify in Google Search Console and submit sitemap.
- Check mobile usability and Core Web Vitals after launch.

## Security
The API validates required fields and length limits, checks request origin, and uses environment variables for secrets. Enquiries are not stored in a database. Add rate limiting or bot protection if spam becomes an issue.
