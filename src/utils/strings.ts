export const capitalize = (value: string) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : '';

export const capitalizeSentence = (value: string) =>
  value.replace(/\w\S*/g, (word) =>
    word.replace(/^\w/, (char) => char.toUpperCase()),
  );

export const localeCompare = (a: string, b: string) =>
  a.localeCompare(b, undefined, { ignorePunctuation: true });

export const isString = (value: any): value is string =>
  typeof value === 'string';

type Person = {
  firstName: string;
  lastName: string | null;
};

export const getFullName = <T extends Person>({ firstName, lastName }: T) =>
  lastName ? `${firstName} ${lastName}` : firstName;

export const ellipsize = (value: string, size: number) =>
  value.length > size ? `${value.slice(0, size).trimRight()}...` : value;

export const getRewardServices = (services: any) =>
  services?.map((e: any) => e?.name)?.join(', ')

export const getRewardOffer = ({ rewardType, discount, discountRate }: any) =>
  (rewardType == 'discount percent' && discountRate != null) ? `${discountRate}%` : (rewardType == 'discount amount' && discount != null) && `$${discount}`;

export const getObjectFromURLParams = (url: string) =>
  JSON.parse('{"' + decodeURI(url.split('?')[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')