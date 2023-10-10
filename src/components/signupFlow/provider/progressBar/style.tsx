import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  positionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  positionStart: {
    alignSelf: 'flex-start',
  },
  positionImage: {
    alignSelf: 'flex-start',
  },
  backImage: {
    resizeMode: 'contain',
    width: 24,
    height: 24,
  },
  positionProgress: {
    flex: 1,
    alignItems: 'center',
  },
});

export default styles;
