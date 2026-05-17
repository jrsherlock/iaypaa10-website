# IAYPAA X — Design Philosophy

> **The guiding principle:** _Emergence, not horror._
> Every design choice should feel like the moment something living rises out
> of the dark — not the moment something dead lunges at you.

This document is the north star for the IAYPAA X site. When a design decision
is unclear, it loses to this principle. Read it before adding any visual
element.

---

## 1. What "Primordial Ooze" actually means

The B-movie horror skin treats the ooze as a **monster** — slime, scares,
schlock, "RATED YP," VHS scanlines. That's a costume, not the theme.

The real meaning of primordial ooze is **abiogenesis**: life cohering out of
formless, lifeless muck when energy and time are applied to it. That maps onto
the Big Book with uncomfortable precision:

| Primordial ooze | The Big Book |
|---|---|
| Formless, lifeless muck | The "pitiful and incomprehensible demoralization" of the Doctor's Opinion; the "jumping-off place" (_A Vision For You_) |
| Energy + structure applied over time | The steps, the fellowship, the daily reprieve |
| Life slowly cohering out of the soup | The spiritual awakening "of the educational variety… develops slowly over a period of time" (Appendix II) |
| Something alive rises | "We will know a new freedom and a new happiness"; "We stood at the turning point" |

So the conference theme is literally: **we were the ooze, and something alive
came out of it.** That is the most hopeful story there is. The design must
carry _that_ — not a creature feature.

Horror points **down and back**: fear, recoil, the past.
Emergence points **up and forward**: awe, warmth, the turning point.
Same darkness. Same green. Opposite emotional vector.

---

## 2. The one-line test

For **any** element — a texture, an animation, a word, a color:

> **Does this feel like life arriving, or like something rotting?**
> Keep the first. Cut the second.

If an element exists to make someone _flinch_ or _smirk_, it is wrong.
If it makes them _lean in_, it is right.

---

## 3. The sensory system

The green / black / amber palette and the heavy display type were always doing
the right work. What gets retired is the **cinema wrapper** (scanlines, film
grain, reel/rating/showtime framing, drip-as-threat) in favor of **formation**
and a voice that trusts the theme.

### Tone

Generative dark, not haunted-house dark. The reference images are: the
**bioluminescent deep**, the **hour before dawn**, a **cell dividing**,
**mineral crystallizing in a lightless cave**. Awe, depth, and warmth growing
in cold.

### Typography

- **Display — keep the structural face (Anton).** Heavy, condensed, formed —
  it reads as something that _solidified_, with a spine. It is the structure
  emerging from the soft stuff. This becomes the primary headline face.
- **Voice — serif (Newsreader).** Reserved for the moments the site speaks
  plainly about recovery. Plain, earned, quietly certain — the Big Book's own
  register.
- **Field captions — typewriter (Special Elite), demoted.** Allowed _only_ as
  the humble, handmade meeting-list caption voice (times, rooms, small labels).
  Never again as a "rubber stamp."
- **Retire Creepster entirely.** The drippy horror font _is_ the B-movie skin.
  Every headline that used it moves to Anton.

### Color — keep the hues, change their job

```
--color-ooze-green  #5FAD56   was "toxic warning" → now "first light / living glow"
--color-swamp-teal  #4D9078   the cold deep before life
--color-gold        #F2C14E   warmth emerging from cold — the core story beat
--color-ember       #F78154   the heat of formation; use sparingly
--color-void-black  #0D0D0D   the lightless origin
--color-dark-ooze   #0A1A12   depth, not menace
```

The central palette story is **cold muck → warm life**: void-black/teal depth
resolving toward a single warm amber light. Green stops screaming "toxic" and
starts glowing "alive." Treat `toxic-green` as _deep strata_, not poison.

### Texture — geological / biological, never cinematic

Retire the **xerox/flyer kit**: scanlines, animated film grain, halftone dots,
misregistered ink, tape strips, rubber stamps, marquee rules. Those are _a
movie about ooze_.

Replace with **the ooze itself**: sediment and strata, slow viscous depth,
mineral grain, condensation, accretion — things building **layer by layer**.
A single near-static fine grain is allowed _only_ as the texture of matter, not
as a film artifact (no jitter animation).

### Motion — accretion and rising, never the jump-scare

Everything **settles, coalesces, surfaces, or grows**. Slow reveals; things
drifting **upward**; layers building. Nothing drips menacingly, lurches, or
flickers. **The drip becomes a rise.** Neon pulse becomes slow breathing
luminescence. Page-load is one orchestrated rise (staggered, calm), not
scattered twitch.

### Light

Light is **emergent**, not radioactive. Glow is a soft single halo — like
something faintly luminous seen through dark water — not the four-layer
neon-sign `text-shadow`. Less reach, warmer falloff.

### Copy voice — the turning point, not the creature feature

Drop the camp: "Showtimes," "Reel 03," "RATED YP," "One Weekend Only,"
"// status," "TBA." Borrow the Big Book's actual register: plain, earned,
quietly certain. "We stood at the turning point." "Trudge the road of happy
destiny." Confident, never ironic. The theme is strong enough that you never
have to wink at it.

---

## 4. Component audit

Verdicts: **KEEP** (on-philosophy) · **REDIRECT** (right bones, wrong skin) ·
**RETIRE** (it _is_ the B-movie skin).

| Component / token | Verdict | Why | Action |
|---|---|---|---|
| `effects/FilmGrain` (global) | **RETIRE** | Animated VHS grain = pure cinema artifact. Fails the rot test. | Remove from `layout.tsx`. Optionally replace with one static, sub-3% sediment grain (no `animate-grain`). |
| `effects/Scanlines` | **RETIRE** | VHS scanlines are the literal definition of the costume. | Delete component; remove from `Hero`. |
| Creepster font | **RETIRE** | The drippy horror face _is_ the skin. | Drop from `layout.tsx`; every use → Anton. |
| `ui/GlowText` | **REDIRECT** | Concept (luminous headline) is good; Creepster + 4-layer neon is not. | Switch to Anton; replace `glow-text` with single soft warm halo. |
| `.glow-text*` classes | **REDIRECT** | Neon-sign reach reads "radioactive," not "alive." | One-layer, lower-spread, warmer halo. |
| `effects/DrippingSlime` | **REDIRECT** | Downward drip = decay/threat vector — wrong direction. | Re-aim motion **upward**: rising motes / settling sediment. Rename to `RisingMotes`. |
| `effects/BubblingOoze` | **KEEP (retune)** | Rising bubbles + morphing blobs = emergence/formation — already on-philosophy. | Slow it down, deepen color, reduce count; less "swamp gas," more abiogenesis. |
| `sections/Hero` | **REDIRECT** | Layered depth, parallax, vignette = great (primordial depth). Creepster title, Scanlines, "Rated YP," "One Weekend Only," tape strip = costume. | Keep the photo-depth stack; Anton title; remove Scanlines/stamp/marquee; reframe copy. |
| `ui/ComingSoon` | **REDIRECT** | Useful pattern; "TBA placard / // status / Coming soon" framing is camp. | Reframe as _"still forming"_ (emergence), Anton not Creepster, drop tape/stamp. |
| `app/schedule` page | **REDIRECT** | Content is solid; "Showtimes / Reel 03 / // working program" is cinema. | Rename to plain program language; drop reel/film framing. |
| Poster kit: `.tape-strip` `.stamp` `.bg-halftone*` `.ink-misreg` `.marquee-rule` `.paper-grit` | **RETIRE** | The handmade-xerox-flyer kit = the wrapper. | Remove usages; replace with strata / depth-gradient / fine-grain utilities. |
| `--color-film-grain` token | **RETIRE** | Exists only to serve the grain artifact. | Delete token. |
| `toxic-green` token | **REDIRECT** | Value is fine; the _name_ encodes the wrong intent. | Keep value, treat/comment as "deep strata." |
| Anton / Newsreader fonts | **KEEP** | Structure-from-formlessness + plain recovery voice. Exactly right. | No change. |
| Special Elite font | **REDIRECT** | Good as humble caption; bad as "stamp." | Demote to small captions/labels only. |
| Palette (green/teal/gold/ember) + parallax + vignette + `poster-rise` stagger | **KEEP** | Depth, warmth-from-cold, calm staggered rise — all on-philosophy. | Keep; lean harder into them. |

---

## 5. Migration order (low-risk → high-impact)

1. **Strip the artifacts.** Remove `FilmGrain` + `Scanlines` globally. Delete
   `--color-film-grain`. (Instant de-camp, zero layout risk.)
2. **Retire Creepster.** Repoint `GlowText`, `Hero`, `ComingSoon` headlines to
   Anton; soften the glow classes.
3. **Reverse the motion.** `DrippingSlime` → rising motes; retune
   `BubblingOoze` slower/deeper.
4. **Reframe the copy.** Schedule, ComingSoon, Hero ribbon — Big Book register,
   no reel/rating/TBA winks.
5. **Replace the texture kit.** Swap flyer utilities for strata/depth-grain.

Each step is independently shippable and leaves the site coherent.
