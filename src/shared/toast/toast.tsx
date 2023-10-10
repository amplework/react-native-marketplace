import Toast from 'react-native-simple-toast';

const delay = (fn: () => void) => setTimeout(fn, 2000);

const info = (message: string) => {
  message?.trim().length > 0 ? delay(() => Toast.show(message, Toast.LONG, ['UIAlertController'])) : null
}

export const toast = {
  info,
};
