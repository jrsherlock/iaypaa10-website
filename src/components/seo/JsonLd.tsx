// Renders a JSON-LD structured-data <script>. Server component; the data
// object is serialized once at build/render time. Used for Event (home) and
// FAQPage (faq) structured data — see src/lib/seo.ts.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
