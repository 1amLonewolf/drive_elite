/**
 * NHTSA vPIC API - Free US government vehicle data
 * https://vpic.nhtsa.dot.gov/api/
 * Completely free, no API key required
 *
 * Provides: VIN decoding, vehicle specs, safety ratings
 */

export interface NhtsaVehicleData {
  make: string
  model: string
  modelYear: string
  bodyClass: string
  engineCylinders: string
  engineDisplacement: string
  engineHP: string
  transmission: string
  driveType: string
  fuelType: string
  doors: string
  seats: string
  basePrice: string
  vehicleType: string
  plantCountry: string
  manufacturer: string
  series: string
}

const NHTSA_BASE = 'https://vpic.nhtsa.dot.gov/api/vehicles'

/**
 * Decode a VIN and return vehicle details
 */
export async function decodeVIN(vin: string): Promise<Partial<NhtsaVehicleData> | null> {
  try {
    const response = await fetch(`${NHTSA_BASE}/DecodeVIN/${vin}?format=json`)
    const data = await response.json()

    if (data.Results && data.Results.length > 0) {
      const results = data.Results as Array<{ Variable: string; Value: string }>
      const mapped: Record<string, string> = {}

      results.forEach((item) => {
        mapped[item.Variable] = item.Value
      })

      return {
        make: mapped['Make'] || '',
        model: mapped['Model'] || '',
        modelYear: mapped['ModelYear'] || '',
        bodyClass: mapped['BodyClass'] || '',
        engineCylinders: mapped['EngineCylinders'] || '',
        engineDisplacement: mapped['EngineDisplacement (CC)'] || '',
        engineHP: mapped['EngineHP'] || '',
        transmission: mapped['TransmissionStyle'] || '',
        driveType: mapped['DriveType'] || '',
        fuelType: mapped['FuelTypePrimary'] || '',
        doors: mapped['Doors'] || '',
        seats: mapped['Seats'] || '',
        vehicleType: mapped['VehicleType'] || '',
        manufacturer: mapped['Manufacturer'] || '',
        series: mapped['Series'] || '',
      }
    }

    return null
  } catch (error) {
    console.error('NHTSA VIN decode error:', error)
    return null
  }
}

/**
 * Get all makes for a given year
 */
export async function getMakesByYear(year: number): Promise<string[]> {
  try {
    const response = await fetch(
      `${NHTSA_BASE}/GetMakesForVehicleTypeOfYear/Cars/${year}?format=json`
    )
    const data = await response.json()
    return (data.Results || []).map((r: { Name: string }) => r.Name)
  } catch (error) {
    console.error('NHTSA get makes error:', error)
    return []
  }
}

/**
 * Get all models for a given make
 */
export async function getModelsByMake(make: string): Promise<string[]> {
  try {
    const response = await fetch(
      `${NHTSA_BASE}/GetModelsForMake/${encodeURIComponent(make)}?format=json`
    )
    const data = await response.json()
    return (data.Results || []).map((r: { Name: string }) => r.Name)
  } catch (error) {
    console.error('NHTSA get models error:', error)
    return []
  }
}

/**
 * Get vehicle specs by year, make, and model
 */
export async function getVehicleSpecs(
  year: number,
  make: string,
  model: string
): Promise<Partial<NhtsaVehicleData> | null> {
  try {
    const response = await fetch(
      `${NHTSA_BASE}/GetVehicleTypesForMakeModel/${encodeURIComponent(make)}/${encodeURIComponent(model)}?format=json`
    )
    const data = await response.json()

    // Also get detailed specs
    const response2 = await fetch(
      `${NHTSA_BASE}/GetModelsForMakeMakeYear/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${year}?format=json`
    )
    const data2 = await response2.json()

    if (data2.Results && data2.Results.length > 0) {
      const first = data2.Results[0]
      return {
        make: first.Make || make,
        model: first.Model || model,
        modelYear: first.ModelYear?.toString() || year.toString(),
        vehicleType: first.VehicleType || '',
      }
    }

    return null
  } catch (error) {
    console.error('NHTSA get specs error:', error)
    return null
  }
}

/**
 * Composable wrapper for NHTSA API
 */
import { ref } from 'vue'

export function useNHTSA() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const vehicleData = ref<Partial<NhtsaVehicleData> | null>(null)

  const decodeVINWithStatus = async (vin: string) => {
    loading.value = true
    error.value = null
    try {
      vehicleData.value = await decodeVIN(vin)
      if (!vehicleData.value) {
        error.value = 'Could not decode VIN. Please check and try again.'
      }
    } catch (e) {
      error.value = 'Error decoding VIN. Please try again later.'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  const getSpecsWithStatus = async (year: number, make: string, model: string) => {
    loading.value = true
    error.value = null
    try {
      vehicleData.value = await getVehicleSpecs(year, make, model)
    } catch (e) {
      error.value = 'Error fetching vehicle specs.'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    vehicleData,
    decodeVIN: decodeVINWithStatus,
    getSpecs: getSpecsWithStatus,
  }
}
