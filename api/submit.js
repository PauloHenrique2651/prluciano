// Vercel Function: recebe os formulários do site e envia por e-mail via Resend.
// Variáveis de ambiente (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY  chave da conta Resend (https://resend.com)
//   CONTACT_EMAIL   e-mail que recebe as mensagens
//   FROM_EMAIL      remetente (opcional; padrão "Site <onboarding@resend.dev>")
// Sem RESEND_API_KEY, a mensagem só aparece nos logs da Vercel.

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function formName(token) {
  try {
    const payload = JSON.parse(Buffer.from(String(token).split(".")[1], "base64url").toString("utf8"));
    return payload.form_name || null;
  } catch {
    return null;
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body;
  const fields = body && typeof body.fields === "object" && body.fields ? body.fields : null;
  if (!fields || Object.keys(fields).length === 0 || JSON.stringify(fields).length > 50000) {
    return res.status(400).json({ error: "invalid_submission" });
  }

  const name =
    (typeof body.form_name === "string" && body.form_name.slice(0, 80)) || formName(body.token) || "Formulário do site";
  const page = typeof body.page_url === "string" ? body.page_url.slice(0, 500) : "";
  const rows = Object.entries(fields)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><b>${escape(k)}</b></td><td>${escape(v)}</td></tr>`)
    .join("");
  const replyTo = Object.entries(fields).find(([k, v]) => /e-?mail/i.test(k) && /@/.test(String(v)));

  console.log("[form]", name, page, JSON.stringify(fields));

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!key || !to) return res.status(200).json({ ok: true, delivered: false });

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL || "Site <onboarding@resend.dev>",
        to: to.split(",").map((s) => s.trim()),
        subject: `[Site] ${name}`,
        html: `<h2>${escape(name)}</h2><table>${rows}</table><p style="color:#888">Página: ${escape(page)}</p>`,
        ...(replyTo ? { reply_to: String(replyTo[1]) } : {}),
      }),
    });
    if (!r.ok) {
      console.error("[form] resend error", r.status, await r.text());
      return res.status(502).json({ error: "delivery_failed" });
    }
    return res.status(200).json({ ok: true, delivered: true });
  } catch (e) {
    console.error("[form] resend exception", e);
    return res.status(502).json({ error: "delivery_failed" });
  }
};

function safeParse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
