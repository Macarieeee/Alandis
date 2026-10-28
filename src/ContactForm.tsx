import { useLanguage } from "./i18n";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCheck } from "lucide-react";

export function ContactForm({ initialInterest }: { initialInterest: string }) {
  const { tr } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState(initialInterest);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const requestId = useRef<string | null>(null);
  const pending = useRef(false);
  const phoneInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const digits = phone.replace(/\D/g, "");
    phoneInput.current?.setCustomValidity(!phone || (digits.length >= 7 && digits.length <= 15) ? "" : tr("Introdu un număr de telefon cu 7–15 cifre."));
  }, [phone, tr]);
  const sending = status === "sending";
  const edited = () => {
    requestId.current = null;
    setStatus("idle");
    setError("");
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    setStatus("sending");
    setError("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 25000);
    try {
      // Retain the same ID for retries after a network error to avoid duplicates.
      requestId.current ??= crypto.randomUUID();
      const response = await fetch(`${import.meta.env.BASE_URL}api/contact.php`, {
        method: "POST",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, interest, message, website, requestId: requestId.current }),
        signal: controller.signal,
      });
      const body = await response.json().catch(() => null);
      if (!response.ok || body?.ok !== true) {
        throw new Error(response.status === 429
          ? "Ai trimis mai multe solicitări într-un interval scurt. Încearcă mai târziu sau sună-ne."
          : response.status === 422
            ? "Verifică numele, numărul de telefon și serviciul ales."
            : "Trimiterea nu a putut fi confirmată. Reîncearcă sau contactează-ne telefonic ori la office@alandis.ro.");
      }
      setStatus("success");
      setName("");
      setPhone("");
      setMessage("");
      setWebsite("");
      requestId.current = null;
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error && err.name !== "AbortError" && err.name !== "TypeError"
        ? err.message
        : "Trimiterea nu a putut fi confirmată. Verifică conexiunea și reîncearcă; datele completate au fost păstrate.");
    } finally {
      window.clearTimeout(timeout);
      pending.current = false;
    }
  }

  return (
    <div className="contact-form">
      <span className="form-label">{tr("SĂ NE CUNOAȘTEM")}</span>
      <h2>{tr("Cu ce te putem ajuta?")}</h2>
      <p>{tr("Trimite-ne solicitarea și te vom contacta la numărul de telefon indicat.")}</p>
      <form onSubmit={submit} aria-busy={sending}>
        <label>{tr("Numele tău")}<input name="name" required autoComplete="name" maxLength={100} placeholder={tr("Cum te numești?")}
            disabled={sending} value={name} onChange={(e) => { setName(e.target.value); edited(); }} />
        </label>
        <label>{tr("Numărul de telefon")}{" "}<span>{tr("(obligatoriu)")}</span>
          <input ref={phoneInput} type="tel" name="phone" required autoComplete="tel" maxLength={30}
            pattern="\+?[0-9\s.\(\)\-]{7,30}" placeholder={tr("07xx xxx xxx")} disabled={sending}
            title={tr("Introdu un număr de telefon valid, cu 7–15 cifre.")}
            value={phone} onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "");
              e.target.setCustomValidity(digits.length >= 7 && digits.length <= 15 ? "" : tr("Introdu un număr de telefon cu 7–15 cifre."));
              setPhone(e.target.value); edited();
            }} />
        </label>
        <label>{tr("Sunt interesat(ă) de")}<select name="interest" required disabled={sending} value={interest} onChange={(e) => { setInterest(e.target.value); edited(); }}>
            {Array.from(new Set(["Atestate profesionale", "Consultanță", initialInterest, "Alte informații"])).map((item) => <option key={item} value={item}>{tr(item)}</option>)}
          </select>
        </label>
        <label>{tr("Mesajul tău")}{" "}<span>{tr("(opțional)")}</span>
          <textarea name="message" rows={4} maxLength={2000} disabled={sending}
            placeholder={tr("Spune-ne câteva lucruri despre planul tău…")} value={message}
            onChange={(e) => { setMessage(e.target.value); edited(); }} />
        </label>
        <div className="contact-honeypot" aria-hidden="true">
          <label>{tr("Website")}<input name="website" tabIndex={-1} autoComplete="off" value={website}
            onChange={(e) => setWebsite(e.target.value)} /></label>
        </div>
        <p className="form-privacy">{tr("Prin „Trimite solicitarea”, numele, telefonul, serviciul ales și mesajul sunt trimise către ALANDIS prin e-mail, folosind Resend. Le folosim pentru a răspunde solicitării. Nu include CNP, acte sau date medicale.")}{" "}
          <Link to="/confidentialitate">{tr("Politica de confidențialitate")}</Link>{" · "}
          <Link to="/termeni-si-conditii">{tr("Termeni și condiții")}</Link>
        </p>
        <button className="button w-full justify-center" disabled={sending} type="submit">
          {tr(sending ? "Se trimite…" : "Trimite solicitarea")} <ArrowRight size={18} />
        </button>
        {status === "error" && <p className="contact-error" role="alert">{tr(error)}</p>}
        {status === "success" && (
          <div className="message-ready" role="status">
            <div className="flex gap-2 items-center"><CheckCheck size={20} /><strong>{tr("Solicitarea a fost transmisă.")}</strong></div>
            <p>{tr("Îți mulțumim! Te vom contacta la numărul de telefon indicat.")}</p>
          </div>
        )}
      </form>
    </div>
  );
}
