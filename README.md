# Demo
[https://castrix.github.io/jspdf-barcode](https://castrix.github.io/jspdf-barcode)

[Code](https://github.com/castrix/jspdf-barcode/tree/main/example)

# Installation

```
npm install jspdf jspdf-barcode --save
```

## Use

```
import { jsPDF } from "jspdf";
import "jspdf-barcode";

const doc = new jsPDF()
doc.barcode("barcodeValue", {
    fontSize: 23,
    textColor: "#000000",
    x: 5.4,
    y: 25.5,
    textOptions: { align: "center" } // optional text options
  })
doc.setFont(""); // reset font to your font
```

## Support
Currently only support Code 128 Barcode

## Arguments

| arguments    | type   | accepted value                                                                                             |
|--------------|--------|------------------------------------------------------------------------------------------------------------|
| barcodeValue | string | alphanumeric                                                                                               |   |   |
| options      | object | `fontSize` number, <br/> `textColor` string, <br/> `x`: number // x coordinate of pdf, <br/> `y`: number // y coordinate of pdf, <br/> [textOptions(optional)](https://artskydj.github.io/jsPDF/docs/jsPDF.html#text) |
