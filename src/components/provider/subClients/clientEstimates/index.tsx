import { ALL_ESTIMATES_STATUSES } from 'components/invoices/helpers/constants';
import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { AddButton } from 'shared/button/add';
import { Sign, TwinCounter, TwinCounterBar } from 'shared/counter';
import { ISubClient } from 'types/subClients';
import { ClientEstimateList } from './components/clientEstimateList';

import styles from './style';
import { estimatesSelectors, getEstimates } from 'store/entities/estimates';
import { Box } from 'shared/box';
import { Separator } from 'shared/separator';

export interface Props {
  details?: ISubClient;
}

const ClientEstimates: React.FC<Props> = ({ details }) => {
  const estimates = useSelector(estimatesSelectors.estimates);
  const total = useSelector(estimatesSelectors.total);
  const totalSum = useSelector(estimatesSelectors.totalSum);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fetchEstimates = () => {
    dispatch(
      getEstimates({
        orderBy: 'date',
        status: ALL_ESTIMATES_STATUSES,
        clientSubprofileId: details?.id,
      }),
    );
  };

  const navigateToAddEstimate = () =>
    Navigator.navigate('Estimates', {
      screen: 'AddEditEstimate',
      params: { subClient: details, onCreate: fetchEstimates, fromClientDetail: true },
    });

  return (
    <View style={styles.container}>
      <AddButton
        title={t(translations.estimates.addClientEstimate, {
          client: details?.firstName,
        })}
        onPress={navigateToAddEstimate}
      />
      {estimates.length > 0 && (
        <TwinCounter mb={20} mh={24}>
          <TwinCounterBar
            label={t(translations.estimates.totalEstimateValue)}
            adornment={<Sign>$</Sign>}
          >
            {totalSum}
          </TwinCounterBar>
          <TwinCounterBar label={t(translations.estimates.totalEstimates)}>
            {total}
          </TwinCounterBar>
        </TwinCounter>
      )}
      <ClientEstimateList subClient={details} />
    </View>
  );
};

export default ClientEstimates;
