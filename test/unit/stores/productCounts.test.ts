import { expect, test, describe } from "vitest";

import { 
  $counts, 
  incrementCount, 
  decrementCount,
  getItemCount
} from "../../../src/stores/productCounts";

const getNumberOfItems = () => Object.keys($counts.get()).length;

describe('product counts store', () => {
  test('can store and modify the number of multiple items', () => {
    const testId1 = '1'
    const testId2 = '2'
    const testId3 = '3'

    incrementCount(testId1)

    expect(getNumberOfItems()).toStrictEqual(1)
    expect(getItemCount(testId1)).toStrictEqual(1)
    expect(getItemCount(testId2)).toStrictEqual(0)
    expect(getItemCount(testId3)).toStrictEqual(0)

    incrementCount(testId1)
    incrementCount(testId2)

    expect(getNumberOfItems()).toStrictEqual(2)
    expect(getItemCount(testId1)).toStrictEqual(2)
    expect(getItemCount(testId2)).toStrictEqual(1)
    expect(getItemCount(testId3)).toStrictEqual(0)

    incrementCount(testId1)
    incrementCount(testId2)
    incrementCount(testId3)

    expect(getNumberOfItems()).toStrictEqual(3)
    expect(getItemCount(testId1)).toStrictEqual(3)
    expect(getItemCount(testId2)).toStrictEqual(2)
    expect(getItemCount(testId3)).toStrictEqual(1)

    decrementCount(testId2)
    decrementCount(testId3)

    expect(getNumberOfItems()).toStrictEqual(2)
    expect(getItemCount(testId1)).toStrictEqual(3)
    expect(getItemCount(testId2)).toStrictEqual(1)
    expect(getItemCount(testId3)).toStrictEqual(0)

    for (let i = 0; i < 10; i++) {
      incrementCount(testId1)
    }

    expect(getNumberOfItems()).toStrictEqual(2)
    expect(getItemCount(testId1)).toStrictEqual(10)
    expect(getItemCount(testId2)).toStrictEqual(1)
    expect(getItemCount(testId3)).toStrictEqual(0)
  });
});
