import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { StackNavigationProp } from '@react-navigation/stack';
import BasicInfo from 'components/signupFlow/client/basicInfo';
import ChooseNeeds from 'components/signupFlow/client/chooseNeeds';
import OnlinePaymentSetting from 'components/signupFlow/client/onlinePaymentSettings';
import AddPaymentMethodSetup from 'components/signupFlow/client/addPaymentMethodSetup';
import EnterEmail from 'components/signupFlow/client/enterEmail';
import PersonalInfo from 'components/signupFlow/client/personalInfo';
import ProgressBar from 'components/signupFlow/provider/progressBar';
import Verification from 'components/signupFlow/verification';
import * as RNLocalize from "react-native-localize";
import Permissions, { PERMISSIONS, RESULTS } from 'react-native-permissions';
import { t, translations } from 'locales';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alert } from 'shared/alert';
import { MainPageTemplate } from 'shared/templates';
import { changeStep } from 'store/actions/signUpClient';
import { signUpFacebook, signUpGoogle, signUpApple } from 'store/actions/signUpClient';
import { verifyEmailClient } from 'store/actions/user';
import { signUpClient, verifySecureCodeClient } from 'store/actions/user';
import { getIndustries, industriesSelectors } from 'store/entities/industries';
import COLORS from 'utils/colors';
import { countryCodes } from 'utils/countryCodes';
import { onFacebook, onGoogle, onPressApple } from 'utils/socialBlades';
var tzlookup = require("tz-lookup");


import styles from './style';
import { toast } from 'shared/toast';
import { closeCountryModal, getUser, userSelectors } from 'store/entities/user';
import { BackHandler, Platform } from 'react-native';
import { Navigator } from 'service/navigator';
import { getClientProfile } from 'store/actions/client';

export interface Props {
  navigation: StackNavigationProp<any, any>;
}

const SignUp: React.FC<Props> = ({ navigation }) => {
  const {
    step,
    accessTokenFacebook,
    accessTokenGoogle,
    appleId,
    social,
    emailUser,
    firstNameUser,
    lastNameUser,
    avatarUser,
  } = useSelector((state: any) => state.signUpClient);
  const deviceInfo = useSelector(userSelectors.deviceLocales);
  const locales = RNLocalize.getLocales()[0];
  const localCountryCode = locales.countryCode;
  const filterCountry = countryCodes.filter((e: any) => e.sortname == (deviceInfo?.country || localCountryCode))[0];

  const loading = useSelector((state: any) => state.signUpClient.loading);
  const [email, setEmail] = useState(emailUser);
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(firstNameUser);
  const [lastName, setLastName] = useState(lastNameUser);
  const [countryCode, setCountryCode] = useState(deviceInfo?.country || localCountryCode);
  const [dialCode, setDialCode] = useState<any>(filterCountry.phonecode);
  const [telephone, setTelephone] = useState('');
  const [gender, setGender] = useState('');
  const [emailDisabled, setEmailDisabled] = useState(true);
  const [avatar, setAvatar] = useState(avatarUser);
  const [otherNumber, setOtherNumber] = useState('');
  const [addressLineFirst, setAddressLineFirst] = useState('');
  const [addressLineSecond, setAddressLineSecond] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [otherNumberDetails, setOtherNumberDetails] = useState('');
  const [prefForMessage, setPrefForMessage] = useState('in app');
  const [birthday, setBirthday] = useState(null);
  const [birthdayData, setBirthdayData] = useState(null);
  const [moreDetails, setMoreDetails] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [selected, setSelected] = useState([]);
  const [address, setAddress] = useState<any>('');
  const [timeZone, setTimeZone] = useState('');
  const [addressDetailsLine, setAddressDetailsLine] = useState('');
  const industries = useSelector(industriesSelectors.industries);
  const industriesLoading = useSelector(industriesSelectors.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIndustries());
  }, []);
  const onVerifyEmail = () => {
    dispatch(verifyEmailClient({ email }));
  };
  const onResendCode = () => {
    dispatch(verifyEmailClient({ email }));
  };

  const getCurrentLocation = async () => {
    // const status = await Permissions.check(LOCATION_PERMISSION);
    if (Platform.OS === "ios") {
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

            const json = await Geocoder.from({ latitude, longitude });
            const result = json?.results[0]?.address_components;

            const findCountry = result?.filter((e: any) => e.types[0] == 'country');

            const userCountryCode = findCountry?.length ? findCountry[0]?.short_name : localCountryCode;
            const filterCode = countryCodes.filter((e: any) => e.sortname == (userCountryCode || localCountryCode))[0];

            setCountryCode(userCountryCode);
            setDialCode(filterCode?.phonecode);


            // const timezonestring = tzlookup(geometry.location.lat, geometry.location.lng);

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

            const json = await Geocoder.from({ latitude, longitude });
            const result = json?.results[0]?.address_components;

            const findCountry = result?.filter((e: any) => e.types[0] == 'country');

            const userCountryCode = findCountry?.length ? findCountry[0]?.short_name : localCountryCode;
            const filterCode = countryCodes.filter((e: any) => e.sortname == (userCountryCode || localCountryCode))[0];

            setCountryCode(userCountryCode);
            setDialCode(filterCode?.phonecode);
            // const timezonestring = tzlookup(geometry.location.lat, geometry.location.lng);
          },
          (error) => toast.info(error.message),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  function handleBackButtonClick() {
    console.log("handle back buttomn");
    return true;
  }
  
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []);

  const onSignUpUser = () => {
    const formData = new FormData();

    let userInfo: any = {
      email,
      firstName,
      lastName,
      phoneNumber: `+${dialCode}-${telephone}`,
      countryCode: countryCode,
    };
    address.utctimezone = timeZone;
    if (address) {
      userInfo = {
        ...userInfo,
        address: JSON.stringify({
          ...address,
          addressLine2: addressDetailsLine,
          utctimezone: timeZone,
        }),
      };
    }
    if (otherNumber) {
      userInfo = { ...userInfo, alternatePhoneNumber: `+${dialCode}-${otherNumber}` };
    }
    if (!social) {
      setEmailDisabled(true);
      userInfo = { ...userInfo, password, secureCode: verifyCode };
    }
    if (social && accessTokenFacebook) {
      userInfo = { ...userInfo, facebookAccessToken: accessTokenFacebook };
    }
    if (social && accessTokenGoogle) {
      userInfo = { ...userInfo, googleIdToken: accessTokenGoogle };
    }
    if (social && appleId) {
      userInfo = { ...userInfo, appleId: appleId };
    }
    if (birthday) {
      userInfo = { ...userInfo, birthday: birthdayData };
    }
    if (gender) {
      userInfo = { ...userInfo, gender };
    }
    // if(timeZone) {
    //   userInfo = {...userInfo, utctimezone: timeZone}
    // }
    if (prefForMessage) {
      userInfo = { ...userInfo, notificationChannel: prefForMessage };
    }
    if (selected.length) {
      userInfo = {
        ...userInfo,
        serviceIds: JSON.stringify(selected.map((item: any) => item.id)),
      };
    }

    for (const name in userInfo) {
      // @ts-ignore
      formData.append(name, userInfo[name]);
    }
    if (avatar?.path) {
      formData.append('photo', {
        uri: avatar?.path,
        name: avatar?.filename || 'name.jpg',
        type: avatar?.mime,
      });
    }
    //return false;


    if (avatar && !avatar.path) {
      formData.append('photoUrl', avatar);
    }

    !loading &&
      dispatch(signUpClient(formData, navigation));
  };

  const SetTimeZone = async (value: any) => {
    let tzlookupValue = tzlookup(value.lat, value.lng);

    setTimeZone(tzlookupValue);
  }
  const onGooglePress = () => {
    onGoogle()
      .then((result: any) => {
        result?.email && setEmailDisabled(true);
        result && setEmail(result?.email);
        result && setFirstName(result?.givenName ? result.givenName : '');
        result && setLastName(result?.familyName ? result.familyName : '');
        result && setAvatar(result?.photo ? result.photo : '');
        result &&
          dispatch(signUpGoogle({ accessToken: result?.idToken }, navigation));
      })
      .catch((error: any) => console.log('error - ', error));
  };
  const onFacebookPress = () => {
    onFacebook()
      .then((result: any) => {        
        result?.email == undefined && setEmailDisabled(false);
        result && setEmail(result?.email);
        result && setFirstName(result?.name.split(' ')[0]);
        result && setLastName(result?.name.split(' ')[1]);
        result &&
          setAvatar(
            result?.picture?.data?.url ? result.picture?.data?.url : '',
          );
        result &&
          dispatch(
            signUpFacebook({ accessToken: result.accessToken }, navigation),
          );
      })
      .catch((error: any) => console.log('error - ', error));
  };
  const onApplePress = () => {
    onPressApple().then((result: any) => {
      if (result) {
        result?.email && setEmailDisabled(true);
        result && setEmail(result?.email);
        result && setFirstName(result?.fullName.givenName ? result?.fullName.givenName : '');
        result && setLastName(result?.fullName.familyName ? result?.fullName.familyName : '');
        result && setAvatar(result?.photo ? result.photo : '');
        dispatch(
          signUpApple({ email: result?.email, appleId: result?.user }, navigation),
        );
      }
    });
  };
  const getCurrentStep = () => {
    switch (step) {
      case 0:
        return (
          <EnterEmail
            email={email}
            onChangeEmail={(text: string) => setEmail(text)}
            onFacebook={onFacebookPress}
            onGoogle={onGooglePress}
            onLogin={onVerifyEmail}
            onApple={onApplePress}
            onSignIn={() => navigation.push('Login')}
          />
        );
      case 1:
        return (
          <Verification
            onResendCode={onResendCode}
            onContinue={(code: string) => {
              setVerifyCode(code);
              dispatch(verifySecureCodeClient({ code, email }));
            }}
          />
        );
      case 2:
        return (
          <BasicInfo
            email={email}
            social={social}
            emailDisabled={emailDisabled}
            password={password}
            onChangeEmail={(text: string) => setEmail(text)}
            onChangePassword={(text: string) => setPassword(text)}
            onContinue={() => dispatch(changeStep(3))}
          />
        );
      case 3:
        return (
          <PersonalInfo
            utctimezone={timeZone}
            gender={gender}
            firstName={firstName}
            lastName={lastName}
            countryCode={countryCode}
            telephone={telephone}
            avatar={avatar}
            otherNumber={otherNumber}
            prefForMessage={prefForMessage}
            otherNumberDetails={otherNumberDetails}
            moreDetails={moreDetails}
            addressLineFirst={addressLineFirst}
            addressLineSecond={addressLineSecond}
            state={state}
            zip={zip}
            birthday={birthday}
            address={address}
            addressDetailsLine={addressDetailsLine}
            onChangeAddressDetailsLine={(text: string) =>
              setAddressDetailsLine(text)
            }
            onSelectAddress={(addressInfo) => { SetTimeZone(addressInfo.location), setAddress(addressInfo) }}
            onChangeBirthday={(text: any) => setBirthday(text)}
            onChangeTimezone={(value: string) => setTimeZone(value)}
            onChangeBirthdayData={(text: any) => setBirthdayData(text)}
            onChangeFirstName={(text: string) => setFirstName(text)}
            onChangeLastName={(text: string) => setLastName(text)}
            onChangeGender={(text: string) => setGender(text)}
            onChangeCountry={(value: any) => {
              setCountryCode(value.countryCode);
              setDialCode(value.dialCode);
              dispatch(closeCountryModal());
            }}
            onChangeTelephone={(text: string) => {
              const re = /^[0-9\b]+$/;
              if (text == '' || re.test(text)) {
                setTelephone(text)
              }
            }}
            onChangeOtherNumber={(text: string) => setOtherNumber(text)}
            onChangePrefForMessage={(text: string) => setPrefForMessage(text)}
            onChangeOtherNumberDetails={(text: string) => {
              const re = /^[0-9\b]+$/;
              if (text == '' || re.test(text)) {
                setOtherNumberDetails(text)
              }
            }}
            onChangeAddressLineFirst={(text: string) =>
              setAddressLineFirst(text)
            }
            onChangeAddressLineSecond={(text: string) =>
              setAddressLineSecond(text)
            }
            onChangeState={(text: string) => setState(text)}
            onChangeZip={(text: string) => setZip(text)}
            onChangeMoreDetails={(value: boolean) => setMoreDetails(value)}
            onChangeAvatar={(image: string | undefined) =>
              setAvatar(image || '')
            }
            onContinue={() => dispatch(changeStep(4))}
            dialCode={dialCode}
          />
        );
      case 4:
        return (
          <ChooseNeeds
            selected={selected}
            industries={industries}
            onChangeEmail={(text: string) => setEmail(text)}
            onChangePassword={(text: string) => setPassword(text)}
            onChangeSelected={(items: any) => setSelected(items)}
            onContinue={onSignUpUser}
          />
        );
      case 5:
        return (
          <OnlinePaymentSetting
            onSignIn={() => {
              dispatch(getUser())
              dispatch(getClientProfile())
              Navigator.navigate('BottomTabNavigator', {
                screen: 'Home'
              });
            }}
          />
        );
      case 6:
        return (
          <AddPaymentMethodSetup
            onSignIn={() => {
              dispatch(getUser())
              dispatch(getClientProfile())
              Navigator.navigate('BottomTabNavigator', {
                screen: 'Home'
              });
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <MainPageTemplate
      loading={loading || industriesLoading}
      containerStyle={styles.container}
      bc={COLORS.white}
    >
      {step > 0 && (
        <ProgressBar
          step={step - 1}
          hideBackButtom={step === 5}
          hideProgress={step === 1}
          shortProgress
          onBack={() => {
            if (!step) {
              return navigation.goBack();
            }
            if (social && step - 1 >= 2) {
              return dispatch(changeStep(step - 1));
            } else if (social && step - 1 < 2) {
              return dispatch(changeStep(0));
            }
            return dispatch(
              changeStep(social ? (step - 1 >= 2 ? step - 1 : 0) : step - 1),
            );
          }}
        />
      )}
      {getCurrentStep()}
    </MainPageTemplate>
  );
};

export default SignUp;
