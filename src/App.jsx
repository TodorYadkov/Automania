import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { CarContextProvider } from './core/contexts/CarContext.jsx';
import { AuthContextProvider } from './core/contexts/AuthContext.jsx';

import { clientRoutes } from './core/environments/clientRoutes.js';

import { RouteGuardPublic } from './core/guards/RouteGuardPublic.jsx';
import { RoutGuardAuthenticated } from './core/guards/RouteGuardAuthenticated.jsx';

import Layout from './components/layout/Layout.jsx';
import Loader from './components/loader/Loader.jsx';

import Login from './pages/auth/login/Login.jsx';
import AddCar from './pages/cars/add_car/AddCar.jsx';
import EditCar from './pages/cars/edit_car/EditCar.jsx';
import ListCar from './pages/cars/list_car/ListCar.jsx';
import NotFound404 from './pages/notFound/NotFound404.jsx';

const Register = lazy(() => import('./pages/auth/register/Register.jsx'));

function App() {

  return (
    <AuthContextProvider>
      <CarContextProvider>
        <Layout>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path={clientRoutes.main} element={<Navigate to={clientRoutes.catalog} replace={true} />} />
              <Route path={clientRoutes.catalog} element={<ListCar />} />

              {/* Public routes */}
              <Route element={<RouteGuardPublic />}>
                <Route path={clientRoutes.register} element={<Register />} />
                <Route path={clientRoutes.login} element={<Login />} />
              </Route>

              {/* Private routes */}
              <Route element={<RoutGuardAuthenticated />}>
                <Route path={clientRoutes.addCar} element={<AddCar />} />
                <Route path={clientRoutes.editCarMainRoute} element={<EditCar />} />
              </Route>

              <Route path={clientRoutes.notFound404} element={<NotFound404 />} />
            </Routes>
          </Suspense>
        </Layout>
      </CarContextProvider>
    </AuthContextProvider >
  );
}

export default App