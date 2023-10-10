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
    // justifyContent: 'space-between'
  },
  titleLeftStyle: {
    fontSize: 18,
    lineHeight: 26,
    marginLeft: 16,
    marginRight: 16,
    fontFamily: FONTS.bold,
  },
  manageDaySlotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  timeslotContainer: {
    width: '20%',
    height: '100%',
    borderWidth: 3,
    borderBottomColor: COLORS.whiteTwo,
    borderTopColor: COLORS.orange30,
    borderLeftColor: COLORS.whiteTwo,
    borderRightColor: COLORS.whiteTwo,
    paddingVertical: 20
  },
  timeslotText: {
    fontSize: 16,
    textAlign: 'right',
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: COLORS.black30,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    justifyContent: "flex-end",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  knob: {
    height: 7,
    width: 45,
    borderRadius: 10,
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: COLORS.pinkishGrey
  },
  arrowKnob: {
    width: '100%',
    backgroundColor: COLORS.white,
    paddingBottom: 5,
    marginTop: -20,
    alignItems: 'center',
  }
});

export default styles;
