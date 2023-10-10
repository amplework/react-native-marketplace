import { ReviewBlock } from 'components/sales/components/reviewBlock';
import { SalesItem } from 'components/sales/components/salesItem';
import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { Box } from 'shared/box';
import Button from 'shared/button';
import { Datepicker } from 'shared/datepicker';
import DropMenu from 'shared/dropMenu';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import SubClientsModal from 'shared/subClientsModal';
import { theme } from 'theme';
import { formatDate, parseDate } from 'utils/dates';

import { LABELS } from './labels';
import styles from './style';

export interface Props {
  searchActive: boolean;
  showSubClients: boolean;
  setQuery: (text: string) => void;
  query: string;
  startDate: any;
  endDate: any;
  setStartDate: (date: any) => void;
  setEndDate: (date: any) => void;
  setShowSubClients: (value: boolean) => void;
  setMethodId: (id: number) => void;
  selectedClient: any;
  methods: any;
  scrollRef: any;
  onSearch: () => void;
  onSelectedClient: (client: any) => void;
  methodId: number | null;
  meta: any;
  totalSum: number;
  sales: any;
  clients: any;
  setEnd: (value: boolean) => void;
  end: boolean;
  onMore: () => void;
  isCompact: boolean;
  toggleCompact: () => void;
}

const SearchSales: React.FC<Props> = ({
  setEnd,
  end,
  onMore,
  startDate,
  totalSum,
  endDate,
  query,
  searchActive,
  setQuery,
  setStartDate,
  setEndDate,
  setShowSubClients,
  selectedClient,
  methods,
  setMethodId,
  onSearch,
  methodId,
  meta,
  sales,
  showSubClients,
  clients,
  onSelectedClient,
  scrollRef,
  isCompact,
  toggleCompact,
}) => {
  const { t } = useTranslation();
  const providerDetails = useSelector((state: any) => state.provider.provider);
  const providerOffset = providerDetails?.utcOffset;

  return (
    <>
      <View style={styles.searchContainer}>
        <Field
          value={query}
          onChange={setQuery}
          label={t(translations.common.fields.keyword)}
          endAdornment={
            <Icon src={require('assets/global/search.png')} size={18} />
          }
          mb={16}
        />
        {!isCompact && (
          <>
            <Box row jc="space-between" mb={16}>
              <Datepicker
                flex
                title={
                  startDate
                    ? formatDate(startDate, { utc: false })
                    : LABELS.selectStart
                }
                label={LABELS.selectStart}
                required
                mode="date"
                timeZoneOffset={providerOffset}
                date={startDate || parseDate()}
                onConfirm={setStartDate}
                icon={require('assets/global/calendar.png')}
                mr={15}
              />
              <Datepicker
                flex
                title={
                  endDate
                    ? formatDate(endDate, { utc: false })
                    : LABELS.selectEnd
                }
                label={LABELS.selectEnd}
                required
                mode="date"
                timeZoneOffset={providerOffset}
                date={endDate || parseDate()}
                minimumDate={startDate}
                onConfirm={setEndDate}
                icon={require('assets/global/calendar.png')}
              />
            </Box>
            <TouchableOpacity
              style={styles.infoContainer}
              onPress={() => setShowSubClients(true)}
            >
              <Text style={styles.valueContainer}>
                {selectedClient ? selectedClient?.firstName : LABELS.clientName}
              </Text>
              <Image
                source={require('assets/global/chevron.png')}
                style={styles.arrowDown}
              />
            </TouchableOpacity>
            <DropMenu
              placeholder={LABELS.paymentMethod}
              placeholderValue={null}
              onChange={setMethodId}
              items={methods
                ?.filter((item: any) => item.isActive)
                ?.map((item: any) => ({
                  label: item.shortName,
                  value: item.id,
                }))}
              value={methodId}
              mb={16}
            />
          </>
        )}
        <Box row ai="center">
          <TouchableOpacity
            onPress={toggleCompact}
            style={theme.styles.tuneButton}
          >
            <Icon src={require('assets/global/tune.png')} size={22} />
          </TouchableOpacity>
          <Button
            text={LABELS.search}
            onPress={onSearch}
            buttonStyle={styles.searchButton}
          />
        </Box>
      </View>
      {!searchActive && <View style={styles.backgroundList} />}
      {searchActive && (
        <View style={styles.backgroundList}>
          <FlatList
            ref={scrollRef}
            data={sales || []}
            ListHeaderComponent={() => (
              <ReviewBlock totalSum={totalSum} count={meta?.totalCount} />
            )}
            renderItem={({ item }) => (
              <SalesItem
                sale={item}
                onPress={() =>
                  Navigator.navigate('SaleDetails', { id: item.id })
                }
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={() => {
              if (!end) {
                onMore();
                setEnd(true);
              }
            }}
            onMomentumScrollBegin={() => setEnd(false)}
            onEndReachedThreshold={0.1}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: 150,
            }}
          />
        </View>
      )}
      <SubClientsModal
        subClients={clients}
        onModalShow={(show: boolean) => setShowSubClients(show)}
        showModal={showSubClients}
        onChangeSelectedClient={(client: any) => {
          onSelectedClient(client);
          setShowSubClients(false);
        }}
      />
    </>
  );
};

export default SearchSales;
