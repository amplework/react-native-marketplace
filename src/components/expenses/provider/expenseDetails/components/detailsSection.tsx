import I18n from 'locales';
import React from 'react';
import { View } from 'react-native';
import moment from 'moment-timezone';
import { useSelector } from 'react-redux';
import { Description } from 'shared/description';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { expensesSelectors } from 'store/entities/expenses';
import { currency } from 'utils/currency';
import { dateFormatWithoutTz, dateWithoutTz, formatDate } from 'utils/dates';

import { expenseDetailsStyles as S } from '../style';
import { userSelectors } from 'store/entities/user';

const DetailsSection: React.FC = () => {
  const expense = useSelector(expensesSelectors.expense)!;
  const providerDetails = useSelector((state: any) => state.provider.provider);
  const providerTimezone = providerDetails?.address?.utctimezone;
  const user = useSelector(userSelectors.user);
  const providerOffset = user?.utcOffset;

  let expenseDate = dateWithoutTz(expense?.date, providerOffset ? providerOffset : 0);

  return (
    <>
      <Paragraph size="s" type="book" mb={12}>
        {I18n.t('expenses.details.title')}
      </Paragraph>
      <View style={S.section}>
        <Description
          label={I18n.t('expenses.details.date')}
          split
          size="s"
          pr={16}
        >
          {dateFormatWithoutTz(expenseDate)}
        </Description>
        <Separator mv={12} />
        <Description
          label={I18n.t('expenses.details.total')}
          split
          size="s"
          pr={16}
        >
          {currency.format(expense.total)}
        </Description>
        <Separator mv={12} />
        <Description
          label={I18n.t('expenses.details.invoiceNumber')}
          split
          size="s"
          pr={16}
        >
          {expense.invoiceNumber
            ? `#${expense.invoiceNumber}`
            : ''}
        </Description>
        <Separator mv={12} />
        <Description
          label={I18n.t('expenses.details.expenseType')}
          split
          size="s"
          pr={16}
        >
          {expense.expenseType.shortName}
        </Description>
        <Separator mv={12} />
        <Description
          label={I18n.t('expenses.details.paymentMethod')}
          split
          size="s"
          pr={16}
        >
          {expense.paymentMethod.shortName}
        </Description>
        {expense.notes && (
          <>
            <Separator mv={12} />
            <Description
              label={I18n.t('expenses.details.notes')}
              column
              size="s"
              pr={16}
            >
              {expense.notes}
            </Description>
          </>
        )}
      </View>
    </>
  );
};

export { DetailsSection };
