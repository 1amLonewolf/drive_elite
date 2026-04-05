<template>
  <section class="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
    <div class="container-padding">
      <div class="text-center mb-12">
        <h2 class="section-title mb-4">What Our Customers Say</h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Real experiences from real drivers. See why thousands choose DriveElite.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
        >
          <!-- Stars -->
          <div class="flex gap-1 mb-4">
            <Star
              v-for="i in 5"
              :key="i"
              class="w-5 h-5"
              :class="i <= testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'"
            />
          </div>

          <!-- Content -->
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
            "{{ testimonial.content }}"
          </p>

          <!-- Author -->
          <div class="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
            <img
              :src="testimonial.avatar"
              :alt="testimonial.name"
              class="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p class="font-semibold text-gray-900 dark:text-white">{{ testimonial.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import { testimonials } from '@/data/cars'
</script>
