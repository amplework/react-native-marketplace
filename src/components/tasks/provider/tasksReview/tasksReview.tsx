import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import SafeContainer from 'shared/container';
import { Icon } from 'shared/icon';
import { Loader } from 'shared/loader';
import { Paragraph } from 'shared/paragraph';
import { TouchableRow } from 'shared/review';
import { Separator } from 'shared/separator';
import { tasksSelectors } from 'store/entities/tasks';
import { getTasksReview } from 'store/entities/tasks/slice';
import COLORS from 'utils/colors';
import {
  formatApiDate,
  getEndOfMonth,
  getEndOfWeek,
  getStartOfMonth,
  getStartOfWeek,
} from 'utils/dates';

import { tasksReviewStyles as S } from './style';

interface Props extends StackScreenProps<RootStackParamList> {}

const TasksReview: React.FC<Props> = ({ navigation }) => {
  const review = useSelector(tasksSelectors.review);
  const loading = useSelector(tasksSelectors.reviewLoading);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: S.headerBar,
      headerTitle: () => (
        <Paragraph size="l" type="book" color={COLORS.white60}>
          {t(translations.tasks.review)}
        </Paragraph>
      ),
      headerLeft: () => <BackButton light />,
    });
  }, [t, navigation]);

  useEffect(() => {
    dispatch(getTasksReview());
  }, [dispatch]);

  const navigateToThisWeekTasks = () =>
    Navigator.navigate('TasksReviewList', {
      title: t(translations.tasks.tasksThisWeek),
      range: 'week',
      fromDate: formatApiDate(getStartOfWeek()),
      toDate: formatApiDate(getEndOfWeek()),
    });

  const navigateToThisMonthTasks = () =>
    Navigator.navigate('TasksReviewList', {
      title: t(translations.tasks.tasksThisMonth),
      range: 'month',
      fromDate: formatApiDate(getStartOfMonth()),
      toDate: formatApiDate(getEndOfMonth()),
    });

  return (
    <SafeContainer safeStyle={S.safe} containerStyle={S.container}>
      <Loader loading={loading} />
      <View style={S.header}>
        <Image
          source={require('assets/backgrounds/reviewBackground.png')}
          style={S.headerImage}
        />
        <Paragraph size="l" type="bold" color={COLORS.white}>
          {t(translations.tasks.taskDetailsReview)}
        </Paragraph>
      </View>
      <View style={S.content}>
        <View style={S.section}>
          <TouchableRow
            label={t(translations.tasks.tasksThisWeek)}
            onPress={navigateToThisWeekTasks}
          >
            {review.tasks.currentWeekCount}
          </TouchableRow>
          <Separator />
          <TouchableRow
            label={t(translations.tasks.tasksThisMonth)}
            onPress={navigateToThisMonthTasks}
          >
            {review.tasks.currentMonthCount}
          </TouchableRow>
        </View>
      </View>
      <Box row jc="center" ai="center" mb={50}>
        <Icon
          src={require('assets/global/logoInactive.png')}
          size={30}
          mr={8}
        />
        <Paragraph size="s" type="book" color={COLORS.warmGrey}>
          {t(translations.common.workSmarter)}
        </Paragraph>
      </Box>
    </SafeContainer>
  );
};

export { TasksReview };
