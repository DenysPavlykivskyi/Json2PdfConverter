import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { InvoiceGenerator } from '../InvoiceGenerator.js';
import { InvoiceData } from '../types/invoice.js';

// Sample invoice data for testing
const sampleInvoice: InvoiceData = {
  company: {
    name: 'The JackFruit Co. LLC',
    address: '901 Fifth Avenue, Suite 1200',
    city: 'Seattle',
    state: 'WA',
    zip: '98164',
    country: 'USA',
    website: 'www.jackfruit.com'
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
  message: 'Thank you for your recent order with us — we truly appreciate your business! If you have any questions about the invoice, product details, or payment instructions, feel free to reach out — we're happy to help.',
  notes: 'We look forward to serving you again soon.'
};

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Generate PDF
const pdfBuffer = InvoiceGenerator.generatePdf(sampleInvoice);

// Write PDF to file
const outputPath = path.resolve(__dirname, '../../invoice.pdf');
fs.writeFileSync(outputPath, Buffer.from(pdfBuffer));

console.log(`PDF generated successfully: ${outputPath}`);

// Generate HTML for testing
const html = InvoiceGenerator.generateHtml(sampleInvoice);
const htmlOutputPath = path.resolve(__dirname, '../../invoice.html');
fs.writeFileSync(htmlOutputPath, html);

console.log(`HTML generated successfully: ${htmlOutputPath}`);