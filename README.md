# cliffkinchen.com

The Cliff Kinchen / Kinchen Standard website. Built with Astro and hosted on GitHub Pages.

## Change the site

- Page content is in `src/content-html/`, one file per page.
- Navigation and the overall page shell are in `src/layouts/Base.astro`. Footer content is in `src/content-html/_footer.html`.
- Styling is in `src/styles/site.css`. Images are in `public/img/`.

Pushing to `main` publishes automatically. To check a change locally first, run `npm install` and `npm run dev`.

The contact form posts to Formspree (`https://formspree.io/f/xpqbzqab`), so messages are managed in that Formspree account.

## Launch on the real domain

1. In the repo, delete the `SITE_BASE` Actions variable and re-run the deploy workflow.
2. Under Settings > Pages, set the custom domain to `www.cliffkinchen.com`.
3. At Namecheap, change only these records. Leave MX, SPF, DKIM and other mail records alone.
   - Main domain `@`: A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www`: CNAME `<github-account>.github.io`
4. When GitHub has issued the certificate, turn on Enforce HTTPS.

To roll back, point `@` to A `199.34.228.46` and `www` to CNAME `cliffkinchen.com`.
