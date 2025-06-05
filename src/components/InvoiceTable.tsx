import React from 'react';
import { InvoiceLineItem } from '../types/invoice';

interface InvoiceTableProps {
  lineItems: InvoiceLineItem[];
}

function formatWithSup(value: number | string) {
  const [intPart, decPart] = Number(value).toFixed(2).split('.');
  return (
    <>
      {intPart}
      <sup className="text-xs">.{decPart}</sup>
    </>
  );
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ lineItems }) => {
  return (
      <div className="mb-6 px-6 py-4 font-montserrat">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-900">
            <th className="py-3 text-left text-sm font-medium text-gray-500"><b>Item</b></th>
            <th className="py-3 text-right text-sm font-medium text-gray-500 w-24"><b>Qty/Hours</b></th>
            <th className="py-3 text-right text-sm font-medium text-gray-500 w-32"><b>Price</b></th>
            <th className="py-3 text-right text-sm font-medium text-gray-500 w-32"><b>Amount</b></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {lineItems.map((item, index) => (
            <tr key={index}>
              <td className="py-4">
                <div className="text-sm text-gray-900">{item.item}</div>
                {item.description && (
                  <div className="text-sm text-gray-500 mt-0.5">{item.description}</div>
                )}
              </td>
              <td className="py-4 text-right text-sm text-gray-900">
                {formatWithSup(item.qtyHours)}
              </td>
              <td className="py-4 text-right text-sm text-gray-900">
                ${formatWithSup(item.price)}
              </td>
              <td className="py-4 text-right text-sm text-gray-900">
                ${formatWithSup(item.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-px bg-gray-200 w-full"></div>
    </div>
  );
};

export default InvoiceTable;