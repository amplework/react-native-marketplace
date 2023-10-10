import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { translations } from 'locales';
import { useTranslation } from 'react-i18next';
import { Navigator } from 'service/navigator';
import { getSalesSpecialsByProviders, providersSelectors } from 'store/entities/providers';
import { DealsItem } from '../../components/dealsItem';
import { styles } from '../style';
import { ListEmptyComponent } from './listEmptyComponent';
import { ProvidersFilters } from './providersFilters';
import { ResultsCountHeader } from './resultsCountHeader';
import { Loader } from 'shared/loader';

interface Props {
  serviceIds: number[];
  setServicesIds: (ids: number[]) => void;
}

const SpecialAndDiscounts: React.FC<Props> = ({
  serviceIds,
  setServicesIds,
}) => {
  const searchResults = useSelector(providersSelectors.searchResults);
  const loading = useSelector(providersSelectors.searchLoading);
  const isModalOpened = useSelector(providersSelectors.isModalOpened);
  const salesSpecialsResults = useSelector(providersSelectors.searchedSalesSpecialsResults);
  const salesSpecialsLoading = useSelector(providersSelectors.searchedSalesSpecialsLoading);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (searchResults) {
      let providers = searchResults.map((val: any) => val?.id)
      if (providers?.length > 0) {
        dispatch(getSalesSpecialsByProviders({ providerIds: providers }))
      }
    }
  }, [searchResults])

  const handlePress = (deals: any) => () =>
    Navigator.navigate('SalesSpecialDetails', { id: deals.id });

  if (!loading && !salesSpecialsLoading && ((!searchResults.length) || (!salesSpecialsResults.length))) {
    return (
      <>
        {isModalOpened && (
          <ProvidersFilters
            initialSelectedServices={serviceIds}
            onSubmit={setServicesIds}
          />
        )}
        <ListEmptyComponent title={t(translations.search.noSaleResults)} />
      </>
    );
  }

  return (
    <View style={styles.searchResultsContainer}>
      <Loader loading={salesSpecialsLoading} />
      {isModalOpened && (
        <ProvidersFilters
          initialSelectedServices={serviceIds}
          onSubmit={setServicesIds}
        />
      )}
      <ResultsCountHeader count={salesSpecialsResults?.length} />
      <FlatList
        data={salesSpecialsResults}
        keyExtractor={(item) => `${item?.id}`}
        renderItem={({ item: deals }) => (
          <DealsItem
            deals={deals}
            onPress={handlePress(deals)}
          />
        )}
        style={styles.searchResultsList}
      />
    </View>
  );
};

export { SpecialAndDiscounts };
