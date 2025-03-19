export type VARIANT = "A" | "B" | "C" | "AUTO";
export const encodeCode128 = (text: string, variant: VARIANT = 'AUTO') => {
  const CHECKSUM_MODULO = 103;
  const FONT_OFFSET = 100;
  const ASCII_OFFSET = 32;
  const START_A_VALUE = 103;
  const START_B_VALUE = 104;
  const START_C_VALUE = 105;
  const STOP_VALUE = 106;

  let startValue: number;
  let barcodeValues: number[];
  let effectiveVariant: VARIANT;

  // Determine effective variant for AUTO
  if (variant === 'AUTO') {
      // Check if text is numeric and has even length
      if (/^\d+$/.test(text) && text.length % 2 === 0) {
          effectiveVariant = 'C';
      } else {
          effectiveVariant = 'B';
      }
  } else {
      effectiveVariant = variant;
  }

  if (effectiveVariant === 'C') {
      if (!/^\d{2}$/.test(text) && text.length % 2 !== 0) {
          throw new Error("Code 128C requires an even-length string of digits");
      }
      startValue = START_C_VALUE;
      barcodeValues = [startValue];
      for (let i = 0; i < text.length; i += 2) {
          const pair = parseInt(text.slice(i, i + 2), 10);
          barcodeValues.push(pair);
      }
  } else {
      startValue = effectiveVariant === 'A' ? START_A_VALUE : START_B_VALUE;
      barcodeValues = [startValue];
      for (let char of text) {
          const ascii = char.charCodeAt(0);
          if (effectiveVariant === 'A' && ascii > 95) {
              throw new Error("Code 128A only supports ASCII 0-95");
          }
          if (effectiveVariant === 'B' && ascii < 32) {
              throw new Error("Code 128B only supports ASCII 32-127");
          }
          barcodeValues.push(effectiveVariant === 'A' ? ascii : ascii - ASCII_OFFSET);
      }
  }

  let sum = 0;
  for (let i = 0; i < barcodeValues.length; i++) {
      sum += barcodeValues[i] * (i === 0 ? 1 : i);
  }
  const checksum = sum % CHECKSUM_MODULO;

  let barcodeString = String.fromCharCode(startValue + FONT_OFFSET);
  if (effectiveVariant === 'C') {
      for (let i = 0; i < text.length; i += 2) {
          const pair = parseInt(text.slice(i, i + 2), 10);
          barcodeString += String.fromCharCode(pair + ASCII_OFFSET);
      }
  } else {
      barcodeString += text;
  }
  barcodeString += String.fromCharCode(checksum + ASCII_OFFSET);
  barcodeString += String.fromCharCode(STOP_VALUE + FONT_OFFSET);

  return barcodeString;
}