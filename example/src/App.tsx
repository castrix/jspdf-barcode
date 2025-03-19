import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '@/App.css'
import jsPDF from 'jspdf'
import jsPDFBarcode from "jspdf-barcode"

type VARIANT = "A" | "B" | "C" | "AUTO"

function App() {
  const [barcodeVal, setBarcodeVal] = useState("JspdfBARCode123")
  const [variant, setVariant] = useState<VARIANT>("AUTO")
  const generateBarcode = () => {
    const doc = new jsPDF();
    jsPDFBarcode(doc, barcodeVal, {
      fontSize: 23,
      textColor: "#000000",
      x: 100,
      y: 25.5,
      textOptions: { align: "center" },
      variant: variant
    });
    doc.text(barcodeVal, 100, 35, {align: "center"} );
    window.open(doc.output("bloburl"));
  }
  const handleChangeVariant = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVariant(e.target.value as VARIANT)
    if (e.target.value === "A") {
      setBarcodeVal("JSPDFBARCODE123")
      return
    }
    if (e.target.value === "B") {
      setBarcodeVal("JspdfBARCode123")
      return
    }
    if (e.target.value === "AUTO") {
      setBarcodeVal("JspdfBARCode123")
      return
    }
    if (e.target.value === "C") {
      setBarcodeVal("1234")
      return
    }
  }

  const handleChangeBarcode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarcodeVal(e.target.value)
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>JSPDF-BARCODE EXAMPLE</h1>
      <div>
        <label htmlFor="variant">Variant: </label>
        <select id='variant' value={variant} onChange={handleChangeVariant} >
          <option value="AUTO">AUTO (128B / 128C)</option>
          <option value="A">Code 128A</option>
          <option value="B">Code 128B</option>
          <option value="C">Code 128C</option>
        </select>
      </div>
      <div>
        <label htmlFor="barcodeval">Barcode value: </label>
        <input id='barcodeval' value={barcodeVal} onChange={handleChangeBarcode} />
      </div>
      { (variant === "A" || variant === "C") &&
        <div style={{backgroundColor: "pink", color: "red", padding: "2px"}}>
          {variant === "A" && <>Note: Code 128A only support UPPERCASE characters, number, and some special characters</>}
          {variant === "C" && <>Note: Code 128C only support number, and the length must be even</>}
        </div>
      }
      <div className="card">
        <button onClick={() => generateBarcode()}>
          Generate Barcode
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <a href="https://www.npmjs.com/package/jspdf-barcode" target='_blank' style={{marginRight: "20px"}}>NPM</a>
      <a href="https://github.com/castrix/jspdf-barcode" target='_blank'>GITHUB</a>
    </div>
  )
}

export default App
