export const metadata = {
  title: "Águias Vitrine",
  description: "Vitrine premium de produtos afiliados",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
