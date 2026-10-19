import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Noria — L’IA, dans le bon sens.',
  description:
    'Noria accompagne les entreprises dans leurs projets d’intelligence artificielle : stratégie, automatisation et formation. Des solutions utiles, pensées pour vos équipes.',
  icons: { icon: '/assets/favicon.svg' },
};
export const viewport: Viewport = { themeColor: '#ffffff' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="js">
      <body>{children}</body>
    </html>
  );
}
