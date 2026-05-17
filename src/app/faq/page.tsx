"use client";

import { useState } from "react";
import GlowText from "@/components/ui/GlowText";
import SlimeDivider from "@/components/ui/SlimeDivider";
import RisingMotes from "@/components/effects/RisingMotes";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { FAQ_ITEMS, CONFERENCE } from "@/lib/constants";

export default function FAQPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim() && formData.message.trim()) {
      setFormSubmitted(true);
      setShowToast(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setShowToast(false), 4000);
    }
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-4">
          <GlowText as="h1" className="mb-4">
            FAQ
          </GlowText>
          <p className="text-bone-white/70 text-lg md:text-xl max-w-2xl mx-auto font-[family-name:var(--font-space)]">
            Frequently asked questions about IAYPAA X
          </p>
        </div>
        <RisingMotes count={10} />

        {/* FAQ Accordion */}
        <section className="mb-16">
          <FAQAccordion items={[...FAQ_ITEMS]} />
        </section>

        <SlimeDivider className="mb-16" />

        {/* Contact Form */}
        <section className="mb-16">
          <GlowText as="h2" glow="subtle" className="mb-4 text-center">
            Still Have Questions?
          </GlowText>
          <p className="text-bone-white/60 text-center mb-10 max-w-lg mx-auto">
            Didn&apos;t find what you were looking for? Send us a message and
            we&apos;ll get back to you.
          </p>

          <div className="max-w-xl mx-auto">
            {formSubmitted ? (
              <div className="rounded-xl border border-swamp-teal/40 bg-toxic-green/20 p-8 text-center">
                <div className="text-4xl mb-4">{"\u2705"}</div>
                <h3 className="font-anton text-2xl text-swamp-teal mb-3 glow-text-subtle">
                  Message Sent!
                </h3>
                <p className="text-bone-white/70">
                  Thanks for reaching out. We&apos;ll get back to you as soon as
                  we can.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-6 text-ooze-green hover:underline text-sm cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-bone-white/70 mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-swamp-teal/30 bg-void-black/80 px-4 py-3 text-bone-white placeholder:text-bone-white/30 focus:outline-none focus:border-gold focus:shadow-[0_0_10px_rgba(242,193,78,0.3)] transition-all font-[family-name:var(--font-space)]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-bone-white/70 mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-swamp-teal/30 bg-void-black/80 px-4 py-3 text-bone-white placeholder:text-bone-white/30 focus:outline-none focus:border-gold focus:shadow-[0_0_10px_rgba(242,193,78,0.3)] transition-all font-[family-name:var(--font-space)]"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-bone-white/70 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-swamp-teal/30 bg-void-black/80 px-4 py-3 text-bone-white placeholder:text-bone-white/30 focus:outline-none focus:border-gold focus:shadow-[0_0_10px_rgba(242,193,78,0.3)] transition-all resize-none font-[family-name:var(--font-space)]"
                    placeholder="What's on your mind?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gold px-6 py-3 font-bold text-void-black hover:shadow-[0_0_20px_rgba(242,193,78,0.5)] transition-all cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </section>

        <SlimeDivider className="mb-16" />

        {/* Committee Email */}
        <section className="mb-8 text-center">
          <GlowText as="h3" glow="subtle" className="mb-4">
            Reach Us Directly
          </GlowText>
          <p className="text-bone-white/60 mb-4">
            Prefer email? Reach the IAYPAA committee at:
          </p>
          <a
            href={`mailto:${CONFERENCE.email}`}
            className="inline-block rounded-xl border border-gold/30 bg-void-black/60 px-8 py-4 text-gold font-[family-name:var(--font-mono)] text-lg hover:border-gold/60 hover:shadow-[0_0_15px_rgba(242,193,78,0.15)] transition-all glow-text-subtle"
          >
            {CONFERENCE.email}
          </a>
        </section>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg border border-swamp-teal/50 bg-toxic-green/90 px-6 py-4 shadow-[0_0_20px_rgba(77,144,120,0.3)] animate-slide-in-right">
          <div className="flex items-center gap-3">
            <span className="text-xl">{"\u2705"}</span>
            <div>
              <p className="font-semibold text-bone-white text-sm">
                Message sent successfully!
              </p>
              <p className="text-bone-white/70 text-xs">
                We&apos;ll get back to you soon.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
