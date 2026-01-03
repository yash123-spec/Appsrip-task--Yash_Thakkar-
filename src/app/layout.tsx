import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Frontend Assignment – Appscrip | Product Listing Page",
  description: "Build a responsive product listing page using Next.js, HTML, and CSS as part of Appscrip frontend assignment.",
  keywords: "frontend assignment, product listing, next.js, responsive design, appscrip, e-commerce",
  authors: [{ name: "Appscrip" }],
  robots: "index, follow",
  openGraph: {
    title: "Frontend Assignment – Appscrip",
    description: "Build a responsive product listing page using Next.js, HTML, and CSS as part of Appscrip frontend assignment.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frontend Assignment – Appscrip",
    description: "Build a responsive product listing page using Next.js, HTML, and CSS as part of Appscrip frontend assignment.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://appscrip-task.netlify.app" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Appscrip Frontend Assignment",
              "description": "Build a responsive product listing page using Next.js, HTML, and CSS as part of Appscrip frontend assignment.",
              "url": "https://appscrip-task-netlify.app",
              "mainEntity": {
                "@type": "ItemList",
                "name": "Products",
                "description": "Product listing for frontend assignment"
              }
            })
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
