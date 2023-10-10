import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { t, translations } from 'locales';
import { Linking, View } from 'react-native';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';

import { styles } from '../style';
import { Pressable } from 'shared/pressable';
import { useSelector } from 'react-redux';
import { providersSelectors } from 'store/entities/providers';
import { toast } from 'shared/toast';
import COLORS from 'utils/colors';
import REGEX from 'utils/regex';

const WebLinkSection: React.FC<any> = () => {
  const provider: any = useSelector(providersSelectors.provider);

  const onPressLink = (link: string) => {    
    if (REGEX?.url.test(link)) {
      if (link.includes('https://') || link.includes('http://')) {
        Linking.openURL(`${link}`)
      } else {
        Linking.openURL(`https://${link}`)
      }
    } else {
      toast.info('Inavlid links can not be opened.')
    }
  }; 
  
  const links = provider?.links.filter((e: any) => e !== null && e !=="null");  
  
  return (
    <>
      <Paragraph size="s" type="book" mb={12}>
        {t(translations.providers.websites)}
      </Paragraph>
      <View style={styles.card}>
        {links.map((item: string, index: number) => {          
          return (
            <>
              <Pressable onPress={() => onPressLink(item)} row jc="space-between" ai="center" pr={24} mb={16} mt={8}>
                <Paragraph color={COLORS.clearBlue} mb={4}>{item}</Paragraph>
              </Pressable>
              {index !== (links.length - 1) && <Separator />}
            </>
          )
        })}
      </View>
    </>
  )
};

export { WebLinkSection };