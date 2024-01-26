import { describe, expect, test } from 'vitest'
import { ADMIN_MENU_ITEMS, MENU_ITEMS, findRecusivlyByLinkName } from '~~/helpers/menu'

describe('findRecusivlyByLinkName', () => {
  test('should return the item if the linkName is found', () => {
    expect(findRecusivlyByLinkName(MENU_ITEMS, 'evenement')).toEqual({
      label: 'Liste d\‘événements',
      linkName: 'evenement',
      isAdmin: false,
      icon: expect.any(Function),
    })
  })

  test('should return the item if the linkName is found in the admin menu', () => {
    expect(findRecusivlyByLinkName(ADMIN_MENU_ITEMS, 'evenement')).toEqual({
      label: 'Liste d\‘événements',
      linkName: 'evenement',
      isAdmin: false,
      icon: expect.any(Function),
    })
  })

  test('should return undefined if the linkName is not found', () => {
    expect(findRecusivlyByLinkName(MENU_ITEMS, 'unknown')).toBeUndefined()
  })

  test('should return undefined if the linkName is not found in the admin menu', () => {
    expect(findRecusivlyByLinkName(ADMIN_MENU_ITEMS, 'unknown')).toBeUndefined()
  })

  test('should return undefined if the linkName is undefined', () => {
    expect(findRecusivlyByLinkName(MENU_ITEMS, undefined as unknown as string)).toBeUndefined()
  })

  test('should return undefined if the linkName is undefined in the admin menu', () => {
    expect(findRecusivlyByLinkName(ADMIN_MENU_ITEMS, undefined as unknown as string)).toBeUndefined()
  })

  test('should return undefined if the linkName is empty', () => {
    expect(findRecusivlyByLinkName(MENU_ITEMS, '')).toBeUndefined()
  })

  test('should return undefined if the tree is empty', () => {
    expect(findRecusivlyByLinkName([], 'evenement')).toBeUndefined()
  })
})
