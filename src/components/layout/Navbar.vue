<template>
  <nav class="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
    <div class="container-padding">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3">
          <img src="/images/DRIVEELITE.png" alt="DriveElite" class="h-10 w-auto object-contain" />
          <span class="text-xl font-bold text-gray-900 dark:text-white">
            Drive<span class="text-primary-600">Elite</span>
          </span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <router-link
            to="/"
            class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 font-medium transition-colors"
            active-class="text-primary-600 dark:text-primary-400"
          >
            Home
          </router-link>
          <router-link
            to="/about"
            class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 font-medium transition-colors"
            active-class="text-primary-600 dark:text-primary-400"
          >
            About
          </router-link>
          <router-link
            to="/cars"
            class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 font-medium transition-colors"
            active-class="text-primary-600 dark:text-primary-400"
          >
            Browse Cars
          </router-link>
          <router-link
            to="/my-bookings"
            class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 font-medium transition-colors"
            active-class="text-primary-600 dark:text-primary-400"
          >
            My Bookings
          </router-link>
        </div>

        <!-- Right side -->
        <div class="flex items-center gap-4">
          <!-- Cart icon -->
          <router-link
            to="/cart"
            class="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ShoppingCart class="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span
              v-if="cartStore.itemCount > 0"
              class="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center"
            >
              {{ cartStore.itemCount }}
            </span>
          </router-link>
          <!-- Dark mode toggle -->
          <button
            @click="toggleDarkMode"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            <Sun v-if="isDark" class="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <Moon v-else class="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          <!-- Auth buttons -->
          <template v-if="authStore.isAuthenticated">
            <router-link
              to="/profile"
              class="hidden sm:flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              <img
                :src="authStore.user?.avatar"
                :alt="authStore.userName"
                class="w-8 h-8 rounded-full object-cover"
              />
              <span>{{ authStore.userName }}</span>
            </router-link>
            <button
              @click="authStore.logout()"
              class="hidden sm:block text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 font-medium transition-colors"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <button
              @click="authStore.openAuthModal('login')"
              class="hidden sm:block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              Sign In
            </button>
            <button
              @click="authStore.openAuthModal('register')"
              class="hidden sm:block btn-primary"
            >
              Get Started
            </button>
          </template>

          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu v-if="!mobileMenuOpen" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
            <X v-else class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-100 dark:border-gray-800">
          <div class="flex flex-col gap-4">
            <router-link
              to="/"
              class="text-gray-700 dark:text-gray-300 hover:text-primary-600 font-medium py-2"
              @click="mobileMenuOpen = false"
            >
              Home
            </router-link>
            <router-link
              to="/about"
              class="text-gray-700 dark:text-gray-300 hover:text-primary-600 font-medium py-2"
              @click="mobileMenuOpen = false"
            >
              About Us
            </router-link>
            <router-link
              to="/cars"
              class="text-gray-700 dark:text-gray-300 hover:text-primary-600 font-medium py-2"
              @click="mobileMenuOpen = false"
            >
              Browse Cars
            </router-link>
            <router-link
              to="/cart"
              class="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 font-medium py-2"
              @click="mobileMenuOpen = false"
            >
              <ShoppingCart class="w-5 h-5" />
              My Cart
              <span v-if="cartStore.itemCount > 0" class="w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {{ cartStore.itemCount }}
              </span>
            </router-link>
            <router-link
              to="/my-bookings"
              class="text-gray-700 dark:text-gray-300 hover:text-primary-600 font-medium py-2"
              @click="mobileMenuOpen = false"
            >
              My Bookings
            </router-link>
            <hr class="border-gray-200 dark:border-gray-700" />
            <template v-if="authStore.isAuthenticated">
              <router-link
                to="/profile"
                class="flex items-center gap-3 text-gray-700 dark:text-gray-300 py-2"
                @click="mobileMenuOpen = false"
              >
                <img
                  :src="authStore.user?.avatar"
                  :alt="authStore.userName"
                  class="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p class="font-medium">{{ authStore.userName }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ authStore.user?.email }}</p>
                </div>
              </router-link>
              <button
                @click="() => { authStore.logout(); mobileMenuOpen = false }"
                class="text-red-600 font-medium py-2 text-left"
              >
                Logout
              </button>
            </template>
            <template v-else>
              <button
                @click="() => { authStore.openAuthModal('login'); mobileMenuOpen = false }"
                class="text-gray-700 dark:text-gray-300 font-medium py-2 text-left"
              >
                Sign In
              </button>
              <button
                @click="() => { authStore.openAuthModal('register'); mobileMenuOpen = false }"
                class="btn-primary text-center"
              >
                Get Started
              </button>
            </template>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Sun, Moon, Menu, X, ShoppingCart } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'

const authStore = useAuthStore()
const cartStore = useCartStore()
const mobileMenuOpen = ref(false)
const isDark = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('darkMode', isDark.value.toString())
}

onMounted(() => {
  // Check for saved dark mode preference
  const saved = localStorage.getItem('darkMode')
  isDark.value = saved === 'true'
  document.documentElement.classList.toggle('dark', isDark.value)
})
</script>
