export interface TimesheetDraft {
  month: number;
  year: number;
  hours: Record<number, number>;
  savedBy: string;
  savedAt: Date;
}

export interface TimesheetSubmission {
  month: number;
  year: number;
  hours: Record<number, number>;
  submittedBy: string;
  submittedAt: Date;
}

export interface TimesheetDraftResponse {
  id: string;
  draft: TimesheetDraft;
}

export interface TimesheetSubmissionResponse {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submission: TimesheetSubmission;
}
