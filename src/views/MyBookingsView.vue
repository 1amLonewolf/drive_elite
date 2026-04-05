<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="container-padding py-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Bookings</h1>
        <p class="text-gray-600 dark:text-gray-400">Manage your car rental reservations</p>
      </div>
    </div>

    <div class="container-padding py-8">
      <!-- Empty state -->
      <div v-if="bookings.length === 0" class="text-center py-20">
        <div class="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <CalendarDays class="w-10 h-10 text-gray-400" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">No bookings yet</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Looks like you haven't made any reservations yet.</p>
        <router-link to="/cars" class="btn-primary">
          Browse Cars
          <ArrowRight class="w-5 h-5 inline ml-1" />
        </router-link>
      </div>

      <!-- Bookings list -->
      <div v-else class="space-y-4 max-w-4xl mx-auto">
        <div
          v-for="booking in bookings"
          :key="booking.id"
          class="card p-6"
        >
          <div class="flex flex-col sm:flex-row gap-6">
            <!-- Car image -->
            <img
              :src="booking.carImage"
              :alt="booking.carName"
              class="w-full sm:w-48 h-32 object-cover rounded-lg"
            />

            <!-- Booking details -->
            <div class="flex-1">
              <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ booking.carName }}</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Booking ID: <span class="font-mono">{{ booking.id }}</span></p>
                </div>
                <span
                  class="px-3 py-1 rounded-full text-sm font-medium shrink-0"
                  :class="statusClasses(booking.status)"
                >
                  {{ booking.status.charAt(0).toUpperCase() + booking.status.slice(1) }}
                </span>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Pickup</p>
                  <p class="font-medium text-gray-900 dark:text-white text-sm">{{ formatDate(booking.pickupDate) }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Return</p>
                  <p class="font-medium text-gray-900 dark:text-white text-sm">{{ formatDate(booking.returnDate) }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Duration</p>
                  <p class="font-medium text-gray-900 dark:text-white text-sm">{{ booking.totalDays }} day(s)</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Total</p>
                  <p class="font-bold text-primary-600">{{ formatKesDirect(booking.totalPrice) }}</p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2">
                <router-link
                  :to="`/car/${booking.carId}`"
                  class="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  View Car Details
                </router-link>
                <button
                  v-if="booking.status === 'confirmed' || booking.status === 'pending'"
                  @click="cancelBooking(booking.id)"
                  class="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CalendarDays, ArrowRight } from 'lucide-vue-next'
import { useCarStore } from '@/stores/carStore'
import { formatKesDirect } from '@/composables/useCurrency'
import type { Booking, BookingStatus } from '@/types'

const carStore = useCarStore()
const bookings = computed(() => carStore.userBookings)

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const statusClasses = (status: BookingStatus) => {
  const classes: Record<BookingStatus, string> = {
    confirmed: 'bg-accent-100 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400',
    pending: 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
    cancelled: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400',
    completed: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
  }
  return classes[status]
}

const cancelBooking = (id: string) => {
  if (confirm('Are you sure you want to cancel this booking?')) {
    const booking = carStore.bookings.find(b => b.id === id)
    if (booking) {
      booking.status = 'cancelled'
      localStorage.setItem('bookings', JSON.stringify(carStore.bookings))
    }
  }
}
</script>
