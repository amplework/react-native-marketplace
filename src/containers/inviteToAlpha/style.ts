import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: COLORS.white,
  },
  mainBox: {
    width: '100%', 
    height: '100%', 
    borderRadius: 10, 
    paddingBottom: 50,
    backgroundColor: COLORS.whiteGray
  },
  logoContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  logo: {
    alignSelf: 'flex-start',
    height: 60,
    width: 60,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  paymentButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.whiteGray,
    backgroundColor: COLORS.white,
  },
});

export default styles;