import React from 'react';
import { View, TextInput } from 'react-native';
import { Icon } from 'shared/icon';
import { InputStyles as S } from './style';

interface Props {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
}

const SearchQuestion: React.FC<Props> = (props) => {
  return (
    <View>
    <View style={S.textInputContainer}>
      <TextInput
        style={S.textInput}
        placeholder={props.placeholder}
        value={props.value}
        autoCapitalize='none'
        onChangeText={props.onChangeText}
      />
    </View>
    <View style={S.searchIconContainer}>
    <Icon src={require('assets/global/search.png')} size={17} />
  </View>
  </View>
  )
}

export { SearchQuestion }
