/**
 * Posts a waitlist sign-up to `/api/waitlist` (see `api/waitlist.js`).
 * Resolves on success; rejects with a message suitable for showing the user.
 */
export async function submitWaitlist(entry) {
  let response;
  try {
    response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...entry, page: window.location.pathname }),
    });
  } catch {
    throw new Error("We couldn't reach the server. Check your connection and try again.");
  }

  if (response.ok) return;

  const { error } = await response.json().catch(() => ({}));
  throw new Error(error || "Something went wrong. Please try again in a moment.");
}
