import I18n from 'locales';
import React from 'react';
import { Navigator } from 'service/navigator';
import { Box } from 'shared/box';
import Button from 'shared/button';

import { styles } from '../style';

const AddButton: React.FC = () => {
  const handlePress = () => Navigator.navigate('SearchProviders');

  return (
    <Box pv={20} ph={24}>
      <Button
        text={I18n.t('providers.addProvider')}
        onPress={handlePress}
        image={require('assets/global/add.png')}
        buttonStyle={styles.addButton}
        textStyle={styles.addButtonText}
      />
    </Box>
  );
};

export { AddButton };
