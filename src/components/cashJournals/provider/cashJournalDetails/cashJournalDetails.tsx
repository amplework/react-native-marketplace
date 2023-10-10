import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useLayoutEffect } from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { alert } from 'shared/alert';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import Button from 'shared/button';
import SafeContainer from 'shared/container';
import { Icon } from 'shared/icon';
import { Loader } from 'shared/loader';
import { Pressable } from 'shared/pressable';
import {
  cashJournalsSelectors,
  deleteCashJournal,
} from 'store/entities/cashJournals';

import { CashJournalDetailsHeader } from './components/cashJournalDetailsHeader';
import { CashJournalDetailsSection } from './components/cashJournalDetailsSection';
import { cashJournalDetailsStyles as S } from './style';

type Props = StackScreenProps<RootStackParamList, 'CashJournalDetails'>;

const CashJournalDetails: React.FC<Props> = ({ navigation, route }) => {
  const { journal, onEdit, onDelete } = route.params;

  const loading = useSelector(cashJournalsSelectors.deleteLoading);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const confirmDelete = useCallback(() => {
    alert.deletion({
      entity: t(translations.common.entities.cashJournal),
      onDelete: () =>
        dispatch(deleteCashJournal({ id: journal.id, onSuccess: onDelete })),
    });
  }, [dispatch, t, journal.id, onDelete]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton />,
      headerRight: () => (
        <Pressable onPress={confirmDelete} ph={24}>
          <Icon src={require('assets/global/deleteGray.png')} size={20} />
        </Pressable>
      ),
    });
  }, [navigation, confirmDelete]);

  const navigateToEdit = () =>
    Navigator.navigate('AddEditCashJournal', { journal, onEdit });

  return (
    <SafeContainer containerStyle={S.container}>
      <Loader loading={loading} />
      <Box>
        <CashJournalDetailsHeader journal={journal} />
        <CashJournalDetailsSection journal={journal} />
      </Box>
      <Button
        text={t(translations.cashJournals.details.edit)}
        onPress={navigateToEdit}
        image={require('assets/global/pencilFill.png')}
      />
    </SafeContainer>
  );
};

export { CashJournalDetails };
