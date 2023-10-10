import { CardState } from 'store/entities/card/types';

const all = (state: CardState) => state.cards;

const loading = (state: CardState) => all(state).loading;

const connectAccountDetails = (state: CardState) => all(state).connectAccountDetails;

const loadingConnectAccountDeletion = (state: CardState) => all(state).loadingConnectAccountDeletion;

const cards = (state: CardState) => all(state).cards;

const addCardModalVisible = (state: CardState) => all(state).addCardModalVisible;

const editCardModalVisible = (state: CardState) => all(state).editCardModalVisible;

const selectedCard = (state: CardState) => all(state).selectedCard;

const paymentIntentLoading = (state: CardState) => all(state).paymentIntent.loading;

const paymentIntentData = (state: CardState) => all(state).paymentIntent.intentData;

const paymentLoading = (state: CardState) => all(state).createPayment.loading;

const paymentData = (state: CardState) => all(state).createPayment.paymentData;

export const cardSelectors = {
  loading,
  connectAccountDetails,
  loadingConnectAccountDeletion,
  addCardModalVisible,
  editCardModalVisible,
  cards,
  selectedCard,
  paymentIntentLoading,
  paymentIntentData,
  paymentLoading,
  paymentData,
};
