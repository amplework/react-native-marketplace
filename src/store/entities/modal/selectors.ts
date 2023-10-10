import { ModalState } from './types';

const all = (state: ModalState) => state.modal;

const isOpened = (state: ModalState) => all(state).isOpened;

const isAddressModalOpened = (state: ModalState) => all(state).isAddressModal;

const content = (state: ModalState) => all(state).content;

export const modalSelectors = {
  isOpened,
  isAddressModalOpened,
  content,
};
