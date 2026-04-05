<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Page Header -->
    <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="container-padding py-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Browse Our Fleet</h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ carStore.filteredCars.length }} vehicle{{ carStore.filteredCars.length !== 1 ? 's' : '' }} available
        </p>
      </div>
    </div>

    <!-- Package Selector -->
    <PackageSelector :selected="carStore.filters.package" @select="selectPackage" />

    <div class="container-padding py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Mobile filter toggle -->
        <button
          @click="showFilters = !showFilters"
          class="lg:hidden btn-secondary flex items-center justify-center gap-2 mb-4"
        >
          <Filter class="w-5 h-5" />
          {{ showFilters ? 'Hide' : 'Show' }} Filters
        </button>

        <!-- Filters Sidebar -->
        <div
          class="w-full lg:w-80 shrink-0"
          :class="showFilters ? 'block' : 'hidden lg:block'"
        >
          <CarFilters />
        </div>

        <!-- Car Grid -->
        <div class="flex-1">
          <!-- Sort options -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <p class="text-gray-600 dark:text-gray-400">
              Showing <span class="font-semibold text-gray-900 dark:text-white">{{ carStore.filteredCars.length }}</span> results
            </p>
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Sort by:</label>
              <select
                v-model="sortBy"
                @change="updateSort"
                class="input-field py-2 text-sm"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="rating">Highest Rated</option>
                <option value="year">Newest First</option>
              </select>
            </div>
          </div>

          <!-- Loading state -->
          <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="i in 6" :key="i" class="card animate-pulse">
              <div class="aspect-[16/10] bg-gray-200 dark:bg-gray-700"></div>
              <div class="p-5 space-y-3">
                <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>

          <!-- Empty state -->
          <div v-else-if="carStore.filteredCars.length === 0" class="text-center py-20">
            <div class="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Car class="w-10 h-10 text-gray-400" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">No cars found</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your filters to find available vehicles.</p>
            <button @click="resetFilters" class="btn-primary">
              Reset Filters
            </button>
          </div>

          <!-- Cars grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <CarCard v-for="car in carStore.filteredCars" :key="car.id" :car="car" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Filter, Car } from 'lucide-vue-next'
import { useCarStore } from '@/stores/carStore'
import CarFilters from '@/components/filters/CarFilters.vue'
import CarCard from '@/components/cars/CarCard.vue'
import PackageSelector from '@/components/packages/PackageSelector.vue'
import type { PackageType } from '@/types'

const carStore = useCarStore()
const route = useRoute()
const showFilters = ref(true)
const loading = ref(true)
const sortBy = ref(carStore.filters.sortBy)

const selectPackage = (id: PackageType | '') => {
  carStore.filters.package = id === carStore.filters.package ? '' : id
}

// Simulate loading
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 500)

  // Apply query params if present
  const { pickupDate, returnDate } = route.query
  if (pickupDate && returnDate) {
    // In a real app, we'd use these dates to filter availability
    console.log('Search dates:', pickupDate, returnDate)
  }
})

const updateSort = () => {
  carStore.filters.sortBy = sortBy.value as any
}

const resetFilters = () => {
  carStore.filters = {
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
}

watch(() => route.query, () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 300)
})
</script>
