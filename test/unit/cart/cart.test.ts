import {expect, test, describe} from 'vitest'
import {updateQuantityInCart} from '../../../src/scripts/cart'

describe('cart utilities', () => {
  test('can add items to a cart, up to a max of 10', () => {
    const testCart: Cart = {}
    const testId = '123-456'

    let updatedCart = updateQuantityInCart(testCart, testId, 1)

    expect(updatedCart).toStrictEqual({[testId]: 1})
    expect(updatedCart).not.toEqual(testCart)

    const newId = 'xyz'

    updatedCart = updateQuantityInCart(updatedCart, newId, 2)

    expect(updatedCart).toStrictEqual({[testId]: 1, [newId]: 2})

    updatedCart = updateQuantityInCart(updatedCart, newId, 100)

    expect(updatedCart).toStrictEqual({[testId]: 1, [newId]: 10})
  })

  test.only('can remove items from a cart', () => {
    const testId = '123-456'
    const testId2 = 'xyz'
    const testCart: Cart = {[testId]: 10, [testId2]: 1}

    let updatedCart = updateQuantityInCart(testCart, testId, 9)

    expect(updatedCart).toStrictEqual({[testId]: 9, [testId2]: 1})
    expect(updatedCart).not.toEqual(testCart)

    updatedCart = updateQuantityInCart(updatedCart, testId, 1)
    
    expect(updatedCart).toStrictEqual({[testId]: 1, [testId2]: 1})

    updatedCart = updateQuantityInCart(updatedCart, testId, 0)

    expect(updatedCart).toStrictEqual({[testId2]: 1})

    updatedCart = updateQuantityInCart(updatedCart, testId2, -100)

    expect(updatedCart).toStrictEqual({})

    updatedCart = updateQuantityInCart(updatedCart, 'not-an-id', 0)

    expect(updatedCart).toStrictEqual({})
  })
})