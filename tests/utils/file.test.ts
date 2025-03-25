import { describe, expect, test } from 'vitest'
import {
  getTranslationFileType,
  isFileType,
  isNotPersonnalFile,
} from '../../utils/file'
import type { FileType, FileTypeEnum } from '@/types'

describe('isNotPersonnalFile', () => {
  test('return true when file type is not personnal', () => {
    expect(isNotPersonnalFile({ type: 'other' } as unknown as FileType)).toBe(true)
    expect(isNotPersonnalFile({ type: 'MODEL' } as unknown as FileType)).toBe(true)
    expect(isNotPersonnalFile({ type: 'IMAGE_RIGHT' } as unknown as FileType)).toBe(true)
  })

  test('return true when file type is personnal', () => {
    expect(isNotPersonnalFile({ type: 'PROFILE_PICTURE' } as unknown as FileType)).toBe(false)
  })

  test('return false when file type is undefined', () => {
    expect(isNotPersonnalFile({ type: undefined } as unknown as FileType)).toBe(false)
  })

  test('return false when file type is null', () => {
    expect(isNotPersonnalFile({ type: null } as unknown as FileType)).toBe(false)
  })

  test('return false when file type is empty string', () => {
    expect(isNotPersonnalFile({ type: '' } as unknown as FileType)).toBe(false)
  })

  test('return false when file type is not a string', () => {
    expect(isNotPersonnalFile({ type: 1 } as unknown as FileType)).toBe(false)
  })

  test('return false when file type is not a string', () => {
    expect(isNotPersonnalFile({ type: {} } as unknown as FileType)).toBe(false)
  })

  test('return false when file type is not a string', () => {
    expect(isNotPersonnalFile({ type: [] } as unknown as FileType)).toBe(false)
  })

  test('return false when file type is not a string', () => {
    expect(isNotPersonnalFile({ type: true } as unknown as FileType)).toBe(false)
    expect(isNotPersonnalFile({ type: false } as unknown as FileType)).toBe(false)
  })

  test('return false when type of file is FileTypeEnum.PROFILE_PICTURE', () => {
    expect(isNotPersonnalFile({ type: 'PROFILE_PICTURE' } as unknown as FileType)).toBe(false)
  })

  test('return false when type of file is FileTypeEnum.LOGO', () => {
    expect(isNotPersonnalFile({ type: 'LOGO' } as unknown as FileType)).toBe(false)
  })
})

describe('isFileType', () => {
  test('return true when file is a FileType', () => {
    expect(isFileType({ fileName: 'test' })).toBe(true)
  })

  test('return false when file is not a FileType as no property fileName', () => {
    expect(isFileType({})).toBe(false)
  })
})

describe('getTranslationFileType', () => {
  test('return "Logo" when fileType is FileTypeEnum.LOGO', () => {
    expect(getTranslationFileType('LOGO' as FileTypeEnum)).toBe('Logo')
  })

  test('return "Modèle" when fileType is FileTypeEnum.MODEL', () => {
    expect(getTranslationFileType('MODEL' as FileTypeEnum)).toBe('Modèle')
  })

  test('return "Droit à l\'image" when fileType is FileTypeEnum.IMAGE_RIGHT', () => {
    expect(getTranslationFileType('IMAGE_RIGHT' as FileTypeEnum)).toBe('Droit à l\'image')
  })

  test('return "Photo de profil" when fileType is FileTypeEnum.PROFILE_PICTURE', () => {
    expect(getTranslationFileType('PROFILE_PICTURE' as FileTypeEnum)).toBe('Photo de profil')
  })

  test('return "Autre" when fileType is not defined', () => {
    expect(getTranslationFileType('other' as FileTypeEnum)).toBe('Autre')
    expect(getTranslationFileType('' as FileTypeEnum)).toBe('Autre')
    expect(getTranslationFileType(undefined as unknown as FileTypeEnum)).toBe('Autre')
    expect(getTranslationFileType(null as unknown as FileTypeEnum)).toBe('Autre')
    expect(getTranslationFileType(1 as unknown as FileTypeEnum)).toBe('Autre')
  })
})
