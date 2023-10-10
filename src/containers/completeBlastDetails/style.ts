import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.whiteFour,
  },
  container: {
    flex: 1,
    marginTop: 3,
  },

  messageInput: {
    maxHeight: 150,
    minHeight: 80,
    fontFamily: FONTS.medium,
    paddingHorizontal: 15,
  },
  filepicker: {
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.clearBlue50,
    borderStyle: 'dashed',
    paddingHorizontal: '32%',
    paddingVertical: '8%',
    flexDirection: 'row',
    // marginBottom: '10%',
  },
  logoBanner: {
    position: 'absolute',
    bottom: 20,
    left: 28,
  },
  checkBox: { 
    paddingVertical: 20,
    alignSelf: 'flex-start', 
  },
  checkBoxLabel: { 
    fontSize: 14, 
    lineHeight: 20, 
    fontFamily: FONTS.medium, 
    color: COLORS.black 
  },
  checkboxs: {
    width: 16,
    height: 16,
  },
  bannerContainer: {
    overflow: 'hidden',
    aspectRatio: 4 / 1.8,
    borderRadius: 7,
  },

  bannerImage: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 7,
  },
  containerEdit: {
    position: 'absolute',
    right: 0,
    top: 1,
    width: 22,
    height: 22,
  },

  editIcon: {
    position: 'absolute',
    right: 10,
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    backgroundColor: COLORS.clearBlue,
    borderRadius: 10,
  },
  checkbox: {
    width: 16,
    height: 16,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.whiteTwo,
  },
  scrollContent: {
    padding: 21,
  },
  header: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteGray,
  },
  titleHeader: {
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
    marginRight: 8,
  },
  arrow: {
    width: 20,
    height: 20,
  },
  textBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  paddingItem: {
    paddingHorizontal: 8,
  },
  listItemContainer: {
    marginHorizontal: 15,
    marginVertical: 15,
    backgroundColor: COLORS.white,
    padding: 15,
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

  imageConnected: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginLeft: 8,
  },

  keyboardStyle: {
    height: '100%',
    width: '100%',
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
    right: 30,
    justifyContent: 'center',
  },
  paddingContentScroll: {
    padding: 16,
    paddingBottom: 0,
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
  letterStyle: { height: 25 },
  nameBox:{
    fontWeight:'700',
    borderWidth:1,
    borderRadius:15,
    borderColor:COLORS.black20, 
    fontSize:12,
    paddingHorizontal:8,
    paddingVertical:4,
    flex:1,
    flexDirection:'row',
    marginLeft:5,
    justifyContent:'center',
    alignItems:'center'   
  },
  text:{
    color:COLORS.black60,
    fontWeight:'bold'
  },
  bannerImageConainer: { 
    width: "100%",
    // height: '45%',
    marginHorizontal: 20,
    borderRadius: 10,
    // borderWidth: 1,
    overflow: 'hidden'
  },
});
