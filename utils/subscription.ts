import type { SubscriptionEnum } from '@/types'
import { SubscriptionTranslationEnum } from '@/types'

export function getSuscriptionTranslation(type: SubscriptionEnum) {
  return SubscriptionTranslationEnum[type]
}
