import { useLaunchParams } from '@telegram-apps/sdk-react';
import {
  Avatar,
  Title,
  type ImageProps,
  Input,
  Textarea,
  Button,
} from '@telegram-apps/telegram-ui';
import BanksModal from './BanksModal';
import { useMeQuery, usePatchMeMutation } from '@/store/api/user.api';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { UserPatchData } from '@/typings/user';
import { useActions } from '@/helpers/use-actions';

function AccountPage() {
  const { tgWebAppData } = useLaunchParams();
  const { showToast } = useActions();
  const { isLoading, isError, isSuccess, data } = useMeQuery();
  const [patchMe, { isLoading: isPatchMeLoading, isError: isPatchMeError }] = usePatchMeMutation();
  const methods = useForm<UserPatchData>();
  const { register, handleSubmit, formState, setValue } = methods;

  useEffect(() => {
    if (isSuccess && data) {
      setValue('bankOperationLinkId', data.bankOperationLinkId);
      setValue('cardErip', data.cardErip);
      setValue('cardNumber', data.cardNumber);
      setValue('notifyMessage', data.notifyMessage);
    } else if (isError) {
      showToast({ message: 'Error fetching account' });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isPatchMeError) {
      showToast({ message: 'Error updating account' });
    }
  }, [isPatchMeLoading]);

  return (
    <div className="flex flex-col">
      <Avatar
        size={72 as ImageProps['size']}
        src={tgWebAppData?.user?.photo_url}
        className="mx-auto mt-5 mb-4"
      />
      <Title
        weight="2"
        level="3"
        plain
        className="text-center"
        onClick={() => showToast({ message: 'Edit' })}
      >
        {tgWebAppData?.user?.first_name} {tgWebAppData?.user?.last_name}
      </Title>
      <FormProvider {...methods}>
        <form
          className="flex flex-col"
          onSubmit={handleSubmit((data) => patchMe(data))}
        >
          <BanksModal />
          <Input
            header="Account number for ERIP payment"
            placeholder="1234567890"
            {...register('cardErip', { required: true })}
          />
          <Input
            header="Card number"
            type="number"
            placeholder="0000 0000 0000 0000"
            {...register('cardNumber', { required: true })}
          />
          <Textarea
            header="Notify message (Optional)"
            {...register('notifyMessage', { required: false, setValueAs: (v) => v || undefined })}
          />
          <Button
            size="l"
            className="mt-6 mx-12"
            disabled={!formState.isValid || isPatchMeLoading}
            loading={isPatchMeLoading}
            type="submit"
          >
            Confirm
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

export default AccountPage;
