import { CashJournalRequest, CashJournalValues } from 'types/cashJournals';

export const formatCashJournal = (
  values: CashJournalValues,
): CashJournalRequest => ({
  total: parseFloat(values.total),
  description: values.description,
  date: values.date,
  notes: values.notes,
});
