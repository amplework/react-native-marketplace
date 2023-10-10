import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';
import { NavigationList } from 'shared/navigationList/navigationList';
import { MainPageTemplate } from 'shared/templates';
import COLORS from 'utils/colors';

import { REPORTS_LINKS } from '../helpers/utils';

type Props = StackScreenProps<RootStackParamList>;

const Reports: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton
          title={t(translations.reports.title)}
          onPress={Navigator.drawer.open}
        />
      ),
    });
  }, [navigation, t]);

  return (
    <MainPageTemplate bc={COLORS.white}>
      <NavigationList data={REPORTS_LINKS} />
    </MainPageTemplate>
  );
};

export { Reports };
