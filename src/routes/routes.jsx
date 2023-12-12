import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Detail from '../Pages/Detail';
import CreateMenu from '../Pages/CreateMenu';
import Edit from '../Pages/Edit';
import ProtectedRoute from '../hoc/ProtectedRoute';
import AuthRoute from '../hoc/AuthRoute';

export const routes = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  {
    path: '/detail/:id',
    element: (
      <ProtectedRoute>
        <Detail />
      </ProtectedRoute>
    ),
  },
  {
    path: '/create-menu',
    element: (
      <ProtectedRoute>
        <CreateMenu />
      </ProtectedRoute>
    ),
  },
  {
    path: '/edit/:id',
    element: (
      <ProtectedRoute>
        <Edit />
      </ProtectedRoute>
    ),
  },
];
