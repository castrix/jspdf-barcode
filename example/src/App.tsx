import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '@/App.css'
import jsPDF from 'jspdf'
import "jspdf-barcode"


function App() {
  const [barcodeVal, setBarcodeVal] = useState("jspdfbarcode123")
  const generateBarcode = () => {
    const doc = new jsPDF();
    doc.barcode(barcodeVal, {
      fontSize: 23,
      textColor: "#000000",
      x: 100,
      y: 25.5,
      textOptions: { align: "center" },
    });
    doc.setFont("");
    doc.setFontSize(10);
    doc.text(barcodeVal, 100, 30, {align: "center"} );
    window.open(doc.output("bloburl"));
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
      <label htmlFor="barcodeval">Barcode value: </label><input id='barcodeval' value={barcodeVal} onChange={e => setBarcodeVal(e.target.value)} />
      <div className="card">
        <button onClick={() => generateBarcode()}>
          Generate Barcode
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
