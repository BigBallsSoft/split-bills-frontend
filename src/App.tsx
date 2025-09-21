import { useEffect, useRef } from 'react';
import {
  setMiniAppHeaderColor,
  setMiniAppBackgroundColor,
  init,
  mountMiniAppSync,
} from '@telegram-apps/sdk-react';

import Tabs from './router/Tabs';
import { AppRoot } from '@telegram-apps/telegram-ui';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { Outlet } from 'react-router';
import Color from 'color';

export default function App() {
  const appBgElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    init();
    mountMiniAppSync();
    if (appBgElement.current) {
      const appHeaderColor = window
        .getComputedStyle(appBgElement.current)
        .getPropertyValue('--tgui--bg_color');
      const appBottomColor = window
        .getComputedStyle(appBgElement.current)
        .getPropertyValue('--tgui--surface_primary');

      if (appBottomColor) {
        setMiniAppBackgroundColor(new Color(appBottomColor).hex());
      }
      if (appHeaderColor) {
        setMiniAppHeaderColor(appHeaderColor);
      }
    }
  }, []);

  return (
    <AppRoot>
      <div
        ref={appBgElement}
        id="app-bg"
      >
        <Outlet />
        <Tabs />
      </div>
    </AppRoot>
  );
}
