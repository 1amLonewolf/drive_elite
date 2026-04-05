<template>
  <section class="py-10 lg:py-14 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
    <div class="container-padding">
      <div class="text-center mb-8">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Choose Your Experience</h2>
        <p class="text-gray-600 dark:text-gray-400">Every ride, tailored to your needs and budget</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          v-for="pkg in packages"
          :key="pkg.id"
          @click="$emit('select', pkg.id)"
          class="relative p-5 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md"
          :class="isSelected(pkg.id)
            ? `${pkg.borderColor} ${pkg.bgColor} shadow-md ring-2 ring-offset-2 ring-primary-500 dark:ring-offset-gray-950`
            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'"
        >
          <!-- Active checkmark -->
          <div
            v-if="isSelected(pkg.id)"
            class="absolute top-3 right-3 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center"
          >
            <Check class="w-4 h-4 text-white" />
          </div>

          <!-- Icon -->
          <img :src="pkg.icon" :alt="pkg.name" class="w-16 h-12 object-contain mb-3" />

          <!-- Name -->
          <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-1">{{ pkg.name }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">{{ pkg.description }}</p>

          <!-- Price range -->
          <div class="text-sm font-medium" :class="pkg.color">
            {{ formatKesDisplay(pkg.minPrice) }} – {{ formatKesDisplay(pkg.maxPrice) }}/day
          </div>

          <!-- Features -->
          <ul class="mt-3 space-y-1">
            <li v-for="feature in pkg.features" :key="feature" class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <Check class="w-3 h-3 text-accent-500 shrink-0" />
              {{ feature }}
            </li>
          </ul>

          <!-- Car count -->
          <div class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <span class="text-xs font-medium text-gray-600 dark:text-gray-400">
              {{ getCarCount(pkg.id) }} vehicle{{ getCarCount(pkg.id) !== 1 ? 's' : '' }}
            </span>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import { packages } from '@/data/packages'
import { useCarStore } from '@/stores/carStore'
import type { PackageType } from '@/types'

const props = defineProps<{
  selected: PackageType | ''
}>()

const emit = defineEmits<{
  select: [id: PackageType | '']
}>()

const carStore = useCarStore()

const isSelected = (id: PackageType) => props.selected === id

const getCarCount = (id: PackageType) => {
  return carStore.allCars.filter(car => car.package === id).length
}

// Format KES directly (prices are already in KES)
const formatKesDisplay = (kes: number) => {
  return `KSh ${kes.toLocaleString('en-KE')}`
}
</script>
