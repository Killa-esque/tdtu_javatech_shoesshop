// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Navigate, Outlet, Route } from 'react-router-dom';
// import { isLoggedIn } from '../auth';

// const PrivateRoute = ({ element, ...rest }) => {
//   const isAuthenticated = isLoggedIn();

//   return isAuthenticated ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/login" />
//   );
// };

// export default PrivateRoute
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../auth';

const PrivateRouteMiddleware = (Component) => {
  return (props) => {
    const isAuthenticated = isLoggedIn();

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };
};

export default PrivateRouteMiddleware;
