import { Dimensions, StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import { isSmallDevice } from 'utils/device';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.whiteFour,
  },
  container: {
    flex: 1,
    paddingHorizontal: isSmallDevice ? 16 : 20,
    marginTop: 20
  },
  twinContainer: { 
    justifyContent: "center", 
    alignItems: "center", 
    height: 129, 
    paddingHorizontal: isSmallDevice ? 5 : 15,
    // width: "100%", 
    backgroundColor: COLORS.white,  
    shadowColor: COLORS.black,
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 5
  }, 
  list: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  content: {
    flexGrow: 1,
  },
  notice: {
    width: '100%', 
    marginTop: 30, 
    borderRadius: 10, 
    paddingVertical: 20, 
    justifyContent: 'space-around'
  },
  Image:{
    position: 'absolute',
    top: 33,
    bottom: 0,
   
  }
 
});