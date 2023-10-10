import { Card } from 'types/card';

export interface CardState {
  cards: Cards;
}

export interface Cards {
  connectAccountDetails?: any;
  cards: Card[];
  selectedCard: any;
  loading: boolean;
  addCardModalVisible: boolean;
  editCardModalVisible: boolean;
  paymentIntent?: any;
  createPayment?: any;
  loadingConnectAccountDeletion: boolean;
}
