import { useEffect, useRef } from 'react';
import Tabs from './router/Tabs';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { AppRoot, Spinner } from '@telegram-apps/telegram-ui';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { Outlet } from 'react-router';
import { setTgTheme } from './helpers/theme';
import { type RootStateStore } from './store';
import { useSelector } from 'react-redux';
import { useLoginMutation } from './store/api/user.api';
import { useActions } from './helpers/use-actions';

export default function App() {
  const appBgElement = useRef<HTMLDivElement>(null);
  const { tgWebAppData } = useLaunchParams();
  const { token } = useSelector((state: RootStateStore) => state.user);
  const { login: loginAction } = useActions();
  const [login, { isLoading, isError, isSuccess, data }] = useLoginMutation();

  useEffect(() => {
    setTgTheme(appBgElement.current);
    if (tgWebAppData?.user) {
      const { user } = tgWebAppData;

      const name = `${user.first_name} ${user.last_name}`.trim();
      login({
        name,
        username: user.username,
        avatar: user.photo_url,
        telegramId: user.id,
      });
    }
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      loginAction({ token: data.accessToken });
    }
  }, [isLoading]);

  return (
    <AppRoot>
      <div
        ref={appBgElement}
        id="app-bg"
      >
        {isLoading && <Spinner size="l" />}
        {isError && <div>Error during authentification</div>}
        {isSuccess && token && (
          <>
            <Outlet />
            <Tabs />
          </>
        )}
      </div>
    </AppRoot>
  );
}
