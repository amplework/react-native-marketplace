import { StackNavigationProp } from '@react-navigation/stack';
import I18n from 'locales';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, Platform, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from 'shared/button';
import CheckBox from 'shared/checkbox';
import { Field } from 'shared/field';
import { MainPageTemplate } from 'shared/templates';
import { userSelectors } from 'store/entities/user';
import {
  signIn,
  signInFacebook,
  signInGoogle,
  signInApple,
} from 'store/entities/user/slice';
import COLORS from 'utils/colors';
import REGEX from 'utils/regex';
import { onFacebook, onGoogle, onPressApple } from 'utils/socialBlades';

import styles from './style';
import { isSmallDevice } from 'utils/device';

export interface Props {
  navigation: StackNavigationProp<any, any>;
}

export interface RememberUser {
  Email: string;
  Password: string;
}

const Login: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const loading = useSelector(userSelectors.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const getRememberUser: any = await getRememberedUser();
      if (getRememberUser !== undefined) {
        const getStoredData: RememberUser = JSON.parse(getRememberUser);
        setCheckbox(getStoredData.Email ? true : false)
        setEmail(getStoredData.Email)
        setPassword(getStoredData.Password)
      } else {
        return;
      }
    }
    fetchData()
  }, []);

  const onLogin = () => {
    if (email.trim().length == 0) {
      setEmailError('Email is a required field');
    } else if (REGEX.email.test(String(email).trim().toLowerCase())) {
      setEmailError('');
    } else {
      setEmailError('Email field has wrong format');
      return;
    }
    if (password.trim().length == 0) {
      setPasswordError('Password is a required field');
      return;
    }
    if (checkbox) {
      rememberUser();
    } else {
      forgetUser()
    }
    dispatch(signIn({ email, password }));
  };
  const onGooglePress = () => {
    onGoogle()
      .then(
        (result: any) => {
          result && dispatch(signInGoogle({ accessToken: result.idToken }))
        }
      )
      .catch((error: any) => console.log('error - ', error));
  };
  const onFacebookPress = () => {
    onFacebook()
      .then(
        (result: any) => {
          result &&
            dispatch(signInFacebook({ accessToken: result.accessToken }))
        }
      )
      .catch((error: any) => console.log('error - ', error));
  };

  const onApplePress = () => {
    onPressApple().then((result: any) => {
      if (result) {
        dispatch(signInApple({ email: null, appleId: result?.user }))
      }
    });
  };

  const toggleRememberMe = (value: boolean) => setCheckbox(value);

  const rememberUser = async () => {
    try {
      let storedObject: RememberUser = {
        Email: '',
        Password: '',
      };
      storedObject.Email = email;
      storedObject.Password = password;

      await AsyncStorage.setItem('Longtail-User', JSON.stringify(storedObject));
    } catch (error) {
      // Error saving data
    }
  };

  const forgetUser = async () => {
    console.log("forgetUser();");
    try {
      await AsyncStorage.removeItem('Longtail-User');
    } catch (error) {
      // Error removing
    }
  };

  const getRememberedUser = async () => {
    try {
      const userData: any = await AsyncStorage.getItem('Longtail-User');
      if (userData !== null) {
        return userData;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  return (
    <MainPageTemplate
      loading={loading}
      containerStyle={styles.container}
      bc={COLORS.white}
    >
      <Image style={styles.logo} source={require('assets/global/alpha.png')} />
      <Text style={styles.title}>{I18n.t('login.title')}</Text>
      <Text style={styles.description}>{I18n.t('login.description')}</Text>
      <Field
        autoCapitalize="none"
        value={email}
        error={emailError}
        onChange={(text) => {
          setEmailError('');
          setEmail(text);
        }}
        label={I18n.t('login.emailField')}
        keyboardType="email-address"
        mt={isSmallDevice ? 10 : 16}
      />
      <Field
        secure
        autoCapitalize="none"
        value={password}
        error={passwordError}
        onChange={(text) => {
          setPasswordError('');
          setPassword(text);
        }}
        label={I18n.t('login.passwordField')}
        mt={isSmallDevice ? 10 : 16}
      />
      <View style={styles.rowItems}>
        <CheckBox
          styleContainer={styles.checkboxContainer}
          checked={checkbox}
          onChange={(value: boolean) => toggleRememberMe(value)}
          label={I18n.t('login.keepMe')}
        />
        <TouchableOpacity onPress={() => navigation.push('ForgotPassword')}>
          <Text style={styles.forgotText}>{I18n.t('login.forgot')}</Text>
        </TouchableOpacity>
      </View>
      <Button
        buttonStyle={styles.btnLogin}
        textStyle={styles.textLogin}
        onPress={onLogin}
        text={I18n.t('login.loginTo')}
      />
      <View style={styles.rowNewUser}>
        <Text style={styles.getStartTitle}>{I18n.t('login.newUser')}</Text>
        <TouchableOpacity onPress={() => navigation.push('ChooseRole')}>
          <Text style={[styles.getStartTitle, styles.getStartActive]}>
            {I18n.t('login.getStarted')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowButtons}>
        {Platform.OS === "ios" && (
          <Button
            image={require('assets/global/apple.png')}
            onPress={onApplePress}
            text={'Sign in with Apple'}
            textStyle={styles.textGoogle}
            buttonStyle={styles.btnApple}
          />
        )}
        <Button
          image={require('assets/global/google.png')}
          onPress={onGooglePress}
          text={'Sign in with Google'}
          textStyle={styles.textGoogle}
          buttonStyle={styles.btnGoogle}
        />
        <Button
          image={require('assets/global/facebook.png')}
          onPress={onFacebookPress}
          text={'Sign in with Facebook'}
          textStyle={styles.textFacebook}
          buttonStyle={styles.btnFacebook}
        />
      </View>
    </MainPageTemplate>
  );
};

export default Login;