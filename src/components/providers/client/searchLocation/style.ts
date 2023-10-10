import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  textInputContainer: {
    height: 40,
    marginBottom: 20,
    borderRadius: 25,
    backgroundColor: COLORS.white,
  },
  textInput: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginBottom: 0,
    paddingVertical: 10,
    paddingLeft: 40,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: COLORS.whiteGray,
    color: COLORS.brownishGrey,
  },
  searchIconContainer: {
    position: 'absolute',
    zIndex: 3,
    left: 16,
    top: 12,
  },
  useCurrentLocationButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  previousPlacesList: {
    paddingLeft: 24,
  },
  previousPlacesItem: {
    marginBottom: 20,
  },
  clearHistoryButton: {
    alignItems: 'center',
    marginVertical: 20,
  },
});
