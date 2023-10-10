import { PayloadHandlers } from 'utils/store';

export type Card = {
  cardId?: any;
  cardHolderName: string,
  brand: string,
  expiryMonth: number,
  expiryYear: number,
  last4: number,
  number: number,
  isDefault: boolean,
};

export type AddCardAction = PayloadHandlers & {
  card: Card;
};