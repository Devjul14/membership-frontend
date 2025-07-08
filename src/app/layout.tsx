import './globals.css';
import { ReactNode } from 'react';
import { Providers } from '@/lib/wagmi';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
