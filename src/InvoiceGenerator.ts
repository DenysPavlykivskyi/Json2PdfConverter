import { InvoiceData, InvoiceOptions } from './types/invoice';
import { convertToHtml } from './converters/HtmlConverter';
import { convertToPdf } from './converters/PdfConverter';
import { processInvoiceData } from './utils/calculations';

/**
 * Main invoice generator class
 */
export class InvoiceGenerator {
  /**
   * Generate invoice output based on provided data and options
   */
  static generate(
    data: InvoiceData, 
    options: InvoiceOptions
  ): string | Uint8Array {
    // Process the invoice data (calculate totals, etc.)
    const processedData = processInvoiceData(data);
    
    // Generate output based on format option
    if (options.format === 'html') {
      return convertToHtml(processedData, options);
    } else {
      const pdfDoc = convertToPdf(processedData, options);
      return pdfDoc.output('arraybuffer');
    }
  }
  
  /**
   * Generate HTML output
   */
  static generateHtml(data: InvoiceData, options?: Partial<InvoiceOptions>): string {
    return convertToHtml(data, { format: 'html', ...options });
  }
  
  /**
   * Generate PDF output
   */
  static generatePdf(data: InvoiceData, options?: Partial<InvoiceOptions>): Uint8Array {
    const pdfDoc = convertToPdf(data, { format: 'pdf', ...options });
    return pdfDoc.output('arraybuffer');
  }
}