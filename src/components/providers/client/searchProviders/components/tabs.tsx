import I18n from 'locales';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Paragraph } from 'shared/paragraph';

import { styles } from '../style';

const TABS = [I18n.t('search.tabs.providers'), I18n.t('search.tabs.specials')];

interface Props {
  activeTab: number;
  changeTab: (tab: number) => () => void;
}

const Tabs: React.FC<Props> = ({ activeTab, changeTab }) => (
  <View style={styles.tabs}>
    {TABS.map((tab, index) => {
      const isActive = index === activeTab;

      return (
        <TouchableOpacity
          key={index}
          onPress={changeTab(index)}
          style={[styles.tab, isActive && styles.activeTab]}
        >
          <Paragraph size="s" type={isActive ? 'medium' : 'book'}>
            {tab}
          </Paragraph>
        </TouchableOpacity>
      );
    })}
  </View>
);

export { Tabs };
