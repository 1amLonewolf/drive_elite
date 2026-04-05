<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="authStore.showAuthModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="authStore.closeAuthModal()"></div>

        <!-- Modal -->
        <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          <!-- Close button -->
          <button
            @click="authStore.closeAuthModal()"
            class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X class="w-5 h-5 text-gray-500" />
          </button>

          <div class="p-8">
            <!-- Header -->
            <div class="text-center mb-8">
              <div class="flex items-center justify-center gap-3 mb-4">
                <img src="/images/DRIVEELITE.png" alt="DriveElite" class="h-14 w-auto object-contain" />
                <span class="text-2xl font-bold text-gray-900 dark:text-white">
                  Drive<span class="text-primary-600">Elite</span>
                </span>
              </div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ authStore.authMode === 'login' ? 'Welcome Back' : 'Create Account' }}
              </h2>
              <p class="text-gray-600 dark:text-gray-400 mt-2">
                {{ authStore.authMode === 'login'
                  ? 'Sign in to access your bookings and saved vehicles'
                  : 'Join DriveElite for a premium rental experience'
                }}
              </p>
            </div>

            <!-- Toggle tabs -->
            <div class="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-6">
              <button
                @click="authStore.authMode = 'login'"
                class="flex-1 py-2.5 rounded-md text-sm font-medium transition-colors"
                :class="authStore.authMode === 'login'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300'"
              >
                Sign In
              </button>
              <button
                @click="authStore.authMode = 'register'"
                class="flex-1 py-2.5 rounded-md text-sm font-medium transition-colors"
                :class="authStore.authMode === 'register'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300'"
              >
                Register
              </button>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <!-- Name fields (register only) -->
              <div v-if="authStore.authMode === 'register'" class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First Name</label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    required
                    class="input-field"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last Name</label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    required
                    class="input-field"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="input-field"
                  placeholder="you@example.com"
                />
              </div>

              <!-- Password -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                <input
                  v-model="form.password"
                  type="password"
                  required
                  class="input-field"
                  placeholder="••••••••"
                  minlength="6"
                />
              </div>

              <!-- Remember me / Forgot password -->
              <div v-if="authStore.authMode === 'login'" class="flex items-center justify-between">
                <label class="flex items-center gap-2">
                  <input type="checkbox" class="w-4 h-4 text-primary-600 rounded" />
                  <span class="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
                <a href="#" class="text-sm text-primary-600 hover:text-primary-700 font-medium">Forgot password?</a>
              </div>

              <!-- Submit button -->
              <button type="submit" class="btn-primary w-full text-lg">
                {{ authStore.authMode === 'login' ? 'Sign In' : 'Create Account' }}
              </button>
            </form>

            <!-- Divider -->
            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </div>

            <!-- Social login -->
            <div class="grid grid-cols-2 gap-3">
              <button class="flex items-center justify-center gap-2 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Google</span>
              </button>
              <button class="flex items-center justify-center gap-2 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { X } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
})

const handleSubmit = () => {
  if (authStore.authMode === 'login') {
    authStore.loginUser(form.email, form.password)
  } else {
    authStore.registerUser(form.firstName, form.lastName, form.email, form.password)
  }
  // Reset form
  form.email = ''
  form.password = ''
  form.firstName = ''
  form.lastName = ''
}

// Listen for open-auth event
window.addEventListener('open-auth', () => {
  authStore.openAuthModal('login')
})
</script>
