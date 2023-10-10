import ArrowForward from 'assets/global/arrowForward.svg';
import AlphaInactive from 'assets/global/alphaInactive.svg';
import AlphaSVG from 'assets/global/alpha.svg';
import ArrowRight from 'assets/global/arrowRight.svg';
import BeautyService from 'assets/global/beautyService.svg';
import BottomMenuIcon from 'assets/global/bottomMenu.svg';
import CalendarSetupIcon from 'assets/global/calendarSetup.svg';
import CarService from 'assets/global/carService.svg';
import CashJournalsIcon from 'assets/global/cashJournals.svg';
import SaleCheckout from 'assets/bottomBar/checkout.svg';
import SaleCheckoutInactive from 'assets/bottomBar/checkoutInactive.svg';
import ConnectIcon from 'assets/bottomBar/connect.svg';
import ClientsIcon from 'assets/global/clients.svg';
import PackageIcon from 'assets/global/package.svg';
import VendorsIcon from 'assets/bottomBar/vendors.svg';
import ClosedDaysIcon from 'assets/global/closedDays.svg';
import DeliveryService from 'assets/global/deliveryService.svg';
import DomesticService from 'assets/global/domesticService.svg';
import DeleteGray from 'assets/global/deleteGray.svg';
import EntertainmentService from 'assets/global/entertainmentService.svg';
import ExpensesTypeIcon from 'assets/global/expensesType.svg';
import FoodService from 'assets/global/foodService.svg';
import Freelancer from 'assets/global/freelancer.svg';
import GeneralService from 'assets/global/generalService.svg';
import HealthService from 'assets/global/healthService.svg';
import HouseRepair from 'assets/global/houseRepair.svg';
import InvoicesIcon from 'assets/global/invoices.svg';
import EstimatesIcon from 'assets/global/estimate.svg';
import SpecialOfferIcon from 'assets/global/specialOffer.svg';
import SpecialOfferClientIcon from 'assets/global/specialOfferClient.svg';
import LoyaltyProgramIcon from 'assets/global/loyaltyProgram.svg';
import ClientRewardIcon from 'assets/global/clientReward.svg';
import LogoutIcon from 'assets/global/logout.svg';
import Notification from 'assets/global/notifications.svg';
import NotificationSettings from 'assets/global/notificationSettings.svg';
import OtherService from 'assets/global/otherService.svg';
import PaymentMethodIcon from 'assets/global/paymentMethod.svg';
import OnlinePaymentMethodIcon from 'assets/global/onlinePaymentMethod.svg';
import ReminderIcon from 'assets/global/reminder.svg';
import SalesIcon from 'assets/global/sales.svg';
import ServiceIcon from 'assets/global/service.svg';
import Setting from 'assets/global/setting.svg';
import ShareToClients from 'assets/global/shareToClients.svg';
import SubscriptionIcon from 'assets/global/subscription.svg';
import TaxesIcon from 'assets/global/taxes.svg';
import Technology from 'assets/global/technology.svg';
import Unread from 'assets/global/unread.svg';
import CalendarPlaceholder from 'assets/placeholders/calendar.svg';
import EstimatePlaceholder from 'assets/placeholders/estimate.svg';
import CompleteProfilePlaceholder from 'assets/placeholders/completeProfile.svg';
import CashJournalsPlaceholder from 'assets/placeholders/cashJournals.svg';
import ExpensesPlaceholder from 'assets/placeholders/expenses.svg';
import HomePlaceholder from 'assets/placeholders/home.svg';
import InvoicesPlaceholder from 'assets/placeholders/invoices.svg';
import PaymentsPlaceholder from 'assets/placeholders/payments.svg';
import SalesPlaceholder from 'assets/placeholders/sales.svg';
import TasksPlaceholder from 'assets/placeholders/tasks.svg';
import UsersPlaceholder from 'assets/placeholders/users.svg';
import VendorsPlaceholder from 'assets/placeholders/vendors.svg';
import BlackListUsers from 'assets/global/blacklist.svg';
import ShareApp from 'assets/global/shareApp.svg';
import QuickPromo from 'assets/global/quickPromo.svg'
import React, { SVGProps } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import COLORS from 'utils/colors';
import { IMargin } from 'utils/styles';
import ClientBlast from 'assets/global/clientBlast.svg'
import ClientRewards from 'assets/global/clientReward.svg'


import { Icon } from './icon';

type AlphaProps = {
  size?: number;
  ml?: number;
};

const Alpha: React.FC<AlphaProps> = ({ size = 16, ml = 6 }) => (
  <Icon src={require('assets/onBoarding/alpha.png')} size={size} ml={ml} />
);

export type SVGComponent = React.FC<SVGProps<SVGElement>>;

type IconComponentProps = IMargin & {
  Component: SVGComponent;
  color?: string;
  size?: number;
  isClickable?: boolean;
  onPress?: () => void;
};

const IconComponent: React.FC<IconComponentProps> = ({
  Component,
  size = 20,
  color = COLORS.black,
  isClickable,
  mr,
  ml,
  mt,
  mb,
  mh,
  mv,
  onPress,
}) => {
  return isClickable ? (
    <TouchableOpacity
      style={{
        marginTop: mv || mt,
        marginRight: mh || mr,
        marginBottom: mv || mb,
        marginLeft: mh || ml,
      }}
      onPress={onPress}
    >
      <Component width={size} height={size} color={color} />
    </TouchableOpacity>
  ) : (
    <Component
      width={size}
      height={size}
      color={color}
      style={{
        marginTop: mv || mt,
        marginRight: mh || mr,
        marginBottom: mv || mb,
        marginLeft: mh || ml,
      }}
    />
  );
};

export {
  Alpha,
  AlphaInactive,
  ArrowForward,
  ArrowRight,
  BeautyService,
  BottomMenuIcon,
  CalendarPlaceholder,
  CompleteProfilePlaceholder,
  CalendarSetupIcon,
  CarService,
  CashJournalsIcon,
  SpecialOfferIcon,
  SpecialOfferClientIcon,
  LoyaltyProgramIcon,
  CashJournalsPlaceholder,
  ClientsIcon,
  VendorsIcon,
  ClosedDaysIcon,
  DeliveryService,
  DomesticService,
  DeleteGray,
  EntertainmentService,
  ExpensesPlaceholder,
  ExpensesTypeIcon,
  FoodService,
  Freelancer,
  GeneralService,
  HealthService,
  HomePlaceholder,
  HouseRepair,
  IconComponent,
  InvoicesIcon,
  EstimatesIcon,
  ClientRewardIcon,
  InvoicesPlaceholder,
  LogoutIcon,
  Notification,
  NotificationSettings,
  OtherService,
  PaymentMethodIcon,
  OnlinePaymentMethodIcon,
  PaymentsPlaceholder,
  ReminderIcon,
  SalesIcon,
  SalesPlaceholder,
  ServiceIcon,
  Setting,
  ShareToClients,
  SubscriptionIcon,
  TasksPlaceholder,
  TaxesIcon,
  Technology,
  Unread,
  ShareApp,
  UsersPlaceholder,
  VendorsPlaceholder,
  BlackListUsers,
  AlphaSVG,
  QuickPromo,
  PackageIcon,
  ClientBlast,
  ClientRewards,
  ConnectIcon,
  EstimatePlaceholder,
  SaleCheckout,
  SaleCheckoutInactive,
};
