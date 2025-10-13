import { useActions } from '@/helpers/use-actions';
import { useAppDispatch } from '@/helpers/use-app-dispatch';
import { usePatchDebtorMutation } from '@/store/api/debts.api';
import { splitsApi } from '@/store/api/splits.api';
import type { SplitExtended } from '@/typings/splits';
import { Button } from '@telegram-apps/telegram-ui';
import { useEffect } from 'react';
import { AiOutlineSignature } from 'react-icons/ai';

function SplitDebtorActions({ split, debtorId }: { split: SplitExtended; debtorId?: number }) {
  const { showToast } = useActions();
  const dispatch = useAppDispatch();
  const [patchDebtor, { isLoading, isError, isSuccess, data }] = usePatchDebtorMutation();

  useEffect(() => {
    if (isSuccess && data) {
      showToast({ message: 'Payment confirm requested' });
      dispatch(
        splitsApi.util.updateQueryData('getSplitById', split.id, (draft) => {
          draft.debtors = split.debtors.map((d) => (d.id === data.id ? data : d));
        })
      );
    }
    if (isError) {
      showToast({ message: 'Error requesting payment confirm' });
    }
  }, [isLoading]);

  const handleRequestConfirmClick = () => {
    if (debtorId) {
      patchDebtor({ debtorId, patchData: { isConfirmRequested: true } });
    }
  };

  return (
    <div className="mx-12 mt-4 flex flex-col gap-3">
      <Button
        before={<AiOutlineSignature size={24} />}
        size="l"
        loading={isLoading}
        disabled={isLoading}
        onClick={handleRequestConfirmClick}
      >
        Request payment confirm
      </Button>
    </div>
  );
}

export default SplitDebtorActions;
