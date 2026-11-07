# prluciano

Site da Eternal Eleven Agency — estático, pronto para a Vercel.

Páginas: `/`, `/sponsors`, `/athlete-recruitment`, `/application-enrollment`.

## Publicar na Vercel

1. vercel.com → **Add New → Project** → importe `PauloHenrique2651/prluciano`.
2. Framework Preset: **Other**. Não mexa em build/output. **Deploy**.
3. (Para receber os formulários por e-mail) **Settings → Environment Variables**:
   - `RESEND_API_KEY` — chave grátis em https://resend.com
   - `CONTACT_EMAIL` — e-mail que recebe as mensagens
   - `FROM_EMAIL` — opcional (ex.: `Eternal Eleven <contato@seudominio.com>` depois de verificar o domínio no Resend)

   Depois de salvar, faça **Redeploy**. Sem essas variáveis o formulário funciona, mas as mensagens só aparecem em **Logs** na Vercel.

## Domínio

Canonical, Open Graph, sitemap e robots usam `https://prluciano.vercel.app`. Se o projeto ganhar outro endereço ou domínio próprio, troque essa URL em todos os arquivos:

```bash
grep -rl "prluciano.vercel.app" . | xargs sed -i "s#https://prluciano.vercel.app#https://seudominio.com#g"
```

## Rodar localmente

```bash
python -m http.server 5173
```

Abra http://localhost:5173 (o envio de formulário só funciona na Vercel ou com `vercel dev`).

## Estrutura

- `index.html`, `*/index.html` — páginas
- `assets/` — imagens
- `api/submit.js` — função que recebe os formulários e envia e-mail via Resend
- `vercel.json` — URLs limpas e cache
