import { translations } from 'locales';
import React, { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import Button from 'shared/button';
import COLORS from 'utils/colors';

import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { MainPageTemplate } from 'shared/templates';
import { BackButton } from 'shared/backButton';
import { updateProviderProfile, updateProviderDetails } from 'store/actions/provider';
import { getIndustries } from 'store/entities/industries';
import { SocialMediaList } from 'components/settings/provider/socialMedia/components/socialMediaList';

type Props = {
  navigation: any;
};

const SocialSetup: React.FC<Props> = ({ navigation }) => {

  const loading = useSelector((state: any) => state.provider.loading);
  const provider = useSelector((state: any) => state.provider.provider);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleGoBack = () => navigation.goBack();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: null,
      headerLeft: () => <BackButton />,
    });
  }, [navigation, t]);


  useEffect(() => {
    dispatch(getIndustries());
  }, [dispatch]);

  const handleSkip = () => dispatch(updateProviderDetails({ isSocials: true }, true))

  return (
    <MainPageTemplate
      containerStyle={styles.container}
      bc={COLORS.white}
      loading={loading}
    >
      <Text style={styles.title}>{t(translations.social.title)}</Text>
      <SocialMediaList />
      <View style={styles.rowButtons}>
        <Button
          onPress={handleSkip}
          text={t(translations.social.skip)}
          buttonStyle={styles.btnSkip}
          textStyle={styles.textContinue}
        />
        <Button
          onPress={handleGoBack}
          text={t(translations.social.continue)}
          buttonStyle={styles.btnContinue}
          textStyle={styles.textContinue}
        />
      </View>
    </MainPageTemplate>
  );
};

export { SocialSetup };
