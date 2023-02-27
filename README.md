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
    // optional text options
  })
```

## Support
Currently only support Code 128 Barcode

## Arguments

| arguments    | type   | accepted value                                                                                             |
|--------------|--------|------------------------------------------------------------------------------------------------------------|
| barcodeValue | string | alphanumeric                                                                                               |   |   |
| options      | object | `fontSize` number, &nbsp; `textColor` string, &nbsp; `x`: number // x coordinate of pdf, &nbsp; `y`: number // y coordinate of pdf, &nbsp; [textOptions(optional)](https://artskydj.github.io/jsPDF/docs/jsPDF.html#text) |