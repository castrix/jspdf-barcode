import { jsPDF } from 'jspdf'

declare module 'jspdf-barcode' {
  /**
   * Generate Barcode for jsPdf
   * @param barcodeValue Barcode value to be generated.
   * @param options Optional options object.
   * @return A promise resolving to the jsPDF document.
   */
  export function generateBarcode(barcodeValue: String, options: { fontSize: number; textColor: string; x: number; y: number; }): Promise<jsPDF>
}

declare module 'jspdf' {
  interface jsPDF {
    /**
   * Generate Barcode for jsPdf
   * @param barcodeValue Barcode value to be generated.
   * @param options Optional options object.
   * @return A promise resolving to the jsPDF document.
   */
    barcode(barcodeValue: String, options: { fontSize: number; textColor: string; x: number; y: number; }): Promise<jsPDF>
  }

  interface jsPDFAPI {
    /**
   * Generate Barcode for jsPdf
   * @param barcodeValue Barcode value to be generated.
   * @param options Optional options object.
   * @return A promise resolving to the jsPDF document.
   */
     barcode(barcodeValue: String, options: { fontSize: number; textColor: string; x: number; y: number; }): Promise<jsPDF>
  }
}