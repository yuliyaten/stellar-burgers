import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { IngredientDetails, Modal, OrderInfo } from '@components';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredientsThunk } from '../../services/slices/ingredientsSlice';
import { getUserQueryThunk } from '../../services/slices/userSlice';
import { getCookie } from '../../utils/cookie';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';

const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeModalHandler = () => navigate(-1);
  const accessToken = getCookie('accessToken');

  useEffect(() => {
    dispatch(getIngredientsThunk());
    if (accessToken) dispatch(getUserQueryThunk());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route element={<ProtectedRoute onlyUnAuth />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute onlyUnAuth={false} />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='' onClose={closeModalHandler}>
                <OrderInfo />
              </Modal>
            }
          />
        </Route>

        <Route
          path='/feed/:number'
          element={
            <Modal title='' onClose={closeModalHandler}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={closeModalHandler}>
              <IngredientDetails />
            </Modal>
          }
        />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='' onClose={closeModalHandler}>
                <OrderInfo />
              </Modal>
            }
          />

          <Route
            path='/feed/:number'
            element={
              <Modal title='' onClose={closeModalHandler}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={closeModalHandler}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
