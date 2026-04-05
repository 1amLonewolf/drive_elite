<template>
  <section class="relative bg-gradient-to-br from-gray-900 via-primary-950 to-gray-900 text-white overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%);"></div>
    </div>

    <div class="container-padding relative z-10 py-20 lg:py-32">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Find Your Perfect
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
            Drive Today
          </span>
        </h1>
        <p class="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Premium vehicles across Kenya — from Nairobi city rides to safari adventures and coastal getaways.
        </p>

        <!-- Search Form -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="relative">
              <label class="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <MapPin class="w-4 h-4 inline mr-1" />
                Pickup Location
              </label>
              <select
                v-model="searchData.location"
                class="input-field appearance-none pr-10"
              >
                <option value="">Select location</option>
                <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
              </select>
            </div>
            <div>
              <label class="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <Calendar class="w-4 h-4 inline mr-1" />
                Pickup Date
              </label>
              <input
                v-model="searchData.pickupDate"
                type="date"
                class="input-field"
                :min="today"
              />
            </div>
            <div>
              <label class="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <Calendar class="w-4 h-4 inline mr-1" />
                Return Date
              </label>
              <input
                v-model="searchData.returnDate"
                type="date"
                class="input-field"
                :min="searchData.pickupDate || today"
              />
            </div>
            <div>
              <label class="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <Users class="w-4 h-4 inline mr-1" />
                Passengers
              </label>
              <select v-model="searchData.passengers" class="input-field">
                <option value="1">1 Passenger</option>
                <option value="2">2 Passengers</option>
                <option value="3">3 Passengers</option>
                <option value="4">4 Passengers</option>
                <option value="5">5+ Passengers</option>
              </select>
            </div>
          </div>
          <button
            @click="handleSearch"
            class="btn-primary w-full mt-4 text-lg"
          >
            <Search class="w-5 h-5 inline mr-2" />
            Search Available Cars
          </button>
        </div>
      </div>
    </div>

    <!-- Decorative bottom wave -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
        <path d="M0 60L1440 60L1440 30C1440 30 1080 0 720 30C360 60 0 30 0 30L0 60Z" fill="currentColor" class="text-gray-50 dark:text-gray-950" />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { MapPin, Calendar, Users, Search } from 'lucide-vue-next'
import { locations } from '@/data/cars'

const router = useRouter()
const today = computed(() => new Date().toISOString().split('T')[0])

const searchData = reactive({
  location: '',
  pickupDate: '',
  returnDate: '',
  passengers: '2',
})

const handleSearch = () => {
  router.push({
    path: '/cars',
    query: {
      location: searchData.location || undefined,
      pickupDate: searchData.pickupDate || undefined,
      returnDate: searchData.returnDate || undefined,
      passengers: searchData.passengers || undefined,
    },
  })
}
</script>
