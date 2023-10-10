import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  paddingItem: {
    paddingLeft: 4,
    paddingRight: 32,
  },
  listItemContainer: {
    height: 64,
    marginBottom: 16,
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 5,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rowSpace: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: FONTS.bold,
  },
  imageConnected: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  userPhone: {
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  keyboardStyle: {
    height: '100%',
    width: '100%',
  },
  centeredView: {
    flex: 1,
    backgroundColor: COLORS.backgroundModal,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalView: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  posHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteTwo,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  titleNewService: {
    fontSize: 18,
    fontFamily: FONTS.bold,
  },
  titleNewCenter: {
    alignItems: 'center',
    flex: 1,
  },
  paddingContentScroll: {
    padding: 16,
    paddingBottom: 0,
  },
  itemsContainer: { width: '100%', paddingBottom: 24 },
  letterStyle: { height: 25 },
  textBoxContainer: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  textBoxContainerSold: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  inputSearch: {
    height: 50,
    width: '100%',
    borderRadius: 5,
    borderColor: COLORS.border,
    borderWidth: 1,
    padding: 8,
  },
  searchPosition: {
    height: '100%',
    position: 'absolute',
    right: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  yourTitle: {
    paddingTop: 8,
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  paddingExtra: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 200,
    backgroundColor: COLORS.transparent,
  },
  arrow: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});

export default styles;
