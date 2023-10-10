import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteFour,
  },
  safe: {
    backgroundColor: COLORS.whiteFour,
  },
  selectedDateContainer: {
    backgroundColor: COLORS.orange,
    borderRadius: 12,
  },
  paddingContainer: {
    backgroundColor: COLORS.white,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteGray,
  },
  busyContainer: {
    backgroundColor: COLORS.orange10,
    width: '100%',
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  busyText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONTS.book,
  },
  busyTextSelect: {
    fontFamily: FONTS.bold,
    color: COLORS.orange,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    paddingVertical: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
  titleLeftStyle: {
    fontSize: 18,
    lineHeight: 26,
    marginLeft: 16,
    marginRight: 16,
    fontFamily: FONTS.bold,
  },
  providersList: {
    paddingHorizontal: 24,
  },
  loader: {
    paddingTop: 4,
    paddingBottom: 20,
  },
  buttonSpace: {
    marginVertical: 24,
    backgroundColor: COLORS.white,
  },
  buttonTitle: {
    color: COLORS.orange,
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default styles;
