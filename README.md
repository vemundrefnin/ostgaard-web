# ostgaard-web

Offentlig nettside for Østgaard (garder-ostgaard.no). Next.js på Vercel,
statiske sider, ingen database.

```
npm install
npm run dev        # http://localhost:3000
npm run check      # typer + lint + tester
```

Se [CLAUDE.md](CLAUDE.md) for hvordan innhold redigeres, og
`src/lib/legacy-redirects.ts` for adressene som må fortsette å fungere.

## Lansering (når domenet skal pekes hit)

0. Wix-siten må ha fått en egen adresse FØR byttet (f.eks.
   booking.garder-ostgaard.no): billetter, gavekort og dagens skjema bor der.
   Sett `NEXT_PUBLIC_WIX_URL` til den adressen. Da peker «Kjøp billetter»-
   lenkene og de gamle /event-details/*- og /gift-card-stiene dit.
1. `npm run check:redirects -- https://<production-url>.vercel.app` skal være grønn.
2. Sett `NEXT_PUBLIC_SITE_URL=https://garder-ostgaard.no` og `SITE_INDEXABLE=true`
   for Production i Vercel, og redeploy.
3. Legg garder-ostgaard.no + www i Vercel-prosjektet, oppdater DNS (Domeneshop).
4. Kjør redirect-sjekken igjen mot https://garder-ostgaard.no.
5. Send sitemap til Google Search Console.
