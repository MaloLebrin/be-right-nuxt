<template>
<div class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
  <section aria-labelledby="payment-details-heading">
    <form
      action="#"
      method="POST"
    >
      <div class="shadow sm:overflow-hidden sm:rounded-md">
        <div class="px-4 py-6 bg-white sm:p-6">
          <div>
            <h2
              id="payment-details-heading"
              class="text-lg font-medium leading-6 text-gray-900"
            >
              Payment details
            </h2>
            <p class="mt-1 text-sm text-gray-500">
              Update your billing information. Please note that updating your location could affect your tax rates.
            </p>
          </div>

          <div class="grid grid-cols-4 gap-6 mt-6">
            <div class="col-span-4 sm:col-span-2">
              <label
                for="first-name"
                class="block text-sm font-medium leading-6 text-gray-900"
              >First name</label>
              <input
                id="first-name"
                type="text"
                name="first-name"
                autocomplete="cc-given-name"
                class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
              >
            </div>

            <div class="col-span-4 sm:col-span-2">
              <label
                for="last-name"
                class="block text-sm font-medium leading-6 text-gray-900"
              >Last name</label>
              <input
                id="last-name"
                type="text"
                name="last-name"
                autocomplete="cc-family-name"
                class="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
              >
            </div>

            <div class="col-span-4 sm:col-span-2">
              <label
                for="email-address"
                class="block text-sm font-medium leading-6 text-gray-900"
              >Email address</label>
              <input
                id="email-address"
                type="text"
                name="email-address"
                autocomplete="email"
                class="mt-2 block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
              >
            </div>

            <div class="col-span-4 sm:col-span-1">
              <label
                for="expiration-date"
                class="block text-sm font-medium leading-6 text-gray-900"
              >Expration date</label>
              <input
                id="expiration-date"
                type="text"
                name="expiration-date"
                autocomplete="cc-exp"
                class="mt-2 block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                placeholder="MM / YY"
              >
            </div>

            <div class="col-span-4 sm:col-span-1">
              <label
                for="security-code"
                class="flex items-center text-sm font-medium leading-6 text-gray-900"
              >
                <span>Security code</span>
                <QuestionMarkCircleIcon
                  class="flex-shrink-0 w-5 h-5 ml-1 text-gray-300"
                  aria-hidden="true"
                />
              </label>
              <input
                id="security-code"
                type="text"
                name="security-code"
                autocomplete="cc-csc"
                class="mt-2 block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
              >
            </div>

            <div class="col-span-4 sm:col-span-2">
              <label
                for="country"
                class="block text-sm font-medium leading-6 text-gray-900"
              >Country</label>
              <select
                id="country"
                name="country"
                autocomplete="country-name"
                class="mt-2 block w-full rounded-md border-0 bg-white py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>

            <div class="col-span-4 sm:col-span-2">
              <label
                for="postal-code"
                class="block text-sm font-medium leading-6 text-gray-900"
              >ZIP / Postal code</label>
              <input
                id="postal-code"
                type="text"
                name="postal-code"
                autocomplete="postal-code"
                class="mt-2 block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
              >
            </div>
          </div>
        </div>
        <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
          <button
            type="submit"
            class="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white bg-gray-900 rounded-md shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </section>

  <!-- Plan -->
  <section aria-labelledby="plan-heading">
    <form
      action="#"
      method="POST"
    >
      <div class="shadow sm:overflow-hidden sm:rounded-md">
        <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
          <div>
            <h2
              id="plan-heading"
              class="text-lg font-medium leading-6 text-gray-900"
            >
              Plan
            </h2>
          </div>

          <RadioGroup v-model="selectedPlan">
            <RadioGroupLabel class="sr-only">
              Pricing plans
            </RadioGroupLabel>
            <div class="relative -space-y-px bg-white rounded-md">
              <RadioGroupOption
                v-for="(plan, planIdx) in plans"
                :key="plan.name"
                v-slot="{ checked, active }"
                as="template"
                :value="plan"
              >
                <div
                  class="relative flex flex-col p-4 border cursor-pointer focus:outline-none md:grid md:grid-cols-3 md:pr-6"
                  :class="[planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '', planIdx === plans.length - 1 ? 'rounded-bl-md rounded-br-md' : '', checked ? 'z-10 border-orange-200 bg-orange-50' : 'border-gray-200']"
                >
                  <span class="flex items-center text-sm">
                    <span
                      class="flex items-center justify-center w-4 h-4 border rounded-full"
                      :class="[checked ? 'bg-orange-500 border-transparent' : 'bg-white border-gray-300', active ? 'ring-2 ring-offset-2 ring-gray-900' : '']"
                      aria-hidden="true"
                    >
                      <span class="rounded-full bg-white w-1.5 h-1.5" />
                    </span>
                    <RadioGroupLabel
                      as="span"
                      class="ml-3 font-medium text-gray-900"
                    >{{ plan.name }}</RadioGroupLabel>
                  </span>
                  <RadioGroupDescription
                    as="span"
                    class="pl-1 ml-6 text-sm md:ml-0 md:pl-0 md:text-center"
                  >
                    <span
                      class="font-medium"
                      :class="[checked ? 'text-orange-900' : 'text-gray-900']"
                    >${{ plan.priceMonthly }} / mo</span>
                    {{ ' ' }}
                    <span :class="checked ? 'text-orange-700' : 'text-gray-500'">(${{ plan.priceYearly }} / yr)</span>
                  </RadioGroupDescription>
                  <RadioGroupDescription
                    as="span"
                    class="pl-1 ml-6 text-sm md:ml-0 md:pl-0 md:text-right"
                    :class="[checked ? 'text-orange-700' : 'text-gray-500']"
                  >
                    {{ plan.limit }}
                  </RadioGroupDescription>
                </div>
              </RadioGroupOption>
            </div>
          </RadioGroup>

          <SwitchGroup
            as="div"
            class="flex items-center"
          >
            <Switch
              v-model="annualBillingEnabled"
              class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              :class="[annualBillingEnabled ? 'bg-orange-500' : 'bg-gray-200']"
            >
              <span
                aria-hidden="true"
                class="inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full shadow ring-0"
                :class="[annualBillingEnabled ? 'translate-x-5' : 'translate-x-0']"
              />
            </Switch>
            <SwitchLabel
              as="span"
              class="ml-3 text-sm"
            >
              <span class="font-medium text-gray-900">Annual billing</span>
              {{ ' ' }}
              <span class="text-gray-500">(Save 10%)</span>
            </SwitchLabel>
          </SwitchGroup>
        </div>
        <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
          <button
            type="submit"
            class="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white bg-gray-900 rounded-md shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </section>

  <!-- Billing history -->
  <section aria-labelledby="billing-history-heading">
    <div class="pt-6 bg-white shadow sm:overflow-hidden sm:rounded-md">
      <div class="px-4 sm:px-6">
        <h2
          id="billing-history-heading"
          class="text-lg font-medium leading-6 text-gray-900"
        >
          Billing history
        </h2>
      </div>
      <div class="flex flex-col mt-6">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="overflow-hidden border-t border-gray-200">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-sm font-semibold text-left text-gray-900"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-sm font-semibold text-left text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-sm font-semibold text-left text-gray-900"
                    >
                      Amount
                    </th>
                    <!--
                              `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                            -->
                    <th
                      scope="col"
                      class="relative px-6 py-3 text-sm font-medium text-left text-gray-500"
                    >
                      <span class="sr-only">View receipt</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="payment in payments"
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
                      >View receipt</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
  Switch,
  SwitchGroup,
  SwitchLabel,
} from '@headlessui/vue'
import { QuestionMarkCircleIcon } from '@heroicons/vue/20/solid'

const plans = [

  { name: 'Startup', priceMonthly: 29, priceYearly: 290, limit: 'Up to 5 active job postings' },
  { name: 'Business', priceMonthly: 99, priceYearly: 990, limit: 'Up to 25 active job postings' },
  { name: 'Enterprise', priceMonthly: 249, priceYearly: 2490, limit: 'Unlimited active job postings' },
]
const payments = [

  {
    id: 1,
    date: '1/1/2020',
    datetime: '2020-01-01',
    description: 'Business Plan - Annual Billing',
    amount: 'CA$109.00',
    href: '#',
  },
]

const selectedPlan = ref(plans[1])
const annualBillingEnabled = ref(true)
definePageMeta({
  layout: 'account',
  isAuth: true,
  middleware: 'guards-middleware',
})
</script>
