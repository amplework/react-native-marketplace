export type ClientBlastRequest = {
    clientSubprofileIds: string[];
    shareOneApp: boolean;
    message: string;
    photo: any;
  };

export type CreateBlastAction = {
    clientBlastPayload: ClientBlastRequest;
    onSuccess: (image: string) => void;
};

export type ImageUpload = {
  photo: ImageType
}

export type ImageType = {
  uri: string,
  name: string,
  type: string,
}
  