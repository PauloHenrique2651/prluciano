# prluciano

Eternal Eleven Agency — site estático

Espelho estático de https://hzmjfrst.relumesite.ai/ (4 páginas: `/`, `/sponsors`, `/athlete-recruitment`, `/application-enrollment`).

## Rodar

```bash
python -m http.server 5173
```

Abra http://localhost:5173

## Deploy na Vercel

Importe o repositório na Vercel (Add New → Project). Framework Preset: **Other**, sem build command; a raiz já é o site. As configurações estão em `vercel.json` (URLs limpas e cache longo para `/assets`).

## Observações
- Scripts de analytics/Sentry da Relume foram removidos.
- Formulários ainda enviam para o backend da Relume (`data-form-endpoint` → nova-forms-worker.relume.workers.dev) com Cloudflare Turnstile; troque por seu backend no novo projeto.
- Links canônicos/OG e schema.org ainda apontam para hzmjfrst.relumesite.ai — ajuste para o domínio novo.
