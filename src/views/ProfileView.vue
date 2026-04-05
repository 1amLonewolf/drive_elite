<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="container-padding py-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h1>
        <p class="text-gray-600 dark:text-gray-400">Manage your account settings</p>
      </div>
    </div>

    <div class="container-padding py-8">
      <div class="max-w-2xl mx-auto space-y-6">
        <!-- Profile Card -->
        <div class="card p-6">
          <div class="flex items-center gap-6 mb-6">
            <img
              :src="authStore.user?.avatar"
              :alt="authStore.userName"
              class="w-20 h-20 rounded-full object-cover border-4 border-primary-100 dark:border-primary-900"
            />
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ authStore.userName }}</h2>
              <p class="text-gray-600 dark:text-gray-400">{{ authStore.user?.email }}</p>
              <p class="text-sm text-accent-600 font-medium">Verified Member</p>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div class="text-center">
              <p class="text-2xl font-bold text-primary-600">{{ bookings.length }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-primary-600">{{ completedBookings }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">Completed</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-primary-600">{{ upcomingBookings }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">Upcoming</p>
            </div>
          </div>
        </div>

        <!-- Edit Profile -->
        <div class="card p-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h3>

          <form @submit.prevent="saveProfile" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First Name</label>
                <input v-model="profile.firstName" type="text" class="input-field" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last Name</label>
                <input v-model="profile.lastName" type="text" class="input-field" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
              <input v-model="profile.email" type="email" class="input-field" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
              <input v-model="profile.phone" type="tel" class="input-field" placeholder="+1 (555) 123-4567" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Driver's License</label>
              <input v-model="profile.licenseNumber" type="text" class="input-field" placeholder="AB1234567" />
            </div>

            <button type="submit" class="btn-primary w-full sm:w-auto">
              Save Changes
            </button>
          </form>
        </div>

        <!-- Preferences -->
        <div class="card p-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Preferences</h3>

          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Toggle dark theme</p>
              </div>
              <button
                @click="toggleDarkMode"
                class="relative w-12 h-6 rounded-full transition-colors"
                :class="isDark ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'"
              >
                <span
                  class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform"
                  :class="isDark ? 'translate-x-6' : 'translate-x-0'"
                ></span>
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Receive booking confirmations via email</p>
              </div>
              <button
                class="relative w-12 h-6 bg-primary-600 rounded-full"
              >
                <span class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full translate-x-6"></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Logout -->
        <button
          @click="authStore.logout()"
          class="w-full py-3 border-2 border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
        >
          Sign Out
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useCarStore } from '@/stores/carStore'

const authStore = useAuthStore()
const carStore = useCarStore()

const bookings = computed(() => carStore.userBookings)
const completedBookings = computed(() => bookings.value.filter(b => b.status === 'completed').length)
const upcomingBookings = computed(() => bookings.value.filter(b => ['confirmed', 'pending'].includes(b.status)).length)

const profile = ref({
  firstName: authStore.user?.firstName || '',
  lastName: authStore.user?.lastName || '',
  email: authStore.user?.email || '',
  phone: '',
  licenseNumber: '',
})

const isDark = ref(false)

const saveProfile = () => {
  // Mock save
  alert('Profile saved successfully!')
}

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('darkMode', isDark.value.toString())
}

onMounted(() => {
  const saved = localStorage.getItem('darkMode')
  isDark.value = saved === 'true'
})
</script>
