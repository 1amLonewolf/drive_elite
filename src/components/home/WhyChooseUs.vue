<template>
  <section class="py-16 lg:py-24 bg-white dark:bg-gray-950">
    <div class="container-padding">
      <div class="text-center mb-16">
        <h2 class="section-title mb-4">Why Choose DriveElite?</h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We're not just another car rental company. Here's what sets us apart.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="text-center p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group"
        >
          <div class="w-16 h-16 mx-auto mb-5 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300">
            <component :is="feature.icon" class="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">{{ feature.title }}</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl">
        <div class="text-center">
          <div class="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">{{ stats.cars }}+</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Premium Vehicles</div>
        </div>
        <div class="text-center">
          <div class="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">{{ stats.locations }}+</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Pickup Locations</div>
        </div>
        <div class="text-center">
          <div class="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">{{ stats.customers }}K+</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Happy Customers</div>
        </div>
        <div class="text-center">
          <div class="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">{{ stats.rating }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Shield, DollarSign, Clock, HeadphonesIcon } from 'lucide-vue-next'

const features = [
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'All rentals include comprehensive insurance coverage for your peace of mind.',
  },
  {
    icon: DollarSign,
    title: 'Best Prices',
    description: 'Competitive rates with no hidden fees. Price match guarantee on all bookings.',
  },
  {
    icon: Clock,
    title: '24/7 Service',
    description: 'Round-the-clock roadside assistance and customer support whenever you need it.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Easy Booking',
    description: 'Streamlined online booking process. Reserve your car in under 2 minutes.',
  },
]

const stats = {
  cars: 70,
  locations: 10,
  customers: 20,
  rating: 4.8,
}
</script>
