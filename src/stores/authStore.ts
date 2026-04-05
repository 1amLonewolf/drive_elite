import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const showAuthModal = ref(false)
  const authMode = ref<'login' | 'register'>('login')

  // Load from localStorage
  const stored = localStorage.getItem('auth')
  if (stored) {
    const parsed = JSON.parse(stored)
    user.value = parsed.user
    isAuthenticated.value = parsed.isAuthenticated
  }

  const userName = computed(() => {
    if (!user.value) return ''
    return `${user.value.firstName} ${user.value.lastName}`
  })

  const loginUser = (email: string, _password: string) => {
    // Mock login - in production this would call an API
    user.value = {
      id: '1',
      firstName: 'John',
      lastName: 'Kamau',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=crop&crop=face',
    }
    isAuthenticated.value = true
    saveToStorage()
    showAuthModal.value = false
  }

  const registerUser = (firstName: string, lastName: string, email: string, _password: string) => {
    // Mock registration
    user.value = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face',
    }
    isAuthenticated.value = true
    saveToStorage()
    showAuthModal.value = false
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('auth')
  }

  const saveToStorage = () => {
    localStorage.setItem(
      'auth',
      JSON.stringify({ user: user.value, isAuthenticated: isAuthenticated.value })
    )
  }

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    authMode.value = mode
    showAuthModal.value = true
  }

  const closeAuthModal = () => {
    showAuthModal.value = false
  }

  return {
    user,
    isAuthenticated,
    showAuthModal,
    authMode,
    userName,
    loginUser,
    registerUser,
    logout,
    openAuthModal,
    closeAuthModal,
  }
})
