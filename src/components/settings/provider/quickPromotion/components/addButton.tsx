import I18n from 'locales';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Box } from 'shared/box';
import Button from 'shared/button';
import { styles } from '../style';
import { openQuickPromoModal } from 'store/entities/quickPromotion';

const AddButton: React.FC = () => {
  const dispatch = useDispatch();

  const handlePress = () => dispatch(openQuickPromoModal(null));

  return (
    <Box pv={20} ph={24}>
      <Button
        text={I18n.t('quickPromotion.add')}
        onPress={handlePress}
        image={require('assets/global/add.png')}
        buttonStyle={styles.addButton}
        textStyle={styles.addButtonText}
      />
    </Box>
  );
};

export { AddButton };