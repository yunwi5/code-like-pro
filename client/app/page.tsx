import { NextPage } from 'next';
import { AppProperty } from '@/constants';
import HomeMain from '@/components/home/HomeMain';

export const metadata = {
  title: `Home | ${AppProperty.APP_NAME}`,
  description: `Home page of ${AppProperty.APP_NAME} where users can see detailed information about programming exercises on the website.`,
};

const Home: NextPage = () => {
  return (
    <main>
      <HomeMain />
    </main>
  );
};

export default Home;
