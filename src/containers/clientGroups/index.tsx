import I18n from 'locales';
import React, { useLayoutEffect, useState } from 'react';
import { translations } from 'locales';
import { useTranslation } from 'react-i18next';
import RNCheckBox from '@react-native-community/checkbox';
import { ActivityIndicator } from 'react-native';
import { Card, CardBody } from 'shared/card';
import SafeContainer from 'shared/container';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';
import { styles } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Box } from 'shared/box';
import { Separator } from 'shared/separator';
import { BottomSheet } from 'shared/bottomSheet';
import { isModalOpened } from 'store/entities/social';
import { Field } from 'shared/field';
import {subClientsSelectors} from 'store/entities/subClients';


interface ListType {
  id: number;
  title: string;
}

export const List: ListType[] = [
  {
    id: 1,
    title: I18n.t('clientGroups.options.all'),
  },
  {
    id: 2,
    title: I18n.t('clientGroups.options.new'),
  },
  {
    id: 3,
    title: I18n.t('clientGroups.options.notActive'),
  },
  {
    id: 4,
    title: I18n.t('clientGroups.options.withReward'),
  },
  {
    id: 5,
    title: I18n.t('clientGroups.options.clientsUsingApp'),
  },
  {
    id: 6,
    title: I18n.t('clientGroups.options.notUsingApp'),
  },
];

const ClientGroups: React.FC<any> = ({ navigation }) => {
  const [query, setQuery] = useState('');

  const { t } = useTranslation();
  const loading = useSelector(subClientsSelectors.searchLoading);



  const ClientGroups = ({ item }: any) => {
    return (
      <>
        <Box row jc="space-between" ai="center" mh={15} mv={10}>
          <Paragraph size="s">{item.title}</Paragraph>
          <RNCheckBox
            boxType={'square'}
            style={styles.checkbox}
            animationDuration={0}
          />
        </Box>
        {item.id == 6 ? null : <Separator mv={10} />}
      </>
    );
  };
  
   
  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      <BottomSheet size="l">
        <Card isClickable={false}>
          <Box row jc="space-between" mh={15} mv={25}>
            <Paragraph ml={2} size="l">
              {I18n.t('clientGroups.title')}
            </Paragraph>
            <TouchableOpacity>
              <Paragraph size="l" color={COLORS.clearBlue}>
                {I18n.t('clientGroups.rightHeader')}
              </Paragraph>
            </TouchableOpacity>
          </Box>
        </Card>
        {List.map((item) => (          
          <ClientGroups item={item} />
        ))}
        <Box extraStyle={{ position: 'absolute', bottom: '40%'}}>
          <Paragraph ml={15} size="s" type="book">
            {'Find clients'}
          </Paragraph>
        </Box>
       
        <Box bc={COLORS.white}>
        <Field
          value={query}
          onChange={setQuery}
          label={t(translations.common.search)}
          endAdornment={
            loading ? (
              <ActivityIndicator size="small" color={COLORS.clearBlue} />
            ) : (
              <Icon src={require('assets/global/search.png')} size={18} />
            )
          }
        />
      </Box>
      </BottomSheet>
    </SafeContainer>
  );
};

export default ClientGroups;
