import { LABELS, titleFound } from 'components/providerCalendar/labels';
import RenderAppointment from 'components/providerCalendar/renderAppointment';
import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Box } from 'shared/box';
import Button from 'shared/button';
import { Datepicker } from 'shared/datepicker';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import SubClientsModal from 'shared/subClientsModal';
import { theme } from 'theme';
import { formatDate, parseDate } from 'utils/dates';

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
  setProductId: (id: number) => void;
  setService: (id: number) => void;
  selectedClient: any;
  products: any;
  service: any;
  onSearch: () => void;
  onSelectedClient: (client: any) => void;
  meta: any;
  appointments: any;
  clients: any;
  setEnd: (value: boolean) => void;
  end: boolean;
  onMore: () => void;
  isCompact: boolean;
  toggleCompact: () => void;
}

const SearchAppointments: React.FC<Props> = ({
  setEnd,
  end,
  onMore,
  startDate,
  endDate,
  query,
  searchActive,
  setQuery,
  setStartDate,
  setEndDate,
  setShowSubClients,
  selectedClient,
  products,
  service,
  setProductId,
  setService,
  onSearch,
  meta,
  appointments,
  showSubClients,
  clients,
  onSelectedClient,
  isCompact,
  toggleCompact,
}) => {
  const { t } = useTranslation();

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
                title={startDate ? formatDate(startDate) : LABELS.selectStart}
                label={LABELS.selectStart}
                required
                mode="date"
                date={startDate || parseDate()}
                onConfirm={setStartDate}
                icon={require('assets/global/calendar.png')}
                mr={15}
              />
              <Datepicker
                flex
                title={endDate ? formatDate(endDate) : LABELS.selectEnd}
                label={LABELS.selectEnd}
                required
                mode="date"
                date={endDate || parseDate()}
                minimumDate={startDate}
                onConfirm={setEndDate}
                icon={require('assets/global/calendar.png')}
              />
            </Box>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                ...(Platform.OS !== 'android' && {
                  zIndex: 99,
                }),
                marginBottom: 16,
              }}
            >
              <TouchableOpacity
                style={styles.infoContainer}
                onPress={() => setShowSubClients(true)}
              >
                <Text style={styles.valueContainer}>
                  {selectedClient
                    ? selectedClient?.firstName
                    : LABELS.clientName}
                </Text>
                <Image
                  source={require('assets/global/chevron.png')}
                  style={styles.arrowDown}
                />
              </TouchableOpacity>
              <View style={{ width: '48%' }}>
                <DropDownPicker
                  items={
                    products
                      ?.filter((item: any) => item.type === 'service')
                      ?.map((item: any) => ({
                        label: item?.name,
                        value: item?.id,
                      })) || []
                  }
                  placeholder={LABELS.service}
                  defaultValue={service}
                  containerStyle={{ height: 40 }}
                  dropDownMaxHeight={80}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  customArrowUp={() => (
                    <Image
                      source={require('assets/global/chevron.png')}
                      style={styles.arrowDown}
                    />
                  )}
                  customArrowDown={() => (
                    <Image
                      source={require('assets/global/chevron.png')}
                      style={styles.arrowDown}
                    />
                  )}
                  globalTextStyle={styles.valueContainer}
                  onChangeItem={(item) => {
                    setProductId(item.value);
                    setService(item.value);
                  }}
                />
              </View>
            </View>
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
          <Text style={styles.appointmentText}>
            {titleFound(meta?.totalCount || 0)}
          </Text>
          <FlatList
            data={appointments || []}
            renderItem={({ item }) => <RenderAppointment item={item} />}
            keyExtractor={(item: any) => item.id.toString()}
            onEndReached={() => {
              if (!end) {
                onMore();
                setEnd(true);
              }
            }}
            onMomentumScrollBegin={() => setEnd(false)}
            onEndReachedThreshold={0.1}
            contentContainerStyle={{ paddingBottom: 150 }}
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

export default SearchAppointments;
