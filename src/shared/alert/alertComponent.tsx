import { Alert } from 'react-native';

export const AlertComponent = (
  title: string,
  message: string,
  onConfirm?: () => void,
  onCancel?: () => void,
  textCancel?: string,
  textConfirm?: string,
) =>
  Alert.alert(
    title,
    message,
    [
      {
        text: textCancel || 'Cancel',
        onPress: onCancel,
        style: 'cancel',
      },
      {
        text: textConfirm || 'Delete',
        onPress: onConfirm,
      },
    ],
    { cancelable: false },
  );
