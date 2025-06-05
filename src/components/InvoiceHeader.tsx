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
    <div className="mb-6 px-6 py-4 font-montserrat">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h1 className="text-2xl font-bold text-gray-900">INVOICE</h1>
        <span className="text-base font-semibold text-gray-900">{details.invoiceNumber}</span>
      </div>

      <div className="h-px bg-gray-200 mb-5" />

      {/* Company Info */}
      <div className="flex justify-between gap-6">
        <div className="flex gap-4">
          <div className="w-28 h-28 p-4 bg-gray-100 border border-gray-300 rounded-xl flex items-center justify-center">
            {company.logo ? (
              <img src={company.logo} alt={`${company.name} logo`} className="w-12 h-12 object-contain" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24">

                <rect width="24" height="24" rx="4" fill="#f3f4f6" />

                <path d="M0 0h24v24H0V0z" fill="none" />
                <path fill="#64748b" d="M18.36 9l.6 3H5.04l.6-3h12.72M20 4H4v2h16V4zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5zM6 18v-4h6v4H6z" />
              </svg>


            )}
          </div>

          <div className="font-montserrat">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">{company.name}</h2>
            <div className="h-px bg-gray-200 mb-2" />
            <p className="text-xs text-gray-600">{company.address}</p>
            <p className="text-xs text-gray-600">
              {company.city}, {company.state} {company.zip} {company.country}
            </p>
            <br/>
            {company.website && (
              <p className="text-xs text-gray-600">{company.website}</p>
            )}
          </div>

        </div>

        {/* Invoice Dates */}
        <div className="text-right font-montserrat text-sm space-y-2">
          <div>
            <p className="text-gray-500 text-xs">Invoice Date</p>
            <p className="text-gray-900 text-xs">May 14, 2025</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Due Date</p>
            <p className="text-gray-900 text-xs">Jun 13, 2025</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Payment Terms</p>
            <p className="text-gray-900 text-xs">2/10 Net 30</p>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200 mt-6" />
    </div>


  );
};

export default InvoiceHeader;