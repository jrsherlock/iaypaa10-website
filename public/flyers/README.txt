Drop event flyer files here. For each event you want a flyer on:

1. PDF (required for the download button) — print-ready, ideally letter
   size (8.5"x11") at ~200 DPI. Filename: <event-id>.pdf
2. Thumbnail (optional but recommended) — a web-friendly JPG or PNG
   around 1200px wide. Filename: <event-id>.jpg

Then in src/lib/constants.ts set:
   flyer:      "/flyers/<event-id>.pdf"
   flyerThumb: "/flyers/<event-id>.jpg"

When flyerThumb is set, the event card shows a small pinned-poster
preview and the modal opens with a larger clickable preview that
downloads the PDF on click.

When only flyer is set, the modal shows the Download button with no
preview. When neither is set, the modal shows "Flyer coming soon".

---

Weekend posters (not pre-conference events)

The conference's own posters live here too, JPG-only (no PDF — they are
screen artwork, not print handouts):

  iaypaax-speakers.jpg      the lineup; shown whole on /speakers
  pajama-party.jpg          Friday 10 PM; pinned to the /schedule card
  shake-your-ooze-thing.jpg Saturday 10 PM; pinned to the /schedule card

The two schedule posters are wired via the `poster` field on a
ScheduleEvent in src/lib/schedule.ts. Intrinsic width/height go with the
path there because these are not all the same aspect ratio and they are
rendered uncropped.
