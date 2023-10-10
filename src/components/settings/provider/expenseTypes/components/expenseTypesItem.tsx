import React from 'react';
import { Box } from 'shared/box';
import { Card, CardBody, CardSubTitle, CardTitle } from 'shared/card';
import { Icon } from 'shared/icon';
import { Toggle } from 'shared/toggle';
import { IExpenseType } from 'types/settings';

interface Props {
  expenseType: IExpenseType;
  onPress: () => void;
  onToggle: (value: boolean) => void;
}

const ExpenseTypesItem: React.FC<Props> = ({
  expenseType: { shortName, description, isActive },
  onPress,
  onToggle,
}) => {
  return (
    <Card onPress={onPress}>
      <CardBody row jc="space-between" ai="center">
        <Toggle checked={isActive} onChange={onToggle} />
        <Box flex ml={12}>
          <CardTitle>{shortName}</CardTitle>
          <CardSubTitle>{description}</CardSubTitle>
        </Box>
        <Icon src={require('assets/global/arrowRight.png')} />
      </CardBody>
    </Card>
  );
};

export { ExpenseTypesItem };
