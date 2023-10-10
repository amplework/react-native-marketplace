import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.whiteFour,
  },
  safe: {
    backgroundColor: COLORS.whiteFour,
  },
  paddingHeader: {
    width: '100%',
    paddingTop: 24,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 32,
  },
  addButton: {
    width: '100%',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 22,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addTitle: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.orange,
  },
  addImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
    marginRight: 8,
  },
  arrow: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  paddingItem: {
    paddingLeft: 24,
    paddingRight: 32,
  },
  paddingExtra: {
    width: '100%',
    paddingBottom: 50,
    paddingRight: 10,
    backgroundColor: COLORS.transparent,
  },
  listItemContainer: {
    marginBottom: 16,
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 7,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listItemContainerHeight: {
    height: 122,
  },
  listItemContainerHeightLite: {
    height: 106,
  },
  row: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight:'10%'
  },
  imageConnected: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  rowSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemLabel: {
    color: COLORS.black,
    fontSize: 14,
  },
  itemsContainer: { width: '100%', paddingBottom: 24 },
  styleLetter: { height: 25 },
  userName: {
    // flex:1,
    fontSize: 16,
    lineHeight: 20,
    fontFamily: FONTS.bold,  
    
  },
  userPhone: {
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  separator: {
    marginVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteTwo,
  },
  lastTitle: {
    fontSize: 12,
    fontFamily: FONTS.book,
    lineHeight: 18,
    color: COLORS.brownishGrey,
  },
  lastValueTitle: {
    fontFamily: FONTS.medium,
    color: COLORS.black,
  },
  imagePerfomance: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 20,
  },
  imageSearch: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 24,
  },
});

export default styles;
