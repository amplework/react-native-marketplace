export type ModalState = {
  modal: ModalSlice;
};

export type ModalSlice = {
  isOpened: boolean;
  isAddressModal: boolean;
  content: Record<string, any>;
};
