import React, { useRef, useState } from 'react';
import * as RNLocalize from "react-native-localize";
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Platform, ScrollView, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import Permissions, { PERMISSIONS } from 'react-native-permissions';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheet } from 'shared/bottomSheet';
import { Box } from 'shared/box';
import Button from 'shared/button';
import GoogleAutocomplete from 'shared/googleAutocomplete';
import { closeAddressModal } from 'store/entities/modal';

import { EditHeader } from './editHeader';
import { styles } from './style';
import COLORS from 'utils/colors';
import moment from 'moment-timezone';
import { Paragraph } from 'shared/paragraph';
import { Icon } from 'shared/icon';
import { userSelectors } from 'store/entities/user';
import { alert } from 'shared/alert';
import { t, translations } from 'locales';
import { toast } from 'shared/toast';
var tzlookup = require("tz-lookup");

Geocoder.init('AIzaSyDtN8tEhH79TiHl56qlP1P5gSSLOgyIvik');

export interface Props {
  formattedAddress?: any;
  onChangeAddress: (address: any) => void;
}

const AddressModal: React.FC<Props> = ({
  formattedAddress,
  onChangeAddress,
}) => {
  const mapRef = useRef<MapView>();
  const user = useSelector(userSelectors.user);
  const userAddress = user?.address;
  const [state, setState] = useState<any>({
    isMapReady: false,
    pin: {
      latitude: 40.7580,
      longitude: -73.9855,
    },
    reset: false,
    address: formattedAddress,
  });

  const LATITUDE_DELTA = 0.0922
  const LONGITUDE_DELTA = 0.0421
  const radius = 2

  const confirmSave = () => {
    onChangeAddress(state?.address);
    dispatch(closeAddressModal())
  };

  const dispatch = useDispatch();

  const onMapLayout = () => {
    setState((prev: any) => ({ ...prev, isMapReady: true }))
  }

  const prevLat = state?.address?.location?.lat;
  const prevLng = state?.address?.location?.lng;

  const onDragTheMarker = async (e: any) => {
    if (e.nativeEvent.coordinate) {
      const lat = e.nativeEvent.coordinate.latitude;
      const lng = e.nativeEvent.coordinate.longitude;
      const utcTimezone = tzlookup(lat, lng);
      const offfset = moment.tz(utcTimezone).utcOffset();

      const json = await Geocoder.from({ lat, lng });
      const {
        place_id,
        geometry,
        formatted_address,
        address_components: [{ short_name }],
      } = json.results[0];

      let changedAddress = {
        placeId: place_id,
        formattedAddress: formatted_address,
        name: short_name,
        location: geometry.location,
        utcOffset: offfset,
        utctimezone: utcTimezone,
      }

      setState((prev: any) => ({
        ...prev,
        reset: false,
        pin: { latitude: lat, longitude: lng },
        address: changedAddress
      }));
    }
  }

  const onChangeLocation = async (value: any) => {
    let changedAddress = {
      placeId: value?.placeId,
      formattedAddress: value?.formattedAddress,
      name: value?.name,
      location: value.location,
      utcOffset: value?.utcOffset,
      utctimezone: value?.utctimezone,
    }
    setState((prev: any) => ({
      ...prev,
      reset: false,
      pin: { latitude: value?.location?.lat, longitude: value?.location?.lng },
      address: changedAddress
    }));
  }

  const onResetLocation = async () => {
    let deviceTimezone = RNLocalize.getTimeZone();
    let today = moment.tz(deviceTimezone);
    let offset = today.utcOffset();
    if (Platform.OS === "ios") {
      const auth = await Geolocation.requestAuthorization("whenInUse");
      if (auth === "denied") {
        return alert.info(
          t(translations.dashboard.userLocationDenied),
          t(translations.common.warning),
        );
      }

      if (auth === "granted") {
        Geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const json = await Geocoder.from({ latitude, longitude });
            const utcTimezone = tzlookup(latitude, longitude);
            const offfset = moment.tz(utcTimezone).utcOffset();

            const {
              place_id,
              geometry,
              formatted_address,
              address_components: [{ short_name }],
            } = json.results[0];

            let changedAddress = {
              placeId: place_id,
              formattedAddress: formatted_address,
              name: short_name,
              location: geometry.location,
              utcOffset: offfset,
              utctimezone: utcTimezone,
            }

            setState((prev: any) => ({
              ...prev,
              reset: false,
              pin: { latitude: latitude, longitude: longitude },
              address: changedAddress
            }));
          },
          (error) => toast.info(error.message),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    } else {
      const auth = await Permissions.request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (auth === "denied") {
        return alert.info(
          t(translations.dashboard.userLocationDenied),
          t(translations.common.warning),
        );
      }

      if (auth === "granted") {
        Geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const json = await Geocoder.from({ latitude, longitude });
            const utcTimezone = tzlookup(latitude, longitude);
            const offfset = moment.tz(utcTimezone).utcOffset();

            const {
              place_id,
              geometry,
              formatted_address,
              address_components: [{ short_name }],
            } = json.results[0];

            let changedAddress = {
              placeId: place_id,
              formattedAddress: formatted_address,
              name: short_name,
              location: geometry.location,
              utcOffset: offfset,
              utctimezone: utcTimezone,
            }

            setState((prev: any) => ({
              ...prev,
              reset: false,
              pin: { latitude: latitude, longitude: longitude },
              address: changedAddress
            }));
          },
          (error) => toast.info(error.message),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    }
  }

  var coordinateLat = prevLat ? prevLat : state.pin?.latitude || 40.7580;
  var coordinatLong = prevLng ? prevLng : state.pin?.longitude || -73.9855;

  mapRef?.current?.animateToRegion({
    latitude: state.reset ? (userAddress?.location.lat || 40.7580) : coordinateLat,
    longitude: state.reset ? (userAddress?.location.lng || -73.9855) : coordinatLong,
    latitudeDelta: LATITUDE_DELTA * Number(radius / 15),
    longitudeDelta: LONGITUDE_DELTA * Number(radius / 15)
  }, 2000);

  const addressDetail = state?.address?.formattedAddress == 'null' ? '' : state?.address?.formattedAddress;

  return (
    <BottomSheet>
      <EditHeader
        onClose={() => dispatch(closeAddressModal())}
      />
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <Box flex>
          <>
            <GoogleAutocomplete
              required
              formattedAddress={addressDetail}
              error={''}
              onPress={onChangeLocation}
            />
            <Paragraph size='xxs' mv={10} color={COLORS.warmGrey} >
              {'Note: If you do not find the address in suggestion then you can also pin location manually.'}
            </Paragraph>
            <View style={styles.mapContainer}>
              <MapView
                ref={mapRef}
                zoomEnabled={true}
                maxZoomLevel={17}
                provider={'google'}
                showsCompass={false}
                style={{ width: '100%', height: '100%', borderRadius: 5 }}
                onLayout={onMapLayout}
              >
                <Marker
                  draggable={true}
                  coordinate={{
                    latitude: state.reset ? (userAddress?.location.lat || 40.7580) : (coordinateLat || 40.7580),
                    longitude: state.reset ? (userAddress?.location.lng || -73.9855) : (coordinatLong || -73.9855),
                  }}
                  pinColor={COLORS.orange}
                  onDragEnd={onDragTheMarker}
                />
              </MapView>
              <View style={styles.compassContainer}>
                <Icon
                  color={COLORS.brownishGrey}
                  src={require('assets/global/compass.png')}
                  size={30}
                  onPress={onResetLocation}
                />
              </View>
            </View>
            <Paragraph size='xxs' mv={10} color={COLORS.black} >
              {`Pinned Location: ${addressDetail || ''}`}
            </Paragraph>
          </>
        </Box>
        <Button
          text={'Save Address'}
          onPress={confirmSave}
          buttonStyle={styles.saveButton}
        />
      </ScrollView>
    </BottomSheet>
  );
};

export { AddressModal };