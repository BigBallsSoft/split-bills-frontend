import { createBrowserRouter, replace } from 'react-router';
import App from '../App';
import DebtsPage from '../views/debts/DebtsPage';
import FeesPage from '../views/fees/FeesPage';

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
        path: '/fees',
        Component: FeesPage,
      },
    ],
  },
]);
