import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { AddButton } from 'shared/button/add';
import { Sign, TwinCounter, TwinCounterBar } from 'shared/counter';
import { salesSelectors } from 'store/entities/sales';
import { ISubClient } from 'types/subClients';

import { ClientSalesList } from './components/clientSalesList';
import { clientSalesStyles as S } from './style';

type Props = {
  client?: ISubClient;
};

const ClientSales: React.FC<Props> = ({ client }) => {
  const sales = useSelector(salesSelectors.sales);
  const meta = useSelector(salesSelectors.meta);
  const totalSum = useSelector(salesSelectors.totalSum);

  const { t } = useTranslation();  

  const navigateToAddSale = () => Navigator.navigate('AddSale', { client });

  return (
    <View style={S.container}>
      <AddButton
        title={t(translations.sales.addClientSale, {
          client: client?.firstName,
        })}
        onPress={navigateToAddSale}
      />
      {sales.length > 0 && (
        <TwinCounter mb={20} mh={24}>
          <TwinCounterBar
            label={t(translations.sales.totalSalesValue)}
            adornment={<Sign>$</Sign>}
          >
            {totalSum}
          </TwinCounterBar>
          <TwinCounterBar label={t(translations.sales.totalSales)}>
            {meta.totalCount}
          </TwinCounterBar>
        </TwinCounter>
      )}
      <ClientSalesList client={client} />
    </View>
  );
};

export { ClientSales };
