import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const pdfPreviewStyles = StyleSheet.create({
  shareModalContent: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  safe: {
    backgroundColor: COLORS.black70,
  },
  rowSpace: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centralContent: {
    marginTop: 16,
    width: '100%',
    height: '65%',
  },
  large: {
    height: '80%',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  button: {
    flex: 1,
    marginRight: 12,
  },
  circleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 52.5,
    minHeight: 52.5,
    marginLeft: 'auto',
    backgroundColor: COLORS.white,
    borderRadius: 50,
  },
  sendButton: {
    paddingVertical: 12,
  },
});
