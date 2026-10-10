import './globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#090909',
};

export const metadata = {
  title: 'VELOCITY X — Feel the Motion. Control the Experience.',
  description: 'Premium automotive landing page featuring scroll-synchronized kinetics, real-time telemetry, and high-performance frontend motion design.',
  keywords: ['automotive', 'velocity x', 'scroll-animation', 'gsap', 'nextjs', 'tailwind-css', 'motion-design'],
  authors: [{ name: 'Velocity X Engineering' }],
  openGraph: {
    title: 'VELOCITY X — Feel the Motion. Control the Experience.',
    description: 'Premium automotive landing page with scroll-synchronized animations.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark bg-[#090909] text-white">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#090909] text-white antialiased selection:bg-[#D6FF5F] selection:text-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
