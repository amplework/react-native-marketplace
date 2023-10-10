import { Api } from 'api';
import { ApiResponse } from 'types/api';
import { ClientBlastRequest, ImageUpload } from 'types/clientBlast';

const createBlast = (data: ClientBlastRequest): ApiResponse<void> =>
  Api.post('/provider/client-blast', data);

const uploadImage = (data: ImageUpload): ApiResponse<void> => {
  const newData = new FormData();
  newData.append('photo', data?.photo);

  return Api.post('/provider/file', newData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const ClientBlastApi = {
  createBlast,
  uploadImage,
};
