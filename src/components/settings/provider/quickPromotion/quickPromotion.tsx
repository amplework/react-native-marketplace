import React, { useLayoutEffect } from 'react';
import { styles } from './style';
import { BackButton } from 'shared/backButton';
import SafeContainer from 'shared/container';
import I18n from 'locales';
import { AddButton } from './components/addButton';
import { AddEditQuickPromotion } from '../addEditQuickPromotion';
import { useSelector } from 'react-redux';
import { quickPromotionSelectors } from 'store/entities/quickPromotion';
import { QuickPromotionList } from './components/quickPromotionList';

const QuickPromotion: React.FC<any> = ({ navigation }) => {

  const isModalOpened = useSelector(quickPromotionSelectors.isModalOpened);  

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={I18n.t('quickPromotion.title')} />
      ),
    });
  }, [navigation]);  

  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      {isModalOpened && <AddEditQuickPromotion />}
      <AddButton />
      <QuickPromotionList />
    </SafeContainer>
  );
};

export { QuickPromotion };