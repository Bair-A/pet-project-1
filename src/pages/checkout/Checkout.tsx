'use client';

import { useMemo, useState } from 'react';

import styles from './Checkout.module.scss';

import {
  useCheckoutClearForm,
  useCheckoutForm,
  useCheckoutSetForm
} from '@/app/store/checkout';

// Formats input to Russian-like mask: +7 (XXX) XXX-XX-XX
const formatRuPhone = (raw: string) => {
  // Remove leading country digit if user typed 7 or 8 explicitly
  let local = raw.replace(/\D/g, '');
  if (local.startsWith('7') || local.startsWith('8')) {
    local = local.slice(1);
  }
  local = local.slice(0, 10);

  const p1 = local.slice(0, 3);
  const p2 = local.slice(3, 6);
  const p3 = local.slice(6, 8);
  const p4 = local.slice(8, 10);

  let out = '+7';
  if (p1) out += ` (${p1}`;
  if (p1 && p1.length === 3) out += ')';
  if (p2) out += `${p1 ? ' ' : ' '} ${p2}`.replace('  ', ' ');
  if (p3) out += `-${p3}`;
  if (p4) out += `-${p4}`;
  return out;
};

const phoneIsValid = (masked: string) => {
  const digits = masked.replace(/\D/g, '');
  // Expect +7 and 10 local digits => total 11 digits
  if (!digits.startsWith('7')) return false;
  return digits.length === 11; // 1 country + 10 local
};

const Checkout = () => {
  const form = useCheckoutForm();
  const setForm = useCheckoutSetForm();
  const clearForm = useCheckoutClearForm();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const errors = useMemo(() => {
    const e: Partial<Record<'fullName' | 'phone' | 'address', string>> = {};
    if (!form.fullName.trim()) e.fullName = 'Введите ФИО';
    if (!form.phone.trim()) e.phone = 'Введите номер телефона';
    else if (!phoneIsValid(form.phone)) e.phone = 'Некорректный номер телефона';
    if (form.isDelivery && !form.address.trim())
      e.address = 'Введите адрес доставки';
    return e;
  }, [form]);

  const onChange =
    (field: 'fullName' | 'phone' | 'isDelivery' | 'address') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (field === 'isDelivery') {
        setForm({ isDelivery: e.target.checked });
        return;
      }
      if (field === 'phone') {
        const masked = formatRuPhone(e.target.value);
        setForm({ phone: masked });
        return;
      }
      setForm({ [field]: e.target.value });
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;
    setIsSubmitting(true);
    setIsSuccess(false);
    // Fake API request
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Оформление заказа</h1>
      {isSuccess && (
        <div className={styles.success}>Данные успешно отправлены!</div>
      )}
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor='fullName'>
            ФИО
          </label>
          <input
            id='fullName'
            className={styles.input}
            type='text'
            value={form.fullName}
            onChange={onChange('fullName')}
            placeholder='Иванов Иван Иванович'
            required
            disabled={isSubmitting}
          />
          {submitted && errors.fullName && (
            <span className={styles.error}>{errors.fullName}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor='phone'>
            Телефон
          </label>
          <input
            id='phone'
            className={styles.input}
            type='tel'
            inputMode='tel'
            value={form.phone}
            onChange={onChange('phone')}
            placeholder='+7 (900) 000-00-00'
            required
            disabled={isSubmitting}
          />
          {submitted && errors.phone && (
            <span className={styles.error}>{errors.phone}</span>
          )}
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Способ получения</span>
          <div className={styles.toggleRow}>
            <label>
              <input
                type='checkbox'
                checked={form.isDelivery}
                onChange={onChange('isDelivery')}
                disabled={isSubmitting}
              />
              <span style={{ marginLeft: 8 }}>
                {form.isDelivery ? 'Доставка' : 'Самовывоз'}
              </span>
            </label>
          </div>
        </div>

        {form.isDelivery && (
          <div className={styles.field}>
            <label className={styles.label} htmlFor='address'>
              Адрес доставки
            </label>
            <input
              id='address'
              className={styles.input}
              type='text'
              value={form.address}
              onChange={onChange('address')}
              placeholder='Город, улица, дом, квартира'
              required={form.isDelivery}
              disabled={isSubmitting}
            />
            {submitted && errors.address && (
              <span className={styles.error}>{errors.address}</span>
            )}
          </div>
        )}

        <div className={styles.actions}>
          <button
            className={styles.secondary}
            type='button'
            onClick={() => {
              clearForm();
              setSubmitted(false);
              setIsSuccess(false);
            }}
            disabled={isSubmitting}
          >
            Очистить форму
          </button>
          <button
            className={styles.submit}
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправка...' : 'Отправить заказ'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
