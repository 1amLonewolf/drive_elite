<template>
  <div v-if="car" class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Progress bar -->
    <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="container-padding py-6">
        <div class="flex items-center justify-center gap-4">
          <div
            v-for="(step, idx) in steps"
            :key="step"
            class="flex items-center"
          >
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors"
              :class="currentStep > idx + 1
                ? 'bg-accent-500 text-white'
                : currentStep === idx + 1
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'"
            >
              <Check v-if="currentStep > idx + 1" class="w-5 h-5" />
              <span v-else>{{ idx + 1 }}</span>
            </div>
            <span
              class="ml-2 text-sm font-medium hidden sm:block"
              :class="currentStep >= idx + 1 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'"
            >
              {{ step }}
            </span>
            <div
              v-if="idx < steps.length - 1"
              class="w-12 sm:w-20 h-0.5 mx-3"
              :class="currentStep > idx + 1 ? 'bg-accent-500' : 'bg-gray-200 dark:bg-gray-700'"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-padding py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Main Form -->
        <div class="flex-1">
          <!-- Step 1: Trip Details -->
          <div v-if="currentStep === 1" class="card p-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Trip Details</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  <MapPin class="w-4 h-4 inline mr-1" />
                  Pickup Location *
                </label>
                <select v-model="booking.pickupLocation" required class="input-field">
                  <option value="">Select location</option>
                  <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  <MapPin class="w-4 h-4 inline mr-1" />
                  Return Location *
                </label>
                <select v-model="returnLocation" required class="input-field">
                  <option value="">Select location</option>
                  <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  <Calendar class="w-4 h-4 inline mr-1" />
                  Pickup Date *
                </label>
                <input v-model="booking.pickupDate" type="date" required class="input-field" :min="today" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  <Calendar class="w-4 h-4 inline mr-1" />
                  Return Date *
                </label>
                <input v-model="booking.returnDate" type="date" required class="input-field" :min="booking.pickupDate || today" />
              </div>
            </div>

            <div class="flex justify-end mt-8">
              <button @click="currentStep = 2" class="btn-primary">
                Continue
                <ArrowRight class="w-5 h-5 inline ml-1" />
              </button>
            </div>
          </div>

          <!-- Step 2: Customer Info -->
          <div v-if="currentStep === 2" class="card p-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Driver Information</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First Name *</label>
                <input v-model="booking.customer!.firstName" type="text" required class="input-field" placeholder="John" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last Name *</label>
                <input v-model="booking.customer!.lastName" type="text" required class="input-field" placeholder="Doe" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email *</label>
                <input v-model="booking.customer!.email" type="email" required class="input-field" placeholder="john@example.com" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone *</label>
                <input v-model="booking.customer!.phone" type="tel" required class="input-field" placeholder="+1 (555) 123-4567" />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Driver's License Number *</label>
                <input v-model="booking.customer!.licenseNumber" type="text" required class="input-field" placeholder="AB1234567" />
              </div>
            </div>

            <div class="flex justify-between mt-8">
              <button @click="currentStep = 1" class="btn-secondary">
                <ArrowLeft class="w-5 h-5 inline mr-1" />
                Back
              </button>
              <button @click="currentStep = 3" class="btn-primary">
                Review Booking
                <ArrowRight class="w-5 h-5 inline ml-1" />
              </button>
            </div>
          </div>

          <!-- Step 3: Review & Payment -->
          <div v-if="currentStep === 3" class="space-y-6">
            <div class="card p-6">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Review Your Booking</h2>

              <!-- Booking details -->
              <div class="space-y-4">
                <div class="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <span class="text-gray-600 dark:text-gray-400">Vehicle</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ car.name }}</span>
                </div>
                <div class="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <span class="text-gray-600 dark:text-gray-400">Pickup</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ booking.pickupLocation }}</span>
                </div>
                <div class="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <span class="text-gray-600 dark:text-gray-400">Pickup Date</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ formatDate(booking.pickupDate || '') }}</span>
                </div>
                <div class="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <span class="text-gray-600 dark:text-gray-400">Return Date</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ formatDate(booking.returnDate || '') }}</span>
                </div>
                <div class="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <span class="text-gray-600 dark:text-gray-400">Duration</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ totalDays }} day(s)</span>
                </div>
                <div class="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <span class="text-gray-600 dark:text-gray-400">Driver</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ booking.customer?.firstName }} {{ booking.customer?.lastName }}</span>
                </div>
              </div>
            </div>

            <!-- Payment mock -->
            <div class="card p-6">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Payment Details</h2>

              <div class="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg mb-6">
                <div class="flex items-start gap-3">
                  <AlertCircle class="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p class="font-medium text-amber-800 dark:text-amber-300">Demo Mode</p>
                    <p class="text-sm text-amber-700 dark:text-amber-400">This is a demo. No real payment will be processed. Click "Confirm Booking" to simulate a successful payment.</p>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Card Number</label>
                  <input type="text" placeholder="4242 4242 4242 4242" class="input-field" value="4242 4242 4242 4242" readonly />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Expiry</label>
                    <input type="text" placeholder="12/25" class="input-field" value="12/25" readonly />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">CVC</label>
                    <input type="text" placeholder="123" class="input-field" value="123" readonly />
                  </div>
                </div>
              </div>

              <div class="flex justify-between mt-8">
                <button @click="currentStep = 2" class="btn-secondary">
                  <ArrowLeft class="w-5 h-5 inline mr-1" />
                  Back
                </button>
                <button @click="confirmBooking" class="btn-primary bg-accent-600 hover:bg-accent-700">
                  <CreditCard class="w-5 h-5 inline mr-1" />
                  Confirm & Pay {{ formatKesDirect(booking.totalPrice || 0) }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Summary -->
        <div class="w-full lg:w-80 shrink-0">
          <BookingSummary :car="car" :booking="booking" />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
    <div class="text-center">
      <Car class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Car not found</h1>
      <router-link to="/cars" class="btn-primary">Browse Cars</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  Check, ArrowRight, ArrowLeft, MapPin, Calendar,
  AlertCircle, CreditCard, Car,
} from 'lucide-vue-next'
import { useCarStore } from '@/stores/carStore'
import type { Booking } from '@/types'
import { formatKesDirect } from '@/composables/useCurrency'
import BookingSummary from '@/components/booking/BookingSummary.vue'
import { locations } from '@/data/cars'

const props = defineProps<{
  carId: string
}>()

const router = useRouter()
const carStore = useCarStore()
const car = computed(() => carStore.getCarById(Number(props.carId)))

const steps = ['Trip Details', 'Driver Info', 'Payment']
const currentStep = ref(1)
const returnLocation = ref('')
const today = computed(() => new Date().toISOString().split('T')[0])

const booking = ref<Partial<Booking>>({
  carId: Number(props.carId),
  carName: car.value?.name || '',
  carImage: car.value?.image || '',
  pickupLocation: '',
  pickupDate: '',
  returnDate: '',
  totalDays: 0,
  pricePerDay: car.value?.pricePerDay || 0,
  totalPrice: 0,
  customer: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    licenseNumber: '',
  },
  status: 'pending',
})

const totalDays = computed(() => {
  if (!booking.value.pickupDate || !booking.value.returnDate) return 0
  const diff = new Date(booking.value.returnDate).getTime() - new Date(booking.value.pickupDate).getTime()
  return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 1)
})

// Update total price when days change
const totalPrice = computed(() => {
  return (car.value?.pricePerDay || 0) * totalDays.value
})

// Watch totalDays and totalPrice
watch(totalDays, (newDays) => {
  booking.value.totalDays = newDays
  booking.value.totalPrice = totalPrice.value
})

onMounted(() => {
  if (car.value) {
    booking.value.carName = car.value.name
    booking.value.carImage = car.value.image
    booking.value.pricePerDay = car.value.pricePerDay
  }
})

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const confirmBooking = () => {
  // Generate booking ID
  const bookingId = `BK${Date.now().toString(36).toUpperCase()}`

  const finalBooking: Booking = {
    id: bookingId,
    carId: Number(props.carId),
    carName: car.value?.name || '',
    carImage: car.value?.image || '',
    pickupLocation: booking.value.pickupLocation || '',
    pickupDate: booking.value.pickupDate || '',
    returnDate: booking.value.returnDate || '',
    totalDays: totalDays.value,
    pricePerDay: car.value?.pricePerDay || 0,
    totalPrice: totalPrice.value,
    customer: booking.value.customer as any,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  }

  carStore.addBooking(finalBooking)

  router.push(`/booking/confirm/${bookingId}`)
}
</script>
