import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'

// Pages
import Home from './pages/user/home/Home'
import Login from './pages/user/login/Login'
import Register from './pages/user/register/Register'
import Detail from './pages/user/detail/Detail'
import Cart from './pages/user/cart/Cart'
import Profile from './pages/user/profile/Profile'

// Global libs 
import 'remixicon/fonts/remixicon.css'

// Config Router
import { Routes, Route, Navigate, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

// Config history
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import Template from './templates/Template';
import { store } from './redux/configStore';
import Products from './pages/user/products/Products';
export const history = createBrowserHistory();



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path='' element={<Template />}>
          <Route index element={<Home />}></Route>
          <Route path='products' element={<Products />}></Route>
          <Route path='detail' element={<Detail />}>
            <Route path=':id' element={<Detail />}></Route>
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='*' element={<Navigate to='/' />}></Route>
        </Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='register' element={<Register />}></Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);

