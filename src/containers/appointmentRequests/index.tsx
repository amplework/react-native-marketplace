import { StackNavigationProp } from '@react-navigation/stack';
import { AppointmentsApi } from 'api/appointments';
import I18n, { translations } from 'locales';
import moment from 'moment-timezone';
import React, { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { alert } from 'shared/alert';
import { AlertComponent } from 'shared/alert/alertComponent';
import Button from 'shared/button';
import SubClientsModal from 'shared/subClientsModal';
import { MainPageTemplate } from 'shared/templates';
import { confirmConnectedClient } from 'store/actions/appointments';
import {
  confirmRequestExistClient,
  confirmRequestNewClient,
} from 'store/actions/appointments';
import {
  appointmentsSelector,
  deleteAppointment,
  getPendingAppointments,
} from 'store/entities/appointments';
import { getSubClients, subClientsSelectors } from 'store/entities/subClients';
import styles from './style';

import {
  openSalesDetailModal,
  salesSpecialSelectors,
} from 'store/entities/salesSpecial';
import {
  ProviderSalesSpecialDetails,
} from 'components/salesSpecialDetails/provider/salesSpecialDetails';
import { Box } from 'shared/box';
import COLORS from 'utils/colors';
import _ from 'lodash';
import { Paragraph } from 'shared/paragraph';

interface Props {
  navigation: StackNavigationProp<any, any>;
}

const AppointmentRequests: React.FC<Props> = ({ navigation }) => {
  const isDetailsModalOpened = useSelector(salesSpecialSelectors.isSalesDetailModalOpened);
  const pendingAppointments = useSelector(
    appointmentsSelector.pendingAppointments,
  );
  const metaPending = useSelector(appointmentsSelector.metaPending);
  const loading = useSelector(appointmentsSelector.pendingAppointmentsLoading);
  const deleteLoading = useSelector(appointmentsSelector.deleteLoading);
  const subClients = useSelector(subClientsSelectors.subClients);
  const subClientsLoading = useSelector(subClientsSelectors.loading);

  const [onEnd, setOnEnd] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [updateModal, setUpdateModal] = useState(false);
  const [showSubClients, setShowSubClients] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(undefined);
  const [clients, setClients] = useState(subClients);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.imageBack}
            source={require('assets/global/back.png')}
          />
          <Text style={styles.titleLeftStyle}>Appointment Request</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
    dispatch(getSubClients({ query: '' }));
    dispatch(getPendingAppointments({ limit: 10, offset: 0 }));
  }, [dispatch])
  );

  const formatDate = (date: any, format: string) => moment(date).format(format);  

  const handleSalePress = (salesSpecial: any) => {
    dispatch(openSalesDetailModal(salesSpecial))
  }

  const fetchMoreAppointments = () => {
    dispatch(
      getPendingAppointments({ limit: 10, offset: metaPending?.offset + 10 }),
    );
  };
  useEffect(() => {
    const modifyArray = subClients?.map((contact: any) => ({
      ...contact,
      value: contact?.firstName || 'No Name',
    }));
    setClients(modifyArray);
  }, [subClients]);

  const renderRequest = (item: any) => {
    const { client, clientSubprofile } = item;
    const {
      firstName = 'No Data',
      lastName,
      photo,
      isConnected = false,
    } = clientSubprofile || client;
    const title = (firstName || '') + ' ' + (lastName || '');
    
    return (
      <TouchableOpacity
        style={[styles.appointmentContainer, styles.shadow]}
        onPress={() =>
          navigation.navigate('AppointmentRequestDetails', { id: item.id })
        }
      >
        <View style={styles.row}>
          <Image
            source={
              photo
                ? { uri: photo }
                : require('assets/global/defaultAvatar.jpg')
            }
            style={styles.avatar}
          />
          <View>
            <View style={styles.row}>
              <Text style={styles.appointmentTitle}>{title}</Text>
              {isConnected && (
                <Image
                  source={require('assets/onBoarding/alpha.png')}
                  style={styles.imageConnected}
                />
              )}
            </View>
            <Text style={styles.appointmentDateTitle}>
              Time{' '}
              <Text style={styles.appointmentDateValue}>
                {formatDate(item?.startDate, 'll') +
                  ' | ' +
                  formatDate(item?.startDate, 'LT')}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.separator} />
        <Box row ai='center' jc='space-between'>
          <Text style={styles.appointmentServiceTitle}>
            Services{' '}
            <Text style={styles.appointmentServiceValue}>
              {item?.product?.name || ''}
            </Text>
          </Text>
          {(!_.isEmpty(item?.saleSpecial)) && (
            <TouchableOpacity
              hitSlop={{ bottom: 4, left: 4, right: 4, top: 4 }}
              onPress={() => handleSalePress([item?.saleSpecial])}>
              <Box pv={2} ph={8} jc="center" ai="center" r={15} bc={COLORS.greenblue}>
                <Paragraph color={COLORS.white} type='book' size='xs'>
                  {I18n.t<string>('products.saleBadge', { salePrice: `$${item?.saleSpecial?.salePrice?.toString()}` })}
                </Paragraph>
              </Box>
            </TouchableOpacity>
          )}
        </Box>
        {item.intersection.length ? (
          <Text style={styles.anotherTimeSlots}>
            *You already have {item.intersection.length} appointments for this
            timeslot
          </Text>
        ) : null}
        <View style={styles.separator} />
        <View style={[styles.row, styles.endPosition]}>
          <Button
            text={'Cancel'}
            onPress={() =>
              AlertComponent(
                'Warning',
                'Are you sure you want to delete the appointment request?',
                () =>
                  dispatch(
                    deleteAppointment({ id: item?.id, type: 'request' }),
                  ),
              )
            }
            textStyle={styles.textCancel}
            buttonStyle={[styles.styleButton, styles.styleCancel]}
          />
          <Button
            text={'Confirm'}
            onPress={() => {
              isConnected ? confirmConnected(item.id) : setShowModal(true);
              setSelectedId(item.id);
            }}
            textStyle={styles.textConfirm}
            buttonStyle={[styles.styleButton, styles.styleConfirm]}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderModal = (show: boolean, content: any) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => {}}
      >
        <View style={styles.chooseModalView}>
          <View style={[styles.chooseView, styles.shadow]}>{content}</View>
        </View>
      </Modal>
    );
  };
  const intersectionAlert = (onConfirm: () => void) =>
    AlertComponent(
      'Warning',
      'You already have booked appointments for this timeslot. Are you sure that you want to confirm this appointment?',
      onConfirm,
      () => {},
      'Cancel',
      'Confirm',
    );
  const createNewClient = async () => {
    const formData = new FormData();
    const selected = pendingAppointments?.find(
      (item: any) => item.id === selectedId,
    );
    formData.append('firstName', selected?.client?.firstName);
    const { data } = await AppointmentsApi.getIntersection(selected?.id!);
    if (data.length) {
      intersectionAlert(() =>
        dispatch(
          confirmRequestNewClient(
            formData,
            selected?.client?.id!,
            selected?.id!,
          ),
        ),
      );
    } else {
      dispatch(
        confirmRequestNewClient(formData, selected?.client?.id!, selected?.id!),
      );
      navigation.goBack();
    }
  };
  const createExistClient = async (update: boolean) => {
    const selected = pendingAppointments?.find(
      (item: any) => item.id === selectedId,
    );
    const { data } = await AppointmentsApi.getIntersection(selected?.id!);
    if (data.length) {
      intersectionAlert(() =>
        dispatch(
          confirmRequestExistClient(
            {
              id: selectedClient?.id,
              clientId: selected?.client?.id,
              shouldCopyData: update,
            },
            selected?.id!,
          ),
        ),
      );
    } else {
      dispatch(
        confirmRequestExistClient(
          {
            id: selectedClient?.id,
            clientId: selected?.client?.id,
            shouldCopyData: update,
          },
          selected?.id!,
        ),
      );
    }
  };
  const confirmConnected = async (id: number) => {
    const { data } = await AppointmentsApi.getIntersection(id);
    if (data.length) {
      intersectionAlert(() => dispatch(confirmConnectedClient(id)));
    } else {
      dispatch(confirmConnectedClient(id));
      navigation.goBack();
    }
  };

  const onConnectExisting = (clientName: string) => {
    alert.editing({
      entity: undefined,
      message: I18n.t('common.alerts.connectClient', { clientName }),
      onEdit: () => {
        setShowModal(false);
        setTimeout(() => setShowSubClients(true), 500);
      },
    });
  };

  const availableSubClients = clients.filter(
    (client) => client.isActive && !client.isConnected,
  );
  const selectedRequest = pendingAppointments?.find(
    (item: any) => item.id === selectedId,
  )?.client;

  return (
    <MainPageTemplate loading={loading || subClientsLoading || deleteLoading}>
      <FlatList
        data={pendingAppointments || []}
        renderItem={({ item }) => renderRequest(item)}
        keyExtractor={(item: any) => item.id.toString()}
        ListHeaderComponent={() => (
          <Text style={styles.title}>
            You have {metaPending?.totalCount} pending appointment requests
          </Text>
        )}
        onEndReached={() => {
          if (!onEnd) {
            fetchMoreAppointments();
            setOnEnd(true);
          }
        }}
        onMomentumScrollBegin={() => setOnEnd(false)}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{ paddingBottom: 150 }}
      />
      {isDetailsModalOpened && <ProviderSalesSpecialDetails />}
      {renderModal(
        showModal,
        <>
          <TouchableOpacity
            style={{ alignItems: 'flex-end' }}
            onPress={() => setShowModal(false)}
          >
            <Image
              source={require('assets/global/close.png')}
              style={styles.closeImage}
            />
          </TouchableOpacity>
          <Text style={styles.titleChooseModal}>
            {selectedRequest?.firstName +
              ' ' +
              (selectedRequest?.lastName || '')}{' '}
            is not a connected client. Do you want to connect to one of your
            clients? Or create a new client?
          </Text>
          <Button
            text={'Create new'}
            onPress={() => {
              setShowModal(false);
              createNewClient();
            }}
            buttonStyle={styles.createNew}
          />
          <Button
            text={'Connect existing'}
            onPress={() => onConnectExisting(selectedRequest?.firstName!)}
            buttonStyle={styles.connectClient}
          />
        </>,
      )}
      {renderModal(
        updateModal,
        <>
          <TouchableOpacity
            style={{ alignItems: 'flex-end' }}
            onPress={() => setUpdateModal(false)}
          >
            <Image
              source={require('assets/global/close.png')}
              style={styles.closeImage}
            />
          </TouchableOpacity>
          <Text style={styles.titleChooseModal}>
            Do you want to update the client profile from the client app?
          </Text>
          <Button
            text={'Do not update'}
            onPress={() => {
              setUpdateModal(false);
              createExistClient(false);
            }}
            buttonStyle={styles.createNew}
          />
          <Button
            text={'Update client'}
            onPress={() => {
              setUpdateModal(false);
              createExistClient(true);
            }}
            buttonStyle={styles.connectClient}
          />
        </>,
      )}
      <SubClientsModal
        subClients={availableSubClients}
        onModalShow={(show: boolean) => setShowSubClients(show)}
        showModal={showSubClients}
        onChangeSelectedClient={(client: any) => {
          setSelectedClient(client);
          setTimeout(() => setUpdateModal(true), 500);
        }}
      />
    </MainPageTemplate>
  );
};

export default AppointmentRequests;
