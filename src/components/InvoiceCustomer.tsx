import React from 'react';
import { InvoiceCustomer as CustomerType } from '../types/invoice';

interface InvoiceCustomerProps {
  customer: CustomerType;
}

const InvoiceCustomer: React.FC<InvoiceCustomerProps> = ({ customer }) => {
  return (
    <div className="mb-10">
      <h3 className="text-sm text-gray-500 mb-2">Bill to</h3>
      <h2 className="text-lg font-medium text-gray-900 mb-1">{customer.name}</h2>
      <p className="text-sm text-gray-600">
        {customer.address}, {customer.city}, {customer.state} {customer.zip} {customer.country}
      </p>
      {customer.website && (
        <p className="text-sm text-gray-600">{customer.website}</p>
      )}
    </div>
  );
};

export default InvoiceCustomer;