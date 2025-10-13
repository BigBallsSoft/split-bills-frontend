import { Tabbar } from '@telegram-apps/telegram-ui';
import { useLocation, useNavigate } from 'react-router';
import { FaHandHoldingDollar } from 'react-icons/fa6';
import { MdAttachMoney, MdAccountCircle } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

export default function Tabs() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const tabs = [
    {
      path: '/debts',
      text: t('Debts'),
      icon: <MdAttachMoney size={22} />,
    },
    {
      path: '/splits',
      text: t('Splits'),
      icon: <FaHandHoldingDollar size={22} />,
    },
    {
      path: '/account',
      text: t('Account'),
      icon: <MdAccountCircle size={22} />,
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
