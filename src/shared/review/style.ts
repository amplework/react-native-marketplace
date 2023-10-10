import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const reviewStyles = StyleSheet.create({
  headerBar: {
    backgroundColor: COLORS.twilightBlueTwo,
    shadowOpacity: 0,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
  },
  headerImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
