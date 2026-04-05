<template>
  <section class="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
    <div class="container-padding">
      <div class="text-center mb-12">
        <h2 class="section-title mb-4">Featured Vehicles</h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Handpicked premium vehicles for your next adventure. Each car is meticulously maintained and ready to go.
        </p>
      </div>

      <!-- Carousel -->
      <div class="relative">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <CarCard v-for="car in displayedCars" :key="car.id" :car="car" />
        </div>

        <!-- Navigation arrows (visible on larger screens with many items) -->
        <button
          v-if="cars.length > 3"
          @click="scroll(-1)"
          class="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-12 h-12 bg-white dark:bg-gray-800 shadow-lg rounded-full items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft class="w-6 h-6" />
        </button>
        <button
          v-if="cars.length > 3"
          @click="scroll(1)"
          class="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-12 h-12 bg-white dark:bg-gray-800 shadow-lg rounded-full items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronRight class="w-6 h-6" />
        </button>
      </div>

      <div class="text-center mt-10">
        <router-link to="/cars" class="btn-outline">
          View All Cars
          <ArrowRight class="w-5 h-5 inline ml-1" />
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-vue-next'
import { useCarStore } from '@/stores/carStore'
import CarCard from '@/components/cars/CarCard.vue'

const carStore = useCarStore()
const cars = computed(() => carStore.featuredCars)
const currentIndex = ref(0)

const displayedCars = computed(() => {
  return cars.value
})

const scroll = (_direction: number) => {
  // In a full implementation, this would scroll the carousel
  // For now, it's a grid display
}
</script>
