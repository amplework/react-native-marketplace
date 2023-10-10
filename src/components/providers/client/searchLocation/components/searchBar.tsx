import { useAppStateEvent } from 'hooks';
import I18n from 'locales';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Linking, TouchableOpacity, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import Permissions, { RESULTS } from 'react-native-permissions';
import { useDispatch } from 'react-redux';
import { Navigator } from 'service/navigator';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { toast } from 'shared/toast';
import { selectPlace } from 'store/entities/providers';
import COLORS from 'utils/colors';
import { LOCATION_PERMISSION } from 'utils/constants';

import { styles } from '../style';

Geocoder.init('AIzaSyDtN8tEhH79TiHl56qlP1P5gSSLOgyIvik');

type PermissionStatus =
  | 'unavailable'
  | 'blocked'
  | 'denied'
  | 'granted'
  | 'limited';

const SearchBar: React.FC = () => {
  const [permission, setPermission] = useState<PermissionStatus>();

  const dispatch = useDispatch();

  const updatePermissionStatus = useCallback(async () => {
    const status = await Permissions.check(LOCATION_PERMISSION);

    setPermission(status);
  }, []);

  useAppStateEvent({ onForeground: updatePermissionStatus });

  useEffect(() => {
    updatePermissionStatus();
  }, [updatePermissionStatus]);

  const handleSearch = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null,
  ) => {
    dispatch(
      selectPlace({
        id: data.place_id,
        name: data.structured_formatting.main_text,
        formattedAddress: details?.formatted_address,
        location: details?.geometry.location,
      }),
    );

    Navigator.goBack();
  };

  const showPermissionBlockedAlert = () =>
    Alert.alert(I18n.t('common.warning'), I18n.t('search.locationBlocked'), [
      { text: I18n.t('search.notNow') },
      {
        text: I18n.t('search.openSettings'),
        onPress: Linking.openSettings,
      },
    ]);

  const getCurrentLocation = async () => {
    if (permission === RESULTS.BLOCKED) {
      return showPermissionBlockedAlert();
    }

    const status = await Permissions.request(LOCATION_PERMISSION);

    setPermission(status);

    if (status === RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const json = await Geocoder.from({ latitude, longitude });
          const {
            place_id,
            geometry,
            formatted_address,
            address_components: [{ short_name }],
          } = json.results[0];

          dispatch(
            selectPlace({
              id: place_id,
              name: short_name,
              formattedAddress: formatted_address,
              location: geometry.location,
            }),
          );

          Navigator.goBack();
        },
        (error) => toast.info(error.message),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  };

  return (
    <View style={styles.header}>
      <Box row>
        <GooglePlacesAutocomplete
          renderLeftButton={() => (
            <View style={styles.searchIconContainer}>
              <Icon src={require('assets/global/search.png')} size={17} />
            </View>
          )}
          placeholder={I18n.t('search.searchForLocation')}
          minLength={2}
          fetchDetails
          onPress={handleSearch}
          styles={{
            textInputContainer: styles.textInputContainer,
            textInput: styles.textInput,
          }}
          GooglePlacesDetailsQuery={{
            fields: 'address_components,formatted_address,geometry',
          }}
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3',
          ]}
          query={{
            key: 'AIzaSyDtN8tEhH79TiHl56qlP1P5gSSLOgyIvik',
            language: 'en',
          }}
        />
      </Box>
      <TouchableOpacity
        onPress={getCurrentLocation}
        style={styles.useCurrentLocationButton}
      >
        <Icon
          src={require('assets/global/mapsMyLocation.png')}
          size={20}
          mr={10}
        />
        <Paragraph size="s" color={COLORS.clearBlue}>
          {I18n.t('search.useCurrentLocation')}
        </Paragraph>
      </TouchableOpacity>
    </View>
  );
};

export { SearchBar };
