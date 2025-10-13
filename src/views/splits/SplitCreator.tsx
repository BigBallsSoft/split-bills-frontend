import type { SplitExtended } from '@/typings/splits';
import { Avatar, Button, Divider, Title } from '@telegram-apps/telegram-ui';
import { openTelegramLink } from '@telegram-apps/sdk-react';

function SplitCreator({ split }: { split: SplitExtended }) {
  return (
    <div className="mx-5 mb-5">
      <div className="mb-5">
        <Title
          weight="2"
          level="3"
        >
          Creator
        </Title>
      </div>
      <div className="flex justify-between items-center gap-4 my-2">
        <Avatar
          size={40}
          src={split.creator?.avatar}
          acronym={split.creator.name
            .split(' ')
            .map((word) => word[0])
            .join('')}
        />
        <div className="me-auto">{split.creator.name}</div>
        <Button
          size="s"
          onClick={() => openTelegramLink(`https://t.me/${split.creator.username}`)}
        >
          Chat
        </Button>
      </div>
      <div className="ms-10">
        <Divider />
      </div>
    </div>
  );
}

export default SplitCreator;
