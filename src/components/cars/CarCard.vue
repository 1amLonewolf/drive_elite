<template>
  <div class="card group cursor-pointer" @click="$router.push(`/car/${car.id}`)">
    <!-- Image -->
    <div class="relative overflow-hidden aspect-[16/10]">
      <img
        :src="mainImage"
        :alt="car.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div class="absolute top-3 left-3 flex gap-2">
        <span
          class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border"
          :class="getPackageClasses(car.package)"
        >
          <img :src="getPackageIcon(car.package)" :alt="car.package" class="w-5 h-4 object-contain" />
          {{ getPackageName(car.package) }}
        </span>
        <span v-if="car.year === 2024" class="bg-accent-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          New
        </span>
      </div>
      <!-- Favorite button -->
      <button
        @click.stop="toggleFavorite"
        class="absolute top-3 right-3 w-9 h-9 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
      >
        <Heart class="w-4 h-4" :class="isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'" />
      </button>
    </div>

    <!-- Content -->
    <div class="p-5">
      <div class="flex items-start justify-between mb-2">
        <div>
          <h3 class="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
            {{ car.name }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ car.brand }} · {{ car.model }}</p>
        </div>
        <div class="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
          <Star class="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ car.rating }}</span>
        </div>
      </div>

      <!-- Specs -->
      <div class="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div class="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
          <Users class="w-4 h-4" />
          <span>{{ car.specs.seats }} seats</span>
        </div>
        <div class="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
          <component :is="car.specs.transmission === 'Automatic' ? Settings : Wrench" class="w-4 h-4" />
          <span>{{ car.specs.transmission }}</span>
        </div>
        <div class="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
          <Fuel class="w-4 h-4" />
          <span>{{ car.specs.fuel }}</span>
        </div>
      </div>

      <!-- Price & CTA -->
      <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div class="text-center mb-3">
          <span class="text-2xl font-bold text-primary-600">{{ formatKesDirect(car.pricePerDay) }}</span>
          <span class="text-sm text-gray-500 dark:text-gray-400">/day</span>
        </div>
        <div class="flex gap-2">
          <button
            @click.stop="addToCartClick"
            class="w-12 h-12 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center shrink-0"
            :class="isInCart ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-300 dark:border-primary-700' : 'text-gray-600 dark:text-gray-300'"
            :title="isInCart ? 'In cart' : 'Add to cart'"
          >
            <ShoppingCart v-if="!isInCart" class="w-5 h-5" />
            <CheckCircle v-else class="w-5 h-5 text-accent-600" />
          </button>
          <router-link :to="`/car/${car.id}`" class="btn-primary flex-1 text-center py-3">
            Book Now
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Heart, Star, Users, Settings, Wrench, Fuel, ShoppingCart, CheckCircle } from 'lucide-vue-next'
import { useResolvedImages } from '@/composables/useResolvedImages'
import { getPackageInfo } from '@/data/packages'
import { formatKesDirect } from '@/composables/useCurrency'
import { useCartStore } from '@/stores/cartStore'
import type { Car, PackageType } from '@/types'

const props = defineProps<{
  car: Car
}>()

const cartStore = useCartStore()
const isFavorite = ref(false)

const isInCart = computed(() => cartStore.items.some(i => i.car.id === props.car.id))

const { mainImage } = useResolvedImages(
  props.car.brand,
  props.car.model,
  props.car.year,
  props.car.type
)

const addToCartClick = () => {
  if (isInCart.value) {
    cartStore.removeFromCart(props.car.id)
  } else {
    const today = new Date().toISOString().split('T')[0]
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]
    cartStore.addToCart(props.car, today, tomorrow, '')
  }
}

const getPackageName = (id: PackageType) => {
  const names: Record<PackageType, string> = {
    go: 'Go',
    premium: 'Premium',
    elite: 'Elite',
    exotic: 'Exotic',
  }
  return names[id]
}

const getPackageIcon = (id: PackageType): string => {
  const pkg = getPackageInfo(id)
  return pkg ? pkg.icon : ''
}

const getPackageClasses = (id: PackageType) => {
  const pkg = getPackageInfo(id)
  if (!pkg) return ''
  return `${pkg.color} ${pkg.bgColor} ${pkg.borderColor}`
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}
</script>
