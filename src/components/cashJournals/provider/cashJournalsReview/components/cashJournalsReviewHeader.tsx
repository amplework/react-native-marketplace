import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';

import { cashJournalsReviewStyles as S } from '../style';

const CashJournalsReviewHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={S.header}>
      <Image
        source={require('assets/backgrounds/reviewBackground.png')}
        style={S.headerImage}
      />
      <Paragraph size="l" type="bold" color={COLORS.white}>
        {t(translations.cashJournals.review.title)}
      </Paragraph>
    </View>
  );
};

export { CashJournalsReviewHeader };
