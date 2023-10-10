import { StackNavigationProp } from '@react-navigation/stack';
import I18n from 'locales';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'shared/button';
import { MainPageTemplate } from 'shared/templates';
import { toast } from 'shared/toast';
import { updateClientProfile } from 'store/actions/client';
import { industriesSelectors } from 'store/entities/industries';
import COLORS from 'utils/colors';

import styles from './style';

export interface Props {
  navigation: StackNavigationProp<any, any>;
}

const ChooseNeeds: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const client = useSelector((state: any) => state.client.client);
  const clientLoading = useSelector((state: any) => state.client.loading);
  const industries = useSelector(industriesSelectors.industries);
  const loading = useSelector(industriesSelectors.loading);
  const [selected, setSelected] = useState(client?.services);

  const filteredArray = industries.filter((e) => e.name !== "Education")

  const onSave = () => {
    const formData = new FormData();
    let userInfo: any = {
      firstName: client?.firstName,
      lastName: client?.lastName,
      phoneNumber: client?.phoneNumber,
      serviceIds: JSON.stringify(selected.map((item: any) => item.id)),
    };
    if (client?.address) {
      userInfo = {
        ...userInfo,
        address: JSON.stringify({
          ...client?.address,
          utcOffset: client.utcOffset,
          addressLine2: client?.address?.addressLine2,
        }),
      };
    }
    if (client?.birthday) {
      userInfo = { ...userInfo, birthday: client?.birthday };
    }
    for (const name in userInfo) {
      formData.append(name, userInfo[name]);
    }
    if (client?.photo) {
      formData.append('photo', client?.photo);
    }
    dispatch(updateClientProfile(formData));
    navigation.goBack();
  };
  
  return (
    <MainPageTemplate
      loading={loading || clientLoading}
      containerStyle={styles.container}
      bc={COLORS.white}
    >
      <Text style={styles.title}>{I18n.t('chooseNeeds.title')}</Text>
      <Text style={styles.description}>
        {I18n.t('chooseNeeds.description')}
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.extraBottom}
        style={styles.scrollViewContainer}
      >
        {filteredArray?.map((item: any, index: number) => {
          return (
            <View style={styles.containerCategory} key={index}>
              <Text style={styles.titleCategory}>{item.name}</Text>
              <View style={styles.rowItems}>
                {item?.services?.map((profession: any, indexProf: number) => {
                  const findElem = selected?.filter(
                    (elem: any) => elem.name === profession.name,
                  ).length;
                  return (
                    <TouchableOpacity
                      key={indexProf}
                      style={[
                        styles.containerItem,
                        findElem && styles.containerItemActive,
                      ]}
                      onPress={() =>
                        {
                          let isAlreadySelected = selected.some((e: any) => e.name == profession.name);
                          if(selected.length >= 9 && (!isAlreadySelected)) {
                            toast.info('You can not select more then 9 services')
                          } else {
                            setSelected(
                              findElem
                                ? selected?.filter(
                                    (elem: any) => elem.name !== profession.name,
                                  )
                                : [...selected, profession],
                            )
                          }
                        }
                      }
                    >
                      <Text
                        style={[
                          styles.textItem,
                          findElem && styles.textItemActive,
                        ]}
                      >
                        {profession?.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.rowButtons}>
        <Button
          onPress={() => {}}
          text={selected?.length + ' ' + I18n.t('chooseNeeds.selected')}
          buttonStyle={styles.btnSelected}
          textStyle={styles.textSelected}
        />
        <Button
          onPress={() => selected?.length && onSave()}
          text={I18n.t('chooseNeeds.continue')}
          buttonStyle={[
            styles.btnContinue,
            !selected?.length && styles.btnContinueDisabled,
          ]}
          textStyle={styles.textContinue}
        />
      </View>
    </MainPageTemplate>
  );
};

export default ChooseNeeds;
