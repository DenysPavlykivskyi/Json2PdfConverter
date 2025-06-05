import React, { useState } from 'react';
import { InvoiceData } from './types/invoice';
import InvoiceDocument from './components/InvoiceDocument';
import { FilePenLine, FileText, Download } from 'lucide-react';

// Sample invoice data for demonstration
const sampleInvoice: InvoiceData = {
  company: {
    name: 'The JackFruit Co. LLC',
    address: '901 Fifth Avenue, Suite 1200',
    city: 'Seattle',
    state: 'WA',
    zip: '98164',
    country: 'USA',
    website: 'www.jackfruit.com',
  },
  customer: {
    name: 'Maple Syrup Enterprises',
    address: '516 W Crocker St',
    city: 'Wausau',
    state: 'WI',
    zip: '54401',
    country: 'USA',
    website: 'www.maplesyrup.com'
  },
  details: {
    invoiceNumber: 'INV-25541',
    invoiceDate: '2025-05-14',
    dueDate: '2025-06-13',
    paymentTerms: '2/10 Net 30'
  },
  lineItems: [
    {
      item: 'Bookkeeping Services',
      description: 'Monthly book-keeping contract 2025',
      qtyHours: 5,
      price: 25.00,
      amount: 125.00
    },
    {
      item: 'Janitorial Staff Payments',
      description: 'Monthly labor payments reimbursements',
      qtyHours: 20,
      price: 12.00,
      amount: 240.00
    },
    {
      item: 'Sales Tax',
      description: 'WI State Tax 10% on Bookkeeping',
      qtyHours: 1,
      price: 12.50,
      amount: 12.50
    }
  ],
  message: 'Thank you for your recent order with us — we truly appreciate your business! If you have any questions about the invoice, product details, or payment instructions, feel free to reach out — we\'re happy to help.',
  notes: 'We look forward to serving you again soon.'
};

function App() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(sampleInvoice);
  const [jsonInput, setJsonInput] = useState<string>(JSON.stringify(sampleInvoice, null, 2));
  const [showEditor, setShowEditor] = useState(false);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    try {
      const parsedData = JSON.parse(e.target.value) as InvoiceData;
      setInvoiceData(parsedData);
    } catch (error) {
      // Silently fail on parse errors
    }
  };

  const toggleEditor = () => {
    setShowEditor(!showEditor);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-white shadow-sm print:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">Invoice Generator</h1>
            <div className="flex space-x-2">
              <button
                onClick={toggleEditor}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition"
              >
                <FilePenLine size={16} />
                {showEditor ? "Hide Editor" : "Edit JSON"}
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition"
              >
                <Download size={16} />
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {showEditor && (
          <div className="mb-8 print:hidden">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={20} className="text-blue-600" />
              <h2 className="text-lg font-semibold">JSON Editor</h2>
            </div>
            <textarea
              value={jsonInput}
              onChange={handleJsonChange}
              className="w-full h-80 p-4 border border-gray-300 rounded-md font-mono text-sm"
            />
          </div>
        )}

        <div className={`${showEditor ? 'border-t border-gray-200 pt-8' : ''}`}>
          <InvoiceDocument data={invoiceData} />
        </div>
      </div>
    </div>
  );
}

export default App;