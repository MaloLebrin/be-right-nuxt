<template>
<div class="inline-block min-w-full py-2 align-middle">
  <div class="overflow-hidden border-t border-gray-200">
    <table class="min-w-full divide-y divide-gray-200">
      <PaymentTableHeader />
      <tbody class="bg-white divide-y divide-gray-200">
        <template v-if="sessions?.data?.length && sessions?.data?.length > 0">
          <tr
            v-for="session in sessions?.data"
            :key="session.id"
          >
            <td class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
              <BaseDate :date="session.created" />
            </td>
            <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {{ session.customer_details.name }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {{ fromCent(session.amount_total) }}€
            </td>
            <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
              <a
                class="text-orange-600 hover:text-orange-900"
              >Voir le reçu</a>
            </td>
          </tr>
        </template>
        <tr v-if="sessions?.data?.length === 0">
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
import type { CheckoutSession, StripeList } from '~/types'

interface Props {
  customerId: string
}

const { customerId } = defineProps<Props>()

const { data: sessions } = await useFetch<StripeList<CheckoutSession>>(`/api/stripe/sessions/list/${customerId}`, {
  method: 'get',
})
</script>
