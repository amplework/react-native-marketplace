import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import { isIOS } from 'utils/device';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.whiteFour,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 7,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  taskCard: {
    flexDirection: 'row',
    borderRadius: 7,
    alignItems: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
  },
  taskCardTouchable: {
    flex: 1,
    flexDirection: 'row',
  },
  checkbox: {
    marginTop: isIOS ? 12 : 8,
  },
  weekSlider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: COLORS.orange10,
  },
  doubleArrow: {
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
  },
});
