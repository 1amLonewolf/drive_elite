<template>
  <div v-if="car" class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Breadcrumb -->
    <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="container-padding py-4">
        <nav class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <router-link to="/" class="hover:text-primary-600 transition-colors">Home</router-link>
          <ChevronRight class="w-4 h-4" />
          <router-link to="/cars" class="hover:text-primary-600 transition-colors">Cars</router-link>
          <ChevronRight class="w-4 h-4" />
          <span class="text-gray-900 dark:text-white font-medium">{{ car.name }}</span>
        </nav>
      </div>
    </div>

    <div class="container-padding py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Main Content -->
        <div class="flex-1">
          <!-- Image Gallery -->
          <div class="card mb-8">
            <div class="aspect-[16/10] overflow-hidden">
              <img
                :src="currentImage"
                :alt="car.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-4 flex gap-3 overflow-x-auto">
              <button
                v-for="(img, idx) in carGallery"
                :key="idx"
                @click="currentImage = img"
                class="w-24 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-colors"
                :class="currentImage === img ? 'border-primary-600' : 'border-transparent hover:border-gray-300'"
              >
                <img :src="img" :alt="`${car.name} ${idx + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Car Info -->
          <div class="card p-6 mb-8">
            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ car.name }}</h1>
                  <span class="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-medium px-3 py-1 rounded-full">
                    {{ car.type }}
                  </span>
                </div>
                <p class="text-gray-600 dark:text-gray-400">{{ car.brand }} · {{ car.model }} · {{ car.year }}</p>
              </div>
              <div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                <Star class="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span class="font-bold text-gray-900 dark:text-white">{{ car.rating }}</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">({{ car.reviewCount }} reviews)</span>
              </div>
            </div>

            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{{ car.description }}</p>

            <!-- Quick specs -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div class="text-center">
                <Users class="w-6 h-6 mx-auto mb-2 text-primary-600" />
                <p class="text-sm text-gray-500 dark:text-gray-400">Seats</p>
                <p class="font-semibold text-gray-900 dark:text-white">{{ car.specs.seats }}</p>
              </div>
              <div class="text-center">
                <Settings class="w-6 h-6 mx-auto mb-2 text-primary-600" />
                <p class="text-sm text-gray-500 dark:text-gray-400">Transmission</p>
                <p class="font-semibold text-gray-900 dark:text-white">{{ car.specs.transmission }}</p>
              </div>
              <div class="text-center">
                <Fuel class="w-6 h-6 mx-auto mb-2 text-primary-600" />
                <p class="text-sm text-gray-500 dark:text-gray-400">Fuel</p>
                <p class="font-semibold text-gray-900 dark:text-white">{{ car.specs.fuel }}</p>
              </div>
              <div class="text-center">
                <Engine class="w-6 h-6 mx-auto mb-2 text-primary-600" />
                <p class="text-sm text-gray-500 dark:text-gray-400">Engine</p>
                <p class="font-semibold text-gray-900 dark:text-white">{{ car.specs.engine }}</p>
              </div>
            </div>
          </div>

          <!-- Full Specifications -->
          <div class="card p-6 mb-8">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Full Specifications</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span class="text-gray-600 dark:text-gray-400">Engine</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ car.specs.engine }}</span>
              </div>
              <div class="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span class="text-gray-600 dark:text-gray-400">Transmission</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ car.specs.transmission }}</span>
              </div>
              <div class="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span class="text-gray-600 dark:text-gray-400">Fuel Type</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ car.specs.fuel }}</span>
              </div>
              <div class="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span class="text-gray-600 dark:text-gray-400">Mileage</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ car.specs.mileage }}</span>
              </div>
              <div class="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span class="text-gray-600 dark:text-gray-400">Color</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ car.specs.color }}</span>
              </div>
              <div class="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span class="text-gray-600 dark:text-gray-400">Doors</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ car.specs.doors }}</span>
              </div>
              <div class="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span class="text-gray-600 dark:text-gray-400">Seats</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ car.specs.seats }}</span>
              </div>
              <div class="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span class="text-gray-600 dark:text-gray-400">Air Conditioning</span>
                <span class="font-medium" :class="car.specs.airConditioning ? 'text-accent-600' : 'text-red-500'">
                  {{ car.specs.airConditioning ? 'Yes' : 'No' }}
                </span>
              </div>
            </div>

            <!-- Features -->
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">Features & Amenities</h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div
                v-for="feature in featureList"
                :key="feature.key"
                class="flex items-center gap-2"
              >
                <div
                  class="w-6 h-6 rounded-full flex items-center justify-center"
                  :class="getFeatureStatus(feature.key)
                    ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-600'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400'"
                >
                  <component :is="feature.icon" class="w-4 h-4" />
                </div>
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ feature.label }}</span>
              </div>
            </div>
          </div>

          <!-- Availability Calendar -->
          <div class="card p-6 mb-8">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Availability Calendar</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Click available dates to select your trip</p>

            <!-- Month Navigation -->
            <div class="flex items-center justify-between mb-4">
              <button @click="prevMonth" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <ChevronLeft class="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <h3 class="font-semibold text-gray-900 dark:text-white">{{ currentMonthName }} {{ calendarYear }}</h3>
              <button @click="nextMonth" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <ChevronRight class="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <!-- Calendar Grid -->
            <div class="grid grid-cols-7 gap-1.5">
              <div v-for="day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" :key="day" class="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">
                {{ day }}
              </div>
              <!-- Empty cells for offset -->
              <div v-for="i in monthStartOffset" :key="`empty-${i}`" class="aspect-square"></div>
              <!-- Day cells -->
              <div
                v-for="day in daysInMonth"
                :key="day.num"
                @click="selectDate(day)"
                class="aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all relative"
                :class="day.isPast
                  ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                  : day.isToday
                    ? 'ring-2 ring-primary-600 ring-offset-2 dark:ring-offset-gray-800 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-bold'
                    : day.isBooked
                      ? 'bg-red-100 dark:bg-red-900/20 text-red-500 dark:text-red-400 cursor-not-allowed'
                      : day.isSelected
                        ? 'bg-primary-600 text-white font-bold shadow-md'
                        : day.isInRange
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-accent-100 dark:hover:bg-accent-900/30 cursor-pointer'"
              >
                {{ day.num }}
                <!-- Availability dot -->
                <div v-if="!day.isPast && !day.isBooked && !day.isToday" class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" :class="day.isBooked ? 'bg-red-400' : 'bg-accent-400'"></div>
              </div>
            </div>

            <!-- Legend -->
            <div class="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-accent-400 rounded-full"></div>
                <span class="text-xs text-gray-600 dark:text-gray-400">Available</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                <span class="text-xs text-gray-600 dark:text-gray-400">Booked</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 border-2 border-primary-600 rounded"></div>
                <span class="text-xs text-gray-600 dark:text-gray-400">Today</span>
              </div>
            </div>
          </div>

          <!-- VIN Decoder -->
          <VinDecoder />
        </div>

        <!-- Sidebar -->
        <div class="w-full lg:w-80 shrink-0">
          <!-- Price Card -->
          <div class="card p-6 sticky top-24">
            <div class="text-center mb-6">
              <span class="text-4xl font-bold text-primary-600">{{ formatKesDirect(car.pricePerDay) }}</span>
              <span class="text-gray-500 dark:text-gray-400">/day</span>
            </div>

            <div class="space-y-4 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Pickup Date</label>
                <input
                  v-model="pickupDate"
                  type="date"
                  class="input-field"
                  :min="today"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Return Date</label>
                <input
                  v-model="returnDate"
                  type="date"
                  class="input-field"
                  :min="pickupDate || today"
                />
              </div>

              <!-- Price estimate -->
              <div v-if="totalDays > 0" class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-400">{{ formatKesDirect(car.pricePerDay) }} × {{ totalDays }} day(s)</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ formatKesDirect(totalPrice) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-400">Insurance</span>
                  <span class="font-medium text-accent-600">Included</span>
                </div>
                <hr class="border-gray-200 dark:border-gray-700" />
                <div class="flex justify-between font-bold">
                  <span class="text-gray-900 dark:text-white">Total</span>
                  <span class="text-primary-600">{{ formatKesDirect(totalPrice) }}</span>
                </div>
              </div>
            </div>

            <router-link
              :to="`/booking/${car.id}`"
              :state="{ pickupDate: pickupDate, returnDate: returnDate }"
              class="btn-primary w-full text-center block text-lg"
            >
              Book Now
            </router-link>

            <div class="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div class="flex items-center gap-2">
                <ShieldCheck class="w-4 h-4 text-accent-600" />
                <span>Fully insured</span>
              </div>
              <div class="flex items-center gap-2">
                <Clock class="w-4 h-4 text-accent-600" />
                <span>Free cancellation up to 24h</span>
              </div>
              <div class="flex items-center gap-2">
                <BadgeDollarSign class="w-4 h-4 text-accent-600" />
                <span>No hidden fees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Not found -->
  <div v-else class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
    <div class="text-center">
      <Car class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Car not found</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-6">The vehicle you're looking for doesn't exist or has been removed.</p>
      <router-link to="/cars" class="btn-primary">Browse All Cars</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  ChevronRight, Star, Users, Settings,
  ShieldCheck, Clock, BadgeDollarSign,
  Wind, Bluetooth, Navigation, Camera,
  Fuel,
} from 'lucide-vue-next'
import { useCarStore } from '@/stores/carStore'
import { formatKesDirect } from '@/composables/useCurrency'
import VinDecoder from '@/components/cars/VinDecoder.vue'

const props = defineProps<{
  id: string
}>()

const route = useRoute()
const carStore = useCarStore()
const car = computed(() => carStore.getCarById(Number(props.id)))
const pickupDate = ref('')
const returnDate = ref('')
const today = computed(() => {
  const d = new Date()
  return d.toISOString().split('T')[0]
})
const todayDate = computed(() => {
  const d = new Date()
  return { year: d.getFullYear(), month: d.getMonth(), day: d.getDate() }
})

// Calendar state
const calendarYear = ref(todayDate.value.year)
const calendarMonth = ref(todayDate.value.month)
const selectedPickup = ref('')
const selectedReturn = ref('')

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const currentMonthName = computed(() => monthNames[calendarMonth.value])

// Days in current month
const daysInMonth = computed(() => {
  const year = calendarYear.value
  const month = calendarMonth.value
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const days = []

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month, d)
    const dateStr = date.toISOString().split('T')[0]
    const isPast = date < new Date(today.value)
    const isToday = dateStr === today.value
    const isBooked = Math.random() < 0.15 && !isPast // 15% booked
    const isSelected = dateStr === selectedPickup.value || dateStr === selectedReturn.value
    const isInRange = selectedPickup.value && selectedReturn.value &&
      dateStr > selectedPickup.value && dateStr < selectedReturn.value

    days.push({ num: d, isPast, isToday, isBooked, isSelected, isInRange, dateStr })
  }

  return days
})

// Offset to align first day of month (Mon=0, Sun=6)
const monthStartOffset = computed(() => {
  const day = new Date(calendarYear.value, calendarMonth.value, 1).getDay()
  return day === 0 ? 6 : day - 1
})

const selectDate = (day: { dateStr: string; isPast: boolean; isBooked: boolean }) => {
  if (day.isPast || day.isBooked) return

  if (!selectedPickup.value || (selectedPickup.value && selectedReturn.value)) {
    // Start new selection
    selectedPickup.value = day.dateStr
    selectedReturn.value = ''
    pickupDate.value = day.dateStr
    returnDate.value = ''
  } else if (day.dateStr > selectedPickup.value) {
    selectedReturn.value = day.dateStr
    returnDate.value = day.dateStr
  } else {
    // Clicked before pickup - swap
    selectedReturn.value = selectedPickup.value
    returnDate.value = selectedPickup.value
    selectedPickup.value = day.dateStr
    pickupDate.value = day.dateStr
  }
}

const prevMonth = () => {
  if (calendarMonth.value === 0) {
    calendarMonth.value = 11
    calendarYear.value--
  } else {
    calendarMonth.value--
  }
}

const nextMonth = () => {
  if (calendarMonth.value === 11) {
    calendarMonth.value = 0
    calendarYear.value++
  } else {
    calendarMonth.value++
  }
}

// Image resolution
const currentImage = ref('')
const carGallery = ref<string[]>([])

watch(
  car,
  async (newCar) => {
    if (newCar) {
      const { getCarImageUrl, getCarImageSync } = await import('@/composables/useCarImages')
      const angles: Array<'three-quarter' | 'front' | 'side'> = ['three-quarter', 'front', 'side']

      // Set fallback immediately
      currentImage.value = getCarImageSync(newCar.brand, newCar.model, newCar.year, newCar.type, 0)
      carGallery.value = angles.map((angle, i) =>
        getCarImageSync(newCar.brand, newCar.model, newCar.year, newCar.type, i)
      )

      // Resolve real images asynchronously
      for (let i = 0; i < angles.length; i++) {
        const url = await getCarImageUrl(newCar.brand, newCar.model, newCar.year, newCar.type, { angle: angles[i] }, i)
        carGallery.value[i] = url
        if (i === 0) currentImage.value = url
      }
    }
  },
  { immediate: true }
)

// Mock calendar days (current month)
const calendarDays = ref<Array<{ date: number; available: boolean }>>([])

const featureList = [
  { key: 'airConditioning' as const, label: 'A/C', icon: Wind },
  { key: 'bluetooth' as const, label: 'Bluetooth', icon: Bluetooth },
  { key: 'gps' as const, label: 'GPS', icon: Navigation },
  { key: 'camera' as const, label: 'Camera', icon: Camera },
]

const getFeatureStatus = (key: typeof featureList[number]['key']) => {
  return car.value?.specs[key]
}

const totalDays = computed(() => {
  if (!pickupDate.value || !returnDate.value) return 0
  const diff = new Date(returnDate.value).getTime() - new Date(pickupDate.value).getTime()
  return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0)
})

const totalPrice = computed(() => {
  if (!car.value) return 0
  return car.value.pricePerDay * totalDays.value
})

// Generate mock calendar days
onMounted(() => {
  if (car.value) {
    currentImage.value = car.value.image
    const days = []
    const today = new Date()
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        available: Math.random() > 0.2, // 80% available
      })
    }
    calendarDays.value = days
  }
})
</script>
