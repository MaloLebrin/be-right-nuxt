<template>
<div class="max-w-2xl px-4 pt-16 pb-24 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
  <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
    Récapitualitif
  </h2>
  <div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
    <!-- Sumary section -->
    <section class="py-8 rounded-t-lg bg-gray-50 lg:col-span-7">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
        <div class="flex-1 min-w-0">
          <div class="flex items-center space-x-10">
            <h1 class="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              {{ formStore.eventform.name }}
            </h1>
          </div>
          <div class="flex flex-col mt-1 sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8">
            <div class="flex items-center mt-2 text-sm text-gray-500">
              <MapPinIcon
                class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              {{ formStore.addressForm.city }}
            </div>
            <div class="flex items-center mt-2 text-sm text-gray-500">
              <CalendarDaysIcon
                class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Du {{ $toFormat(formStore.eventform.start, 'DD MMMM YYYY') }} au {{ $toFormat(formStore.eventform.end, 'DD MMMM YYYY') }}
            </div>
          </div>
        </div>
      </div>
      <PaymentEmployeeList />
    </section>

    <!-- Order summary -->
    <PaymentCart
      v-if="isCartDisplayable"
      :nb-recipient="formStore.eventform.employeeIds.length"
      :unit-price="getUnitPrice(productData)"
      @checkout="redirect"
    />
  </div>
</div>
</template>

<script setup lang="ts">
import { CalendarDaysIcon, MapPinIcon } from '@heroicons/vue/24/outline'
import PaymentEmployeeList from '~~/components/Payment/PaymentEmployeeList.vue'
import PaymentCart from '~/components/Payment/PaymentCart.vue'
import { RouteNames } from '~~/helpers/routes'
import { useFormStore } from '~~/store'
import type { ProductWithPrice } from '~/types/Stripe/Product'

const formStore = useFormStore()
const router = useRouter()

const { data: productData, pending, error } = await useFetch<ProductWithPrice[]>('/api/stripe/products/list', {
  method: 'get',
})

const isCartDisplayable = computed(() => !pending && !error && productData.value && productData.value?.length > 0)

function redirect() {
  router.push({ name: RouteNames.PAYMENT_CONFIRM })
}

definePageMeta({
  layout: 'create-event-layout',
  isAuth: true,
  middleware: 'guards-middleware',
})
</script>
