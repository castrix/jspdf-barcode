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
    y: 25.5
  })
```

## Support
Currently only support Code 128 Barcode

## Arguments

| arguments    | type   | accepted value                                                                                             |
|--------------|--------|------------------------------------------------------------------------------------------------------------|
| barcodeValue | string | alphanumeric                                                                                               |   |   |
| options      | object | `fontSize` number, `textColor` string,`x`: number // x coordinate of pdf, `y`: number // y coordinate of pdf, [textOptions](https://artskydj.github.io/jsPDF/docs/jsPDF.html#text) |