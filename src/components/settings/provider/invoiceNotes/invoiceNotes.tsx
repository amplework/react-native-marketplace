import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import Button from 'shared/button';
import SafeContainer from 'shared/container';
import { Field } from 'shared/field';
import { Loader } from 'shared/loader';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';
import { alert } from 'shared/alert';
import { Pressable } from 'shared/pressable';
import { useTranslation } from 'react-i18next';
import { PdfPreview } from 'shared/pdfPreview';
import {
  productsSelectors,
  getProducts,
} from 'store/entities/products';
import { getProviderProfile } from 'store/actions/provider';
import { previewInvoice, invoicesSelectors, closeInvoicePreview } from 'store/entities/invoices';
import {
  editInvoiceNotes,
  invoiceNotesSelectors,
} from 'store/entities/invoiceNotes';
import { IProviderUser } from 'types/users';
import { DummyData } from './dummyData';
import { styles } from './style';
import moment from 'moment';

type State = {
  provider: {
    provider: IProviderUser | null;
    loading: boolean;
  };
};

type Props = StackScreenProps<RootStackParamList>;

const InvoiceNotes: React.FC<Props> = ({ navigation }) => {
  const { provider } = useSelector((state: any) => state.provider);
  const pdf = useSelector(invoicesSelectors.pdf);
  const products = useSelector(productsSelectors.products);
  const providerLoading = useSelector((state: State) => state.provider.loading);
  const loading = useSelector(invoiceNotesSelectors.loading);
  const { t } = useTranslation();

  const [notes, setNotes] = useState('');

  const dispatch = useDispatch();

  let activeProducts = products.filter((e) => e.isActive !== false)

  const handlePreviewInvoice = () => {
    let product = [{"id": activeProducts[0]?.id, "name": activeProducts[0]?.name, "price": activeProducts[0]?.price, "quantity": 1}]
    DummyData.notes = notes;
    DummyData.products = product;
    DummyData.date = moment().startOf('day').toISOString();
    DummyData.dueDate = moment().endOf('day').toISOString();

    if(activeProducts?.length == 0) {
      alert.info("Please add some services first");
    } else {
      dispatch(previewInvoice(DummyData));
    }
  }
  const handleClosePreview = () => dispatch(closeInvoicePreview());

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={I18n.t('settings.links.invoiceNotes')} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(getProviderProfile());
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setNotes(provider?.invoiceNotes ?? '');
  }, [provider]);

  const handleSubmit = () => dispatch(editInvoiceNotes(notes));

  return (
    <SafeContainer containerStyle={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Loader loading={providerLoading} />
        <Paragraph mb={4}>{I18n.t('invoiceNotes.title')}</Paragraph>
        <Paragraph size="s" type="book" mb={20}>
          {I18n.t('invoiceNotes.subtitle')}
        </Paragraph>
        <Field
          value={notes}
          label={I18n.t('invoiceNotes.fields.notes')}
          onChange={setNotes}
          size="xl"
          multiline
        />
        <Pressable onPress={handlePreviewInvoice} ai="center" jc="flex-end" mt={30} >
          <Paragraph size="s" color={COLORS.clearBlue}>
            {('Preview Notes/Terms')}
          </Paragraph>
        </Pressable>
      </ScrollView>
      <View style={styles.saveButtonContainer}>
        <Button
          text={I18n.t('common.save')}
          onPress={handleSubmit}
          loading={loading}
        />
      </View>
      <PdfPreview
        visible={!!pdf}
        pdfUrl={pdf}
        title="Invoice preview"
        onClose={handleClosePreview}
      />
    </SafeContainer>
  );
};

export { InvoiceNotes };
