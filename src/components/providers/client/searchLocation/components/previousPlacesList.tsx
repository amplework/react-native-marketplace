import I18n from 'locales';
import React, { useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import {
  deletePreviousPlaces,
  getPreviousPlaces,
  providersSelectors,
  selectPlace,
} from 'store/entities/providers';
import { IPlace } from 'types/address';
import COLORS from 'utils/colors';

import { styles } from '../style';

const PreviousPlacesList: React.FC = () => {
  const previousPlaces = useSelector(providersSelectors.previousPlaces);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPreviousPlaces());
  }, [dispatch]);

  const handlePress = (place: IPlace) => () => {
    dispatch(selectPlace(place));

    Navigator.goBack();
  };

  const clearHistory = () => dispatch(deletePreviousPlaces());

  return (
    <FlatList
      data={previousPlaces}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={handlePress(item)}
          style={styles.previousPlacesItem}
        >
          <Box pr={24}>
            <Box row ai="center" mb={4}>
              <Icon
                src={require('assets/global/outlinedTime.png')}
                size={20}
                mr={8}
              />
              <Paragraph flex>{item.name}</Paragraph>
            </Box>
            <Paragraph size="s" type="book" mb={12}>
              {item.formattedAddress}
            </Paragraph>
          </Box>
          <Separator />
        </TouchableOpacity>
      )}
      ListHeaderComponent={() =>
        previousPlaces.length ? (
          <TouchableOpacity
            onPress={clearHistory}
            style={styles.clearHistoryButton}
          >
            <Paragraph size="s" color={COLORS.orangeRed}>
              {I18n.t('search.clearHistory')}
            </Paragraph>
          </TouchableOpacity>
        ) : null
      }
      ListFooterComponent={() => <Box h={20} />}
      style={styles.previousPlacesList}
    />
  );
};

export { PreviousPlacesList };
