import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const pickTimeSlotStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteFour,
  },
  safe: {
    backgroundColor: COLORS.whiteFour,
  },
  closedDateContainer: {
    backgroundColor: COLORS.brownishGrey,
    borderRadius: 12,
  },
  dateNameStyle: {
    color: COLORS.white,
  },
  dateNumberStyle: {
    color: COLORS.white,
  },
  legendContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  availableCircle: {
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    backgroundColor: COLORS.white,
  },
  blockCircle: {
    backgroundColor: COLORS.black10,
  },
  pickedCircle: {
    marginLeft: 16,
    backgroundColor: COLORS.orange,
  },
  legendSpace: {
    marginRight: 16,
  },
  legendTitle: {
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  centralScreen: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  positionLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  placeholder: {
    fontSize: 16,
    color: COLORS.brownishGrey,
    fontFamily: FONTS.book,
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
  wrapSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
    padding: 24,
    paddingTop: 0,
  },
  buttonSpace: {
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
  appointmentText: {
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.brownishGrey,
    lineHeight: 20,
    fontFamily: FONTS.book,
  },
  appointmentContainer: {
    borderRadius: 7,
    marginBottom: 16,
    backgroundColor: COLORS.white,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  positionButtons: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpace: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appointmentTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.medium,
  },
  appointmentDate: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.brownishGrey,
    fontFamily: FONTS.book,
  },
  arrow: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  avatar: {
    marginRight: 16,
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  info: {
    marginLeft: 8,
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  imageBack: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
    marginLeft: 24,
  },
  titleLeftStyle: {
    fontSize: 18,
    lineHeight: 26,
    marginLeft: 16,
    marginRight: 16,
    fontFamily: FONTS.bold,
  },
  bottomBlock: {
    borderTopWidth: 1,
    borderTopColor: COLORS.whiteGray,
    paddingHorizontal: 32,
    paddingVertical: 20,
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.white,
    width: '100%',
  },
  addButton: {
    width: '49%',
    paddingVertical: 8,
    backgroundColor: COLORS.orange,
    borderRadius: 5,
  },
  btnTimeSlotRight: {
    marginLeft: 4,
  },
  btnTimeSlot: {
    width: '50%',
    marginLeft: '25%',
    marginTop: 24,
    borderRadius: 5,
    paddingVertical: 8,
    backgroundColor: COLORS.orange,
  },
  btnConfirm: {
    paddingVertical: 12,
    backgroundColor: COLORS.orange,
  },
  btnTrial: {
    width: '100%',
    backgroundColor: COLORS.orange,
  },
  textTrial: {
    color: COLORS.white,
  },
  centeredView: {
    flex: 1,
    backgroundColor: COLORS.backgroundModal,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '40%',
    borderRadius: 20,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bigModal: {
    height: '60%',
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
  addTimeslotModal: {
    height: 'auto',
  },
  timeslotContainer: {
    alignItems: 'center',
    marginLeft: '10%',
    width: '80%',
    marginTop: 8,
    borderRadius: 5,
    backgroundColor: COLORS.orange,
    padding: 8,
  },
  scrollContent: {
    padding: 24,
  },
  slotsContainer: {
    width: '32%',
    alignItems: 'center',
    marginTop: 16,
    marginRight: 4,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 8,
  },
  grayContainer: {
    backgroundColor: COLORS.whiteGray,
  },
  slotsContainerLarge: {
    width: '60%',
    marginLeft: '20%',
  },
  timeslotDisabledProvider: {
    borderColor: COLORS.whiteGray,
    backgroundColor: COLORS.black10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  timeslotContainerDisabled: {
    borderColor: COLORS.whiteGray,
    backgroundColor: COLORS.black10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  slotsContainerSelected: {
    borderColor: COLORS.orange,
    backgroundColor: COLORS.orange,
  },
  timeSlotTextOfContainer: {
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
    fontSize: 12,
  },
  timeSlotTextPicked: {
    fontFamily: FONTS.book,
    color: COLORS.white,
    fontSize: 12,
  },
  infoContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    paddingBottom: 12,
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
});
