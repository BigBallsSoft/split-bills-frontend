// import { useEffect, useState } from 'react'
// import {useLaunchParams, setMiniAppBackgroundColor, init, mountMiniAppSync, openQrScanner} from '@telegram-apps/sdk-react'

import Tabs from './router/Tabs';
import { AppRoot } from '@telegram-apps/telegram-ui';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { Outlet } from 'react-router';

export default function App() {
  // const { tgWebAppData } = useLaunchParams();
  // const [user, setUser] = useState<unknown>(null);

  // useEffect(() => {
  //   init();
  //   mountMiniAppSync()
  //   setMiniAppBackgroundColor('#ffffff');
  //   if (tgWebAppData && tgWebAppData.user) {
  //     setUser(tgWebAppData.user);
  //   }
  // }, []);

  return (
    <AppRoot>
      <Outlet />
      <Tabs />
    </AppRoot>
  );
}
