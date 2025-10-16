import HeaderBack from '@/components/HeaderBack';
import { useActions } from '@/helpers/use-actions';
import { useGetSplitByIdQuery } from '@/store/api/splits.api';
import {
  Button,
  Caption,
  Cell,
  Divider,
  Image,
  Spinner,
  Text,
  Title,
} from '@telegram-apps/telegram-ui';
import { FiCopy } from 'react-icons/fi';
import { TbWorld } from 'react-icons/tb';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { copyTextToClipboard, openLink, useLaunchParams } from '@telegram-apps/sdk-react';
import SplitCreatorActions from './SplitCreatorActions';
import SplitDebtors from './SplitDebtors';
import SplitCreator from './SplitCreator';
import SplitDebtorActions from './SplitDebtorActions';
import { useTranslation } from 'react-i18next';

function SplitPage() {
  const { t } = useTranslation();
  const params = useParams();
  const { tgWebAppData } = useLaunchParams();

  const { showToast } = useActions();
  const { data, isLoading, isError } = useGetSplitByIdQuery(Number(params.id) || 0);

  useEffect(() => {
    if (isError) {
      showToast({ message: t('Error fetching split') });
    }
  }, [isLoading]);

  const isCreator = useMemo(
    () => data?.creator?.telegramId === tgWebAppData?.user?.id,
    [data, tgWebAppData]
  );

  const debtor = useMemo(
    () => data?.debtors.find((d) => d.user?.telegramId === tgWebAppData?.user?.id),
    [data, tgWebAppData]
  );

  const handleCardNumberClick = () => {
    if (data?.creator?.cardNumber && !isCreator) {
      copyTextToClipboard(data.creator.cardNumber);
      showToast({ message: t('Card number copied to clipboard') });
    }
  };

  const openExternalLink = (eripUrl: string) => {
    if (openLink.isAvailable()) {
      openLink(eripUrl);
    }
  };

  const handleCardEripClick = () => {
    if (data?.creator?.cardErip && data.creator.bankOperationLink && !isCreator) {
      copyTextToClipboard(data.creator.cardErip);
      const eripUrl = data.creator.bankOperationLink.url;
      showToast({
        message: (
          <>
            <Text>{t('Card erip copied to clipboard')}</Text>
            <Button
              className="mt-3"
              size="s"
              stretched
              onClick={() => openExternalLink(eripUrl)}
            >
              {t('Pay now')}
            </Button>
          </>
        ),
        duration: 10000,
      });
    }
  };

  return (
    <div className="flex flex-col pt-14 pb-6">
      <HeaderBack
        title={t('Split')}
        backTitle={t('Back')}
      />
      {isLoading && (
        <Spinner
          size="m"
          className="mx-auto mt-6"
        />
      )}
      {data && (
        <>
          <div className="m-4 mt-2 text-center">
            <Title weight="2">{data.name}</Title>
          </div>
          {data.description && (
            <div className="mx-4 mb-4">
              <Text>{data.description}</Text>
            </div>
          )}
          <div className="mx-4 mb-3 text-right text-subtitle">
            <Caption>
              {dayjs(data.creationDate).isBefore(dayjs().startOf('day').add(1, 'day'))
                ? dayjs(data.creationDate).format('HH:mm')
                : dayjs(data.creationDate).format('HH:mm DD.MM.YYYY')}
            </Caption>
          </div>
          <Divider />
          <div className="m-5 flex flex-col gap-2">
            <Title
              weight="2"
              level="3"
            >
              {t('Credentials')}
            </Title>
            <Cell
              className="bg-primary px-4 rounded-2xl mt-2"
              after={!isCreator && <FiCopy size={40} />}
              before={
                data.creator.bankOperationLink && (
                  <Image
                    size={48}
                    className="img-contain img-outer my-3 p-2"
                    src={data.creator.bankOperationLink.imageUrl}
                  />
                )
              }
              onClick={handleCardNumberClick}
            >
              {data.creator.bankOperationLink?.name}
              <div className="ml-2 inline">
                <Caption className="text-subtitle">{t('Card')}</Caption>
              </div>
              <div className="mt-2 text-subtitle">{data.creator.cardNumber}</div>
            </Cell>
            <Cell
              className="bg-primary px-4 rounded-2xl"
              after={!isCreator && <TbWorld size={40} />}
              before={
                data.creator.bankOperationLink && (
                  <Image
                    size={48}
                    className="img-contain img-outer my-3 p-2"
                    src={data.creator.bankOperationLink.imageUrl}
                  />
                )
              }
              onClick={handleCardEripClick}
            >
              {data.creator.bankOperationLink?.name}
              <div className="ml-2 inline">
                <Caption className="text-subtitle">{t('ERIP')}</Caption>
              </div>
              <div className="mt-2 text-subtitle">{data.creator.cardErip}</div>
            </Cell>
          </div>
          {!isCreator && <SplitCreator split={data} />}
          <SplitDebtors
            split={data}
            isCreator={isCreator}
          />
          {isCreator ? (
            <SplitCreatorActions split={data} />
          ) : (
            debtor && (
              <SplitDebtorActions
                split={data}
                debtor={debtor}
              />
            )
          )}
        </>
      )}
    </div>
  );
}

export default SplitPage;
