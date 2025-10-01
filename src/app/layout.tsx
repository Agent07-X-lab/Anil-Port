import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MouseSpotlight } from '@/components/ui/mouse-spotlight';

export const metadata: Metadata = {
  title: "Modern Portfolio",
  description: "Anil Kumar Sahu - Full-Stack Developer & UI/UX Designer. Crafting Digital Experiences Through Code & Design.",
  openGraph: {
    title: "Modern Portfolio",
    description: "A stunning, modern portfolio showcasing the skills and projects of Anil Kumar Sahu, a Full-Stack Developer & UI/UX Designer.",
    url: 'https://your-domain.com', // To be updated with actual domain
    siteName: 'Modern Portfolio',
    images: [
      {
        url: 'https://your-domain.com/og-image.png', // To be updated
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
   twitter: {
    card: 'summary_large_image',
    title: "Modern Portfolio",
    description: "A stunning, modern portfolio showcasing the skills and projects of Anil Kumar Sahu, a Full-Stack Developer & UI/UX Designer.",
    // creator: '@yourtwitterhandle', // To be updated
    images: ['https://your-domain.com/og-image.png'], // To be updated
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@400;500;600&family=Source+Code+Pro:wght@400&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased relative')} suppressHydrationWarning>
        <MouseSpotlight />
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
