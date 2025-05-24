import { InvoiceData, InvoiceLineItem } from '../types/invoice';

/**
 * Calculate subtotal from line items
 */
export const calculateSubtotal = (lineItems: InvoiceLineItem[]): number => {
  return lineItems.reduce((sum, item) => sum + item.amount, 0);
};

/**
 * Calculate tax amount based on subtotal and tax rate
 */
export const calculateTax = (subtotal: number, taxRate: number): number => {
  return subtotal * (taxRate / 100);
};

/**
 * Calculate invoice total (subtotal + tax)
 */
export const calculateTotal = (subtotal: number, taxAmount: number): number => {
  return subtotal + taxAmount;
};

/**
 * Format number as currency
 */
export const formatCurrency = (
  amount: number,
  locale: string = 'en-US',
  currency: string = 'USD'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format date string
 */
export const formatDate = (
  dateString: string,
  locale: string = 'en-US'
): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * Process invoice data and calculate totals
 */
export const processInvoiceData = (data: InvoiceData): InvoiceData => {
  const subtotal = calculateSubtotal(data.lineItems);
  const taxAmount = data.taxRate
    ? calculateTax(subtotal, data.taxRate)
    : data.taxAmount || 0;
  
  return {
    ...data,
    taxAmount,
  };
};