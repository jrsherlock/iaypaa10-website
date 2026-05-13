"use client";

import { useState, type FormEvent } from "react";
import OozeButton from "@/components/ui/OozeButton";

type Status = "idle" | "submitting" | "success" | "error";

export default function EmailSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastInitial, setLastInitial] = useState("");
  const [email, setEmail] = useState("");
  const [homeGroup, setHomeGroup] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!email.trim() || !firstName.trim() || !lastInitial.trim() || !consent) {
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastInitial: lastInitial.trim().charAt(0).toUpperCase(),
          email: email.trim().toLowerCase(),
          homeGroup: homeGroup.trim() || undefined,
          consent,
          website, // honeypot
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-void-black border border-swamp-teal text-bone-white placeholder:text-bone-white/40 font-[family-name:var(--font-space)] text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-colors";

  return (
    <section id="dispatches" className="py-20 sm:py-24 px-4 sm:px-6 scroll-mt-20">
      <div className="relative max-w-xl mx-auto">
        {/* tape strips that pin the "flyer" up at the top corners */}
        <span
          aria-hidden="true"
          className="absolute -top-3 left-6 w-16 h-5 tape-strip rotate-[-4deg]"
        />
        <span
          aria-hidden="true"
          className="absolute -top-3 right-6 w-16 h-5 tape-strip rotate-[3deg]"
        />

        <div className="relative bg-toxic-green/40 border border-ooze-green/25 p-8 sm:p-10 paper-grit">
          {/* stamped header — not centered Creepster */}
          <div className="mb-6 flex items-baseline gap-3 border-b border-ooze-green/25 pb-3">
            <span className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.3em] uppercase text-bone-white/55 shrink-0">
              No. 026
            </span>
            <h2 className="font-anton text-2xl sm:text-3xl uppercase tracking-wide text-bone-white leading-none">
              Get the <span className="text-ooze-green">dispatches</span>
            </h2>
          </div>

          <p className="font-news text-bone-white/80 text-base sm:text-lg leading-relaxed mb-7">
            Updates when registration opens, when the hotel block goes live,
            when speakers are announced. First name and last initial is all we
            ask &mdash; we keep it anonymous, and we don&rsquo;t share the
            list.
          </p>

        {status === "success" ? (
          <div className="py-6 text-center">
            <p className="text-gold text-2xl font-[family-name:var(--font-creepster)]">
              You&rsquo;re on the list.
            </p>
            <p className="font-typewriter text-bone-white/70 text-sm mt-3 tracking-wide">
              Welcome dispatch on its way to{" "}
              <span className="text-swamp-teal">{email}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Honeypot: hidden from users, bots fill it in */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            >
              <label htmlFor="website-url">
                Website (leave blank)
                <input
                  id="website-url"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-xs text-bone-white/70 mb-1 font-[family-name:var(--font-space)]"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputClass}
                  placeholder="Bill"
                />
              </div>
              <div className="sm:w-20">
                <label
                  htmlFor="lastInitial"
                  className="block text-xs text-bone-white/70 mb-1 font-[family-name:var(--font-space)]"
                >
                  Last initial
                </label>
                <input
                  id="lastInitial"
                  type="text"
                  required
                  maxLength={1}
                  value={lastInitial}
                  onChange={(e) => setLastInitial(e.target.value)}
                  className={`${inputClass} text-center uppercase`}
                  placeholder="W"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs text-bone-white/70 mb-1 font-[family-name:var(--font-space)]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="homeGroup"
                className="block text-xs text-bone-white/70 mb-1 font-[family-name:var(--font-space)]"
              >
                Home group <span className="text-bone-white/40">(optional)</span>
              </label>
              <input
                id="homeGroup"
                type="text"
                value={homeGroup}
                onChange={(e) => setHomeGroup(e.target.value)}
                className={inputClass}
                placeholder="e.g., Monday Night Young People's"
              />
            </div>

            <label className="flex items-start gap-3 text-left text-xs text-bone-white/70 cursor-pointer pt-2">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-swamp-teal bg-void-black text-gold focus:ring-gold/50 cursor-pointer"
              />
              <span>
                It&rsquo;s OK to email me updates about IAYPAA X. You can
                unsubscribe any time.
              </span>
            </label>

            {status === "error" && (
              <p className="text-ember text-sm text-center" role="alert">
                {errorMsg}
              </p>
            )}

            <div className="flex justify-center pt-2">
              <OozeButton
                variant="primary"
                type="submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending\u2026" : "Subscribe"}
              </OozeButton>
            </div>
          </form>
        )}
        </div>
      </div>
    </section>
  );
}
