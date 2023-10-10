import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Navigator } from 'service/navigator';
import { Box } from 'shared/box';
import { ArrowRight, IconComponent } from 'shared/icon/icons';
import COLORS from 'utils/colors';

import { navigationStyles as S } from '../style';
import { NavigationLink } from '../types';

const NavigationItem: React.FC<NavigationLink> = ({ title, route, Icon, params }) => {

  const handlePress = () => params ? Navigator.navigate(route, params) : Navigator.navigate(route);

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={S.listItem}>
        <Box flex row ai="center">
          {Icon && (
            <IconComponent
              Component={Icon}
              size={20}
              color={COLORS.black70}
              mr={10}
            />
          )}
          <Text style={S.listItemText}>{title}</Text>
        </Box>
        <IconComponent
          Component={ArrowRight}
          size={12}
          color={COLORS.brownishGrey}
        />
      </View>
    </TouchableOpacity>
  );
};

export { NavigationItem };
