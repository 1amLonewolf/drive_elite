<template>
  <div class="card p-6">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
      <ShieldCheck class="w-5 h-5 inline mr-2 text-primary-600" />
      VIN Decoder
    </h2>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
      Enter the Vehicle Identification Number to verify authenticity and get factory specs
    </p>

    <div class="flex gap-3">
      <input
        v-model="vinInput"
        type="text"
        placeholder="Enter 17-character VIN..."
        class="input-field flex-1 font-mono uppercase"
        maxlength="17"
        @keyup.enter="decodeVin"
      />
      <button
        @click="decodeVin"
        :disabled="loading || vinInput.length !== 17"
        class="btn-primary shrink-0"
      >
        <Search v-if="!loading" class="w-5 h-5" />
        <Loader2 v-else class="w-5 h-5 animate-spin" />
      </button>
    </div>

    <!-- Error -->
    <div v-if="error" class="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
      <p class="text-sm text-red-700 dark:text-red-400">{{ error }}</p>
    </div>

    <!-- Results -->
    <div v-if="vehicleData" class="mt-6 space-y-4">
      <div class="flex items-center gap-3 p-3 bg-accent-50 dark:bg-accent-900/10 rounded-lg">
        <CheckCircle class="w-5 h-5 text-accent-600 shrink-0" />
        <p class="text-sm font-medium text-accent-800 dark:text-accent-300">VIN verified successfully</p>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div v-if="vehicleData.make" class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p class="text-xs text-gray-500 dark:text-gray-400">Make</p>
          <p class="font-semibold text-gray-900 dark:text-white">{{ vehicleData.make }}</p>
        </div>
        <div v-if="vehicleData.model" class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p class="text-xs text-gray-500 dark:text-gray-400">Model</p>
          <p class="font-semibold text-gray-900 dark:text-white">{{ vehicleData.model }}</p>
        </div>
        <div v-if="vehicleData.modelYear" class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p class="text-xs text-gray-500 dark:text-gray-400">Year</p>
          <p class="font-semibold text-gray-900 dark:text-white">{{ vehicleData.modelYear }}</p>
        </div>
        <div v-if="vehicleData.bodyClass" class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p class="text-xs text-gray-500 dark:text-gray-400">Body Style</p>
          <p class="font-semibold text-gray-900 dark:text-white">{{ vehicleData.bodyClass }}</p>
        </div>
        <div v-if="vehicleData.engineCylinders" class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p class="text-xs text-gray-500 dark:text-gray-400">Engine</p>
          <p class="font-semibold text-gray-900 dark:text-white">{{ vehicleData.engineCylinders }} Cyl</p>
        </div>
        <div v-if="vehicleData.fuelType" class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p class="text-xs text-gray-500 dark:text-gray-400">Fuel Type</p>
          <p class="font-semibold text-gray-900 dark:text-white">{{ vehicleData.fuelType }}</p>
        </div>
        <div v-if="vehicleData.transmission" class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p class="text-xs text-gray-500 dark:text-gray-400">Transmission</p>
          <p class="font-semibold text-gray-900 dark:text-white">{{ vehicleData.transmission }}</p>
        </div>
        <div v-if="vehicleData.driveType" class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p class="text-xs text-gray-500 dark:text-gray-400">Drive Type</p>
          <p class="font-semibold text-gray-900 dark:text-white">{{ vehicleData.driveType }}</p>
        </div>
      </div>

      <div v-if="vehicleData.manufacturer" class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <p class="text-xs text-gray-500 dark:text-gray-400">Manufacturer</p>
        <p class="font-semibold text-gray-900 dark:text-white">{{ vehicleData.manufacturer }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ShieldCheck, Search, Loader2, CheckCircle } from 'lucide-vue-next'
import { useNHTSA } from '@/composables/useNHTSA'

const { loading, error, vehicleData, decodeVIN } = useNHTSA()
const vinInput = ref('')

const decodeVin = async () => {
  if (vinInput.value.length === 17) {
    await decodeVIN(vinInput.value.toUpperCase())
  }
}
</script>
