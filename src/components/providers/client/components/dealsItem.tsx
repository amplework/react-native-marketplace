import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Paragraph } from 'shared/paragraph';
import { CardTitle } from 'shared/card';
import { Box } from 'shared/box';
import { Separator } from 'shared/separator';
import COLORS from 'utils/colors';
import _ from 'lodash';
import { styles } from '../searchProviders/style';
import FastImage from 'react-native-fast-image';

type Props = {
  deals: any;
  onPress: () => void;
};

const DealsItem: React.FC<Props> = ({ deals: item, onPress }) => {
  let dealPrice = item?.salePrice;
  let actualPrice = item?.actualPrice;
  let difference = Number(actualPrice) - Number(dealPrice);
  let percentOff = (difference / Number(actualPrice)) * 100;

  return (
    <TouchableOpacity onPress={onPress}>
      <Box mb={20}>
        <View style={styles.imageContainer}>
          <FastImage
            source={{
              uri: item.banner?.url ?? 'https://alpha-pro-storage.s3.amazonaws.com/public/client-subprofile-photos/143/olp.jpg'
            }}
            resizeMode='stretch'
            style={styles.bannerImage} />
          <View style={styles.infoContainer}>
            <Paragraph ml={18} size="s">
              {String(percentOff).includes('-') ? '' :
                ((!item.banner?.url) && item.salePrice) && `$${(Math.round(percentOff * 100) / 100).toFixed(0)} % Off on \n`}
              {((!item.banner?.url) && item.service?.name) && `${item.service.name}`}
            </Paragraph>
          </View>
        </View>
        <Box row jc='space-between' ai='flex-start'>
          <Box flex>
            <CardTitle>{item.title}</CardTitle>
            <Paragraph size='s' type='book' mt={2}>
              {'Service: '}
              <Paragraph size='s' type='medium'>
                {item.service?.name && item.service.name}
              </Paragraph>
            </Paragraph>
            <Paragraph size='s' type='book' mt={2}>
              {'From: '}
              <Paragraph size='s' type='medium'>
                {`${item.profile?.firstName} `}
                {item.profile?.lastName}
              </Paragraph>
            </Paragraph>
          </Box>
          <Box mt={6} row jc='space-between' ai='center'>
            <Paragraph size='s' type='book' mr={8} lt>{'$'}{item.actualPrice}</Paragraph>
            <Paragraph size='xl' type='bold' color={COLORS.orange}>{'$'}{item.salePrice}</Paragraph>
          </Box>
        </Box>
        <Separator mt={20} />
      </Box>
    </TouchableOpacity>
  );
};

export { DealsItem };
