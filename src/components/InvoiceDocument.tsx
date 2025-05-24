import React from 'react';
import { InvoiceData } from '../types/invoice';
import { calculateSubtotal, calculateTotal } from '../utils/calculations';
import InvoiceHeader from './InvoiceHeader';
import InvoiceCustomer from './InvoiceCustomer';
import InvoiceTable from './InvoiceTable';
import InvoiceTotals from './InvoiceTotals';
import InvoiceMessage from './InvoiceMessage';

interface InvoiceDocumentProps {
  data: InvoiceData;
}

const InvoiceDocument: React.FC<InvoiceDocumentProps> = ({ data }) => {
  const subtotal = calculateSubtotal(data.lineItems);
  const taxAmount = data.taxAmount || 0;
  const total = calculateTotal(subtotal, taxAmount);

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto shadow-md print:shadow-none">
      <InvoiceHeader company={data.company} details={data.details} />
      <InvoiceCustomer customer={data.customer} />
      <InvoiceTable lineItems={data.lineItems} />
      <InvoiceTotals 
        subtotal={subtotal} 
        taxLabel={data.taxRate ? `Tax (${data.taxRate}%)` : 'Tax'}
        taxAmount={taxAmount} 
        total={total} 
      />
      <InvoiceMessage message={data.message} notes={data.notes} />
    </div>
  );
};

export default InvoiceDocument;