// example using cjs, you can use es6 as well here
const { jsPDF } = require("jspdf")
const jsPdfBarcdoe = require("jspdf-barcode").default

const generateBarcode = (barcodeVal: string | null) => {
  const value = barcodeVal || "jspdfbarcode"
  const doc = new jsPDF();
  jsPdfBarcdoe(doc, value, {
    fontSize: 23,
    textColor: "#000000",
    x: 100,
    y: 25.5,
    textOptions: { align: "center" },
  });
  doc.text(value, 100, 35, { align: "center" });
  return doc.output("arraybuffer");
}

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const barcode = searchParams.get("value")
  return new Response(generateBarcode(barcode))
}
