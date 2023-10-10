export type ReportState = {
  report: ReportSlice;
};

export type ReportSlice = {
  loading: boolean;
  pdfUrl: string | null;
};
