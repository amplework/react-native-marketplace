import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
export const deleteAccountStyles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.whiteFour,
  },
  container: {
    flex: 1,
    // backgroundColor: 'lightblue'
    // paddingHorizontal: 15,
  },
  list: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  content: {
    flexGrow: 1,
  },
  warningContainer: {
    // flex: 1,
    backgroundColor: COLORS.orangeRed10,
    height: '45%',
    borderRadius: 5,
    marginTop: 10 ,
    paddingLeft: 10, 
  },
  bottomContainer: {
    flex: 0.28,
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    backgroundColor: COLORS.whiteFour,
  }
});