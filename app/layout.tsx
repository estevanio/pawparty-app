import '@/app/ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Welcome to Paw Party 🐾</title>
      <body>{children}</body>
    </html>
  );
}
