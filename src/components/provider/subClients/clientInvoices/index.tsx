import { ALL_INVOICE_STATUSES } from 'components/invoices/helpers/constants';
import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { AddButton } from 'shared/button/add';
import { Sign, TwinCounter, TwinCounterBar } from 'shared/counter';
import { getInvoices, invoicesSelectors } from 'store/entities/invoices';
import { ISubClient } from 'types/subClients';

import { ClientInvoicesList } from './components/clientInvoicesList';
import styles from './style';

export interface Props {
  details?: ISubClient;
}

const ClientInvoices: React.FC<Props> = ({ details }) => {
  const invoices = useSelector(invoicesSelectors.invoices);
  const total = useSelector(invoicesSelectors.total);
  const totalSum = useSelector(invoicesSelectors.totalSum);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fetchInvoices = () => {
    dispatch(
      getInvoices({
        orderBy: 'date',
        status: ALL_INVOICE_STATUSES,
        clientSubprofileId: details?.id,
      }),
    );
  };

  const navigateToAddInvoice = () =>
    Navigator.navigate('Invoices', {
      screen: 'AddEditInvoice',
      params: { subClient: details, onCreate: fetchInvoices, fromClientDetail: true },
    });

  return (
    <View style={styles.container}>
      <AddButton
        title={t(translations.invoices.addClientInvoice, {
          client: details?.firstName,
        })}
        onPress={navigateToAddInvoice}
      />
      {invoices.length > 0 && (
        <TwinCounter mb={20} mh={24}>
          <TwinCounterBar
            label={t(translations.invoices.totalInvoiceValue)}
            adornment={<Sign>$</Sign>}
          >
            {totalSum}
          </TwinCounterBar>
          <TwinCounterBar label={t(translations.invoices.totalInvoices)}>
            {total}
          </TwinCounterBar>
        </TwinCounter>
      )}
      <ClientInvoicesList subClient={details} />
    </View>
  );
};

export default ClientInvoices;
