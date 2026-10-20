"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useId, useState } from "react";

import { ArrowIcon, Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import type { Dictionary } from "@/i18n";
import type { Lead } from "@/lib/ai/lead";
import type { ContactField, ContactResponse } from "@/lib/contact-schema";
import { readStoredLead, subscribeLead } from "@/lib/lead-bridge";
import { BUDGET_OPTIONS, PROJECT_TYPES } from "@/lib/options";
import { site, whatsappLink, whatsappReady } from "@/lib/site";
import { cn } from "@/lib/utils";

type ContactDict = Dictionary["contact"];
type Status = "idle" | "loading" | "success" | Exclude<ContactResponse, { ok: true }>["code"];

type FormState = {
  name: string;
  company: string;
  whatsapp: string;
  projectType: string;
  budget: string;
  message: string;
  consent: boolean;
  website: string;
};

const EMPTY: FormState = {
  name: "",
  company: "",
  whatsapp: "",
  projectType: "",
  budget: "",
  message: "",
  consent: false,
  website: "",
};

const PHONE = /^\+?[\d\s().-]{7,20}$/;

/** Rellena solo los campos vacíos con lo que la IA averiguó en la demo. */
function prefill(form: FormState, lead: Lead): FormState {
  const summary = [lead.need, lead.timeline && `Plazo: ${lead.timeline}`, lead.budget && `Presupuesto: ${lead.budget}`]
    .filter(Boolean)
    .join("\n");
  return {
    ...form,
    name: form.name || lead.name || "",
    company: form.company || lead.company || "",
    whatsapp: form.whatsapp || (lead.contact && PHONE.test(lead.contact) ? lead.contact : ""),
    projectType: form.projectType || lead.project_type || "",
    message: form.message || summary,
  };
}

export function Contact({ dict }: { dict: ContactDict }) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [lead, setLead] = useState<Lead | null>(null);
  const id = useId();

  useEffect(() => {
    const apply = (next: Lead) => {
      setLead(next);
      setForm((current) => prefill(current, next));
    };
    const stored = readStoredLead();
    if (stored) apply(stored);
    return subscribeLead(apply);
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    if (errors[key as ContactField]) setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    // Zod se carga al enviar, no con la página
    const { ContactSchema } = await import("@/lib/contact-schema");
    const parsed = ContactSchema.safeParse({ ...form, lead });
    if (!parsed.success) {
      const next: Partial<Record<ContactField, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as ContactField;
        next[field] ??= dict.errors[field] ?? dict.status.invalid;
      }
      setErrors(next);
      setStatus("idle");
      document.getElementById(`${id}-${Object.keys(next)[0]}`)?.focus();
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json().catch(() => ({ ok: false, code: "failed" }))) as ContactResponse;
      setStatus(result.ok ? "success" : result.code);
    } catch {
      setStatus("failed");
    }
  }

  const fieldProps = (field: ContactField) => ({
    id: `${id}-${field}`,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${id}-${field}-error` : undefined,
  });

  return (
    <section id="contacto" className="section-y relative overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_15%_20%,rgb(107_224_0/0.1),transparent_70%)]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <SectionHeading eyebrow={dict.eyebrow} title={dict.title} description={dict.description} />
          <div className="mt-12">
            <p className="label-mono text-subtle">{dict.direct}</p>
            <ul className="mt-5 space-y-3">
              {whatsappReady && (
                <li>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-md border border-line px-5 py-4 transition-colors hover:border-brand/40">
                    <span>
                      <span className="block text-xs text-subtle">{dict.whatsapp}</span>
                      <span className="text-fg">+{site.whatsapp}</span>
                    </span>
                    <span aria-hidden className="text-muted transition-colors group-hover:text-brand">↗</span>
                  </a>
                </li>
              )}
              <li>
                <a href={`mailto:${site.email}`} className="group flex items-center justify-between rounded-md border border-line px-5 py-4 transition-colors hover:border-brand/40">
                  <span>
                    <span className="block text-xs text-subtle">{dict.email}</span>
                    <span className="text-fg">{site.email}</span>
                  </span>
                  <span aria-hidden className="text-muted transition-colors group-hover:text-brand">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <SpotlightCard className="p-6 sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            {status === "success" ? (
              <m.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="status"
                className="flex min-h-[520px] flex-col items-center justify-center text-center"
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-brand text-2xl text-black">✓</span>
                <h3 className="mt-6 text-h3 font-semibold text-fg">{dict.status.successTitle}</h3>
                <p className="mt-3 max-w-sm text-muted">{dict.status.successDescription}</p>
                <Button
                  variant="secondary"
                  className="mt-8"
                  onClick={() => {
                    setForm(EMPTY);
                    setStatus("idle");
                  }}
                >
                  {dict.status.again}
                </Button>
              </m.div>
            ) : (
              <m.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
                {lead && (
                  <p className="rounded-md border border-brand/30 bg-brand/10 px-4 py-3 text-sm text-brand-to sm:col-span-2">{dict.fromDemo}</p>
                )}

                <Field label={dict.fields.name} error={errors.name} htmlFor={`${id}-name`} errorId={`${id}-name-error`}>
                  <input {...fieldProps("name")} autoComplete="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder={dict.placeholders.name} className={inputClass} />
                </Field>
                <Field label={dict.fields.company} hint={dict.optional} error={errors.company} htmlFor={`${id}-company`} errorId={`${id}-company-error`}>
                  <input {...fieldProps("company")} autoComplete="organization" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder={dict.placeholders.company} className={inputClass} />
                </Field>
                <Field label={dict.fields.whatsapp} error={errors.whatsapp} htmlFor={`${id}-whatsapp`} errorId={`${id}-whatsapp-error`}>
                  <input {...fieldProps("whatsapp")} type="tel" inputMode="tel" autoComplete="tel" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder={dict.placeholders.whatsapp} className={inputClass} />
                </Field>
                <Field label={dict.fields.budget} error={errors.budget} htmlFor={`${id}-budget`} errorId={`${id}-budget-error`}>
                  <select {...fieldProps("budget")} value={form.budget} onChange={(e) => update("budget", e.target.value)} className={cn(inputClass, "appearance-none", !form.budget && "text-subtle")}>
                    <option value="" disabled>
                      {dict.selectBudget}
                    </option>
                    {BUDGET_OPTIONS.map((option) => (
                      <option key={option} value={option} className="bg-surface-2 text-fg">
                        {dict.budgets[option]}
                      </option>
                    ))}
                  </select>
                </Field>

                <fieldset className="sm:col-span-2" aria-describedby={errors.projectType ? `${id}-projectType-error` : undefined}>
                  <legend className="mb-2.5 text-sm text-muted">{dict.fields.projectType}</legend>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((type, index) => (
                      <label
                        key={type}
                        className={cn(
                          "cursor-pointer rounded-full border px-3.5 py-2 text-sm transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand",
                          form.projectType === type ? "border-brand bg-brand text-black" : "border-line text-muted hover:border-line-strong hover:text-fg",
                        )}
                      >
                        <input
                          type="radio"
                          name="projectType"
                          value={type}
                          id={index === 0 ? `${id}-projectType` : undefined}
                          checked={form.projectType === type}
                          onChange={() => update("projectType", type)}
                          className="sr-only"
                        />
                        {dict.projectTypes[type]}
                      </label>
                    ))}
                  </div>
                  <FieldError id={`${id}-projectType-error`} message={errors.projectType} />
                </fieldset>

                <Field label={dict.fields.message} error={errors.message} htmlFor={`${id}-message`} errorId={`${id}-message-error`} className="sm:col-span-2">
                  <textarea {...fieldProps("message")} rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder={dict.placeholders.message} maxLength={2000} className={cn(inputClass, "h-auto resize-y py-3 leading-relaxed")} />
                </Field>

                {/* Honeypot: invisible para personas */}
                <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor={`${id}-website`}>{dict.fields.website}</label>
                  <input id={`${id}-website`} tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
                    <input {...fieldProps("consent")} type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-0.5 size-4 shrink-0 accent-[var(--color-brand)]" />
                    {dict.fields.consent}
                  </label>
                  <FieldError id={`${id}-consent-error`} message={errors.consent} />
                </div>

                <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
                    {status === "loading" ? dict.submitting : dict.submit}
                    {status === "loading" ? <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-black/30 border-t-black" /> : <ArrowIcon />}
                  </Button>
                  {status !== "idle" && status !== "loading" && (
                    <p role="alert" className="text-sm text-red-200">
                      {dict.status[status]}
                    </p>
                  )}
                </div>
              </m.form>
            )}
          </AnimatePresence>
        </SpotlightCard>
      </div>
    </section>
  );
}

const inputClass =
  "h-12 w-full rounded-[12px] border border-line bg-surface-2/60 px-4 text-[15px] text-fg placeholder:text-subtle transition-colors duration-300 hover:border-line-strong focus:border-brand/60 focus:outline-none aria-[invalid=true]:border-red-400/60";

function Field({
  label,
  hint,
  error,
  htmlFor,
  errorId,
  className,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  htmlFor: string;
  errorId: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2.5 flex items-baseline justify-between text-sm text-muted">
        {label}
        {hint && <span className="text-xs text-subtle">{hint}</span>}
      </label>
      {children}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-xs text-red-300">
      {message}
    </p>
  );
}
