import {expect, test, describe} from 'vitest'
import {formatNumberToCurrency} from '../../src/scripts/currency'

describe('currency utilities', () => {
  test('provides a function to format a number to a currency string', () => {
    let num = 1

    expect(formatNumberToCurrency(num)).toStrictEqual('$1.00')
    expect(formatNumberToCurrency(num, 'GBP', 'en-US')).toStrictEqual('£1.00')

    num = -1

    expect(formatNumberToCurrency(num)).toStrictEqual('-$1.00')

    num = 0.5671621

    expect(formatNumberToCurrency(num)).toStrictEqual('$0.57')
  })
})