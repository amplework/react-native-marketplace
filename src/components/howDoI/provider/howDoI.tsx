import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { BackButton } from 'shared/backButton';
import { MainPageTemplate } from 'shared/templates';
import ScrollContainer from 'shared/scrollContainer';
import { SearchQuestion } from './searchQuestion';
import COLORS from 'utils/colors';
import QuestionsList  from './components/questionsList'
import { View, Platform, SectionList, Text, StyleSheet } from 'react-native';
import { Accordian } from './components/accordian';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { userSelectors } from 'store/entities/user';
import { subscriptionSelectors } from 'store/entities/subscription';
import { Navigator } from 'service/navigator';

type Props = StackScreenProps<RootStackParamList, 'HowDoI'>;

export type Category = {
  updateSections: (any);
};

const HowDoI: React.FC<Props> = ({ navigation }) => {
  const user = useSelector(userSelectors.user);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const liteSubcription = subscription?.subscriptionPlan?.includes('lite');
  const [state, setState] = useState({
    activeSections: [],
    searchText: '',
    filteredData: [],
    data: []
  });

  const backHandler = () => {
    if(liteSubcription) {
      Navigator.drawer.open();
    } else {
      navigation.goBack();
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton ml={4} title="How do I" onPress={backHandler} />,
    });
    
  }, [navigation]);

  useEffect(() => {
    let filteredData: any = [];
    let questionData = _.cloneDeep(QuestionsList);
      filteredData= user?.role == 'client' ? 
      questionData.filter(rr => rr.client) : 
      questionData.filter(rr => rr.provider)
    setState((prev) => ({ ...prev, data: filteredData }));
  }, []);

  const searchFilter = (searchText: string) => {
    let questionData = _.cloneDeep(QuestionsList);

    let filteredQuestionList = (user?.role == 'client') ? 
    questionData.filter(rr => rr.client) : 
    questionData.filter(rr => rr.provider);

    let filteredData: any = []
    if (searchText && searchText.trim().length > 0) {
      filteredData = filteredQuestionList.filter(function (item: any) {
        let itm = item;
        itm = item.data.filter((res: any) => {
          return searchText.trim().length > 0 ? _.includes(res.question.toLowerCase(),searchText.toLowerCase()) : true;
        })
        return item.data= itm
      });
    }
    let filteredQuestionData = filteredData.filter((r: any) => r?.data?.length > 0)
    
    setState((prev) => ({ ...prev, searchText: searchText, filteredData: filteredQuestionData }))
  }

  const renderSectionHeader = (section: any) => {
    return (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionTitle}>{section?.section?.name}</Text>
      </View>
    )
  }

  const renderItem = (item: any) => {
    return (
      (!item.item.sectionHeader) ?
        <Accordian
          title={item.item.question}
          data={item.item.answer}
        />
        : null
    ) 
  }

  let { filteredData, searchText, data } = state;
  let questionListData = searchText == "" ? data : filteredData;

  return (
    <MainPageTemplate bc={COLORS.white}>
      <SearchQuestion
        value={state.searchText}
        onChangeText={searchFilter}
        placeholder='How do I...'
      />
      {Platform.OS == "android" && (
        <View style={{ height: 1, backgroundColor: COLORS.whiteGray, elevation: 4 }} />
      )}
      <ScrollContainer>
        <SectionList
          sections={questionListData}
          keyExtractor={(item, index) => index.toString()}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
        />
      </ScrollContainer>
    </MainPageTemplate>
  );
};

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    paddingHorizontal: 20, 
    paddingVertical:10, 
    backgroundColor: '#e8e9eb', 
    marginTop:30
  },
  sectionTitle: {
    color: '#000', 
    fontWeight:'bold'
  }
})

export { HowDoI };