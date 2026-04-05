import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Car, Booking, User, SearchFilters } from '@/types'
import { allCars as fleetData } from '@/data/cars'

export const useCarStore = defineStore('car', () => {
  const allCars = ref<Car[]>(fleetData)
  const bookings = ref<Booking[]>([])
  const filters = ref<SearchFilters>({
    query: '',
    type: '',
    package: '',
    minPrice: 0,
    maxPrice: 100000,
    transmission: '',
    fuel: '',
    minSeats: 0,
    sortBy: 'name',
  })

  // Filtered and sorted cars
  const filteredCars = computed(() => {
    let result = [...allCars.value]

    // Search filter
    if (filters.value.query) {
      const q = filters.value.query.toLowerCase()
      result = result.filter(
        (car) =>
          car.name.toLowerCase().includes(q) ||
          car.brand.toLowerCase().includes(q) ||
          car.model.toLowerCase().includes(q) ||
          car.type.toLowerCase().includes(q)
      )
    }

    // Type filter
    if (filters.value.type) {
      result = result.filter((car) => car.type === filters.value.type)
    }

    // Package filter
    if (filters.value.package) {
      result = result.filter((car) => car.package === filters.value.package)
    }

    // Price range
    result = result.filter(
      (car) =>
        car.pricePerDay >= filters.value.minPrice &&
        car.pricePerDay <= filters.value.maxPrice
    )

    // Transmission
    if (filters.value.transmission) {
      result = result.filter((car) => car.specs.transmission === filters.value.transmission)
    }

    // Fuel type
    if (filters.value.fuel) {
      result = result.filter((car) => car.specs.fuel === filters.value.fuel)
    }

    // Minimum seats
    if (filters.value.minSeats > 0) {
      result = result.filter((car) => car.specs.seats >= filters.value.minSeats)
    }

    // Sorting
    switch (filters.value.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.pricePerDay - b.pricePerDay)
        break
      case 'price-desc':
        result.sort((a, b) => b.pricePerDay - a.pricePerDay)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'year':
        result.sort((a, b) => b.year - a.year)
        break
    }

    return result
  })

  // Get car by ID
  const getCarById = (id: number): Car | undefined => {
    return allCars.value.find((car) => car.id === id)
  }

  // Featured cars (highest rated)
  const featuredCars = computed(() => {
    return [...allCars.value].sort((a, b) => b.rating - a.rating).slice(0, 6)
  })

  // Add booking
  const addBooking = (booking: Booking) => {
    bookings.value.push(booking)
    // Save to localStorage
    localStorage.setItem('bookings', JSON.stringify(bookings.value))
  }

  // Load bookings from localStorage
  const loadBookings = () => {
    const stored = localStorage.getItem('bookings')
    if (stored) {
      bookings.value = JSON.parse(stored)
    }
  }

  // User bookings
  const userBookings = computed(() => {
    return bookings.value
  })

  // Initialize
  loadBookings()

  return {
    allCars,
    bookings,
    filters,
    filteredCars,
    featuredCars,
    userBookings,
    getCarById,
    addBooking,
  }
})
