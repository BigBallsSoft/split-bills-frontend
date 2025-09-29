import { useActions } from '@/helpers/use-actions';
import { useGetBankOperationLinksQuery } from '@/store/api/bank-operation-link.api';
import type { UserPatchData } from '@/typings/user';
import { Modal, Cell, Image, Spinner, Card } from '@telegram-apps/telegram-ui';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';
import { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { IoIosArrowForward } from 'react-icons/io';

function BanksModal() {
  const { showToast } = useActions();
  const { control, setValue } = useFormContext<UserPatchData>();
  const { isLoading, isError, isSuccess, data } = useGetBankOperationLinksQuery();

  const bankOperationLinkId = useWatch({ control, name: 'bankOperationLinkId' });
  const bankOperationLink = useMemo(
    () => data?.find((link) => link.id === bankOperationLinkId),
    [bankOperationLinkId, data]
  );

  useEffect(() => {
    if (isError) {
      showToast({ message: 'Error fetching bank operation links' });
    }
  }, [isLoading]);

  return (
    <Modal
      snapPoints={[1]}
      trigger={
        <Cell
          className="mt-6 mb-3 bg-primary px-4 mx-5 rounded-2xl"
          after={<IoIosArrowForward />}
          before={
            bankOperationLink && (
              <Image
                size={96}
                className="img-contain img-outer my-3 p-2"
                src={bankOperationLink.imageUrl}
              />
            )
          }
        >
          {bankOperationLink ? bankOperationLink.name : 'Choose bank'}
        </Cell>
      }
    >
      <div className="grid grid-cols-2 p-6 gap-4">
        {isLoading && (
          <Spinner
            size="l"
            className="mx-auto mt-5"
          />
        )}
        {isSuccess &&
          data &&
          data.map((link) => (
            <Modal.Close key={link.id}>
              <Card onClick={() => setValue('bankOperationLinkId', link.id)}>
                <div className="p-3 flex justify-center cursor-pointer bg-quartenary">
                  <img
                    src={link.imageUrl}
                    className="img-contain h-20 object-contain"
                  />
                </div>
                <CardCell className="block-text-center">{link.name}</CardCell>
              </Card>
            </Modal.Close>
          ))}
      </div>
    </Modal>
  );
}

export default BanksModal;
