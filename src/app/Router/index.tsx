import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loading from '@views/components/Loading';

import { routes } from './routes';

const Home = lazy(() => import('@views/pages/Home'));
const Product = lazy(() => import('@views/pages/Product'));

const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.createProduct} element={<Product />} />
        <Route
          path={`${routes.editProduct}/:productId`}
          element={<Product />}
        />
      </Routes>
    </Suspense>
  );
};

export default Router;
