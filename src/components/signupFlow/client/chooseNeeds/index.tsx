import I18n from 'locales';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Button from 'shared/button';
import { toast } from 'shared/toast';

import styles from './style';

export interface Props {
  industries: any;
  selected: any;
  onChangeEmail: (text: string) => void;
  onChangePassword: (text: string) => void;
  onChangeSelected: (items: any) => void;
  onContinue: (servicesArray: any) => void;
}

const ChooseNeeds: React.FC<Props> = (props) => {
  const { onContinue, industries, selected, onChangeSelected } = props;

  const filteredArray = industries.filter((e: any) => e.name !== "Education");
  
  return (
    <>
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
                      onPress={() => {
                        let isAlreadySelected = selected.some((e: any) => e.name == profession.name);
                          if(selected.length >= 9 && (!isAlreadySelected)) {
                            toast.info('You can not select more then 9 services')
                          } else {
                            onChangeSelected(
                              findElem
                                ? selected?.filter(
                                    (elem: any) => elem.name !== profession.name,
                                  )
                                : [...selected, profession],
                            )
                          }
                      }}
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
          onPress={() => selected?.length && onContinue(selected)}
          text={I18n.t('chooseNeeds.continue')}
          buttonStyle={[
            styles.btnContinue,
            !selected?.length && styles.btnContinueDisabled,
          ]}
          textStyle={styles.textContinue}
        />
      </View>
    </>
  );
};

export default ChooseNeeds;
