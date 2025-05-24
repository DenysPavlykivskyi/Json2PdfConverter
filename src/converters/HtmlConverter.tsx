import React from 'react';
import { renderToString } from 'react-dom/server';
import { InvoiceData, InvoiceOptions } from '../types/invoice';
import InvoiceDocument from '../components/InvoiceDocument';

/**
 * Converts invoice data to HTML string with TailwindCSS
 */
export const convertToHtml = (
  data: InvoiceData, 
  options?: Partial<InvoiceOptions>
): string => {
  // Process the data if needed
  const processedData = { ...data };
  
  // Render React component to HTML string
  const html = renderToString(
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Invoice {data.details.invoiceNumber}</title>
        <style dangerouslySetInnerHTML={{ __html: getTailwindStyles() }} />
      </head>
      <body className="bg-gray-100 font-sans">
        <div className="container mx-auto py-8 px-4">
          <InvoiceDocument data={processedData} />
        </div>
      </body>
    </html>
  );

  return html;
};

/**
 * Get minimal Tailwind CSS styles for invoice rendering
 * In a real application, you would use a proper build process
 */
const getTailwindStyles = (): string => {
  return `
    /* Base Tailwind utilities */
    *, ::before, ::after { box-sizing: border-box; border-width: 0; border-style: solid; }
    html { line-height: 1.5; -webkit-text-size-adjust: 100%; tab-size: 4; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
    body { margin: 0; line-height: inherit; }
    hr { height: 0; color: inherit; border-top-width: 1px; }
    h1, h2, h3, h4, h5, h6 { font-size: inherit; font-weight: inherit; margin: 0; }
    a { color: inherit; text-decoration: inherit; }
    b, strong { font-weight: bolder; }
    code, kbd, samp, pre { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 1em; }
    small { font-size: 80%; }
    sub, sup { font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; }
    sub { bottom: -0.25em; }
    sup { top: -0.5em; }
    table { text-indent: 0; border-color: inherit; border-collapse: collapse; }
    button, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; font-weight: inherit; line-height: inherit; color: inherit; margin: 0; padding: 0; }
    button, select { text-transform: none; }
    button, [type='button'], [type='reset'], [type='submit'] { -webkit-appearance: button; background-color: transparent; background-image: none; }
    :-moz-focusring { outline: auto; }
    :-moz-ui-invalid { box-shadow: none; }
    progress { vertical-align: baseline; }
    ::-webkit-inner-spin-button, ::-webkit-outer-spin-button { height: auto; }
    [type='search'] { -webkit-appearance: textfield; outline-offset: -2px; }
    ::-webkit-search-decoration { -webkit-appearance: none; }
    ::-webkit-file-upload-button { -webkit-appearance: button; font: inherit; }
    summary { display: list-item; }
    blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre { margin: 0; }
    fieldset { margin: 0; padding: 0; }
    legend { padding: 0; }
    ol, ul, menu { list-style: none; margin: 0; padding: 0; }
    textarea { resize: vertical; }
    input::placeholder, textarea::placeholder { opacity: 1; color: #9ca3af; }
    button, [role="button"] { cursor: pointer; }
    :disabled { cursor: default; }
    img, svg, video, canvas, audio, iframe, embed, object { display: block; vertical-align: middle; }
    img, video { max-width: 100%; height: auto; }
    [hidden] { display: none; }

    /* Tailwind classes used in invoice */
    .container { width: 100%; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
    .px-4 { padding-left: 1rem; padding-right: 1rem; }
    .bg-white { background-color: #ffffff; }
    .bg-gray-50 { background-color: #f9fafb; }
    .bg-gray-100 { background-color: #f3f4f6; }
    .text-gray-500 { color: #6b7280; }
    .text-gray-600 { color: #4b5563; }
    .text-gray-800 { color: #1f2937; }
    .font-sans { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
    .font-medium { font-weight: 500; }
    .font-bold { font-weight: 700; }
    .text-xs { font-size: 0.75rem; line-height: 1rem; }
    .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
    .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
    .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
    .uppercase { text-transform: uppercase; }
    .tracking-wider { letter-spacing: 0.05em; }
    .flex { display: flex; }
    .items-start { align-items: flex-start; }
    .items-center { align-items: center; }
    .items-end { align-items: flex-end; }
    .justify-center { justify-content: center; }
    .justify-between { justify-content: space-between; }
    .justify-end { justify-content: flex-end; }
    .flex-col { flex-direction: column; }
    .w-full { width: 100%; }
    .w-16 { width: 4rem; }
    .w-24 { width: 6rem; }
    .w-32 { width: 8rem; }
    .w-64 { width: 16rem; }
    .h-16 { height: 4rem; }
    .min-w-full { min-width: 100%; }
    .max-w-4xl { max-width: 56rem; }
    .overflow-x-auto { overflow-x: auto; }
    .border-collapse { border-collapse: collapse; }
    .border-b { border-bottom-width: 1px; }
    .border-t { border-top-width: 1px; }
    .border-gray-200 { border-color: #e5e7eb; }
    .p-4 { padding: 1rem; }
    .p-8 { padding: 2rem; }
    .px-4 { padding-left: 1rem; padding-right: 1rem; }
    .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
    .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
    .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mb-8 { margin-bottom: 2rem; }
    .mr-4 { margin-right: 1rem; }
    .mt-1 { margin-top: 0.25rem; }
    .object-contain { object-fit: contain; }
    .rounded-md { border-radius: 0.375rem; }
    .shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
    .text-left { text-align: left; }
    .text-right { text-align: right; }
    .print\\:shadow-none { @media print { box-shadow: none; } }
    
    @media (min-width: 768px) {
      .md\\:flex-row { flex-direction: row; }
      .md\\:mb-0 { margin-bottom: 0; }
      .md\\:w-64 { width: 16rem; }
    }
  `;
};