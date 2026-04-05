<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="container-padding py-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Your Rental Cart</h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ cartStore.items.length }} vehicle{{ cartStore.items.length !== 1 ? 's' : '' }} selected
        </p>
      </div>
    </div>

    <div class="container-padding py-8">
      <!-- Empty state -->
      <div v-if="cartStore.items.length === 0" class="text-center py-20">
        <div class="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart class="w-10 h-10 text-gray-400" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Browse our fleet and add vehicles to your rental.</p>
        <router-link to="/cars" class="btn-primary">
          Browse Cars
          <ArrowRight class="w-5 h-5 inline ml-1" />
        </router-link>
      </div>

      <div v-else class="flex flex-col lg:flex-row gap-8">
        <!-- Cart items -->
        <div class="flex-1 space-y-4">
          <!-- Global dates -->
          <div class="card p-5 bg-primary-50 dark:bg-primary-900/10 border border-primary-200 dark:border-primary-800">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Set dates for all vehicles</h3>
            <div class="flex flex-col sm:flex-row gap-3">
              <div class="flex-1">
                <label class="block text-xs text-gray-600 dark:text-gray-400 mb-1">Pickup Date</label>
                <input v-model="globalPickup" type="date" class="input-field py-2" :min="today" @change="applyGlobalDates" />
              </div>
              <div class="flex-1">
                <label class="block text-xs text-gray-600 dark:text-gray-400 mb-1">Return Date</label>
                <input v-model="globalReturn" type="date" class="input-field py-2" :min="globalPickup || today" @change="applyGlobalDates" />
              </div>
            </div>
          </div>

          <!-- Cart items -->
          <div
            v-for="item in cartStore.items"
            :key="item.car.id"
            class="card p-5"
          >
            <div class="flex flex-col sm:flex-row gap-4">
              <!-- Image -->
              <img
                :src="item.car.image"
                :alt="item.car.name"
                class="w-full sm:w-40 h-28 object-cover rounded-lg shrink-0"
              />

              <!-- Info -->
              <div class="flex-1">
                <div class="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 class="font-bold text-lg text-gray-900 dark:text-white">{{ item.car.name }}</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.car.brand }} · {{ item.car.year }}</p>
                  </div>
                  <button
                    @click="cartStore.removeFromCart(item.car.id)"
                    class="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-gray-400 hover:text-red-600"
                  >
                    <Trash2 class="w-5 h-5" />
                  </button>
                </div>

                <!-- Dates -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  <div>
                    <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Pickup Date</label>
                    <input v-model="item.pickupDate" type="date" class="input-field py-1.5 text-sm" :min="today" />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Return Date</label>
                    <input v-model="item.returnDate" type="date" class="input-field py-1.5 text-sm" :min="item.pickupDate || today" />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Location</label>
                    <select v-model="item.pickupLocation" class="input-field py-1.5 text-sm">
                      <option value="">Select location</option>
                      <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
                    </select>
                  </div>
                </div>

                <!-- Price -->
                <div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatKesDirect(item.car.pricePerDay) }}/day × {{ getDays(item) }} day(s)
                  </span>
                  <span class="text-lg font-bold text-primary-600">{{ formatKesDirect(item.car.pricePerDay * getDays(item)) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="w-full lg:w-80 shrink-0">
          <div class="card p-6 sticky top-24">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Rental Summary</h3>

            <div class="space-y-3 mb-6">
              <div v-for="item in cartStore.items" :key="item.car.id" class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">{{ item.car.name }}</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ formatKesDirect(item.car.pricePerDay * getDays(item)) }}</span>
              </div>
            </div>

            <hr class="border-gray-200 dark:border-gray-700 mb-4" />

            <div class="space-y-2 mb-6">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Insurance</span>
                <span class="font-medium text-accent-600">Included</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Vehicles</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ cartStore.items.length }}</span>
              </div>
              <hr class="border-gray-200 dark:border-gray-700" />
              <div class="flex justify-between text-xl font-bold">
                <span class="text-gray-900 dark:text-white">Total</span>
                <span class="text-primary-600">{{ formatKesDirect(cartStore.totalPrice) }}</span>
              </div>
            </div>

            <router-link
              to="/booking/cart"
              class="btn-primary w-full text-center block text-lg"
            >
              Proceed to Checkout
              <ArrowRight class="w-5 h-5 inline ml-1" />
            </router-link>

            <button
              @click="cartStore.clearCart()"
              class="w-full mt-3 text-sm text-red-600 hover:text-red-700 font-medium py-2"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ShoppingCart, ArrowRight, Trash2 } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cartStore'
import { formatKesDirect } from '@/composables/useCurrency'
import { locations } from '@/data/cars'

const cartStore = useCartStore()
const today = computed(() => new Date().toISOString().split('T')[0])
const globalPickup = ref('')
const globalReturn = ref('')

const getDays = (item: { pickupDate: string; returnDate: string }) => {
  if (!item.pickupDate || !item.returnDate) return 1
  const diff = new Date(item.returnDate).getTime() - new Date(item.pickupDate).getTime()
  return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 1)
}

const applyGlobalDates = () => {
  if (globalPickup.value && globalReturn.value) {
    cartStore.updateAllDates(globalPickup.value, globalReturn.value)
  }
}

// Auto-save cart changes
watch(() => cartStore.items, () => {
  localStorage.setItem('cart', JSON.stringify(cartStore.items))
}, { deep: true })
</script>
