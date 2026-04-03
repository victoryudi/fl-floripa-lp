import type { Context } from "https://edge.netlify.com";

const PASSWORD = "nucleos2026";
const COOKIE_NAME = "interno_auth";
const TOKEN = "ok";

function getLoginPage(error = false) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Acesso Interno · Logosofia</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', -apple-system, system-ui, sans-serif;
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0D1F33;
      background-image:
        radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,148,28,0.08) 0%, transparent 70%),
        radial-gradient(ellipse 50% 80% at 80% 20%, rgba(27,58,92,0.15) 0%, transparent 60%);
      -webkit-font-smoothing: antialiased;
      padding: 24px;
    }

    .card {
      width: 100%;
      max-width: 380px;
      text-align: center;
    }

    .logo {
      height: 24px;
      width: auto;
      margin: 0 auto 48px;
      opacity: 0.85;
    }

    .orb {
      width: 72px;
      height: 72px;
      margin: 0 auto 32px;
      animation: float 6s ease-in-out infinite;
    }

    .orb img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }

    .label {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      color: rgba(255,255,255,0.35);
      margin-bottom: 28px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    input {
      font-family: inherit;
      font-size: 0.95rem;
      padding: 14px 20px;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 14px;
      background: rgba(255,255,255,0.05);
      color: #fff;
      outline: none;
      transition: border-color 0.25s, background 0.25s;
      text-align: center;
      letter-spacing: 0.08em;
    }

    input::placeholder {
      color: rgba(255,255,255,0.25);
      letter-spacing: 0.04em;
    }

    input:focus {
      border-color: rgba(212,148,28,0.5);
      background: rgba(255,255,255,0.07);
    }

    input.error {
      border-color: rgba(220,80,60,0.6);
      animation: shake 0.4s ease;
    }

    button {
      font-family: inherit;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 14px 24px;
      border: none;
      border-radius: 14px;
      background: linear-gradient(135deg, #D4941C 0%, #B07316 100%);
      color: #fff;
      cursor: pointer;
      transition: transform 0.15s, box-shadow 0.25s;
      letter-spacing: 0.03em;
    }

    button:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 24px rgba(212,148,28,0.25);
    }

    button:active {
      transform: translateY(0);
    }

    .error-msg {
      font-size: 0.78rem;
      color: rgba(220,80,60,0.85);
      margin-top: 4px;
      height: 20px;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .card { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
  </style>
</head>
<body>
  <div class="card">
    <img src="/resources/logo.png" alt="Logosofia" class="logo">
    <div class="orb"><img src="/resources/LOG_Sol.png" alt=""></div>
    <p class="label">Acesso interno</p>
    <form method="POST">
      <input type="password" name="password" placeholder="Senha de acesso" autofocus autocomplete="current-password">
      <button type="submit">Acessar</button>
    </form>
    <p class="error-msg">${error ? "Senha incorreta" : ""}</p>
  </div>
</body>
</html>`;
}

export default async function handler(request: Request, context: Context) {
  // Check for valid session cookie
  const cookies = request.headers.get("cookie") || "";
  const hasAuth = cookies.split(";").some(
    (c) => c.trim() === `${COOKIE_NAME}=${TOKEN}`
  );

  if (hasAuth) {
    return context.next();
  }

  // Handle login form submission
  if (request.method === "POST") {
    const form = await request.formData();
    const password = form.get("password");

    if (password === PASSWORD) {
      const response = await context.next();
      const newResponse = new Response(response.body, response);
      newResponse.headers.set(
        "set-cookie",
        `${COOKIE_NAME}=${TOKEN}; Path=/interno; HttpOnly; SameSite=Lax; Max-Age=86400`
      );
      return newResponse;
    }

    return new Response(getLoginPage(true), {
      status: 401,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Show login page
  return new Response(getLoginPage(), {
    status: 401,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export const config = {
  path: "/interno/*",
};
