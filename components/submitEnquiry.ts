/** Payload accepted by /api/contact. Only name + phone are required. */
export type EnquiryPayload = {
  name: string;
  phone?: string;
  email?: string;
  roomType?: string;
  houseType?: string;
  project?: string;
  service?: string;
  message?: string;
  /** Honeypot field — left empty by real users. */
  company?: string;
  /** Which form this came from, shown in the mail subject. */
  source: string;
};

/**
 * Posts an enquiry to the mail API route.
 * Throws an Error carrying a user-facing message when it fails.
 */
// Baked in at build time. Empty string = same-origin (Vercel/Node deploy);
// full URL like https://xxx.vercel.app = static build hitting the Vercel API.
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

export async function submitEnquiry(payload: EnquiryPayload) {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Network error. Please check your connection and retry.");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      typeof data?.error === "string"
        ? data.error
        : "Something went wrong. Please try again."
    );
  }
  return data;
}

/** Reads a form into an EnquiryPayload, keeping only fields that were filled. */
export function formToPayload(
  form: HTMLFormElement,
  source: string
): EnquiryPayload {
  const fd = new FormData(form);
  const get = (key: string) => (fd.get(key) as string | null)?.trim() || undefined;
  return {
    name: get("name") ?? "",
    phone: get("phone"),
    email: get("email"),
    roomType: get("roomType"),
    houseType: get("houseType"),
    project: get("project"),
    service: get("service"),
    message: get("message"),
    company: get("company"),
    source,
  };
}
