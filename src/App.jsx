import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { SharedLayout } from './components/SharedLayout/SharedLayout';

const Home = lazy(() => import('./pages/Home/Home'));
const Tweets = lazy(() => import('./pages/Tweets/Tweets'));

export const App = () => {
  return (
    <Suspense fallback={<>Page is loading...</>}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="tweets" element={<Tweets />} />

          {/* <Route path="movies" element={<Movies />} />

          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route> */}
        </Route>
      </Routes>
    </Suspense>
  );
};
