import React from 'react';
import { InvoiceCompany, InvoiceDetails } from '../types/invoice';
import { formatDate } from '../utils/calculations';
import { Store } from 'lucide-react';

interface InvoiceHeaderProps {
  company: InvoiceCompany;
  details: InvoiceDetails;
}

const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ company, details }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">INVOICE</h1>
        </div>
        <span className="text-base text-gray-900"><b>{details.invoiceNumber}</b></span>
      </div>
      <div className="h-px bg-gray-200 w-full mb-4"></div>

      <div className="flex justify-between mb-2">
        <div className="flex items-start gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            {company.logo ? (
              <img 
                src={company.logo} 
                alt={`${company.name} logo`} 
                className="w-12 h-12 object-contain" 
              />
            ) : (
              <Store className="w-12 h-12 text-gray-600" />
            )}
          </div>
          <div>
            <h2 className="text-base fontmedium text-gray-900 mb-2"><b>{company.name}</b></h2>
            <div className="h-px bg-gray-900 w-full mb-2"></div>
            <p className="text-sm text-gray-600 mt-1">{company.address}</p>
            <p className="text-sm text-gray-600 mb-2">
              {company.city}, {company.state} {company.zip} {company.country}
            </p>
            {company.website && (
              <p className="text-sm text-gray-600 mb-2">{company.website}</p>
            )}
          </div>
        </div>

        <div className="text-right">
          <div className="space-y-1 text-sm">
            <div className="grid grid-cols-1">
              <span className="text-gray-500">Invoice Date</span>
              <span className="text-gray-900"><b>{formatDate(details.invoiceDate)}</b></span>
            </div>
            <div className="grid grid-cols-1">
              <span className="text-gray-500">Due Date</span>
              <span className="text-gray-900"><b>{formatDate(details.dueDate)}</b></span>
            </div>
            <div className="grid grid-cols-1">
              <span className="text-gray-500">Payment Terms</span>
              <span className="text-gray-900"><b>{details.paymentTerms}</b></span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-px bg-gray-200 w-full"></div>
    </div>
  );
};

export default InvoiceHeader;