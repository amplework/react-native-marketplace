import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Button from 'shared/button';
import SafeContainer from 'shared/container';
import ScrollContainer from 'shared/scrollContainer';
import { commonStyles } from 'theme/styles';
import { capitalizeSentence } from 'utils/strings';

import { addPageStyles as S } from './style';

type Props = {
  entity: string;
  loading: boolean;
  onSavePress: () => void;
};

const AddPageTemplate: React.FC<Props> = ({
  entity,
  loading,
  children,
  onSavePress,
}) => {
  const { t } = useTranslation();

  return (
    <SafeContainer containerStyle={commonStyles.container}>
      <ScrollContainer styleExtra={S.content}>{children}</ScrollContainer>
      <View style={S.saveButtonContainer}>
        <Button
          text={t(translations.common.saveDetailsButton, {
            name: capitalizeSentence(t(entity)),
          })}
          onPress={onSavePress}
          loading={loading}
        />
      </View>
    </SafeContainer>
  );
};

export { AddPageTemplate };
