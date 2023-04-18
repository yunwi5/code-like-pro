import { Red_Hat_Display, Red_Hat_Mono } from 'next/font/google';

export const redHatDisplay = Red_Hat_Display({
  //   weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-red-hat-display',
  display: 'swap',
});

export const redHatMono = Red_Hat_Mono({
  //   weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-red-hat-mono',
  display: 'swap',
});
