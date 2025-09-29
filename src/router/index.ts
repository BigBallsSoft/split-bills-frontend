import { createBrowserRouter, replace } from 'react-router';
import App from '../App';
import DebtsPage from '../views/debts/DebtsPage';
import SplitsPage from '../views/splits/SplitsPage';
import AccountPage from '@/views/account/AccountPage';

export const router = createBrowserRouter([
  {
    index: true,
    loader: async () => replace('/debts'),
  },
  {
    Component: App,
    children: [
      {
        path: '/debts',
        Component: DebtsPage,
      },
      {
        path: '/splits',
        Component: SplitsPage,
      },
      {
        path: '/account',
        Component: AccountPage,
      },
    ],
  },
]);
