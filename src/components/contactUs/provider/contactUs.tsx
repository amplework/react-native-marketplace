import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { LinkingHelper } from 'service/linkingHelper';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';
import Button from 'shared/button';
import SafeContainer from 'shared/container';
import { userSelectors } from 'store/entities/user';
import { theme } from 'theme';
import { isProvider } from 'types/users';

import { SUPPORT_EMAIL, SUPPORT_PHONE } from '../helpers/constants';
import { ContactUsDetails } from './components/contactUsDetails';
import { ContactUsHeader } from './components/contactUsHeader';
import { contactUsStyles as S } from './style';

type Props = StackScreenProps<RootStackParamList>;

const ContactUs: React.FC<Props> = ({ navigation }) => {
  const user = useSelector(userSelectors.user);
  const { t } = useTranslation();

  const backHandler = () => {
    if(isProvider(user)) {
      Navigator.drawer.open();
    } else {
      Navigator.goBack();
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton
          title={t(translations.contactUs.header)}
          onPress={backHandler}
        />
      ),
    });
  }, [navigation, t]);

  const handleCall = () => LinkingHelper.telprompt(SUPPORT_PHONE);

  const handleMail = () => LinkingHelper.mailto(SUPPORT_EMAIL);

  return (
    <SafeContainer containerStyle={theme.styles.flex}>
      <ScrollView
        style={S.scrollView}
        contentContainerStyle={S.scrollContainer}
      >
        <ContactUsHeader />
        <ContactUsDetails />
      </ScrollView>
      <View style={S.buttonsContainer}>
        <Button
          text={t(translations.contactUs.callUs)}
          onPress={handleCall}
          image={require('assets/global/call.png')}
          buttonStyle={S.primaryButton}
        />
        <Button
          text={t(translations.contactUs.sendEmail)}
          onPress={handleMail}
          image={require('assets/global/mailGray.png')}
          buttonStyle={S.secondaryButton}
          textStyle={S.secondaryText}
        />
      </View>
    </SafeContainer>
  );
};

export { ContactUs };
