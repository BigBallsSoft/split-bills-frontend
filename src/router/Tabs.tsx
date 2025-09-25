import { Tabbar } from '@telegram-apps/telegram-ui';
import { useLocation, useNavigate } from 'react-router';
import { FaHandHoldingDollar } from 'react-icons/fa6';
import { MdAttachMoney } from 'react-icons/md';

export default function Tabs() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      path: '/debts',
      text: 'Debts',
      icon: <MdAttachMoney size={22} />,
    },
    {
      path: '/fees',
      text: 'Fees',
      icon: <FaHandHoldingDollar size={22} />,
    },
  ];

  return (
    <Tabbar>
      {tabs.map(({ path, text, icon }) => (
        <Tabbar.Item
          key={path}
          text={text}
          selected={pathname.startsWith(path)}
          onClick={() => navigate(path)}
        >
          {icon}
        </Tabbar.Item>
      ))}
    </Tabbar>
  );
}
