import { useState } from 'react'
import '@/App.css'
import jsPDF from 'jspdf'
import jsPDFBarcode from "jspdf-barcode"
import packageJson from '../../package.json'

type VARIANT = "A" | "B" | "C" | "AUTO"

type BarcodePreset = {
  label: string
  value: string
}

type VariantDetails = {
  name: string
  headline: string
  description: string
  support: string
}

const NpmIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="brand-icon">
    <rect x="2" y="6" width="20" height="12" rx="2" fill="#CB3837" />
    <path d="M6 9v6H4V9h5v6H7v-4H6Zm4 0v6h2v-4h1v4h2V9h-5Zm9 0v4h-2V9h-2v6h5V9h-1Z" fill="#020617" />
  </svg>
)

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="brand-icon">
    <path
      fill="currentColor"
      d="M12 2C6.48 2 2 6.59 2 12.25c0 4.52 2.87 8.35 6.84 9.7.5.1.66-.22.66-.49 0-.24-.01-1.04-.02-1.89-2.78.62-3.36-1.21-3.36-1.21-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.05 1.53 1.05.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.09 0-1.13.39-2.06 1.03-2.79-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.07A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.91-1.35 2.75-1.07 2.75-1.07.55 1.43.2 2.49.1 2.75.64.73 1.03 1.66 1.03 2.79 0 3.96-2.33 4.82-4.56 5.08.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.17.59.67.49A10.27 10.27 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z"
    />
  </svg>
)

const BARCODE_PRESETS: Record<VARIANT, BarcodePreset[]> = {
  AUTO: [
    { label: 'Mixed text sample', value: 'JspdfBARCode123' },
    { label: 'Even-length numeric sample', value: '0011223344' },
    { label: 'Mixed punctuation sample', value: 'Test-42!*' },
  ],
  A: [
    { label: 'Uppercase text sample', value: 'JSPDFBARCODE123' },
    { label: 'Uppercase and punctuation', value: 'ABC-123/XYZ' },
    { label: 'Allowed symbols', value: 'CODE 128A+$%/' },
  ],
  B: [
    { label: 'Mixed case sample', value: 'JspdfBARCode123' },
    { label: 'Parity test sample', value: 'Test-42!*' },
    { label: 'Boundary and punctuation', value: 'Az09 ~[]{}' },
  ],
  C: [
    { label: 'Sequential pairs', value: '0011223344' },
    { label: 'Repeated pairs', value: '101010101010' },
    { label: 'Leading zeroes and 99', value: '0099009900' },
  ],
}

const VARIANT_DETAILS: Record<VARIANT, VariantDetails> = {
  AUTO: {
    name: 'Auto detect',
    headline: 'Chooses Code 128B or Code 128C for you',
    description: 'Use this when you want the library to prefer numeric optimization for even-length digits and fall back to general text otherwise.',
    support: 'Best for demos with mixed text or numeric IDs.',
  },
  A: {
    name: 'Code 128A',
    headline: 'Uppercase, numbers, and control-friendly symbols',
    description: 'This variant is stricter and works with ASCII 0-95. It is useful when payloads stay in the uppercase/control-character range.',
    support: 'Supports uppercase letters, digits, spaces, and select punctuation.',
  },
  B: {
    name: 'Code 128B',
    headline: 'Most flexible for readable mixed-case text',
    description: 'This is the most forgiving choice for common app data such as labels, references, or IDs containing lowercase characters.',
    support: 'Supports mixed case, digits, spaces, and punctuation.',
  },
  C: {
    name: 'Code 128C',
    headline: 'Compact mode for numeric pairs',
    description: 'Choose this when the payload is numeric-only and has an even number of digits. It produces the shortest barcode for serialized numbers.',
    support: 'Supports digits only, with even length required.',
  },
}

function App() {
  const [barcodeVal, setBarcodeVal] = useState(BARCODE_PRESETS.AUTO[0].value)
  const [variant, setVariant] = useState<VARIANT>("AUTO")
  const [errorMessage, setErrorMessage] = useState("")
  const activePresets = BARCODE_PRESETS[variant]
  const activeVariant = VARIANT_DETAILS[variant]
  const selectedPreset = activePresets.some((preset) => preset.value === barcodeVal)
    ? barcodeVal
    : "__custom__"
  const selectedPresetLabel = activePresets.find((preset) => preset.value === barcodeVal)?.label ?? 'Custom value'

  const generateBarcode = () => {
    try {
      setErrorMessage("")
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
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to generate barcode for this value.')
    }
  }

  const handleChangeVariant = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextVariant = e.target.value as VARIANT
    setVariant(nextVariant)
    setBarcodeVal(BARCODE_PRESETS[nextVariant][0].value)
    setErrorMessage("")
  }

  const handleChangePreset = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBarcodeVal(e.target.value)
    setErrorMessage("")
  }

  const handleChangeBarcode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarcodeVal(e.target.value)
    setErrorMessage("")
  }

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">jsPDF Barcode Playground</p>
          <h1>Code 128 playground</h1>
          <p className="hero-text">
            Choose a mode, load a known-good sample, then generate the PDF preview.
          </p>
        </div>
        <div className="brand-strip" aria-label="Project links">
          <a href="https://www.npmjs.com/package/jspdf-barcode" target="_blank" rel="noreferrer" className="brand-pill">
            <NpmIcon />
            <span>npm package</span>
          </a>
          <a href="https://github.com/castrix/jspdf-barcode" target="_blank" rel="noreferrer" className="brand-pill">
            <GitHubIcon />
            <span>GitHub repo</span>
          </a>
        </div>
      </section>

      <section className="workspace-grid">
        <section className="panel form-panel">
          <div className="panel-heading">
            <p className="panel-kicker">Controls</p>
            <h2>Choose a barcode strategy</h2>
          </div>

          <div className="control-stack">
            <div className="field-row">
              <label className="field" htmlFor="variant">
                <span className="field-label">Barcode type</span>
                <span className="field-help">Select the Code 128 variant you want to test.</span>
                <select id='variant' value={variant} onChange={handleChangeVariant}>
                  <option value="AUTO">AUTO (128B / 128C)</option>
                  <option value="A">Code 128A</option>
                  <option value="B">Code 128B</option>
                  <option value="C">Code 128C</option>
                </select>
              </label>

              <label className="field" htmlFor="preset">
                <span className="field-label">Oracle sample</span>
                <span className="field-help">Start from a known-good payload for the selected type.</span>
                <select id='preset' value={selectedPreset} onChange={handleChangePreset}>
                  {activePresets.map((preset) => (
                    <option key={preset.value} value={preset.value}>{preset.label}</option>
                  ))}
                  <option value="__custom__" disabled>Custom value</option>
                </select>
              </label>
            </div>

            <label className="field" htmlFor="barcodeval">
              <span className="field-label">Barcode value</span>
              <span className="field-help">Edit the payload directly. Invalid combinations will show an error before PDF preview.</span>
              <input id='barcodeval' value={barcodeVal} onChange={handleChangeBarcode} spellCheck={false} />
            </label>
          </div>

          {errorMessage && <div className="status status-error">{errorMessage}</div>}

          <div className="action-row">
            <button className="primary-button" onClick={() => generateBarcode()}>
              Generate PDF Preview
            </button>
            <p className="action-note">Current sample: {selectedPresetLabel}</p>
          </div>
        </section>

        <aside className="panel info-panel">
          <div className="panel-heading">
            <p className="panel-kicker">Guide</p>
            <h2>{activeVariant.name}</h2>
          </div>

          <div className="info-card accent-card">
            <p className="info-headline">{activeVariant.headline}</p>
            <p>{activeVariant.description}</p>
          </div>

          <div className="info-card">
            <span className="info-label">Support rules</span>
            <p>{activeVariant.support}</p>
          </div>
        </aside>
      </section>

      <footer className="footer-links">
        <span>jspdf-barcode v{packageJson.version}</span>
      </footer>
    </main>
  )
}

export default App
