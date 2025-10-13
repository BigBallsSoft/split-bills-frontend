import { Button, FixedLayout, Headline } from '@telegram-apps/telegram-ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

function HeaderBack({ title, backTitle }: { title: ReactNode; backTitle?: ReactNode }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <FixedLayout
      vertical="top"
      className="px-6 py-3 flex justify-center bg-primary relative z-10"
    >
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 cursor-pointer">
        <Button
          mode="plain"
          onClick={() => navigate(-1)}
        >
          {backTitle || t('Cancel')}
        </Button>
      </div>
      <Headline weight="2">{title}</Headline>
    </FixedLayout>
  );
}

export default HeaderBack;
