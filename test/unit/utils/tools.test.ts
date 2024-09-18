import { expect, test, describe } from "vitest";
import { sumValues } from "../../../src/utils/tools";

describe("utilities provided in tools script", () => {
  test("sumValues for summing an object with arbitrary ids and numbers", () => {
    const testObj = {} as Cart;
    expect(sumValues(testObj)).toStrictEqual(0);

    testObj.testId1 = 3;
    expect(sumValues(testObj)).toStrictEqual(3);

    testObj.testId2 = 4.2;
    expect(sumValues(testObj)).toStrictEqual(7.2);

    testObj.testId3 = 1;
    expect(sumValues(testObj)).toStrictEqual(8.2);
  });
});
