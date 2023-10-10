import React from 'react';
import {
  BeautyService,
  CarService,
  DeliveryService,
  DomesticService,
  EntertainmentService,
  FoodService,
  GeneralService,
  HealthService,
  OtherService,
  HouseRepair,
  Freelancer,
  Technology
} from 'shared/icon/icons';
import { LargeDateRange } from 'utils/dates';

export const HOME_ICONS = {
  'Art & Design': <CarService />,
  Automotive: <CarService />,
  'Delivery Service': <DeliveryService />,
  'Cleaning Services': <DomesticService />,
  Education: <CarService />,
  Entertainment: <EntertainmentService />,
  'Food Service': <FoodService />,
  'General Service': <GeneralService />,
  'Hair & Beauty': <BeautyService />,
  'Health & Fitness': <HealthService />,
  Other: <OtherService />,
  'House Repairs' : <HouseRepair />,
  'Freelancer': <Freelancer />,
  'Technology': <Technology />,
} as const;

export const PERIODS: LargeDateRange[] = ['week', 'month', 'year'];
