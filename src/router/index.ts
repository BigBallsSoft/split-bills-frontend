import { createBrowserRouter } from 'react-router';
import App from '../App';
import DebtsPage from '../views/debts/DebtsPage';
import FeesPage from '../views/fees/FeesPage';

export const router = createBrowserRouter([
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
