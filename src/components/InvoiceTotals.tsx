import React from 'react';

interface InvoiceTotalsProps {
  subtotal: number;
  taxLabel?: string;
  taxAmount?: number;
  total: number;
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

const InvoiceTotals: React.FC<InvoiceTotalsProps> = ({
  taxLabel = 'Tax',
  taxAmount = 0,
  total,
}) => {
  return (
    <div className="flex justify-end mb-2">
      <div className="w-64">
        {taxAmount > 0 && (
          <div className="flex justify-between py-2 text-sm">
            <span className="text-gray-500">{taxLabel}</span>
            <span className="text-gray-900">${taxAmount.toFixed(2)}<sup className="text-xs">.00</sup></span>
          </div>
        )}
        <div className="flex justify-between py-3">
          <span className="font-medium text-gray-900">Invoice Total</span>
          <span className="font-medium text-gray-900">${formatWithSup(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTotals;