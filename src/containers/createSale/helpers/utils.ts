import { IProduct } from 'types/products';
import { ITax } from 'types/taxes';

type Product = IProduct & {
  quantity: number;
  isSelected?: boolean;
};

export type DiscountType = {
  label: string;
  value: number;
};

export const TIP_DISCOUNT: DiscountType[] = [
  {
    label: '5%',
    value: 5,
  },
  {
    label: '10%',
    value: 10,
  },
  {
    label: '15%',
    value: 15,
  },
  {
    label: '20%',
    value: 20,
  },
  {
    label: 'Custom',
    value: 0,
  },
];

const getSelectedQuickItems = (quickItems: Product[]) =>
  quickItems.filter((quickItem) => quickItem.isSelected);

export const hasProduct = (services: Product[], quickItems: Product[] = []) =>
  !!services.length || !!getSelectedQuickItems(quickItems).length;

export const getSaleTotal = (
  discountAmount: number,
  taxes: ITax[],
  services: Product[],
  quickItems: Product[] = [],
) => {
  if (!hasProduct(services, quickItems)) {
    return 0;
  }

  const products = [...services, ...getSelectedQuickItems(quickItems)];
  const subTotal = Number(
    products
      .reduce((pV, val) => (pV += val.price * val.quantity), 0)
      .toFixed(2),
  );
  const percent = Number(
    taxes.reduce((pV, val) => (pV += val.rate), 0).toFixed(2),
  );

  const total = (subTotal + (percent / 100) * subTotal).toFixed(2);
  const totalAfterDiscount = (
    Number(total) -
    (Number(total) * discountAmount) / 100
  ).toFixed(0);
  const discountInDollar = ((Number(total) * discountAmount) / 100).toFixed(0);

  return discountAmount > 0
    ? {
        newTotal: totalAfterDiscount,
        totalDiscount: Number(discountInDollar),
      }
    : {
        newTotal: total,
        totalDiscount: 0,
      };
};

export const getSaleTotalWithDiscount = (
  discountAmount: number,
  taxes: ITax[],
  services: Product[],
  quickItems: Product[] = [],
) => {
  if (!hasProduct(services, quickItems)) {
    return 0;
  }

  const products = [...services, ...getSelectedQuickItems(quickItems)];
  const subTotal = Number(
    products
      .reduce((pV, val) => (pV += val.price * val.quantity), 0)
      .toFixed(2),
  );
  const percent = Number(
    taxes.reduce((pV, val) => (pV += val.rate), 0).toFixed(2),
  );

  const total = (subTotal + (percent / 100) * subTotal).toFixed(2);
  const totalAfterDiscount = (Number(total) - discountAmount).toFixed(0);

  return discountAmount > 0 ? totalAfterDiscount : total;
};

export const getSaleTotalWithReward = (
  taxes: ITax[],
  services: Product[],
  quickItems: Product[] = [],
  rewardsId: number[],
  rewardDetails: any,
) => {
  if (!hasProduct(services, quickItems)) {
    return 0;
  }

  const products = [...services, ...getSelectedQuickItems(quickItems)];

  const subTotal = Number(
    products
      .reduce((pV, val: any) => {
        const priceAfterDiscount =
          rewardDetails?.rewardType == 'discount amount'
            ? val?.price - rewardDetails?.discount
            : val?.price - (val?.price * rewardDetails?.discountRate) / 100;
        return (pV +=
          (rewardsId?.includes(val?.productId || val?.id)
            ? priceAfterDiscount
            : val.price) * val.quantity);
      }, 0)
      .toFixed(2),
  );
  const percent = Number(
    taxes.reduce((pV, val) => (pV += val.rate), 0).toFixed(2),
  );

  const total = (subTotal + (percent / 100) * subTotal).toFixed(2);

  return Number(total);
};
