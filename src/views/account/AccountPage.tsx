import { useLaunchParams } from '@telegram-apps/sdk-react';
import {
  Avatar,
  Title,
  type ImageProps,
  Input,
  Textarea,
  Button,
  SegmentedControl,
  Text,
} from '@telegram-apps/telegram-ui';
import BanksModal from './BanksModal';
import { useMeQuery, usePatchMeMutation } from '@/store/api/user.api';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { UserPatchData } from '@/typings/user';
import { useActions } from '@/helpers/use-actions';
import { SegmentedControlItem } from '@telegram-apps/telegram-ui/dist/components/Navigation/SegmentedControl/components/SegmentedControlItem/SegmentedControlItem';
import { useSelector } from 'react-redux';
import type { RootStateStore } from '@/store';
import { LanguageKeys } from '@/typings/settings';
import { useTranslation } from 'react-i18next';

function AccountPage() {
  const { t, i18n } = useTranslation();
  const { tgWebAppData } = useLaunchParams();
  const { showToast, setLanguage } = useActions();
  const { language } = useSelector((state: RootStateStore) => state.user);
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
      showToast({ message: t('Error fetching account') });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isPatchMeError) {
      showToast({ message: t('Error updating account') });
    }
  }, [isPatchMeLoading]);

  const handleLanguageChanged = (language: LanguageKeys) => {
    i18n.changeLanguage(language);
    setLanguage({ language });
  };

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
      >
        {tgWebAppData?.user?.first_name} {tgWebAppData?.user?.last_name}
      </Title>
      <div className="mt-6 mx-5">
        <SegmentedControl>
          <SegmentedControlItem
            selected={language === LanguageKeys.RU}
            onClick={() => handleLanguageChanged(LanguageKeys.RU)}
          >
            <Text>Русский</Text>
          </SegmentedControlItem>
          <SegmentedControlItem
            selected={language === LanguageKeys.EN}
            onClick={() => handleLanguageChanged(LanguageKeys.EN)}
          >
            <Text>English</Text>
          </SegmentedControlItem>
        </SegmentedControl>
      </div>

      <FormProvider {...methods}>
        <form
          className="flex flex-col"
          onSubmit={handleSubmit((data) => patchMe(data))}
        >
          <BanksModal />
          <Input
            header={t('Account number for ERIP payment')}
            placeholder="1234567890"
            {...register('cardErip', { required: true })}
          />
          <Input
            header={t('Card number')}
            type="number"
            placeholder="0000 0000 0000 0000"
            {...register('cardNumber', { required: true })}
          />
          <Textarea
            header={t('Notify message (Optional)')}
            {...register('notifyMessage', { required: false, setValueAs: (v) => v || undefined })}
          />
          <Button
            size="l"
            className="mt-6 mx-12"
            disabled={!formState.isValid || isPatchMeLoading}
            loading={isPatchMeLoading}
            type="submit"
          >
            {t('Confirm')}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

export default AccountPage;
