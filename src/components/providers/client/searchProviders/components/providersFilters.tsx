import I18n from 'locales';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheet, BottomSheetHeader } from 'shared/bottomSheet';
import { Box } from 'shared/box';
import Button from 'shared/button';
import { Paragraph } from 'shared/paragraph';
import { Toggle } from 'shared/toggle';
import { industriesSelectors } from 'store/entities/industries';
import { closeFiltersModal, providersSelectors, searchProviderByLocation } from 'store/entities/providers';
import COLORS from 'utils/colors';

import { styles } from '../style';

interface Props {
  initialSelectedServices: number[];
  onSubmit: (services: number[]) => void;
}

const ProvidersFilters: React.FC<Props> = ({
  initialSelectedServices,
  onSubmit,
}) => {
  const [selectedServices, setSelectedServices] = useState(
    initialSelectedServices,
  );

  const industries = useSelector(industriesSelectors.industries);
  const locationFilter: any = useSelector(providersSelectors.locationFilter);
  const filteredIndustries = industries.filter((e:any) => e.name !== "Education")

  const dispatch = useDispatch();

  const closeModal = () => dispatch(closeFiltersModal());

  const toggleSelectService = (serviceId: number) => () => {
    const selected = selectedServices.includes(serviceId);
    const newSelectedServices = selected
      ? selectedServices.filter((id) => id !== serviceId)
      : [...selectedServices, serviceId];

    setSelectedServices(newSelectedServices);
  };

  const handleSubmit = () => {
    onSubmit(selectedServices);
    closeModal();
  };

  const toggleLoactionFilter = () => {
    dispatch(searchProviderByLocation(locationFilter ? false : true));
  }

  return (
    <BottomSheet>
      <BottomSheetHeader
        title={I18n.t('providers.filters')}
        onClose={closeModal}
      />
      <ScrollView
        style={styles.filtersScrollView}
        contentContainerStyle={styles.filtersContent}
      >
        <Box flex>
          <Box row jc='space-between' ai='center' pb={10} >
            <Paragraph>{'Search by location'}</Paragraph>
            <Toggle checked={locationFilter} onChange={toggleLoactionFilter} />
          </Box>
          {filteredIndustries.map((industry) => (
            <Box key={industry.id} mb={20}>
              <Paragraph size="s" type="book" color={COLORS.warmGrey} mb={10}>
                {industry.name}
              </Paragraph>
              <Box row wrap w="100%">
                {industry.services.map((service) => {
                  const selected = selectedServices.includes(service.id);

                  return (
                    <TouchableOpacity
                      key={service.id}
                      onPress={toggleSelectService(service.id)}
                      style={[
                        styles.serviceButton,
                        selected && styles.serviceButtonActive,
                      ]}
                    >
                      <Paragraph
                        size="s"
                        color={
                          selected ? COLORS.clearBlue : COLORS.brownishGrey
                        }
                      >
                        {service.name}
                      </Paragraph>
                    </TouchableOpacity>
                  );
                })}
              </Box>
            </Box>
          ))}
        </Box>
      </ScrollView>
      <Button
        onPress={handleSubmit}
        text={I18n.t('common.continue')}
        buttonStyle={styles.submitButton}
      />
    </BottomSheet>
  );
};

export { ProvidersFilters };
