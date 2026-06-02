import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
function ContactForm() {
  const [status, setStatus] = useState("idle");
  function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (!data.name || !data.email || !data.message) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      form.reset();
    }, 700);
  }
  return <form
    onSubmit={onSubmit}
    className="rounded-2xl border border-hairline bg-white p-6 md:p-8 shadow-soft space-y-4"
    aria-label="Contact Meroviq"
  >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name" name="name" required placeholder="Jane Cooper" />
        <Field label="Email" name="email" type="email" required placeholder="jane@company.com" />
      </div>
      <Field label="Phone" name="phone" type="tel" placeholder="+91 00000 00000" />
      <Field label="Message" name="message" required textarea placeholder="Tell us a little about your project…" />

      <div className="flex items-center justify-between gap-4 pt-2">
        <p className="text-xs text-ink-muted" role="status" aria-live="polite">
          {status === "sent" && "Thanks \u2014 we'll be in touch within one business day."}
          {status === "error" && "Please fill in the required fields."}
        </p>
        <Button type="submit" disabled={status === "sending"} className="gradient-brand text-white shadow-soft">
          {status === "sending" ? "Sending\u2026" : <>Send Inquiry <Send className="h-4 w-4" /></>}
        </Button>
      </div>
    </form>;
}
function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  textarea
}) {
  const base = "w-full rounded-lg border border-hairline bg-surface px-4 py-2.5 text-ink placeholder:text-ink-muted/70 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition";
  return <label className="block">
      <span className="block text-sm font-medium text-ink mb-1.5">
        {label} {required && <span className="text-accent2">*</span>}
      </span>
      {textarea ? <textarea name={name} required={required} placeholder={placeholder} rows={5} className={base} /> : <input name={name} type={type} required={required} placeholder={placeholder} className={base} />}
    </label>;
}
export {
  ContactForm
};
