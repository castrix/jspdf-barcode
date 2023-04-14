import { jsPDF } from 'jspdf'

export interface TextOptions { align?: string, baseline?: string, angle?: number, rotationDirection?: number, charSpace?: number, lineHeightFactor?: number, maxWidth?: number, renderingMode?: string }

declare module 'jspdf-barcode' {
  /**
   * Generate Barcode for jsPdf
   * @param barcodeValue Barcode value to be generated.
   * @param options Optional options object.
   * @return A promise resolving to the jsPDF document.
   */
  export function generateBarcode(barcodeValue: String, options: { fontSize: number; textColor: string; x: number; y: number; textOptions?: TextOptions }): Promise<jsPDF>
}

declare module 'jspdf' {
  interface jsPDF {
    /**
   * Generate Barcode for jsPdf
   * @param barcodeValue Barcode value to be generated.
   * @param options Optional options object.
   * @return A promise resolving to the jsPDF document.
   */
    barcode(barcodeValue: String, options: { fontSize: number; textColor: string; x: number; y: number; textOptions?: TextOptions }): Promise<jsPDF>
  }

  interface jsPDFAPI {
    /**
   * Generate Barcode for jsPdf
   * @param barcodeValue Barcode value to be generated.
   * @param options Optional options object.
   * @return A promise resolving to the jsPDF document.
   */
     barcode(barcodeValue: String, options: { fontSize: number; textColor: string; x: number; y: number; textOptions?: TextOptions }): Promise<jsPDF>
  }
}