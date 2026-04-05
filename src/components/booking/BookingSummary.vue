<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
      <h3 class="text-xl font-bold">Booking Summary</h3>
    </div>

    <div class="p-6 space-y-4">
      <!-- Car info -->
      <div class="flex gap-4">
        <img
          :src="car?.image"
          :alt="car?.name"
          class="w-24 h-16 object-cover rounded-lg"
        />
        <div>
          <h4 class="font-bold text-gray-900 dark:text-white">{{ car?.name }}</h4>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ car?.brand }} · {{ car?.year }}</p>
        </div>
      </div>

      <hr class="border-gray-200 dark:border-gray-700" />

      <!-- Trip details -->
      <div class="space-y-3">
        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">Pickup Date</span>
          <span class="font-medium text-gray-900 dark:text-white">{{ formatDate(booking.pickupDate || '') }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">Return Date</span>
          <span class="font-medium text-gray-900 dark:text-white">{{ formatDate(booking.returnDate || '') }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">Duration</span>
          <span class="font-medium text-gray-900 dark:text-white">{{ booking.totalDays || 0 }} day(s)</span>
        </div>
      </div>

      <hr class="border-gray-200 dark:border-gray-700" />

      <!-- Pricing -->
      <div class="space-y-2">
        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">{{ formatKesDirect(booking.pricePerDay || 0) }} × {{ booking.totalDays || 0 }} day(s)</span>
          <span class="font-medium text-gray-900 dark:text-white">{{ formatKesDirect((booking.pricePerDay || 0) * (booking.totalDays || 0)) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">Insurance (included)</span>
          <span class="font-medium text-accent-600">FREE</span>
        </div>
        <div class="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
          <span class="text-gray-900 dark:text-white">Total</span>
          <span class="text-primary-600">{{ formatKesDirect(booking.totalPrice || 0) }}</span>
        </div>
      </div>

      <!-- Customer info -->
      <div v-if="booking.customer" class="pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Driver Details</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ booking.customer.firstName }} {{ booking.customer.lastName }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ booking.customer.email }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ booking.customer.phone }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Car, Booking } from '@/types'
import { formatKesDirect } from '@/composables/useCurrency'

const props = defineProps<{
  car?: Car
  booking: Partial<Booking>
}>()

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>
