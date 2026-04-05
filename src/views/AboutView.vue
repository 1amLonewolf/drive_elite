<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Hero -->
    <section class="relative bg-gradient-to-br from-gray-900 via-primary-950 to-gray-900 text-white py-20 lg:py-28">
      <div class="container-padding text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          About <span class="text-primary-400">DriveElite</span>
        </h1>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto">
          Kenya's trusted premium car rental service since 2020. From Nairobi city commutes to Maasai Mara safaris — we've got your journey covered.
        </p>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-12 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div class="container-padding">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl font-bold text-primary-600 mb-1">70+</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Vehicles in Fleet</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary-600 mb-1">10</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Pickup Locations</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary-600 mb-1">20K+</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Happy Customers</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary-600 mb-1">4.8</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story -->
    <section class="py-16 lg:py-24 bg-gray-50 dark:bg-gray-950">
      <div class="container-padding max-w-4xl">
        <h2 class="section-title mb-6">Our Story</h2>
        <div class="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
          <p>
            DriveElite was born from a simple observation: renting a quality car in Kenya shouldn't be a hassle. Too often, travelers and locals alike faced limited options, hidden fees, and vehicles that didn't match their photos.
          </p>
          <p>
            Founded in 2020 in Nairobi, we set out to change that. Starting with just 5 vehicles, we've grown to a fleet of over 70 carefully maintained cars — from budget-friendly daily commuters like the Toyota Fielder to exotic showstoppers like the Lamborghini Huracán.
          </p>
          <p>
            Today, we serve customers across 10 pickup locations in Kenya, from JKIA Airport to Diani Beach. Whether you're a business professional needing a BMW for client meetings, a family heading to Mombasa for the holidays, or an adventurer tackling the Maasai Mara in a Land Cruiser — DriveElite delivers the right car at a fair price.
          </p>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div class="container-padding">
        <h2 class="section-title mb-12 text-center">Why Kenyans Choose Us</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Fully Insured</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">Every rental includes comprehensive insurance. Drive with peace of mind knowing you're covered.</p>
          </div>
          <div class="p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
              <BadgeDollarSign class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">No Hidden Fees</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">What you see is what you pay. Transparent pricing with no surprise charges at return.</p>
          </div>
          <div class="p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
              <Headphones class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">24/7 Support</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">Roadside assistance and customer support around the clock. We're always a call away.</p>
          </div>
          <div class="p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
              <MapPin class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">10 Pickup Points</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">From JKIA to Diani Beach, pick up and drop off at locations convenient for you.</p>
          </div>
          <div class="p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
              <Wrench class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Well-Maintained Fleet</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">Every vehicle undergoes rigorous servicing before each rental. Safety and reliability first.</p>
          </div>
          <div class="p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
              <Smartphone class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Easy Booking</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">Book online in minutes. Choose your car, set your dates, and you're ready to hit the road.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div class="container-padding text-center">
        <h2 class="text-3xl font-bold mb-4">Ready for Your Next Drive?</h2>
        <p class="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
          Browse our full fleet of 70+ vehicles and find the perfect car for any occasion.
        </p>
        <router-link
          to="/cars"
          class="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors shadow-lg text-lg"
        >
          Browse All Cars
          <ArrowRight class="w-5 h-5" />
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ShieldCheck, BadgeDollarSign, Headphones, MapPin, Wrench, Smartphone, ArrowRight } from 'lucide-vue-next'
</script>
