# prluciano

Site da Eternal Eleven Agency — React + Vite + Framer Motion, pronto para a Vercel.

Páginas: `/`, `/athlete-recruitment`, `/sponsors`, `/application-enrollment`.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:5173 (ou o IP do PC na mesma rede, pelo celular).

## Publicar na Vercel

O `vercel.json` já define: framework Vite, build `vite build`, saída `dist`, rotas SPA e a função `api/submit`.

Para receber os formulários por e-mail, em **Settings → Environment Variables**:
- `RESEND_API_KEY` — chave grátis em https://resend.com
- `CONTACT_EMAIL` — e-mail que recebe as mensagens
- `FROM_EMAIL` — opcional

Sem essas variáveis, o formulário funciona e as mensagens aparecem em **Logs** na Vercel.

## Estrutura

- `src/sections/` — seções da home (hero, pilares, pathway, programas, etc.)
- `src/pages/` — páginas
- `src/components/` — nav, rodapé, WhatsApp flutuante, formulário, primitivas de motion (`ui.jsx`)
- `src/lib/site.js` — textos, programas, equipe e número do WhatsApp
- `public/img/` — fotos otimizadas em WebP (gere de novo com `npm run images`)
- `legacy/` — cópia do site original da Relume (referência; não é publicada)
- `api/submit.js` — recebe os formulários e envia e-mail via Resend
