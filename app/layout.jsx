import "./globals.css";

export const metadata = {
  title: "FarmaGuia — Recomendação Farmacêutica",
  description: "Sistema de recomendação de medicamentos por sintomas para farmacêuticos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
