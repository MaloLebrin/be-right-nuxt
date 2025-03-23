import type { State } from '@malolebrin/pinia-entity-store'
import type { EmployeeType } from '../employee'
import type { EventType } from '../event'
import type { BaseEntity } from '@/types/globals'
import type { Company } from '~/store/company'

export interface FileType extends BaseEntity {
  name: string
  fileName: string
  mimeType: string
  size: number
  type: FileTypeEnum
  description: string | null
  public_id: string
  signature: string
  width: number
  height: number
  format: FileFormatEnum
  url: string
  secure_url: string
  original_filename: string
  events?: EventType
  eventId: number
  employee?: EmployeeType
  employeeId: number
  company?: Company
  companyId: number
}

export type FileFormType = Omit<FileType, 'id' | 'createdAt' | 'updatedAt'>

export enum FileTypeEnum {
  MODEL = 'MODEL',
  IMAGE_RIGHT = 'IMAGE_RIGHT',
  LOGO = 'LOGO',
  PROFILE_PICTURE = 'PROFILE_PICTURE',
}

export const fileTypeArray = Object.values(FileTypeEnum)

export enum FileFormatEnum {
  PDF = 'pdf',
  PNG = 'png',
}

export interface FileState extends State<FileType> { }
