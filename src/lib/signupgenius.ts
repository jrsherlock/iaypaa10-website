// Live slot availability for the hospitality suite sign-up.
//
// SignUpGenius has no free public API; the sign-up page itself loads its data
// from this internal endpoint (no auth required). It is undocumented, so the
// fetch is defensive end to end: any failure — network, shape change, removal
// of the endpoint — returns null and the /hospitality page renders the static
// lineup without availability badges. Degrades, never breaks.
//
// The response includes signers' full names. Per Tradition 11 nothing but the
// claimed/open boolean may leave this module.

import { HOSPITALITY_SIGNUP_URL_ID } from "@/lib/constants";

const ENDPOINT = "https://www.signupgenius.com/SUGboxAPI.cfm?go=s.getSignupInfo";

/** slotItemId -> claimed (qty taken >= qty wanted) */
export type SlotAvailability = ReadonlyMap<number, boolean>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function fetchSlotAvailability(): Promise<SlotAvailability | null> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ forSignUpView: true, urlid: HOSPITALITY_SIGNUP_URL_ID }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;

    const json: unknown = await res.json();
    if (!isRecord(json) || !isRecord(json.DATA) || !isRecord(json.DATA.slots)) {
      return null;
    }

    const availability = new Map<number, boolean>();
    for (const slot of Object.values(json.DATA.slots)) {
      if (!isRecord(slot) || !Array.isArray(slot.items)) continue;
      for (const item of slot.items) {
        if (!isRecord(item)) continue;
        const id = Number(item.slotitemid);
        if (!Number.isFinite(id) || id <= 0) continue;
        const qty = Number(item.qty) || 1;
        const taken = Number(item.qtyTaken) || 0;
        availability.set(id, taken >= qty);
      }
    }
    return availability.size > 0 ? availability : null;
  } catch {
    return null;
  }
}
