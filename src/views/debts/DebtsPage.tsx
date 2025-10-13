import HeaderTotal from '@/components/HeaderTotal';
import { useActions } from '@/helpers/use-actions';
import { useGetMyDebtsQuery } from '@/store/api/debts.api';
import { useMeQuery } from '@/store/api/user.api';
import { Avatar, Cell, Spinner, Subheadline, Title } from '@telegram-apps/telegram-ui';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

function DebtsPage() {
  const { t } = useTranslation();
  const { showToast } = useActions();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetMyDebtsQuery();
  const { data: profile, isError: isProfileError, isLoading: isProfileLoading } = useMeQuery();

  useEffect(() => {
    if (isError || isProfileError) {
      showToast({ message: t('Error fetching debts') });
    }
  }, [isLoading, isProfileLoading]);

  return (
    <div className="flex flex-col pt-16">
      <HeaderTotal
        title={
          <span className="text-indianred">
            {data && profile
              ? data
                  .flatMap((split) => split.debtors)
                  .filter((debtor) => debtor.userId === profile.id)
                  .reduce((acc, debt) => acc + debt.amount, 0)
              : '0'}{' '}
            BYN
          </span>
        }
      />
      {isLoading ||
        (isProfileLoading && (
          <Spinner
            size="m"
            className="mx-auto mt-6"
          />
        ))}
      <div className="flex flex-col gap-4 mt-4 mx-5">
        {data &&
          profile &&
          data.map((split) => (
            <Cell
              key={split.id}
              className="bg-primary px-4 rounded-2xl cell-full"
              onClick={() => navigate(`/splits/${split.id}`)}
            >
              <div className="flex justify-between">
                <div className="flex flex-col gap-1 overflow-hidden">
                  <Title
                    level="3"
                    className="text-ellipsis overflow-hidden whitespace-nowrap"
                  >
                    {split.name}
                  </Title>
                  <Title
                    weight="1"
                    level="1"
                  >
                    {split.debtors.find((debtor) => debtor.userId === profile.id)?.amount || 0} BYN
                  </Title>
                  <Subheadline>
                    {dayjs(split.creationDate).isBefore(dayjs().startOf('day').add(1, 'day'))
                      ? dayjs(split.creationDate).format('HH:mm')
                      : dayjs(split.creationDate).format('DD.MM.YYYY')}
                  </Subheadline>
                </div>
                <div className="flex flex-col justify-center gap-2 max-w-1/3">
                  <Avatar
                    size={48}
                    src={split.creator?.avatar}
                    acronym={split.creator?.name
                      .split(' ')
                      .map((word) => word[0])
                      .join('')}
                    className="self-center"
                  />
                  <Subheadline className="text-ellipsis overflow-hidden whitespace-nowrap">
                    {split.creator?.name}
                  </Subheadline>
                </div>
              </div>
            </Cell>
          ))}
      </div>
    </div>
  );
}

export default DebtsPage;
