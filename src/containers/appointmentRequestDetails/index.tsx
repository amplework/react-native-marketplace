import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { AlertComponent } from 'shared/alert/alertComponent';
import { Avatar } from 'shared/avatar';
import { Box } from 'shared/box';
import Button from 'shared/button';
import { Icon } from 'shared/icon';
import { Error } from '../appointmentDetails/components/error';
import SubClientsModal from 'shared/subClientsModal';
import { MainPageTemplate } from 'shared/templates';
import {
  confirmConnectedClient,
  confirmRequestExistClient,
  confirmRequestNewClient,
} from 'store/actions/appointments';
import {
  appointmentsSelector,
  deleteAppointment,
  getAppointment,
} from 'store/entities/appointments';
import { createChat } from 'store/entities/chats';
import { getSubClients, subClientsSelectors } from 'store/entities/subClients';
import COLORS from 'utils/colors';

import { AppointmentsApi } from '../../api/appointments';
import styles from './style';

export interface Props {
  navigation: StackNavigationProp<any, any>;
  route: any;
}

const AppointmentRequestDetails: React.FC<Props> = ({ navigation, route }) => {
  const appointment: any = useSelector(appointmentsSelector.appointment);
  const loading = useSelector(appointmentsSelector.appointmentLoading);
  const subClients = useSelector(subClientsSelectors.subClients);
  const error = useSelector(appointmentsSelector.error);
  const subClientsLoading = useSelector(subClientsSelectors.loading);

  const dispatch = useDispatch();

  const [clients, setClients] = useState(subClients);
  const [showModal, setShowModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [showSubClients, setShowSubClients] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(undefined);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerStyle: styles.header,
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <Image
            source={require('assets/global/back.png')}
            style={styles.back}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(getSubClients());
    dispatch(getAppointment(route?.params?.id));
  }, []);

  useEffect(() => {
    const modifyArray = subClients?.map((contact: any) => ({
      ...contact,
      value: contact?.firstName || 'No Name',
    }));
    setClients(modifyArray);
  }, [subClients]);

  const renderItem = (text: string, value: string) => {
    return (
      <>
        <View style={[styles.rowSpace, { marginTop: 0 }]}>
          <Text style={styles.titleValue}>{text}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
        <View style={styles.separator} />
      </>
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

  const handleCreateChat = () => {
    if (appointment && appointment?.status !== 'blocked') {      
      dispatch(
        createChat({
          participantId: appointment.client
            ? appointment.client.id
            : appointment.clientSubprofile.clientId,
          onSuccess: (chat) => Navigator.navigate('Chat', { id: chat.id }),
        }),
      );
    }
  };

  const createNewClient = async () => {
    const formData = new FormData();
    formData.append('firstName', appointment?.client?.firstName);
    const { data } = await AppointmentsApi.getIntersection(appointment?.id!);

    if (data.length) {
      intersectionAlert(() =>
        dispatch(
          confirmRequestNewClient(
            formData,
            appointment?.client?.id!,
            appointment?.id!,
            true,
          ),
        ),
      );
    } else {
      dispatch(
        confirmRequestNewClient(
          formData,
          appointment?.client?.id!,
          appointment?.id!,
          true,
        ),
      );
    }
  };
  const createExistClient = async (update: boolean) => {
    const { data } = await AppointmentsApi.getIntersection(appointment?.id!);
    if (data.length) {
      intersectionAlert(() =>
        dispatch(
          confirmRequestExistClient(
            {
              id: selectedClient?.id,
              clientId: appointment?.client?.id,
              shouldCopyData: update,
            },
            appointment?.id!,
            true,
          ),
        ),
      );
    } else {
      dispatch(
        confirmRequestExistClient(
          {
            id: selectedClient?.id,
            clientId: appointment?.client?.id,
            shouldCopyData: update,
          },
          appointment?.id!,
          true,
        ),
      );
    }
  };
  const confirmConnected = async (id: number) => {
    const { data } = await AppointmentsApi.getIntersection(id);
    if (data.length) {
      intersectionAlert(() => dispatch(confirmConnectedClient(id, true)));
    } else {
      dispatch(confirmConnectedClient(id, true));
    }
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
  const firstName =
    appointment?.client?.firstName ||
    appointment?.clientSubprofile?.firstName ||
    'No Client Data';
  const lastName =
    appointment?.client?.lastName ||
    appointment?.clientSubprofile?.lastName ||
    '';
  const isConnected =
    appointment?.client?.isConnected ||
    appointment?.clientSubprofile?.isConnected ||
    false;
  
  if (error) {    
    return <Error onRetry={() => {}} />;
  }
  return (
    <MainPageTemplate loading={loading || subClientsLoading} bc={COLORS.white}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.extraBottom}
      >
        <View style={styles.clientContainer}>
          <Box flex row jc="space-between" ai="center">
            <View style={styles.row}>
              <Avatar
                src={
                  appointment?.client?.photo ||
                  appointment?.clientSubprofile?.photo
                }
                size={40}
                mr={16}
              />
              <View>
                <View style={styles.row}>
                  <Text style={styles.userName}>{`${
                    firstName + ' ' + lastName
                  }`}</Text>
                  {isConnected && (
                    <Image
                      source={require('assets/onBoarding/alpha.png')}
                      style={styles.imageConnected}
                    />
                  )}
                </View>
                <Text style={styles.userPhone}>
                  {appointment?.clientSubprofile?.phoneNumber}
                </Text>
              </View>
            </View>
            <Icon
              src={require('assets/global/chat.png')}
              onPress={handleCreateChat}
              size={20}
            />
          </Box>
        </View>
        {appointment?.hasClientCheckedIn ? (
          <View style={styles.checkInContainer}>
            <Image
              source={require('assets/global/checkCircle.png')}
              style={styles.checkCircle}
            />
            <Text style={styles.checkInText}>Client has checked in</Text>
          </View>
        ) : null}
        <Text style={styles.titleContainer}>Appointment Request Details</Text>
        <View style={styles.infoContainer}>
          {renderItem('Service', appointment?.product?.name || '')}
          {renderItem(
            'Date',
            moment(appointment?.startDate).format('MMM Do YYYY'),
          )}
          {renderItem(
            'Time',
            moment(appointment?.startDate).format('LT') || '',
          )}
          {renderItem(
            'Alert Me',
            appointment?.remindProvider! < 60
              ? appointment?.remindProvider + ' mins'
              : appointment?.remindProvider! / 60 + ' hours',
          )}
          {renderItem(
            'Expected Duration',
            (
              (new Date(appointment?.endDate!).getTime() -
                new Date(appointment?.startDate!).getTime()) /
              1000 /
              60
            ).toString() + ' mins',
          )}
          <View>
            <Text style={styles.titleValue}>Notes</Text>
            <Text style={styles.value}>{appointment?.notes || ''}</Text>
          </View>
        </View>
      </ScrollView>
      {appointment?.status == 'pending' ?
      <View style={styles.bottomBlock}>
        <Button
          onPress={() =>
            AlertComponent(
              'Warning',
              'Are you sure you want to delete the appointment request?',
              () =>
                dispatch(
                  deleteAppointment({
                    id: appointment?.id!,
                    type: 'request',
                    shouldGoBack: true,
                  }),
                ),
            )
          }
          text={'Cancel'}
          buttonStyle={styles.btnCancel}
          textStyle={styles.textCancel}
        />
        <Button
          onPress={() => {
            appointment?.clientSubprofile?.isConnected
              ? confirmConnected(appointment.id)
              : setShowModal(true);
          }}
          text={'Confirm'}
          buttonStyle={styles.btnConfirm}
          textStyle={styles.textConfirm}
        />
      </View> : null}
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
            {appointment?.client?.firstName +
              ' ' +
              (appointment?.client?.lastName || '')}{' '}
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
            onPress={() => {
              setShowModal(false);
              setTimeout(() => setShowSubClients(true), 500);
            }}
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
        subClients={clients}
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

export default AppointmentRequestDetails;
