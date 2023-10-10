export interface IAddress {
  id: number;
  placeId: string;
  formattedAddress: string;
  addressLine2: string | null;
  location: ILocation;
  utctimezone: string;
}

export interface ILocation {
  lat: number;
  lng: number;
}

export interface IPlace {
  id: string;
  name: string;
  formattedAddress?: string;
  location?: ILocation;
}

export type AutocompleteAddress = {
  placeId: string;
  formattedAddress?: string;
  name?: string;
  location?: ILocation;
};
