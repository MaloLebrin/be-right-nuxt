import { hasOwnProperty } from '@antfu/utils'
import { type FileType, FileTypeEnum } from '@/types'

export function isNotPersonnalFile(file: FileType) {
  if (!file?.type || typeof file.type !== 'string') {
    return false
  }
  return ![FileTypeEnum.PROFILE_PICTURE, FileTypeEnum.LOGO].includes(file.type)
}

export function isFileType(file: any): file is FileType {
  return hasOwnProperty(file, 'fileName')
}

export function getTranslationFileType(fileType: FileTypeEnum) {
  switch (fileType) {
    case FileTypeEnum.LOGO:
      return 'Logo'
    case FileTypeEnum.MODEL:
      return 'Modèle'

    case FileTypeEnum.IMAGE_RIGHT:
      return 'Droit à l\'image'

    case FileTypeEnum.PROFILE_PICTURE:
      return 'Photo de profil'

    default:
      return 'Autre'
  }
}
