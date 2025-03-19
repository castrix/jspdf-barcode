import type { jsPDF, TextOptionsLight } from "jspdf";
import font from "./code-128-font";
import { encodeCode128 } from "./encode-code-128";

type Options = {
  fontSize: number;
  textColor: string;
  x: number;
  y: number;
  textOptions?: TextOptionsLight;
  variant?: "A" | "B" | "C" | "AUTO";
};

const defaultTextOptions = {
  align: "left",
  baseline: "alphabetic",
  angle: 0,
  rotationDirection: 1,
  charSpace: 0,
  lineHeightFactor: 1.5,
  maxWidth: 0,
  renderingMode: "fill",
} as TextOptionsLight;

const generateBarcode = (
  /** JSPDF instance */
  doc: jsPDF,
  /** string barcode, support alphanumeric, can encode all 128 characters of ASCII */
  barcodeValue: string,
  options: Options = {
    fontSize: 12,
    textColor: "#000000",
    x: 0,
    y: 10,
    textOptions: defaultTextOptions,
  }
) => {
  const prevFont = doc.getFont();
  const prevFontSize = doc.getFontSize();
  const prevTextColor = doc.getTextColor();

  doc.addFileToVFS("code128-normal.ttf", font);
  doc.addFont("code128-normal.ttf", "code128", "normal");
  doc.setFont("code128", "normal");
  doc.setTextColor(options.textColor || "#000000");
  doc.setFontSize(options.fontSize || 112);
  doc.text(
    `${encodeCode128(barcodeValue, options.variant)}`, // encode the barcode value
    Number(options.x),
    Number(options.y),
    options.textOptions
  );
  doc.setFont(prevFont.fontName);
  doc.setTextColor(prevTextColor);
  doc.setFontSize(prevFontSize);
  return doc;
};

export default generateBarcode;