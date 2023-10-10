import React from 'react';
import { FlatList } from 'react-native';

import { NavigationItem } from './components/navigationItem';
import { navigationStyles as S } from './style';
import { NavigationLink } from './types';

type Props = {
  data: NavigationLink[];
};

const NavigationList: React.FC<Props> = ({ data }) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.title}
    style={S.list}
    renderItem={({ item: { title, route, Icon, params } }: any) => (
      <NavigationItem title={title} route={route} Icon={Icon} params={params} />
    )}
  />
);

export { NavigationList };
