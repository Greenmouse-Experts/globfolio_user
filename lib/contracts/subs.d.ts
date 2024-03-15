export interface VerifyUserSubInput {
  userId: string;
  reference: string;
  planId: string;
}

export interface VerifyUpgradeSubInput {
  userId: string;
  reference: string;
  amountpaid: number;
  newExpiryDate: string;
  TransactionId: string;
  planId: string;
}

export interface UpgradeSubInput {
  userId: string;
  planId: string;
}

export interface BenefitSubItem {
  benefit: string;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  planId: string;
  updatedAt: string;
}
export interface SubItemType {
  amount: number;
  analystPickAccess: string[];
  chatAccess: string[];
  appleId: string;
  benefits: BenefitSubItem[];
  chatAccess: string[];
  createdAt: string;
  deletedAt: string | null;
  duration: number;
  googleId: string;
  id: string;
  name: string;
  privateMessaging: boolean;
  updatedAt: string;
}
