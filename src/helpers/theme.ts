import {
  setMiniAppHeaderColor,
  setMiniAppBackgroundColor,
  init,
  mountMiniAppSync,
} from '@telegram-apps/sdk-react';
import Color from 'color';
export const setTgTheme = (appBgElement: HTMLDivElement | null) => {
  init();
  mountMiniAppSync();
  if (appBgElement) {
    const appHeaderColor = window
      .getComputedStyle(appBgElement)
      .getPropertyValue('--tgui--surface_primary');
    const appBottomColor = window
      .getComputedStyle(appBgElement)
      .getPropertyValue('--tgui--surface_primary');

    if (appBottomColor) {
      setMiniAppBackgroundColor(new Color(appBottomColor).hex());
    }
    if (appHeaderColor) {
      setMiniAppHeaderColor(new Color(appHeaderColor).hex());
    }
  }
};
