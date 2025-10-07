import { createBrowserRouter, replace } from 'react-router';
import App from '../App';
import DebtsPage from '../views/debts/DebtsPage';
import SplitsPage from '../views/splits/SplitsPage';
import AccountPage from '@/views/account/AccountPage';
import TabsWrapper from './TabsWrapper';
import CreateSplitPage from '@/views/splits/CreateSplitPage';
import SplitPage from '@/views/splits/SplitPage';

export const router = createBrowserRouter([
  {
    index: true,
    loader: async () => replace('/debts'),
  },
  {
    Component: App,
    children: [
      {
        Component: TabsWrapper,
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
      {
        path: '/splits/create',
        Component: CreateSplitPage,
      },
      {
        path: '/splits/:id',
        Component: SplitPage,
      },
    ],
  },
]);
