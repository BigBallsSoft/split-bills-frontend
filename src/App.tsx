import { useEffect, useRef } from 'react';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { AppRoot, Snackbar, Spinner } from '@telegram-apps/telegram-ui';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { Outlet, useNavigate } from 'react-router';
import { setTgTheme } from './helpers/theme';
import { type RootStateStore } from './store';
import { useSelector } from 'react-redux';
import { useLoginMutation } from './store/api/user.api';
import { useActions } from './helpers/use-actions';
import { FaCircleInfo } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const appBgElement = useRef<HTMLDivElement>(null);
  const { tgWebAppData, tgWebAppStartParam } = useLaunchParams();
  const { token } = useSelector((state: RootStateStore) => state.user);
  const { isToastOpen, toastMessage, duration } = useSelector(
    (state: RootStateStore) => state.toast
  );
  const { login: loginAction, hideToast } = useActions();
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
    if (tgWebAppStartParam) {
      navigate(tgWebAppStartParam.replaceAll('_', '/'));
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
        {isLoading && (
          <Spinner
            size="l"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        )}
        {isError && <div className="m-4">{t('Error during authentification')}</div>}
        {isSuccess && token && <Outlet />}
        {isToastOpen && (
          <Snackbar
            before={<FaCircleInfo />}
            onClose={hideToast}
            description={toastMessage}
            duration={duration}
          />
        )}
      </div>
    </AppRoot>
  );
}
