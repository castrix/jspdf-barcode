import type { jsPDF, TextOptionsLight } from "jspdf";
declare type Options = {
    fontSize: number;
    textColor: string;
    x: number;
    y: number;
    textOptions?: TextOptionsLight;
    variant?: "A" | "B" | "C" | "AUTO";
};
declare const generateBarcode: (doc: jsPDF, barcodeValue: string, options?: Options) => jsPDF;
export default generateBarcode;
