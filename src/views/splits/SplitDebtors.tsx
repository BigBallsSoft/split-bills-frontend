import { useActions } from '@/helpers/use-actions';
import { useAppDispatch } from '@/helpers/use-app-dispatch';
import { useConfirmDebtorMutation, usePatchDebtorMutation } from '@/store/api/debts.api';
import { splitsApi } from '@/store/api/splits.api';
import { type Debtor } from '@/typings/debtors';
import type { SplitExtended } from '@/typings/splits';
import { useLaunchParams, openTelegramLink } from '@telegram-apps/sdk-react';
import { Avatar, Button, Divider, Title } from '@telegram-apps/telegram-ui';
import React, { useEffect } from 'react';

function SplitDebtors({ split, isCreator }: { split: SplitExtended; isCreator: boolean }) {
  const { tgWebAppData } = useLaunchParams();
  const { showToast } = useActions();
  const dispatch = useAppDispatch();
  const [patchDebtor, { isLoading, isError, isSuccess, data }] = usePatchDebtorMutation();
  const [
    confirmDebtor,
    {
      isLoading: isConfirmLoading,
      isError: isConfirmError,
      isSuccess: isConfirmSuccess,
      data: confirmData,
    },
  ] = useConfirmDebtorMutation();

  useEffect(() => {
    if (isSuccess && data) {
      showToast({ message: 'Debt accepted' });
      dispatch(
        splitsApi.util.updateQueryData('getSplitById', split.id, (draft) => {
          draft.debtors = split.debtors.map((d) => (d.id === data.id ? data : d));
        })
      );
    }
    if (isError) {
      showToast({ message: 'Error accepting debt' });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isConfirmSuccess && confirmData) {
      showToast({ message: 'Payment confirmed' });
      dispatch(
        splitsApi.util.updateQueryData('getSplitById', split.id, (draft) => {
          draft.debtors = split.debtors.map((d) => (d.id === confirmData.id ? confirmData : d));
        })
      );
    }
    if (isConfirmError) {
      showToast({ message: 'Error confirming payment' });
    }
  }, [isConfirmLoading]);

  const isShowButton = (debtor: Debtor) => {
    if (isCreator && (!debtor.userId || debtor.payDate)) {
      return false;
    }
    if (
      tgWebAppData?.user?.id === debtor.user?.telegramId ||
      split.debtors.find((d) => d.user?.telegramId === tgWebAppData?.user?.id)
    ) {
      return false;
    }
    return true;
  };
  const getDebtorText = (debtor: Debtor) => {
    if (isCreator) {
      return debtor.isConfirmRequested ? 'Confirm' : 'Chat';
    } else if (!debtor.userId) {
      return 'Take';
    }
  };

  const handleDebtorButtonClick = async (debtor: Debtor) => {
    if (isCreator) {
      if (debtor.isConfirmRequested) {
        confirmDebtor(debtor.id);
      } else if (debtor.user?.username) {
        openTelegramLink(`https://t.me/${debtor.user.username}`);
      }
    } else if (!split.debtors.find((d) => d.user?.telegramId === tgWebAppData?.user?.id)) {
      patchDebtor({ debtorId: debtor.id });
    }
  };

  return (
    <div className="flex flex-col mx-6 mb-4">
      <div className="mb-3">
        <Title
          weight="2"
          level="3"
        >
          Debtors
        </Title>
      </div>
      {split.debtors.map((debtor) => (
        <React.Fragment key={debtor.id}>
          <div className="flex justify-between items-center gap-4 my-2">
            <Avatar
              size={40}
              src={debtor.user?.avatar}
              acronym={debtor.name
                .split(' ')
                .map((word) => word[0])
                .join('')}
            />
            <div className="flex flex-col me-auto">
              <div>{debtor.name}</div>
              <div className="text-blue-400 font-bold">{debtor.amount} BYN</div>
            </div>
            {isShowButton(debtor) && (
              <Button
                loading={isLoading || isConfirmLoading}
                disabled={isLoading || isConfirmLoading}
                size="s"
                onClick={() => handleDebtorButtonClick(debtor)}
              >
                {getDebtorText(debtor)}
              </Button>
            )}
          </div>
          <div className="ms-10 ">
            <Divider />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default SplitDebtors;
