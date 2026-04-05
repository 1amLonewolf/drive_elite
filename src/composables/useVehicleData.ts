/**
 * Combined composable for vehicle images + specs
 * - Images: Unsplash (reliable, no API key)
 * - Specs: NHTSA vPIC (free government API)
 */

import { ref } from 'vue'
import { getCarImageSync } from './useCarImages'
import { decodeVIN, getVehicleSpecs, type NhtsaVehicleData } from './useNHTSA'
import type { CarSpecs } from '@/types'

export function useVehicleData() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Get the best available image URL for a vehicle
   */
  const getVehicleImage = (
    make: string,
    model: string,
    year: number,
    carType: string,
    index: number = 0
  ): string => {
    return getCarImageSync(make, model, year, carType, index)
  }

  /**
   * Get a full gallery of images for a vehicle (sync fallback)
   */
  const getVehicleGallery = (
    make: string,
    model: string,
    year: number,
    carType: string,
    count: number = 3
  ): string[] => {
    return Array.from({ length: count }, (_, i) =>
      getCarImageSync(make, model, year, carType, i)
    )
  }

  /**
   * Map NHTSA data to our CarSpecs format
   */
  const mapNhtsaToSpecs = (data: Partial<NhtsaVehicleData>): Partial<CarSpecs> => {
    const specs: Partial<CarSpecs> = {}

    if (data.engineCylinders) {
      const displacement = data.engineDisplacement
        ? (parseInt(data.engineDisplacement) / 1000).toFixed(1)
        : ''
      specs.engine = `${displacement}L ${data.engineCylinders}cyl`
    }
    if (data.transmission) {
      specs.transmission = data.transmission.toLowerCase().includes('auto') ? 'Automatic' : 'Manual'
    }
    if (data.fuelType) {
      const fuelMap: Record<string, 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid'> = {
        Gasoline: 'Petrol',
        Diesel: 'Diesel',
        Electric: 'Electric',
        Hybrid: 'Hybrid',
      }
      specs.fuel = fuelMap[data.fuelType] || 'Petrol'
    }
    if (data.doors) {
      specs.doors = parseInt(data.doors) || 4
    }
    if (data.seats) {
      specs.seats = parseInt(data.seats) || 5
    }

    return specs
  }

  /**
   * Fetch real specs for a vehicle from NHTSA
   */
  const fetchVehicleSpecs = async (year: number, make: string, model: string) => {
    loading.value = true
    error.value = null
    try {
      const nhtsaData = await getVehicleSpecs(year, make, model)
      if (nhtsaData) {
        return mapNhtsaToSpecs(nhtsaData)
      }
      return null
    } catch (e) {
      error.value = 'Failed to fetch vehicle specs'
      console.error(e)
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Decode a VIN and get full vehicle details
   */
  const decodeVehicleVin = async (vin: string) => {
    loading.value = true
    error.value = null
    try {
      const data = await decodeVIN(vin)
      if (data) {
        return {
          specs: mapNhtsaToSpecs(data),
          data,
        }
      }
      return null
    } catch (e) {
      error.value = 'Failed to decode VIN'
      console.error(e)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    getVehicleImage,
    getVehicleGallery,
    fetchVehicleSpecs,
    decodeVehicleVin,
    mapNhtsaToSpecs,
  }
}
