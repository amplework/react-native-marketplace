import React, { useState, useEffect } from 'react';
import { Platform, UIManager, LayoutAnimation, TouchableOpacity } from 'react-native';
import moment from 'moment-timezone';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';
import { Separator } from 'shared/separator';
import { CardTitle } from 'shared/card';

interface Props {
  item: any,
  userOffset: any,
}

const SalesSpecialItem: React.FC<Props> = ({
  item,
  userOffset
}) => {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded)
  }

  return (
    <Box ph={18} mt={12}>
      <TouchableOpacity onPress={() => toggleExpand()}>
        <Box row jc='space-between' ai='center'>
          <CardTitle>{item.title}</CardTitle>
          <Box flex row ai='center' jc='flex-end'>
            <Paragraph lt size='s' type='book' mr={8}>{'$'}{item.actualPrice}</Paragraph>
            <Paragraph size='l' type='bold' color={COLORS.orange}>{'$'}{item.salePrice}</Paragraph>
          </Box>
        </Box>
      </TouchableOpacity>
      {expanded && (
        <>
          <Paragraph mt={6} size='s' type='book'>
            {'Description: '}
            <Paragraph size='s' type='medium'>
              {item.saleDescription}
            </Paragraph>
          </Paragraph>
          {item.isTimeRestrication && (
            <Paragraph mt={6} size='s' type='book'>
              {'Time Restriction: '}
              <Paragraph size='s' type='medium'>
                {moment.utc(item.restricationStartTime, ["HH:mm"]).utcOffset(Number(userOffset)).format('hh:mm A')}
                {' to '}
                {moment.utc(item.restricationEndTime, ["HH:mm"]).utcOffset(Number(userOffset)).format('hh:mm A')}
              </Paragraph>
            </Paragraph>
          )}
          {item.saleToday && (
            <Paragraph mt={6} size='s' type='book'>
              {'Availability: '}
              <Paragraph size='s' type='medium'>
                {'Today only'}
              </Paragraph>
            </Paragraph>
          )}
          {((!item.saleToday) && item.isDateRestrication) && (
            <Paragraph mt={6} size='s' type='book'>
              {'Date Restriction: '}
              <Paragraph size='s' type='medium'>
                {moment(item.restricationStartDate).format('MM/DD/YY hh:mm A')}
                {' to '}
                {moment(item.restricationEndDate).format('MM/DD/YY hh:mm A')}
              </Paragraph>
            </Paragraph>
          )}
          {item.isDayRestrication && (
            <Paragraph mt={6} size='s' type='book'>
              {'Special Availability: '}
              <Paragraph size='s' type='medium'>
                {item.restricationDay?.join(', ')}
              </Paragraph>
            </Paragraph>
          )}
          {(item.isCombination || item.isExistingClient) && (
            <Paragraph mt={6} size='s' type='book'>
              {'Valid for: '}
              <Paragraph size='s' type='medium'>
                {item.isExistingClient && 'Existing Clients Only, '}
                {item.isCombination && 'No Combination'}
              </Paragraph>
            </Paragraph>
          )}
        </>
      )}
      <Separator mt={12} />
    </Box>
  )
};

export { SalesSpecialItem };
