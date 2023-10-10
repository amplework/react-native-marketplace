import { Api } from 'api/api';
import { ApiResponse } from 'types/api';
import { IEditTaxRequest, ITax, TaxValues } from 'types/taxes';

const getTaxes = (): ApiResponse<ITax[]> => Api.get('/provider/settings/taxes');

const createTax = async (tax: TaxValues): ApiResponse<ITax> =>
  Api.post('/provider/settings/tax', tax);

const editTax = async (tax: IEditTaxRequest): ApiResponse<ITax> =>
  Api.put(`/provider/settings/tax/${tax.id}`, {
    description: tax?.description,
    effectiveDate: tax?.effectiveDate,
    rate: tax?.rate,
    shortName: tax?.shortName,
    shouldApplyToTransactions: tax?.shouldApplyToTransactions
  });

const deleteTax = async (id: number): ApiResponse<ITax> =>
  Api.delete(`/provider/settings/tax/${id}`);

export const TaxesApi = {
  getTaxes,
  createTax,
  editTax,
  deleteTax,
};
