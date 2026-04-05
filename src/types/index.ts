// Car types and interfaces
export interface Car {
  id: number
  name: string
  brand: string
  model: string
  year: number
  type: CarType
  package: PackageType
  pricePerDay: number
  rating: number
  reviewCount: number
  image: string
  images: string[]
  specs: CarSpecs
  available: boolean
  description: string
}

export interface CarSpecs {
  seats: number
  transmission: Transmission
  fuel: FuelType
  engine: string
  mileage: string
  color: string
  doors: number
  airConditioning: boolean
  bluetooth: boolean
  gps: boolean
  camera: boolean
}

export type CarType = 'Sedan' | 'SUV' | 'Luxury' | 'Sports' | 'Hatchback' | 'Van' | 'Electric'
export type Transmission = 'Automatic' | 'Manual' | 'CVT'
export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid'
export type PackageType = 'go' | 'premium' | 'elite' | 'exotic'

export interface PackageInfo {
  id: PackageType
  name: string
  description: string
  icon: string
  color: string
  bgColor: string
  borderColor: string
  minPrice: number
  maxPrice: number
  features: string[]
}

// Booking interfaces
export interface Booking {
  id: string
  carId: number
  carName: string
  carImage: string
  pickupLocation: string
  pickupDate: string
  returnDate: string
  totalDays: number
  pricePerDay: number
  totalPrice: number
  customer: Customer
  status: BookingStatus
  createdAt: string
}

export interface Customer {
  firstName: string
  lastName: string
  email: string
  phone: string
  licenseNumber: string
}

export type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed'

// User interface
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
}

// Search/Filter interfaces
export interface SearchFilters {
  query: string
  type: CarType | ''
  package: PackageType | ''
  minPrice: number
  maxPrice: number
  transmission: Transmission | ''
  fuel: FuelType | ''
  minSeats: number
  sortBy: SortOption
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'name' | 'year'

// Auth interfaces
export interface AuthForm {
  email: string
  password: string
  firstName?: string
  lastName?: string
}
