/**
 * Package tier definitions for DriveElite
 */
import type { PackageInfo } from '@/types'

export const packages: PackageInfo[] = [
  {
    id: 'go',
    name: 'DriveElite Go',
    description: 'Affordable daily commuters',
    icon: '/images/economy.png',
    color: 'text-green-700 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-300 dark:border-green-700',
    minPrice: 4000,
    maxPrice: 7500,
    features: [
      'Budget-friendly',
      'Fuel efficient',
      'Perfect for Nairobi commute',
      'AC included',
    ],
  },
  {
    id: 'premium',
    name: 'DriveElite Premium',
    description: 'Family & everyday upgrade',
    icon: '/images/premium.png',
    color: 'text-blue-700 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-300 dark:border-blue-700',
    minPrice: 8000,
    maxPrice: 16000,
    features: [
      'More space & comfort',
      'Ideal for families',
      'Great for road trips',
      'Bluetooth & GPS',
    ],
  },
  {
    id: 'elite',
    name: 'DriveElite Elite',
    description: 'Business class luxury',
    icon: '/images/elite.png',
    color: 'text-purple-700 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-300 dark:border-purple-700',
    minPrice: 17000,
    maxPrice: 32000,
    features: [
      'Premium vehicles',
      'Business & events',
      'Full insurance included',
      'Priority support',
    ],
  },
  {
    id: 'exotic',
    name: 'DriveElite Exotic',
    description: 'Ultra-luxury showstoppers',
    icon: '/images/exotic.png',
    color: 'text-amber-700 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    borderColor: 'border-amber-300 dark:border-amber-700',
    minPrice: 45000,
    maxPrice: 55000,
    features: [
      'Supercar experience',
      'Head-turning design',
      'VIP treatment',
      'Concierge delivery',
    ],
  },
]

/**
 * Get package info by ID
 */
export function getPackageInfo(id: string): PackageInfo | undefined {
  return packages.find(p => p.id === id)
}

/**
 * Get CSS classes for a package badge
 */
export function getPackageClasses(id: string) {
  const pkg = getPackageInfo(id)
  if (!pkg) return { color: '', bg: '', border: '' }
  return {
    color: pkg.color,
    bg: pkg.bgColor,
    border: pkg.borderColor,
  }
}
