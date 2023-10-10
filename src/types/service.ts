export interface IService {
  id: number;
  name: string;
}

export type Service = {
  serviceName: string;
  serviceDescription: string;
  physicalItem: boolean;
  servicePrice: string;
  quickSale: boolean;
  activeService: boolean;
  estimationTime?: any;
  servicePictures?: any;
};

export type WebUserService = {
  name: string;
  description: string;
  price: string;
  type: string;
  isQuickSale: boolean;
  isActive: boolean;
  time: any;
}
