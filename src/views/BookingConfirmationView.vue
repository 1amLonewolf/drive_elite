<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
    <div class="max-w-lg w-full">
      <!-- Success animation -->
      <div class="card p-8 text-center">
        <div class="w-24 h-24 bg-accent-100 dark:bg-accent-900/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle class="w-12 h-12 text-accent-600" />
        </div>

        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-3">Booking Confirmed!</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Your reservation has been successfully created. A confirmation email has been sent to your email address.
        </p>

        <!-- Booking ID -->
        <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Booking Reference</p>
          <p class="text-2xl font-bold text-primary-600 font-mono">{{ booking?.id }}</p>
        </div>

        <!-- Booking summary -->
        <div v-if="booking" class="text-left space-y-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg mb-6">
          <div class="flex items-center gap-4">
            <img
              :src="booking.carImage"
              :alt="booking.carName"
              class="w-20 h-14 object-cover rounded-lg"
            />
            <div>
              <p class="font-bold text-gray-900 dark:text-white">{{ booking.carName }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ booking.totalDays }} day(s)</p>
            </div>
          </div>

          <hr class="border-gray-200 dark:border-gray-700" />

          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Pickup</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ formatDate(booking.pickupDate) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Return</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ formatDate(booking.returnDate) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Location</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ booking.pickupLocation }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Driver</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ booking.customer.firstName }} {{ booking.customer.lastName }}</span>
            </div>
          </div>

          <hr class="border-gray-200 dark:border-gray-700" />

          <div class="flex justify-between text-lg font-bold">
            <span class="text-gray-900 dark:text-white">Total Paid</span>
            <span class="text-primary-600">{{ formatKesDirect(booking.totalPrice) }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-3">
          <router-link to="/my-bookings" class="btn-primary flex-1 flex items-center justify-center gap-2">
            <ClipboardList class="w-5 h-5" />
            View My Bookings
          </router-link>
          <router-link to="/" class="btn-secondary flex-1 flex items-center justify-center gap-2">
            <Home class="w-5 h-5" />
            Back to Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle, ClipboardList, Home } from 'lucide-vue-next'
import { useCarStore } from '@/stores/carStore'
import { formatKesDirect } from '@/composables/useCurrency'

const props = defineProps<{
  bookingId: string
}>()

const carStore = useCarStore()

const booking = computed(() => {
  return carStore.bookings.find(b => b.id === props.bookingId)
})

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>
