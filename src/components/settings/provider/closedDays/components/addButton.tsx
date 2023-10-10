import I18n from 'locales';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Box } from 'shared/box';
import Button from 'shared/button';
import { openModal } from 'store/entities/closedDays';

import { styles } from '../style';

const AddButton: React.FC = () => {
  const dispatch = useDispatch();

  const handlePress = () => dispatch(openModal());

  return (
    <Box pv={20} ph={24}>
      <Button
        text={I18n.t('closedDays.addDays')}
        onPress={handlePress}
        image={require('assets/global/add.png')}
        buttonStyle={styles.addButton}
        textStyle={styles.addButtonText}
      />
    </Box>
  );
};

export { AddButton };
