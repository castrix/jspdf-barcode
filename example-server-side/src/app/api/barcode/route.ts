// example using cjs, you can use es6 as well here
const { jsPDF } = require("jspdf")
require("jspdf-barcode")

const generateBarcode = (barcodeVal: string | null) => {
  const value = barcodeVal || "jspdfbarcode"
  const doc = new jsPDF();
  doc.barcode(value, {
    fontSize: 23,
    textColor: "#000000",
    x: 100,
    y: 25.5,
    textOptions: { align: "center" },
  });
  doc.setFont("Courier");
  doc.setFontSize(10);
  doc.text(value, 100, 30, { align: "center" });
  return doc.output("arraybuffer");
}

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const barcode = searchParams.get("value")
  return new Response(generateBarcode(barcode))
}
