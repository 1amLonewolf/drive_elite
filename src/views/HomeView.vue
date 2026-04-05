<template>
  <div>
    <HeroSection />
    <FeaturedCars />
    <WhyChooseUs />
    <Testimonials />

    <!-- CTA Section -->
    <section class="py-16 lg:py-24 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div class="container-padding text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready for Your Next Adventure?</h2>
        <p class="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
          Browse our full fleet of premium vehicles and find the perfect car for any occasion.
        </p>
        <router-link
          to="/cars"
          class="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl text-lg"
        >
          Explore All Cars
          <ArrowRight class="w-5 h-5" />
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import HeroSection from '@/components/home/HeroSection.vue'
import FeaturedCars from '@/components/home/FeaturedCars.vue'
import WhyChooseUs from '@/components/home/WhyChooseUs.vue'
import Testimonials from '@/components/home/Testimonials.vue'
</script>
