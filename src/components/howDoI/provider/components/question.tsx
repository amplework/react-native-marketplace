import React from 'react';
import { View, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import COLORS from 'utils/colors';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';

interface Props {
  data: any;
  isActive: boolean;
}

const Question: React.FC<Props> = ({ data, isActive }) => {
  return (
    <View style={S.titleContainer}>
      <Paragraph mr={20} flexWrap='wrap-reverse' flexShrink={0.5} size='s' type='bold'>
        {data}        
      </Paragraph>
      <Box mr={40}>
        <Feather
          size={22}
          style={{ color: COLORS.warmGrey }}
          name={isActive ? 'minus-circle' : 'plus-circle'}
        />
      </Box>
    </View>
  )
}

const S = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 55,
    borderBottomColor: COLORS.pinkishGrey,
    borderBottomWidth: 0.5,
    left: 25,
    top: 10,
    bottom: 2,
  },
})

export { Question }