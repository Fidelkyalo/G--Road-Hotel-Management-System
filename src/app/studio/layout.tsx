import { metadata as sanityMetadata } from 'next-sanity/studio';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...sanityMetadata,
  icons: {
    icon: '/images/LOGO.png',
  },
};


export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, height: '100vh' }}>{children}</body>
    </html>
  );
}
