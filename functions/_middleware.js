export async function onRequest(context) {

  // ─── CHANGE THESE ───────────────────────────────
  const USERNAME = "qfzdemo";
  const PASSWORD = "qfzdemo@123";
  // ────────────────────────────────────────────────

  const authHeader = context.request.headers.get("Authorization");

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const colonIndex = decoded.indexOf(":");
      const user = decoded.slice(0, colonIndex);
      const pass = decoded.slice(colonIndex + 1);
      if (user === USERNAME && pass === PASSWORD) {
        return context.next();
      }
    }
  }

  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Protected Site"',
      "Content-Type": "text/plain",
    },
  });
}
