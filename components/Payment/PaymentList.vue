<template>
<div class="inline-block min-w-full py-2 align-middle">
  <div class="overflow-hidden border-t border-gray-200">
    <table class="min-w-full divide-y divide-gray-200">
      <PaymentTableHeader />
      <tbody class="bg-white divide-y divide-gray-200">
        <!-- <template
          v-if="isListDisplayable"
        >
          <tr
            v-for="payment in data.value?.data"
            :key="payment.id"
          >
            <td class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
              <time :datetime="payment.datetime">{{ payment.date }}</time>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {{ payment.description }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {{ payment.amount }}
            </td>
            <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
              <a
                :href="payment.href"
                class="text-orange-600 hover:text-orange-900"
              >Voir le reçu</a>
            </td>
          </tr>
        </template> -->
        <tr>
          <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
            Aucun paiement à ce jour
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script setup lang="ts">
import PaymentTableHeader from '@/components/Payment/table/TableHeader.server.vue'

interface Props {
  customerId: string
}

const { customerId } = defineProps<Props>()

const { data: paymentsData, pending, error } = await useFetch<[]>(`/api/stripe/payments/list/${customerId}`, {
  method: 'get',
})
</script>
