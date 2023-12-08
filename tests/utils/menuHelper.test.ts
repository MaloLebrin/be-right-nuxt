import { describe, expect, test } from 'vitest'
import { findRecusivlyByLinkName } from '~~/helpers/menu'

describe('findRecusivlyByLinkName', () => {
  test('should return undefined if no item found', () => {
    expect(findRecusivlyByLinkName([], 'evenement')).toBeUndefined()
  })

  test('should find an item by linkName', () => {
    const item = {
      label: 'Liste d\‘événements',
      icon: 'HomeIcon' as any,
      linkName: 'evenement',
      isAdmin: false,
    }

    expect(findRecusivlyByLinkName([
      item,
    ], 'evenement')).toStrictEqual(item)
  })

  test('should find an item by linkName in a tree', () => {
    const item = {
      label: 'Liste d\‘événements',
      icon: 'HomeIcon' as any,
      linkName: 'evenement',
      isAdmin: false,
    }

    expect(findRecusivlyByLinkName([
      {
        label: 'Mes événements',
        icon: 'HomeIcon' as any,
        isAdmin: false,
        children: [
          item,
        ],
      },
    ], 'evenement')).toStrictEqual(item)
  })
})
