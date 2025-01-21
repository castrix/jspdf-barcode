import type { jsPDF, TextOptionsLight } from "jspdf";
import font from "./code-128-font";
import Code128Generator from "code-128-encoder";

type Options = {
  fontSize: number;
  textColor: string;
  x: number;
  y: number;
  textOptions?: TextOptionsLight;
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
  const barcodeEncoder = new Code128Generator();
  doc.addFont("code128-normal.ttf", "code128", "normal");
  doc.setFont("code128", "normal");
  doc.setTextColor(options.textColor || "#000000");
  doc.setFontSize(options.fontSize || 112);
  doc.text(
    `${barcodeEncoder.encode(barcodeValue)}`, // encode the barcode value
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