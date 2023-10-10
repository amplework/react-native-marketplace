import { titleListFilter } from 'components/providerCalendar/labels';
import RenderAppointment from 'components/providerCalendar/renderAppointment';
import React from 'react';
import { FlatList } from 'react-native';
import { Paragraph } from 'shared/paragraph';

type Props = {
  filter: string;
  meta: any;
  appointments: any;
  onEnd: boolean;
  onMore: () => void;
  setEnd: (value: boolean) => void;
};

const FilterAppointments: React.FC<Props> = ({
  filter,
  meta,
  appointments,
  onEnd,
  onMore,
  setEnd,
}) => (
  <>
    <Paragraph size="s" type="book" mt={20} mb={12} ml={24}>
      {titleListFilter(meta?.totalCount || 0, filter)}
    </Paragraph>
    <FlatList
      data={appointments || []}
      renderItem={({ item }) => <RenderAppointment item={item} />}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={() => {
        if (!onEnd) {
          onMore();
          setEnd(true);
        }
      }}
      onMomentumScrollBegin={() => setEnd(false)}
      onEndReachedThreshold={0.1}
      contentContainerStyle={{ paddingBottom: 150 }}
    />
  </>
);

export { FilterAppointments };
