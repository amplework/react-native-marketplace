import I18n from 'locales';
import React, { useEffect, useRef } from 'react';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import { ErrorMessage } from 'shared/field';
import COLORS from 'utils/colors';
var tzlookup = require("tz-lookup");

export interface Props {
  formattedAddress?: string;
  placeholder?: string;
  onPress: (address: any) => void;
  required?: boolean;
  error?: string;
}

const GoogleAutocomplete: React.FC<Props> = ({
  formattedAddress,
  placeholder,
  onPress,
  required = false,
  error,
}) => {
  const ref = useRef<GooglePlacesAutocompleteRef>(null);

  const handlePressAddress = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null,
  ) => {
    let utcTimezone = tzlookup(details?.geometry?.location.lat, details?.geometry?.location.lng);
    onPress({
      placeId: data?.place_id,
      formattedAddress: details?.formatted_address,
      name: data.structured_formatting.main_text,
      location: details?.geometry?.location,
      utcOffset: details?.utc_offset,
      utctimezone: utcTimezone,
    });
  }

  useEffect(() => {
    if (ref.current?.setAddressText && formattedAddress) {
      ref.current?.setAddressText(formattedAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder={
          // formattedAddress ||
          `${required ? '*' : ''}${placeholder || I18n.t('form.addressLine')}`
        }
        minLength={2}
        fetchDetails
        onPress={handlePressAddress}
        textInputProps={{
          placeholderTextColor: getPlaceholderColor(formattedAddress, error),
        }}
        styles={{
          textInputContainer: {
            height: 40,
            borderRadius: 5,
            borderColor: error ? COLORS.orangeRed : COLORS.border,
            borderWidth: 1,
          },
          textInput: {
            height: 38,
            paddingTop: 5,
            fontSize: 14,
          },
        }}
        GooglePlacesDetailsQuery={{
          fields: 'address_components,formatted_address,geometry,utc_offset',
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
      <ErrorMessage error={error} mt={4} />
    </>
  );
};

export default GoogleAutocomplete;

const getPlaceholderColor = (value?: string, error?: string) => {
  if (value) {
    return COLORS.black;
  }

  return error ? COLORS.orangeRed : COLORS.warmGrey;
};
