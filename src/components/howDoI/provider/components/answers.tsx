import React from 'react';
import { StyleSheet } from 'react-native';
import SafeContainer from 'shared/container';
import { Paragraph } from 'shared/paragraph';
import { Box } from 'shared/box';
import COLORS from 'utils/colors';

interface Props {
  data: any;
}

const Answer: React.FC<Props> = ({ data }) => {
  return (
    <SafeContainer containerStyle={styles.box}>
      <Box mr={40}>
        <Paragraph mt={5} centered={false} size='s' type='bold' color={COLORS.warmGrey}>
          {data}
        </Paragraph>
      </Box>
    </SafeContainer>
  )
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    paddingBottom: 15,
    borderBottomWidth: 1,
    marginLeft: 25,
    borderBottomColor: COLORS.pinkishGrey,
  }
})

export { Answer }