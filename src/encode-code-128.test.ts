import { describe, expect, it } from "vitest";
import Code128Encoder from "code-128-encoder";
import { encodeCode128 } from "./encode-code-128";

const encoder = new Code128Encoder();

const libraryOutput = (text: string) => {
  const barcode = encoder.encode(text, { output: "ascii", mapping: 0 });

  if (typeof barcode !== "string") {
    throw new Error("Expected code-128-encoder to return an ASCII barcode string");
  }

  return barcode;
};

describe("encodeCode128", () => {
  it("matches code-128-encoder for Code 128B payloads", () => {
    expect(encodeCode128("Test-42!*", "B")).toBe(libraryOutput("Test-42!*"));
  });

  it("matches code-128-encoder for Code 128B boundary and punctuation payloads", () => {
    for (const text of [
      "HELLO world 123",
      "[]{}()<>!?@#$%^&*-_=+",
      " ~",
      "Az09 ~[]{}",
    ]) {
      expect(encodeCode128(text, "B")).toBe(libraryOutput(text));
    }
  });

  it("matches code-128-encoder for Code 128C payloads", () => {
    expect(encodeCode128("0011223344", "C")).toBe(libraryOutput("0011223344"));
  });

  it("matches code-128-encoder for Code 128C payloads with leading zeros and repeated pairs", () => {
    for (const text of ["000102030405", "101010101010", "0099009900", "90909090"]) {
      expect(encodeCode128(text, "C")).toBe(libraryOutput(text));
    }
  });

  it("matches code-128-encoder for a Code 128C payload spanning every pair from 00 to 99", () => {
    const text = Array.from({ length: 100 }, (_, value) => value.toString().padStart(2, "0")).join("");

    expect(encodeCode128(text, "C")).toBe(libraryOutput(text));
  });

  it("matches code-128-encoder for Code 128C payloads containing 95 through 99", () => {
    for (const text of ["9510", "9610", "9710", "9810", "9910", "8550899700"]) {
      expect(encodeCode128(text, "C")).toBe(libraryOutput(text));
    }
  });
});