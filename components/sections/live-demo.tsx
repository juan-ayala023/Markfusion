"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import type { Dictionary } from "@/i18n";
import type { Lead } from "@/lib/ai/lead";
import { CHAT_LIMITS, type ChatEvent } from "@/lib/ai/protocol";
import { publishLead } from "@/lib/lead-bridge";
import { cn } from "@/lib/utils";

type DemoDict = Dictionary["demo"];
type Message = { role: "user" | "assistant"; content: string };
type ErrorKey = keyof DemoDict["errors"];

const LEAD_FIELDS = ["need", "project_type", "timeline", "budget", "name", "company", "contact"] as const;

/** Une la ficha nueva con la anterior sin borrar lo que la IA ya sabía. */
function mergeLead(previous: Lead | null, next: Lead): Lead {
  if (!previous) return next;
  const merged = { ...next };
  for (const field of LEAD_FIELDS) {
    if (merged[field] === null && previous[field] !== null) Object.assign(merged, { [field]: previous[field] });
  }
  return merged;
}

export function LiveDemo({ dict }: { dict: DemoDict }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<ErrorKey | null>(null);
  const [lead, setLead] = useState<Lead | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const limitReached = messages.length >= CHAT_LIMITS.maxMessages - 1;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, streaming]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(text: string) {
    const content = text.trim().slice(0, CHAT_LIMITS.maxChars);
    if (!content || streaming) return;
    if (limitReached) {
      setError("limit");
      return;
    }

    const history: Message[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setError(null);
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const appendText = (delta: string) =>
      setMessages((current) => {
        const next = [...current];
        const last = next[next.length - 1];
        next[next.length - 1] = { ...last, content: last.content + delta };
        return next;
      });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, lead }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const event = (await response.json().catch(() => null)) as ChatEvent | null;
        throw new Error(event?.type === "error" ? event.code : "failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let failure: ErrorKey | null = null;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line) as ChatEvent;
          if (event.type === "text") appendText(event.text);
          else if (event.type === "lead") setLead((previous) => mergeLead(previous, event.lead));
          else if (event.type === "error") failure = event.code;
        }
      }
      if (failure) throw new Error(failure);
    } catch (caught) {
      if (controller.signal.aborted) return;
      const code = caught instanceof Error && caught.message in dict.errors ? (caught.message as ErrorKey) : "failed";
      setError(code);
      // Si la respuesta quedó vacía, se retira para que el usuario pueda reintentar
      setMessages((current) => (current.at(-1)?.content ? current : current.slice(0, -1)));
    } finally {
      setStreaming(false);
    }
  }

  const qualified = lead?.stage === "calificado";
  const thinking = streaming && messages.at(-1)?.content === "";

  return (
    <section id="demo" className="section-y relative border-t border-line">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(50%_60%_at_50%_0%,rgb(107_224_0/0.08),transparent_70%)]" />
      <div className="container-x relative">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} description={dict.description} />

        <div className="mt-14 grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
          <SpotlightCard className="flex h-[620px] flex-col">
            <header className="flex items-center gap-3 border-b border-line px-5 py-4">
              <span className="flex size-9 items-center justify-center rounded-full border border-line bg-black">
                <LogoMark className="h-3.5" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-medium text-fg">{dict.assistantName}</span>
                <span className="flex items-center gap-1.5 text-xs text-brand-to">
                  <span className="size-1.5 animate-pulse rounded-full bg-brand" />
                  {dict.assistantStatus}
                </span>
              </span>
            </header>

            <div
              ref={scrollRef}
              data-lenis-prevent
              role="log"
              aria-live="polite"
              aria-busy={streaming}
              className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-5 py-6"
            >
              <Bubble role="assistant">{dict.greeting}</Bubble>
              {messages.map((message, index) =>
                message.content ? (
                  <Bubble key={index} role={message.role}>
                    {message.content}
                  </Bubble>
                ) : null,
              )}
              {thinking && (
                <div className="flex gap-1 self-start rounded-2xl rounded-tl-sm border border-line bg-surface-2 px-4 py-3.5" aria-label={dict.sending}>
                  {[0, 1, 2].map((dot) => (
                    <span key={dot} className="typing-dot size-1.5 rounded-full bg-muted" style={{ animationDelay: `${dot * 150}ms` }} />
                  ))}
                </div>
              )}
              {messages.length === 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {dict.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => send(suggestion)}
                      className="rounded-full border border-line px-3.5 py-2 text-left text-sm text-muted transition-colors duration-300 hover:border-brand/50 hover:text-fg"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              {error && (
                <p role="alert" className="self-center rounded-full border border-red-400/20 bg-red-400/5 px-4 py-2 text-center text-xs text-red-200">
                  {dict.errors[error]}
                </p>
              )}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                send(input);
              }}
              className="border-t border-line p-3"
            >
              <div className="flex items-end gap-2 rounded-2xl border border-line bg-surface-2/60 p-1.5 focus-within:border-brand/50">
                <label htmlFor="demo-input" className="sr-only">
                  {dict.inputLabel}
                </label>
                <textarea
                  id="demo-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  maxLength={CHAT_LIMITS.maxChars}
                  placeholder={dict.placeholder}
                  disabled={limitReached}
                  className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-3 py-2.5 text-[15px] text-fg placeholder:text-subtle focus:outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={streaming || !input.trim() || limitReached}
                  aria-label={streaming ? dict.sending : dict.send}
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-black transition-opacity disabled:opacity-30"
                >
                  <ArrowIcon className="-rotate-90" />
                </button>
              </div>
              <p className="mt-2 px-2 text-[11px] text-subtle">{dict.disclaimer}</p>
            </form>
          </SpotlightCard>

          <LeadPanel lead={lead} dict={dict.lead} qualified={qualified} />
        </div>
      </div>
    </section>
  );
}

function Bubble({ role, children }: { role: Message["role"]; children: React.ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[15px] leading-relaxed",
        role === "user"
          ? "self-end rounded-tr-sm bg-brand text-black"
          : "self-start rounded-tl-sm border border-line bg-surface-2 text-fg",
      )}
    >
      {children}
    </m.div>
  );
}

function LeadPanel({ lead, dict, qualified }: { lead: Lead | null; dict: DemoDict["lead"]; qualified: boolean }) {
  const score = lead?.score ?? 0;
  const stages = Object.keys(dict.stages) as (keyof typeof dict.stages)[];
  const stageIndex = lead ? stages.indexOf(lead.stage) : -1;

  return (
    <SpotlightCard className="flex flex-col p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight text-fg">{dict.title}</h3>
        <span className="label-mono flex items-center gap-2 text-[10px] text-brand-to">
          <span className="size-1.5 animate-pulse rounded-full bg-brand" />
          {dict.live}
        </span>
      </div>
      <p className="mt-1.5 text-sm text-muted">{dict.description}</p>

      <div className="mt-6">
        <div className="flex items-baseline justify-between">
          <span className="label-mono text-subtle">{dict.score}</span>
          <span className="font-mono text-2xl font-semibold text-fg tabular-nums">{score}</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full origin-left rounded-full bg-linear-to-r from-brand-from to-brand-to transition-transform duration-700 ease-out-expo"
            style={{ transform: `scaleX(${score / 100})` }}
          />
        </div>
        <ol className="mt-4 grid grid-cols-3 gap-1.5">
          {stages.map((stage, index) => (
            <li
              key={stage}
              className={cn(
                "rounded-full border px-2 py-1 text-center font-mono text-[10px] transition-colors duration-500",
                index <= stageIndex ? "border-brand/40 bg-brand/10 text-brand-to" : "border-line text-subtle",
              )}
            >
              {dict.stages[stage]}
            </li>
          ))}
        </ol>
      </div>

      <dl className="mt-6 flex-1 divide-y divide-line border-y border-line">
        {LEAD_FIELDS.map((field) => {
          const raw = lead?.[field] ?? null;
          const value = field === "project_type" && raw ? dict.projectTypes[raw as keyof typeof dict.projectTypes] : raw;
          return (
            <div key={field} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-3 py-2.5">
              <dt className="label-mono pt-0.5 text-[10px] text-subtle">{dict.fields[field]}</dt>
              <dd className="min-w-0 text-sm">
                <AnimatePresence mode="wait" initial={false}>
                  <m.span
                    key={value ?? "empty"}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className={cn("block break-words", value ? "text-fg" : "text-subtle/70")}
                  >
                    {value ?? dict.empty}
                  </m.span>
                </AnimatePresence>
              </dd>
            </div>
          );
        })}
      </dl>

      <div className={cn("mt-6 transition-opacity duration-500", qualified ? "opacity-100" : "pointer-events-none opacity-40")}>
        <ButtonLink
          href="/#contacto"
          onClick={() => lead && publishLead(lead)}
          className="w-full"
          aria-disabled={!qualified}
          tabIndex={qualified ? undefined : -1}
        >
          {dict.cta}
          <ArrowIcon />
        </ButtonLink>
      </div>
    </SpotlightCard>
  );
}
