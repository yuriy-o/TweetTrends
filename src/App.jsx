import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { PacmanLoader } from 'react-spinners';
// import dotenv from 'dotenv';

import { SharedLayout } from './components/SharedLayout/SharedLayout';

const Home = lazy(() => import('./pages/Home/Home'));
const Tweets = lazy(() => import('./pages/Tweets/Tweets'));

// dotenv.config();

export const App = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <PacmanLoader color="#502f9d" size={40} />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="tweets" element={<Tweets />} />

          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
