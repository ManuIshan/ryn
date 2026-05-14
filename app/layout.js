'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import GradualBlur from '@/src/component/GradualBlur';
import ScrollToTop from '@/components/ScrollToTop';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Melodrama (CORRECT thin elegant font) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Melodrama:wght@300;400;500&display=swap"
          rel="stylesheet"
        />

        {/* ✅ Meow Script */}
         <link
          href="https://fonts.cdnfonts.com/css/bdogrotesk"
          rel="stylesheet"
        />

        {/* ✅ Satoshi */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        {children}
        <GradualBlur preset="page-footer" height="4rem" padding="0rem" />
        <ScrollToTop/>
      </body>
    </html>
  );
}