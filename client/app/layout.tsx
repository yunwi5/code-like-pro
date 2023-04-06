import '@/styles/global.scss';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/utils/ScrollToTop';
import Header from '@/components/layout/Header';
import Providers from '@/components/Providers';

export const metadata = {
  title: 'Code Like Pro',
  description:
    'A practice website for programming students where they create their own exercises, solve exercises from other programmers, and showcase their solutions. ',
  keywords:
    'programming, practice, exercises, problem solving, creative thinking, code, python, java, javascript, c++, c',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Header />
        <Providers>{children}</Providers>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
};

export default RootLayout;
