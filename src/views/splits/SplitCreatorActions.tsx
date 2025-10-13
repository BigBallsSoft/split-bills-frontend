import type { SplitExtended } from '@/typings/splits';
import { Button, Text } from '@telegram-apps/telegram-ui';
import { LuUserRoundPlus } from 'react-icons/lu';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { LuTrash2 } from 'react-icons/lu';
import { useDeleteSplitMutation, useNotifyDebtorsMutation } from '@/store/api/splits.api';
import { useActions } from '@/helpers/use-actions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { shareURL } from '@telegram-apps/sdk-react';
import { config } from '@/helpers/config';

function SplitCreatorActions({ split }: { split: SplitExtended }) {
  const navigate = useNavigate();
  const { showToast, hideToast } = useActions();
  const [notifyDebtors, { data, isLoading, isError, isSuccess }] = useNotifyDebtorsMutation();
  const [
    deleteSplit,
    { isLoading: isDeleteLoading, isError: isDeleteError, isSuccess: isDeleteSuccess },
  ] = useDeleteSplitMutation();

  useEffect(() => {
    if (isSuccess) {
      showToast({ message: data.message });
    }
    if (isError) {
      showToast({ message: 'Error notifying debtors' });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isDeleteSuccess) {
      showToast({ message: 'Split deleted' });
      navigate('/splits');
    }
    if (isDeleteError) {
      showToast({ message: 'Error deleting split' });
    }
  }, [isDeleteLoading]);

  const handleDeleteClick = () =>
    showToast({
      message: (
        <>
          <Text>Are you sure you want to delete this split?</Text>
          <Button
            className="mt-3 bg-danger"
            size="s"
            stretched
            onClick={() => {
              deleteSplit(split.id);
              hideToast();
            }}
          >
            Delete split
          </Button>
        </>
      ),
      duration: 5000,
    });

  return (
    <div className="mx-12 mt-4 flex flex-col gap-3">
      <Button
        before={<LuUserRoundPlus size={24} />}
        size="l"
        onClick={() => shareURL(`${config.TG_APP_URL}?startapp=splits_${split.id}`)}
      >
        Share link
      </Button>
      <Button
        before={<IoMdNotificationsOutline size={24} />}
        size="l"
        loading={isLoading}
        disabled={isLoading}
        onClick={() => notifyDebtors(split.id)}
      >
        Notify debtors
      </Button>
      <Button
        size="l"
        className="bg-danger"
        loading={isDeleteLoading}
        disabled={isDeleteLoading}
        before={<LuTrash2 size={24} />}
        onClick={handleDeleteClick}
      >
        Delete
      </Button>
    </div>
  );
}

export default SplitCreatorActions;
