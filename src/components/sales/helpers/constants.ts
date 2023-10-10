type SenderOption = {
  label: string;
  value: any;
  icon: any;
};

export const PAYMENT_MEHTOD_OPTIONS: SenderOption[] = [
  { label: 'Stripe', value: 'stripe', icon: require('assets/global/apple.png') },
  { label: 'Google Pay', value: 'gpay', icon: require('assets/global/google.png') },
  { label: 'Apple Pay', value: 'applePay', icon: require('assets/global/apple.png') },
];