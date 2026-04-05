import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Car } from '@/types'

export interface CartItem {
  car: Car
  pickupDate: string
  returnDate: string
  pickupLocation: string
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  // Load from localStorage
  const stored = localStorage.getItem('cart')
  if (stored) {
    try {
      items.value = JSON.parse(stored)
    } catch {
      items.value = []
    }
  }

  const itemCount = computed(() => items.value.length)

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => {
      const days = calcDays(item.pickupDate, item.returnDate)
      return sum + (item.car.pricePerDay * days)
    }, 0)
  })

  const hasCar = (carId: number) => computed(() => {
    return items.value.some(item => item.car.id === carId)
  })

  function calcDays(pickup: string, returnDate: string): number {
    if (!pickup || !returnDate) return 1
    const diff = new Date(returnDate).getTime() - new Date(pickup).getTime()
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 1)
  }

  function addToCart(car: Car, pickupDate: string, returnDate: string, pickupLocation: string) {
    // Don't add duplicates
    if (items.value.some(item => item.car.id === car.id)) return
    items.value.push({ car, pickupDate, returnDate, pickupLocation })
    saveToStorage()
  }

  function removeFromCart(carId: number) {
    items.value = items.value.filter(item => item.car.id !== carId)
    saveToStorage()
  }

  function updateDates(carId: number, pickupDate: string, returnDate: string) {
    const item = items.value.find(i => i.car.id === carId)
    if (item) {
      item.pickupDate = pickupDate
      item.returnDate = returnDate
      saveToStorage()
    }
  }

  function updateLocation(carId: number, pickupLocation: string) {
    const item = items.value.find(i => i.car.id === carId)
    if (item) {
      item.pickupLocation = pickupLocation
      saveToStorage()
    }
  }

  function updateAllDates(pickupDate: string, returnDate: string) {
    items.value.forEach(item => {
      if (!item.pickupDate) item.pickupDate = pickupDate
      if (!item.returnDate) item.returnDate = returnDate
    })
    saveToStorage()
  }

  function clearCart() {
    items.value = []
    localStorage.removeItem('cart')
  }

  function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  return {
    items,
    itemCount,
    totalPrice,
    hasCar,
    addToCart,
    removeFromCart,
    updateDates,
    updateLocation,
    updateAllDates,
    clearCart,
  }
})
