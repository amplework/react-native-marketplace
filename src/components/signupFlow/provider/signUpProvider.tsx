import { StackNavigationProp } from '@react-navigation/stack';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import RNlocalize from 'react-native-localize';
import { useDispatch, useSelector } from 'react-redux';
import { MainPageTemplate } from 'shared/templates';
import { toast } from 'shared/toast';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import Permissions, { PERMISSIONS } from 'react-native-permissions';
import {
  changeStepProvider,
  signUpProviderAction,
  signUpProviderFacebook,
  signUpProviderGoogle,
  signUpProviderApple,
  signUpProviderSelectors,
  verifyEmail,
  verifySecureCode,
} from 'store/entities/signUpProvider';
import { SignUpProviderValues } from 'types/signUpFlow';
import COLORS from 'utils/colors';
import { onFacebook, onGoogle, onPressApple } from 'utils/socialBlades';

import { formalizeSocialSignupData, getValidationSchema } from '../helpers/utils';
import { signUpEmailSchema } from '../helpers/validation';
import Verification from '../verification';
import { BasicInfo } from './basicInfo';
import { EnterEmail } from './enterEmail';
import ProgressBar from './progressBar';
import { signUpStyles as S } from './style';
import { isIOS } from 'utils/device';
import { alert } from 'shared/alert';
import { t, translations } from 'locales';
import { countryCodes } from 'utils/countryCodes';
import moment from 'moment-timezone';
var tzlookup = require("tz-lookup");


export interface Props {
  navigation: StackNavigationProp<any, any>;
}

const SignUpProvider: React.FC<Props> = ({ navigation }) => {
  const locales = RNlocalize.getLocales()[0];
  const localCountryCode = locales.countryCode;
  const [currentValidationSchema, setCurrentValidationSchema] =
    useState<any>(signUpEmailSchema);
  const [emailDisabled, setEmailDisabled] = useState(true);
  const step = useSelector(signUpProviderSelectors.step);
  const loading = useSelector(signUpProviderSelectors.loading);
  const googleIdToken = useSelector(signUpProviderSelectors.accessTokenGoogle);
  const facebookAccessToken = useSelector(
    signUpProviderSelectors.accessTokenFacebook,
  );
  const appleId = useSelector(signUpProviderSelectors.accessTokenApple);

  const dispatch = useDispatch();

  let addressObj: any = {
    "placeId": "1",
    "formattedAddress": "null",
    "name": "",
    "location": {
      "lat": 0,
      "lng": 0
    },
    "utcOffset": 0,
    "addressLine2": ""
  }

  const { values, setFieldValue, errors, handleSubmit } =
    useFormik<SignUpProviderValues>({
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        social: false,
        countryCode: '',
        phoneNumber: '',
        industryId: null,
        isHouseCallAllowed: false,
        businessName: '',
        expectedEarning: '',
        address: addressObj,
        utctimezone: '',
        addressDetailsLine: '',
        serviceId: null,
        secureCode: '',
        avatar: null,
        logo: null,
        services: [],
      },
      validationSchema: currentValidationSchema,
      validateOnChange: false,
      onSubmit: (formValues, actions) => {
        if (values?.email.split('@')[0].length <= 2) {
          toast.info('Please enter Email using standard format: xyz@sub.domain')
          return;
        }
        let newFormData: any = new FormData();
        if (step === 0) {
          dispatch(verifyEmail(values.email));
        }

        if (step !== 2) {
          actions.setTouched({});
          actions.setSubmitting(true);

          dispatch(changeStepProvider(step == 0 ? step : step + 1));
        }

        newFormData.append('email', values.email);
        newFormData.append('password', values.password);
        newFormData.append('social', values.social);
        newFormData.append('secureCode', values.secureCode);
        // newFormData.append('deviceType', isIOS ? 'ios' : 'android');
        newFormData.append('address', JSON.stringify(values?.address));

        if (step === 2) {
          if (values.social) {
            if (googleIdToken) {
              newFormData.append('googleIdToken', googleIdToken);
            } else if (appleId) {
              newFormData.append('appleId', appleId);
            } else {
              newFormData.append('facebookAccessToken', facebookAccessToken);
            }
          }

          dispatch(signUpProviderAction(newFormData));
        }
      },
    });

  const getCurrentLocation = async () => {
    if (isIOS) {
      const auth = await Geolocation.requestAuthorization("whenInUse");
      if (auth === "denied") {
        return alert.info(
          t(translations.dashboard.deniedPermission),
          t(translations.common.warning),
        );
      }

      if (auth === "granted") {
        Geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const utcTimezone = tzlookup(latitude, longitude);
            const utcOffset = moment.tz(utcTimezone).utcOffset();
            const json = await Geocoder.from({ latitude, longitude });
            const result = json?.results[0];
            let currentAddress: any = {
              placeId: result?.place_id,
              formattedAddress: result?.formatted_address,
              name: "",
              location: result?.geometry?.location,
              utctimezone: utcTimezone,
              utcOffset: utcOffset,
              addressLine2: ""
            }
            handleFieldChange('address')(currentAddress);
          },
          (error) => toast.info(error.message),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    } else {
      const auth = await Permissions.request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (auth === "denied") {
        return alert.info(
          t(translations.dashboard.deniedPermission),
          t(translations.common.warning),
        );
      }

      if (auth === "granted") {
        Geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const utcTimezone = tzlookup(latitude, longitude);
            const utcOffset = moment.tz(utcTimezone).utcOffset();
            const json = await Geocoder.from({ latitude, longitude });
            const result = json?.results[0];
            let currentAddress: any = {
              placeId: result?.place_id,
              formattedAddress: result?.formatted_address,
              name: "",
              location: result?.geometry?.location,
              utctimezone: utcTimezone,
              utcOffset: utcOffset,
              addressLine2: ""
            }
            handleFieldChange('address')(currentAddress);
          },
          (error) => toast.info(error.message),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, [])

  useEffect(() => {
    const validationSchema = getValidationSchema(step);

    setCurrentValidationSchema(validationSchema);
  }, [step]);

  const onGooglePress = () => {
    onGoogle()
      .then((result: any) => {
        if (result) {
          handleFieldChange('email')(result?.email)
          let signupForm = formalizeSocialSignupData({
            firstName: result?.givenName || null,
            lastName: result?.familyName || null,
            email: result?.email,
            address: JSON.stringify(values?.address),
            photo: result?.photo || null,
            social: true,
            googleIdToken: result?.idToken
          })

          dispatch(signUpProviderGoogle({
            accessToken: result?.idToken,
            formData: signupForm
          }));
        }
      })
  };

  const onFacebookPress = () => {
    onFacebook()
      .then((result: any) => {
        if (result) {
          handleFieldChange('email')(result?.email)
          let signupForm = formalizeSocialSignupData({
            firstName: result?.givenName || null,
            lastName: result?.familyName || null,
            email: result?.email,
            address: JSON.stringify(values?.address),
            photo: result?.photo || null,
            social: true,
            facebookAccessToken: result?.accessToken
          })

          dispatch(signUpProviderFacebook({
            accessToken: result?.idToken,
            formData: signupForm
          }));
        }
      })
      .catch((error: any) => console.log('error - ', error));
  };

  const onApplePress = () => {
    onPressApple().then((result: any) => {
      if (result) {
        handleFieldChange('email')(result?.email);
        let signupForm = formalizeSocialSignupData({
          firstName: result?.fullName.givenName || null,
          lastName: result?.fullName.familyName || null,
          email: result?.email,
          address: JSON.stringify(values?.address),
          photo: result?.photo || null,
          social: true,
          appleId: result?.user
        })
        dispatch(signUpProviderApple({
          email: result?.email,
          appleId: result?.user,
          formData: signupForm
        }));
      }
    });
  };

  const onResendCode = () => {
    dispatch(verifyEmail(values.email));
  };

  const onBack = () => {
    const previousStep = values.social
      ? step - 1 >= 2
        ? step - 1
        : 0
      : step - 1;

    dispatch(changeStepProvider(previousStep))
  };

  const handleFieldChange =
    <F extends keyof SignUpProviderValues>(field: F) =>
      (value: SignUpProviderValues[F]) =>
        setFieldValue(field, value);

  const getCurrentStep = () => {
    switch (step) {
      case 0:
        return (
          <EnterEmail
            email={values.email}
            error={errors?.email}
            onChangeEmail={handleFieldChange('email')}
            onFacebook={onFacebookPress}
            onGoogle={onGooglePress}
            onApple={onApplePress}
            onLogin={handleSubmit}
            onSignIn={() => navigation.push('Login')}
          />
        );
      case 1:
        return (
          <Verification
            onResendCode={onResendCode}
            onContinue={(code: string) => {
              setFieldValue('secureCode', code);
              dispatch(
                verifySecureCode({
                  code,
                  email: values.email,
                  onSuccess: handleSubmit,
                }),
              );
            }}
          />
        );
      case 2:
        return (
          <BasicInfo
            values={values}
            errors={errors}
            disabled={emailDisabled}
            onChange={handleFieldChange}
            onContinue={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <MainPageTemplate
      loading={loading}
      containerStyle={S.container}
      bc={COLORS.white}
    >
      {step > 0 && (
        <ProgressBar
          hideProgress={true}
          step={step - 1}
          onBack={onBack}
        />
      )}
      {getCurrentStep()}
    </MainPageTemplate>
  );
};

export { SignUpProvider };
