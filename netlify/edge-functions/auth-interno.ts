import type { Context } from "https://edge.netlify.com";

const USERNAME = "logosofia";
const PASSWORD = "nucleos2026";

export default async function handler(request: Request, context: Context) {
  const auth = request.headers.get("authorization");

  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic") {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(":");
      if (user === USERNAME && pass === PASSWORD) {
        return context.next();
      }
    }
  }

  return new Response("Acesso restrito", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Acesso Interno - Fundação Logosófica", charset="UTF-8"',
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export const config = {
  path: "/interno/*",
};
