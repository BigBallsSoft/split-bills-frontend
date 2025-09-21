import { IconContainer, Tabbar } from '@telegram-apps/telegram-ui';
import { useLocation, useNavigate } from 'react-router';

export default function Tabs() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      path: '/debts',
      text: 'Debts',
    },
    {
      path: '/fees',
      text: 'Fees',
    },
  ];

  return (
    <Tabbar>
      {tabs.map(({ path, text }) => (
        <Tabbar.Item
          key={path}
          text={text}
          selected={pathname.startsWith(path)}
          onClick={() => navigate(path)}
        >
          <IconContainer />
        </Tabbar.Item>
      ))}
    </Tabbar>
  );
}
