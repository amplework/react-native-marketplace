import { useToggleState } from 'hooks';
import { translations } from 'locales';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { Box } from 'shared/box';
import { EmptyState } from 'shared/emptyState';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Pressable } from 'shared/pressable';
import { Task } from 'types/tasks';
import COLORS from 'utils/colors';
import { SmallDateRange } from 'utils/dates';

import { styles as S } from '../style';

interface Props {
  title?: string;
  data: Task[];
  range?: SmallDateRange | 'date' | 'short';
  collapsible?: boolean;
  renderItem: (item: Task) => ReactElement;
  ItemSeparatorComponent: () => ReactElement;
  addable?: boolean;
  onAdd?: () => void;
}

const TasksSection: React.FC<Props> = ({
  title,
  data,
  range,
  collapsible = false,
  renderItem,
  ItemSeparatorComponent,
  addable = false,
  onAdd,
}) => {
  const [collapsed, toggleCollapsed] = useToggleState(false);

  const { t } = useTranslation();

  const renderAddButton = () => (
    <TouchableOpacity onPress={onAdd} style={S.addButton}>
      <Icon src={require('assets/global/add.png')} size={20} mr={8} />
      <Paragraph color={COLORS.orange}>
        {t(translations.tasks.addTask)}
      </Paragraph>
    </TouchableOpacity>
  );

  const renderSection = () =>
    data.length ? (
      <View style={S.section}>
        {data.map((task, index) => (
          <>
            {renderItem(task)}
            {index !== data.length - 1 && (
              <ItemSeparatorComponent
                key={`separator-${task.id}-${task.date}`}
              />
            )}
          </>
        ))}
        {addable && (
          <>
            <ItemSeparatorComponent />
            {renderAddButton()}
          </>
        )}
      </View>
    ) : (
      <>
        <EmptyState
          entities={t(translations.common.entities.tasks)}
          type={range}
        />
        {addable && <Box mt={12}>{renderAddButton()}</Box>}
      </>
    );

  return (
    <Box mb={16}>
      {title && (
        <Pressable
          row
          ai="center"
          onPress={toggleCollapsed}
          disabled={!collapsible}
          mb={12}
        >
          <Paragraph size="s" type="book">
            {title}
          </Paragraph>
          {collapsible && (
            <Icon
              src={
                collapsed
                  ? require('assets/global/arrowRight.png')
                  : require('assets/global/arrowDown.png')
              }
            />
          )}
        </Pressable>
      )}
      {!collapsed && renderSection()}
    </Box>
  );
};

export { TasksSection };
