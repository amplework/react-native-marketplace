import { translations } from 'locales';
import moment from 'moment-timezone';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Box } from 'shared/box';
import {
  Card,
  CardBody,
  CardFooter,
  CardSubTitle,
  CardTitle,
} from 'shared/card';
import { Description } from 'shared/description';
import { Icon } from 'shared/icon';
import { userSelectors } from 'store/entities/user';
import { ExpenseData } from 'types/expenses';
import { currency } from 'utils/currency';
import { dateFormatWithoutTz, dateWithoutTz, formatDate } from 'utils/dates';
import { getValueOrNA } from 'utils/fields';

type Props = {
  data: ExpenseData;
  onPress: (expense: ExpenseData) => () => void;
};

const ExpensesItem: React.FC<Props> = ({ data, onPress }) => {
  const { t } = useTranslation();

  const user = useSelector(userSelectors.user);
  const providerOffset = user?.utcOffset;

  let expenseDate = dateWithoutTz(data.date, providerOffset ? providerOffset : 0);

  return (
    <Card onPress={onPress(data)}>
      <CardBody row jc="space-between" ai="center">
        <Box>
          <CardTitle>
            {t(translations.vendors.vendorName, {
              vendorName: getValueOrNA(data.vendor?.name) || data?.vendorName,
            })}
          </CardTitle>
          <Description label={t(translations.expenses.total)} size="s">
            {currency.format(data.total)}
          </Description>
        </Box>
        <Icon src={require('assets/global/arrowRight.png')} size={24} />
      </CardBody>
      <CardFooter>
        <CardSubTitle>{data.description}</CardSubTitle>
        <Description label={t(translations.expenses.date)} size="s">
          {dateFormatWithoutTz(expenseDate)}
        </Description>
      </CardFooter>
    </Card>
  );
};

export { ExpensesItem };
