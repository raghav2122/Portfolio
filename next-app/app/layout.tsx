import "../global.css";
import { Inter } from "@next/font/google";
import { Analytics  as VercelAnalytics} from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
  title: {
    default: "JaveRynx",
    template: "%s | javerynx.com",
  },
  description: "Engineer, Developer, and Creator",
  openGraph: {
    title: 'JaveRynx',
    description: 'Portfolio of JaveRynx',
    url: 'https://javerynx.vercel.app/',
    siteName: 'JaveRynx.com',
    images: [
      {
        url: 'https://ibb.co/F6BqKsP', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://ibb.co/J2bzPVR', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Jave_Rynx",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        {children}
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
