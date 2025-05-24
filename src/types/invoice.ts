export interface InvoiceLineItem {
  item: string;
  description?: string;
  qtyHours: number;
  price: number;
  amount: number;
}

export interface InvoiceCompany {
  name: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  website?: string;
  logo?: string;
}

export interface InvoiceCustomer {
  name: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  website?: string;
}

export interface InvoiceDetails {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string;
}

export interface InvoiceData {
  company: InvoiceCompany;
  customer: InvoiceCustomer;
  details: InvoiceDetails;
  lineItems: InvoiceLineItem[];
  taxRate?: number;
  taxAmount?: number;
  message?: string;
  notes?: string;
}

export interface InvoiceOptions {
  format: 'html' | 'pdf';
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
  };
}