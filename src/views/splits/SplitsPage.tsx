import HeaderTotal from '@/components/HeaderTotal';
import { useGetMySplitsQuery } from '@/store/api/splits.api';
import { Avatar, Caption, Cell, Spinner, Subheadline, Title } from '@telegram-apps/telegram-ui';
import dayjs from 'dayjs';
import { FiPlusCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect } from 'react';
import { useActions } from '@/helpers/use-actions';
import { useMeQuery } from '@/store/api/user.api';
import { useTranslation } from 'react-i18next';

dayjs.extend(relativeTime);

const MaxDebtorsToDisplay = 8;

function SplitsPage() {
  const { t } = useTranslation();
  const { showToast } = useActions();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetMySplitsQuery();
  const { isLoading: isMeLoading, isError: isMeError, data: me } = useMeQuery();

  useEffect(() => {
    if (isError) {
      showToast({ message: t('Error fetching splits') });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isMeError) {
      showToast({ message: t('Error fetching account') });
    }
  }, [isMeLoading]);

  const handleCreateSplitClick = () => {
    if (!me?.cardErip) {
      showToast({ message: t('You need to fill your card info before creating a split') });
      return;
    }
    navigate('/splits/create');
  };

  return (
    <div className="flex flex-col pt-16">
      <HeaderTotal
        title={`${
          data
            ? data
                .flatMap((split) => split.debtors)
                .filter((debtor) => !debtor.payDate)
                .reduce((acc, debtor) => acc + debtor.amount, 0)
            : '0'
        } BYN`}
      />
      {isLoading && (
        <Spinner
          size="m"
          className="mx-auto mt-6"
        />
      )}
      <div className="flex flex-col gap-4 mt-4 mx-5">
        {data &&
          data.map((split) => (
            <Cell
              key={split.id}
              className="bg-primary px-4 rounded-2xl cell-full"
              onClick={() => navigate(`/splits/${split.id}`)}
            >
              <div className="flex flex-col gap-1 overflow-hidden">
                <Title
                  level="3"
                  className="overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {split.name}
                </Title>
                <div className="flex justify-between items-center gap-1">
                  <Title
                    weight="1"
                    level="1"
                  >
                    {split.debtors
                      .filter((debtor) => debtor.payDate)
                      .reduce((acc, debtor) => acc + debtor.amount, 0)}
                    /{split.debtors.reduce((acc, debtor) => acc + debtor.amount, 0)} BYN
                  </Title>
                  <Subheadline>
                    {dayjs(split.creationDate).isBefore(dayjs().startOf('day').add(1, 'day'))
                      ? dayjs(split.creationDate).format('HH:mm')
                      : dayjs(split.creationDate).format('DD.MM.YYYY')}
                  </Subheadline>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <Title
                    level="3"
                    weight="1"
                  >
                    {split.debtors.filter((debtor) => debtor.payDate).length}/{split.debtors.length}
                  </Title>
                  <div className="flex">
                    {split.debtors.slice(0, 8).map((debtor, index) => (
                      <Avatar
                        className={index !== 0 ? '-ml-1.5' : ''}
                        key={debtor.id}
                        size={28}
                        src={debtor.user?.avatar}
                        acronym={debtor.name
                          .split(' ')
                          .map((word) => word[0])
                          .join('')}
                      />
                    ))}
                  </div>
                  {split.debtors.length > MaxDebtorsToDisplay && (
                    <Caption className="text-subtitle">
                      {split.debtors.length - MaxDebtorsToDisplay} {t('more')}
                    </Caption>
                  )}
                </div>
              </div>
            </Cell>
          ))}
        {data && (
          <Cell
            className="bg-primary px-4 rounded-2xl d-flex justify-center items-center child-grow-0"
            onClick={handleCreateSplitClick}
          >
            <FiPlusCircle className="size-8 my-1.5" />
          </Cell>
        )}
      </div>
    </div>
  );
}

export default SplitsPage;
