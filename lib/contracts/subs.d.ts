export interface VerifyUserSubInput {
  userId: string;
  reference: string;
  planId: string;
}

export interface VerifyUpgradeSubInput {
  userId: string;
  reference: string;
  amountpaid: string;
  newExpiryDate: string;
  TransactionId: string;
  planId: string;
}

export interface UpgradeSubInput {
  userId: string;
  planId: string;
}
