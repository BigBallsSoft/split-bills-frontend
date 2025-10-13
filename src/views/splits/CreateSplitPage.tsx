import HeaderBack from '@/components/HeaderBack';
import { useActions } from '@/helpers/use-actions';
import { useCreateSplitMutation } from '@/store/api/splits.api';
import type { AddSplitData } from '@/typings/splits';
import {
  Button,
  Caption,
  Divider,
  IconButton,
  Input,
  Multiselectable,
  Textarea,
} from '@telegram-apps/telegram-ui';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FiPlusCircle } from 'react-icons/fi';
import { LuTrash2 } from 'react-icons/lu';
import { useNavigate } from 'react-router';

function CreateSplitPage() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(0);
  const [addDebtorName, setAddDebtorName] = useState('');
  const [selectedDebtors, setSelectedDebtors] = useState<string[]>([]);
  const { showToast } = useActions();
  const navigate = useNavigate();

  const methods = useForm<AddSplitData>();
  const { register, handleSubmit, formState } = methods;
  const { append, remove, update, fields } = useFieldArray({
    control: methods.control,
    name: 'debtors',
  });
  const [createSplit, { isLoading, isSuccess, isError, data }] = useCreateSplitMutation();

  const totalAmount = fields.reduce((acc, field) => acc + field.amount, 0);

  const onAddDebtorClick = () => {
    append({ name: addDebtorName, amount: 0 });
    setAddDebtorName('');
  };

  const onSplitClick = () => {
    fields.forEach((field, index) => {
      if (selectedDebtors.includes(field.name)) {
        update(index, {
          amount: field.amount + amount / selectedDebtors.length,
          name: field.name,
        });
      }
    });
    setAmount(0);
  };

  useEffect(() => {
    if (isSuccess) {
      showToast({ message: t('Split created successfully') });
      navigate(`/splits/${data.id}`, { replace: true });
    }
    if (isError) {
      showToast({ message: t('Error creating split') });
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col pt-14 pb-8">
      <HeaderBack title={t('Create Split')} />

      <FormProvider {...methods}>
        <form
          className="flex flex-col"
          onSubmit={handleSubmit((data) => createSplit(data))}
        >
          <Input
            header={t('Name')}
            placeholder={t('Split name')}
            {...register('name', { required: true })}
          />
          <Textarea
            header={t('Description (Optional)')}
            placeholder={t('Split description')}
            {...register('description', { required: false, setValueAs: (v) => v || undefined })}
          />
          <div className="mx-6 text-subtitle">
            <Caption>
              {t('Split amount between debtors')} <br /> {t('Type sum, choose debtors and split')}
            </Caption>
          </div>
          <Input
            header={t('Amount')}
            type="number"
            placeholder={t('Split amount')}
            value={amount}
            onChange={(e) => {
              setAmount(Number(e.target.value));
              e.target.value = String(Number(e.target.value)); // remove leading zero
            }}
          />
          <div className="grid grid-cols-2 mx-6 gap-y-3 gap-x-4 my-3">
            <Button
              size="s"
              disabled={amount === 0 || selectedDebtors.length === 0}
              onClick={onSplitClick}
            >
              {t('Split')}
            </Button>
            <Button
              size="s"
              onClick={() => setSelectedDebtors(fields.map((f) => f.name))}
            >
              {t('Select All')}
            </Button>
            <Button
              size="s"
              className="bg-danger"
              onClick={() => setAmount(0)}
            >
              {t('Clear Amount')}
            </Button>
            <Button
              size="s"
              mode="bezeled"
              onClick={() => setSelectedDebtors([])}
            >
              {t('Diselect All')}
            </Button>
          </div>
          {fields.length > 0 && (
            <div className="my-3">
              <Divider />
              {fields.map((field, index) => (
                <React.Fragment key={field.id}>
                  <div className="flex items-center gap-5 my-5 mx-6">
                    <div className="flex-1 grid grid-cols-2">
                      <div>{field.name}</div>
                      <div className="font-bold text-xl">{field.amount} BYN</div>
                    </div>
                    <Multiselectable
                      name="debtors"
                      value={field.name}
                      checked={selectedDebtors.includes(field.name)}
                      onChange={(e) =>
                        selectedDebtors.includes(e.target.value)
                          ? setSelectedDebtors(selectedDebtors.filter((d) => d !== e.target.value))
                          : setSelectedDebtors([...selectedDebtors, e.target.value])
                      }
                    />
                    <IconButton
                      mode="plain"
                      size="s"
                      className="p-0"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <LuTrash2 className="size-7 color-danger" />
                    </IconButton>
                  </div>

                  <Divider />
                </React.Fragment>
              ))}
            </div>
          )}
          <div className="flex items-center pr-5">
            <div className="flex-1">
              <Input
                header={t('Name')}
                placeholder={t('Debtor name')}
                value={addDebtorName}
                onChange={(e) => setAddDebtorName(e.target.value.trim())}
              />
            </div>
            <IconButton
              mode="plain"
              size="s"
              className="p-0"
              type="button"
              disabled={!addDebtorName || fields.map((f) => f.name).includes(addDebtorName)}
              onClick={onAddDebtorClick}
            >
              <FiPlusCircle className="size-8" />
            </IconButton>
          </div>

          <Button
            size="l"
            className="mt-6 mx-12"
            loading={isLoading}
            disabled={!formState.isValid || totalAmount === 0 || isLoading}
            type="submit"
          >
            {t('Create')}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

export default CreateSplitPage;
