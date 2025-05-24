import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { InvoiceData, InvoiceLineItem, InvoiceOptions } from '../types/invoice';
import { calculateSubtotal, calculateTotal, formatCurrency, formatDate } from '../utils/calculations';

/**
 * Converts invoice data to PDF format
 */
export const convertToPdf = (
  data: InvoiceData,
  options?: Partial<InvoiceOptions>
): jsPDF => {
  // Create new PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Page dimensions
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const usableWidth = pageWidth - 2 * margin;

  // Set default font
  doc.setFont('helvetica');
  
  // Add header
  addHeader(doc, data, margin, usableWidth);
  
  // Add customer info
  addCustomerInfo(doc, data, margin);
  
  // Add line items table
  const startY = 100; // Y position after header and customer info
  addLineItemsTable(doc, data, margin, startY, usableWidth);
  
  // Calculate current Y position
  let currentY = doc.previousAutoTable.finalY + 10;
  
  // Add totals
  addTotals(doc, data, currentY, margin, usableWidth);
  
  // Add messages
  currentY = currentY + 30;
  if (currentY + 50 > pageHeight - margin) {
    doc.addPage();
    currentY = margin;
  }
  addMessages(doc, data, currentY, margin, usableWidth);
  
  return doc;
};

/**
 * Add invoice header to PDF
 */
const addHeader = (
  doc: jsPDF,
  data: InvoiceData,
  margin: number,
  usableWidth: number
): void => {
  // Company logo or placeholder
  doc.setFillColor(243, 244, 246); // Light gray background
  doc.rect(margin, margin, 25, 25, 'F');
  
  // Company info
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(data.company.name, margin + 30, margin + 5);
  doc.text(data.company.address, margin + 30, margin + 10);
  if (data.company.address2) {
    doc.text(data.company.address2, margin + 30, margin + 15);
  }
  doc.text(
    `${data.company.city}, ${data.company.state} ${data.company.zip} ${data.company.country}`,
    margin + 30,
    margin + 20
  );
  if (data.company.website) {
    doc.text(data.company.website, margin + 30, margin + 25);
  }
  
  // Invoice title
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('INVOICE', pageWidth - margin - 40, margin + 10);
  
  // Invoice details
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Invoice #:', pageWidth - margin - 40, margin + 20);
  doc.text(data.details.invoiceNumber, pageWidth - margin, margin + 20, { align: 'right' });
  
  doc.text('Invoice Date:', pageWidth - margin - 40, margin + 25);
  doc.text(formatDate(data.details.invoiceDate), pageWidth - margin, margin + 25, { align: 'right' });
  
  doc.text('Due Date:', pageWidth - margin - 40, margin + 30);
  doc.text(formatDate(data.details.dueDate), pageWidth - margin, margin + 30, { align: 'right' });
  
  doc.text('Payment Terms:', pageWidth - margin - 40, margin + 35);
  doc.text(data.details.paymentTerms, pageWidth - margin, margin + 35, { align: 'right' });
};

/**
 * Add customer information to PDF
 */
const addCustomerInfo = (
  doc: jsPDF,
  data: InvoiceData,
  margin: number
): void => {
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Bill to', margin, margin + 40);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(data.customer.name, margin, margin + 45);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(data.customer.address, margin, margin + 50);
  let yOffset = 55;
  
  if (data.customer.address2) {
    doc.text(data.customer.address2, margin, margin + yOffset);
    yOffset += 5;
  }
  
  doc.text(
    `${data.customer.city}, ${data.customer.state} ${data.customer.zip} ${data.customer.country}`,
    margin,
    margin + yOffset
  );
  yOffset += 5;
  
  if (data.customer.website) {
    doc.text(data.customer.website, margin, margin + yOffset);
  }
};

/**
 * Add line items table to PDF
 */
const addLineItemsTable = (
  doc: jsPDF,
  data: InvoiceData,
  margin: number,
  startY: number,
  usableWidth: number
): void => {
  const tableColumn = ['Item', 'Qty/Hours', 'Price', 'Amount'];
  const tableRows: (string | number)[][] = [];
  
  // Prepare table rows
  data.lineItems.forEach((item) => {
    const itemRow = [
      item.description 
        ? `${item.item}\n${item.description}`
        : item.item,
      `${item.qtyHours}00`,
      `$${item.price.toFixed(2)}00`,
      `$${item.amount.toFixed(2)}00`,
    ];
    tableRows.push(itemRow);
  });
  
  // Add table to document
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: startY,
    margin: { left: margin, right: margin },
    styles: { overflow: 'linebreak', cellPadding: 5, fontSize: 10 },
    headStyles: { 
      fillColor: [249, 250, 251], 
      textColor: [100, 100, 100],
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 25, halign: 'right' },
      2: { cellWidth: 30, halign: 'right' },
      3: { cellWidth: 30, halign: 'right' },
    },
    alternateRowStyles: { fillColor: [249, 250, 251] },
    didDrawPage: (data) => {
      // Add header on each new page
      if (data.pageNumber > 1) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`Invoice #${data.details?.invoiceNumber}`, margin, margin - 5);
        doc.text('Continued...', pageWidth - margin, margin - 5, { align: 'right' });
      }
    },
  });
};

/**
 * Add totals section to PDF
 */
const addTotals = (
  doc: jsPDF,
  data: InvoiceData,
  y: number,
  margin: number,
  usableWidth: number
): void => {
  const subtotal = calculateSubtotal(data.lineItems);
  const taxAmount = data.taxAmount || 0;
  const total = calculateTotal(subtotal, taxAmount);
  
  const totalsWidth = 80;
  const totalsX = pageWidth - margin - totalsWidth;
  
  // Subtotal
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Subtotal', totalsX, y);
  doc.setTextColor(0, 0, 0);
  doc.text(formatCurrency(subtotal), pageWidth - margin, y, { align: 'right' });
  
  y += 5;
  
  // Tax (if applicable)
  if (taxAmount > 0) {
    doc.setTextColor(100, 100, 100);
    const taxLabel = data.taxRate ? `Tax (${data.taxRate}%)` : 'Tax';
    doc.text(taxLabel, totalsX, y);
    doc.setTextColor(0, 0, 0);
    doc.text(formatCurrency(taxAmount), pageWidth - margin, y, { align: 'right' });
    y += 5;
  }
  
  // Draw line above total
  y += 2;
  doc.setDrawColor(200, 200, 200);
  doc.line(totalsX, y, pageWidth - margin, y);
  y += 5;
  
  // Total
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Invoice Total', totalsX, y);
  doc.text(formatCurrency(total), pageWidth - margin, y, { align: 'right' });
};

/**
 * Add message and notes to PDF
 */
const addMessages = (
  doc: jsPDF,
  data: InvoiceData,
  y: number,
  margin: number,
  usableWidth: number
): void => {
  if (data.message) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Message for the Customer', margin, y);
    y += 5;
    
    doc.setTextColor(80, 80, 80);
    const messageLines = doc.splitTextToSize(data.message, usableWidth);
    doc.text(messageLines, margin, y);
    y += messageLines.length * 5 + 5;
  }
  
  if (data.notes) {
    if (y + 20 > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Notes', margin, y);
    y += 5;
    
    doc.setTextColor(80, 80, 80);
    const notesLines = doc.splitTextToSize(data.notes, usableWidth);
    doc.text(notesLines, margin, y);
  }
};