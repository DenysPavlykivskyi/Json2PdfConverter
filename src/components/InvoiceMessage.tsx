import React from 'react';

interface InvoiceMessageProps {
  message?: string;
  notes?: string;
}

const InvoiceMessage: React.FC<InvoiceMessageProps> = ({ message, notes }) => {
  if (!message && !notes) return null;
  
  return (
    <div className="space-y-4 text-sm">
      {message && (
        <div>
          <h3 className="text-gray-500 mb-1">Message for the Customer</h3>
          <p className="text-gray-600">{message}</p>
        </div>
      )}
      {notes && (
        <p className="text-gray-600">{notes}</p>
      )}
    </div>
  );
};

export default InvoiceMessage;