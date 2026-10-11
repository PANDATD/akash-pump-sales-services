export default async function handler(req, res) {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ error: "Method not allowed." }); }
  const origin = req.headers.origin;
  if (origin && req.headers.host) {
    try { if (new URL(origin).host !== req.headers.host) return res.status(403).json({ error: "Request origin is not allowed." }); }
    catch { return res.status(403).json({ error: "Request origin is not allowed." }); }
  }
  const body = req.body && typeof req.body === "object" ? req.body : {};
  if (String(body.website || "").trim()) return res.status(200).json({ ok: true });
  const name = String(body.name || "").trim(), phone = String(body.phone || "").trim(), service = String(body.service || "").trim(), message = String(body.message || "").trim();
  if (!name || !phone || !service || !message) return res.status(400).json({ error: "Please complete all required fields." });
  if (name.length > 100 || phone.length > 20 || service.length > 80 || message.length > 2000) return res.status(400).json({ error: "One or more fields exceed the allowed length." });
  const allowedServices = ["Repairing", "Rewinding", "Hydro-Pneumatic System", "Booster System", "Automation", "Installation", "Sewage Pump", "Sales enquiry", "Other"];
  if (!allowedServices.includes(service)) return res.status(400).json({ error: "Please select a valid service." });
  const phoneDigits = phone.replace(/\\D/g, "");
  if (phoneDigits.length < 7 || phoneDigits.length > 15) return res.status(400).json({ error: "Please enter a valid phone number." });
  const email = process.env.NOTIFICATION_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_FROM_EMAIL;
  if (!email || !apiKey || !sender) return res.status(503).json({ error: "Email notifications are not configured yet." });
  const text = ["New website enquiry — Akash Pump Sales & Services", "", "Name: " + name, "Phone: " + phone, "Service: " + service, "", "Requirement:", message].join("\n");
  try {
    const response = await fetch("https://api.resend.com/emails", { method:"POST", headers:{Authorization:"Bearer "+apiKey,"Content-Type":"application/json"}, body:JSON.stringify({from:sender,to:[email],subject:"New pump service enquiry: "+service,text,reply_to:process.env.RESEND_REPLY_TO || undefined}) });
    if (!response.ok) { const result=await response.json().catch(()=>({})); console.error("Resend request failed:",response.status,result.name||"API error"); return res.status(502).json({error:"Email delivery failed. Please use WhatsApp to contact the business."}); }
    return res.status(200).json({ok:true});
  } catch { console.error("Email notification request failed."); return res.status(502).json({error:"Email service is temporarily unavailable. Please use WhatsApp."}); }
}