import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';

import YoutubePlayer from "react-native-youtube-iframe";
import { TrainingVideosList } from 'utils/trainingVideosList';

type Props = StackScreenProps<RootStackParamList>;

const TrainingVideos: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton
          title={t(translations.trainingVideos.title)}
          onPress={Navigator.drawer.open}
        />
      ),
    });
  }, [navigation, t]);
  // return null
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <FlatList
        data={TrainingVideosList}
        renderItem={({ item }) =>
          <YoutubePlayer
            height={215}
            width={340}
            webViewStyle={{ marginTop: 20, borderRadius: 5 }}
            videoId={item?.id}
          />
        }
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
};

export { TrainingVideos };
