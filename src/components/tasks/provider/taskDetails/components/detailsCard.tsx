import { adaptTask, getRepeatDetails } from 'components/tasks/helpers/adapters';
import { REMIND_ME_INTERVALS } from 'components/tasks/helpers/options';
import I18n from 'locales';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { tasksSelectors } from 'store/entities/tasks';
import { userSelectors } from 'store/entities/user';
import { dateFormatWithoutTz, dateWithoutTz, DATE_FORMATS, formatTime } from 'utils/dates';
import { isIOS } from 'utils/device';

import { styles } from '../style';

const DetailsCard: React.FC = () => {
  const task = useSelector(tasksSelectors.task)!;
  const { date, time, repeatFrequency, remindProvider } = task;

  const userDetail = useSelector(userSelectors.user);
  const providerOffset = userDetail?.utcOffset;

  const taskDueDate = dateWithoutTz(date, providerOffset ? providerOffset : 0);

  const alertInterval = REMIND_ME_INTERVALS.find(
    (interval) => interval.value === remindProvider,
  );

  return (
    <>
      <Paragraph size="s" type="book" mb={12}>
        {I18n.t('tasks.details')}
      </Paragraph>
      <View style={styles.detailsCard}>
        <Box row jc="space-between" pv={12} pr={16}>
          <Paragraph size="s" type="book">
            {I18n.t('tasks.dateDue')}
          </Paragraph>
          <Paragraph size="s">{moment(moment(date).toDate(), 'YYYY-MM-DD').format('Do MMM YYYY')}</Paragraph>
        </Box>
        <Separator />
        <Box row jc="space-between" pv={12} pr={16}>
          <Paragraph size="s" type="book">
            {I18n.t('tasks.timeDue')}
          </Paragraph>
          <Paragraph size="s">
            {moment.utc(time, 'HH:mm').local().format('LT')}
            {/* {formatTime(time, { format: DATE_FORMATS.apiTime })} */}
          </Paragraph>
        </Box>
        <Separator />
        <Box row jc="space-between" pv={12} pr={16}>
          <Paragraph size="s" type="book">
            {I18n.t('tasks.alertMe')}
          </Paragraph>
          <Paragraph size="s">{alertInterval?.label}</Paragraph>
        </Box>
        <Separator />
        <Box row jc="space-between" pv={12} pr={16}>
          <Paragraph size="s" type="book">
            {I18n.t('tasks.repeatTask')}
          </Paragraph>
          <Paragraph size="s">
            {repeatFrequency ? I18n.t('common.yes') : I18n.t('common.no')}
          </Paragraph>
        </Box>
        {repeatFrequency && (
          <>
            <Separator />
            <Box pv={12} pr={16}>
              <Paragraph size="s" type="book" mb={4}>
                {I18n.t('tasks.repeatDetails')}
              </Paragraph>
              <Paragraph size="s">
                {getRepeatDetails(adaptTask(task))}
              </Paragraph>
            </Box>
          </>
        )}
      </View>
    </>
  );
};

export { DetailsCard };
