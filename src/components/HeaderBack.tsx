import { Button, FixedLayout, Headline } from '@telegram-apps/telegram-ui';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';

function HeaderBack({ title }: { title: ReactNode }) {
  const navigate = useNavigate();

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
          Cancel
        </Button>
      </div>
      <Headline weight="2">{title}</Headline>
    </FixedLayout>
  );
}

export default HeaderBack;
