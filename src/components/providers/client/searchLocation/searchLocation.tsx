import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import React, { useLayoutEffect } from 'react';
import { BackButton } from 'shared/backButton';
import SafeContainer from 'shared/container';

import { PreviousPlacesList } from './components/previousPlacesList';
import { SearchBar } from './components/searchBar';
import { styles } from './style';

interface Props extends StackScreenProps<RootStackParamList> {}

const SearchLocation: React.FC<Props> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton />,
    });
  }, [navigation]);

  return (
    <SafeContainer containerStyle={styles.container}>
      <SearchBar />
      <PreviousPlacesList />
    </SafeContainer>
  );
};

export { SearchLocation };
