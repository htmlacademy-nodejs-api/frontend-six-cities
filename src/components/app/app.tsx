import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import Favorites from '../../pages/favorites/favorites';
import Property from '../../pages/property/property';
import AddOffer from '../../pages/add-offer/add-offer';
import EditOffer from '../../pages/edit-offer/edit-offer';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import history from '../../history';
import Header from '../header/header';

const App = (): JSX.Element => (
  <HistoryRouter history={history}>
    <Routes>
      <Route element={<Header />}>
        <Route index element={<Main />} />
        <Route path={`${AppRoute.Property}/:id`} element={<Property />} />
        <Route
          path={`${AppRoute.Property}/:id${AppRoute.Edit}`}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login}>
              <EditOffer />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Add}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login}>
              <AddOffer />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login}>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Root}>
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Register}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Root}>
              <Register />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </HistoryRouter>
);

export default App;
