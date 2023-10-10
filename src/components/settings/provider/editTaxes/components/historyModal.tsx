import I18n from 'locales';
import moment from 'moment';
import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';
import { ITaxHistory } from 'types/taxes';

import { styles } from '../style';

interface Props {
  show: boolean;
  onClose: (value: boolean) => void;
  data: ITaxHistory[];
}

const HistoryModal: React.FC<Props> = ({ data, onClose, show }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={show}
    onRequestClose={() => onClose(false)}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.posHeader}>
          <View style={styles.titleNewCenter}>
            <Text style={styles.titleNewService}>
              {I18n.t('taxes.historyTitle')}
            </Text>
          </View>
          <TouchableOpacity onPress={() => onClose(false)}>
            <Image
              source={require('assets/global/close.png')}
              style={styles.closeImage}
            />
          </TouchableOpacity>
        </View>
        <Box row jc="space-between" mh={32}>
          <Paragraph size="s" mt={16}>
            {I18n.t('taxes.effectiveDate')}
          </Paragraph>
          <Box w={60} jc="center" ai="center">
            <Paragraph size="s" mt={16}>
              {I18n.t('taxes.fields.rate')}
            </Paragraph>
          </Box>
        </Box>
        <FlatList
          data={data}
          keyExtractor={(item) => `${item.rate}`}
          renderItem={({ item }) => (
            <Box row jc="space-between" mh={32}>
              <Paragraph size="s" mt={16}>
                {moment(item.effectiveStartDate).format('L')}
              </Paragraph>
              <Box w={60} jc="center" ai="center">
                <Paragraph size="s" mt={16}>
                  {item.rate + '%'}
                </Paragraph>
              </Box>
            </Box>
          )}
        />
      </View>
    </View>
  </Modal>
);

export { HistoryModal };
