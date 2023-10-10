import moment from 'moment';
import { CashJournal, CashJournalValues } from 'types/cashJournals';
import { parseDate } from 'utils/dates';

export const adaptCashJournal = (
  cashJournal: CashJournal,
): CashJournalValues => ({
  description: cashJournal.description,
  date: cashJournal.date,
  total: cashJournal.total.toString(),
  notes: cashJournal.notes || '',
});
