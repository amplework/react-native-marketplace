import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

const styles = StyleSheet.create({
  avatarPosition: {
    alignSelf: 'flex-start',
  },
  imageContainer: {
    justifyContent: 'flex-end',
  },
  imageProfile: {
    resizeMode: 'contain',
    width: 24,
    height: 24,
  },
  profileContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.clearBlueOpacity,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageProfileFull: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  containerEdit: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.clearBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageEdit: {
    resizeMode: 'contain',
    width: 10,
    height: 10,
  },
});

export default styles;
