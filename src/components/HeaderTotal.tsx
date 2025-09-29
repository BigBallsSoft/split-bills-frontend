import { useLaunchParams } from '@telegram-apps/sdk-react';
import { Avatar, FixedLayout, LargeTitle } from '@telegram-apps/telegram-ui';

function HeaderTotal({ title }: { title: string }) {
  const { tgWebAppData } = useLaunchParams();

  return (
    <FixedLayout
      vertical="top"
      className="px-6 py-3 flex justify-between bg-primary"
    >
      <Avatar
        size={40}
        src={tgWebAppData?.user?.photo_url}
      />
      <LargeTitle
        weight="2"
        plain
      >
        {title}
      </LargeTitle>
    </FixedLayout>
  );
}

export default HeaderTotal;
