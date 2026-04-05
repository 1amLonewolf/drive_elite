<template>
  <aside class="space-y-6">
    <!-- Search -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
        <Search class="w-5 h-5" />
        Search
      </h3>
      <div class="relative">
        <input
          v-model="localFilters.query"
          type="text"
          placeholder="Search by name, brand, model..."
          class="input-field pl-10"
          @input="debounceUpdate"
        />
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>
    </div>

    <!-- Package -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Package</h3>
      <div class="space-y-2">
        <button
          v-if="localFilters.package"
          @click="clearPackage"
          class="w-full text-sm text-primary-600 hover:text-primary-700 font-medium p-2 text-left flex items-center gap-2"
        >
          <X class="w-4 h-4" />
          Show all packages
        </button>
        <button
          v-for="pkg in packageOptions"
          :key="pkg.id"
          @click="togglePackage(pkg.id)"
          class="w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-left"
          :class="localFilters.package === pkg.id
            ? `${pkg.bgColor} ${pkg.color} ring-1 ${pkg.borderColor}`
            : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'"
        >
          <img :src="pkg.icon" :alt="pkg.name" class="w-12 h-9 object-contain" />
          <div class="flex-1">
            <span class="text-sm font-medium">{{ pkg.name }}</span>
            <span class="text-xs text-gray-500 dark:text-gray-400 block">From KSh {{ pkg.minPrice.toLocaleString('en-KE') }}</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Vehicle Type -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Vehicle Type</h3>
      <div class="space-y-2">
        <button
          v-for="type in carTypes"
          :key="type"
          @click="toggleType(type)"
          class="w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-left"
          :class="localFilters.type === type
            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
            : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'"
        >
          <div class="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
               :class="localFilters.type === type
                 ? 'border-primary-600 dark:border-primary-400'
                 : 'border-gray-300 dark:border-gray-600'">
            <div v-if="localFilters.type === type" class="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400"></div>
          </div>
          <span class="text-sm font-medium">{{ type }}</span>
        </button>
        <button
          v-if="localFilters.type"
          @click="localFilters.type = ''; updateFilters()"
          class="w-full text-sm text-primary-600 hover:text-primary-700 font-medium p-2 text-left"
        >
          Show all types
        </button>
      </div>
    </div>

    <!-- Price Range -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
        <DollarSign class="w-5 h-5" />
        Price Range: KSh {{ localFilters.minPrice.toLocaleString('en-KE') }} – KSh {{ localFilters.maxPrice.toLocaleString('en-KE') }}/day
      </h3>
      <div class="space-y-4">
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-400">Minimum Price</label>
          <input
            type="range"
            v-model.number="localFilters.minPrice"
            min="0"
            max="100000"
            step="500"
            @input="debounceUpdate"
            class="w-full accent-primary-600"
          />
        </div>
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-400">Maximum Price</label>
          <input
            type="range"
            v-model.number="localFilters.maxPrice"
            min="0"
            max="100000"
            step="500"
            @input="debounceUpdate"
            class="w-full accent-primary-600"
          />
        </div>
      </div>
    </div>

    <!-- Transmission -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Transmission</h3>
      <div class="space-y-2">
        <label class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
          <input
            type="checkbox"
            value="Automatic"
            :checked="transmissions.includes('Automatic')"
            @change="toggleTransmission('Automatic')"
            class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span class="text-gray-700 dark:text-gray-300">Automatic</span>
        </label>
        <label class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
          <input
            type="checkbox"
            value="Manual"
            :checked="transmissions.includes('Manual')"
            @change="toggleTransmission('Manual')"
            class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span class="text-gray-700 dark:text-gray-300">Manual</span>
        </label>
      </div>
    </div>

    <!-- Fuel Type -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Fuel Type</h3>
      <select
        :value="localFilters.fuel"
        @change="updateFuel(($event.target as HTMLSelectElement).value)"
        class="input-field"
      >
        <option value="">All Fuel Types</option>
        <option value="Petrol">Petrol</option>
        <option value="Diesel">Diesel</option>
        <option value="Electric">Electric</option>
        <option value="Hybrid">Hybrid</option>
      </select>
    </div>

    <!-- Minimum Seats -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Minimum Seats</h3>
      <div class="flex gap-2">
        <button
          v-for="seats in [2, 4, 5, 7, 8]"
          :key="seats"
          @click="updateSeats(seats)"
          class="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
          :class="localFilters.minSeats === seats
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'"
        >
          {{ seats }}+
        </button>
      </div>
    </div>

    <!-- Reset Filters -->
    <button
      @click="resetFilters"
      class="btn-primary w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700"
    >
      <RotateCcw class="w-4 h-4" />
      Clear All Filters
    </button>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Search, DollarSign, RotateCcw, X } from 'lucide-vue-next'
import { useCarStore } from '@/stores/carStore'
import { packages } from '@/data/packages'
import type { SearchFilters, Transmission, PackageType } from '@/types'

const carStore = useCarStore()

const carTypes = ['Sedan', 'SUV', 'Luxury', 'Sports', 'Hatchback', 'Van', 'Electric']
const packageOptions = packages
const transmissions = ref<Transmission[]>([])

// Local filter state
const localFilters = ref<SearchFilters>({
  query: carStore.filters.query,
  type: carStore.filters.type,
  package: carStore.filters.package,
  minPrice: carStore.filters.minPrice,
  maxPrice: carStore.filters.maxPrice,
  transmission: carStore.filters.transmission,
  fuel: carStore.filters.fuel,
  minSeats: carStore.filters.minSeats,
  sortBy: carStore.filters.sortBy,
})

let debounceTimer: ReturnType<typeof setTimeout>

const debounceUpdate = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(updateFilters, 300)
}

const updateFilters = () => {
  carStore.filters = { ...localFilters.value }
}

const toggleTransmission = (type: Transmission) => {
  const idx = transmissions.value.indexOf(type)
  if (idx > -1) {
    transmissions.value.splice(idx, 1)
  } else {
    transmissions.value.push(type)
  }
  localFilters.value.transmission = transmissions.value[0] || ''
  updateFilters()
}

const updateFuel = (value: string) => {
  localFilters.value.fuel = value as SearchFilters['fuel']
  updateFilters()
}

const updateSeats = (seats: number) => {
  localFilters.value.minSeats = localFilters.value.minSeats === seats ? 0 : seats
  updateFilters()
}

const resetFilters = () => {
  localFilters.value = {
    query: '',
    type: '',
    package: '',
    minPrice: 0,
    maxPrice: 100000,
    transmission: '',
    fuel: '',
    minSeats: 0,
    sortBy: 'name',
  }
  transmissions.value = []
  updateFilters()
}

const togglePackage = (id: PackageType) => {
  localFilters.value.package = localFilters.value.package === id ? '' : id
  updateFilters()
}

const clearPackage = () => {
  localFilters.value.package = ''
  updateFilters()
}

const toggleType = (type: string) => {
  localFilters.value.type = (localFilters.value.type === type ? '' : type) as SearchFilters['type']
  updateFilters()
}

// Watch store changes
watch(() => carStore.filters, (newFilters) => {
  localFilters.value = { ...newFilters }
})
</script>
