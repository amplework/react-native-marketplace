import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { AddButton } from 'shared/button/add';
import SafeContainer from 'shared/container';
import { openEditModal, productsSelectors } from 'store/entities/products';
import { EditPackages } from '../editPackages';

// import { PackageList } from './components/packageList';
import { styles } from './style';

interface Props extends StackScreenProps<RootStackParamList> {}

const AppointmentPackages: React.FC<Props> = ({ navigation }) => {
  const isModalOpened = useSelector(productsSelectors.isModalOpened);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={I18n.t('settings.links.package')} />
      ),
    });
  }, [navigation]);

  const handlePress = () => dispatch(openEditModal(null));

  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      {isModalOpened && <EditPackages />}
      <AddButton title={I18n.t('packages.addPackage')} onPress={handlePress} />
      {/* <PackageList /> */}
    </SafeContainer>
  );
};

export { AppointmentPackages };
