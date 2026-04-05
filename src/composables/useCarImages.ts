/**
 * CarImages API - Real AI-generated vehicle photos
 * https://carimagesapi.com/
 * 
 * Free tier: 5,000 requests/month, WebP only + watermark
 * Pro tier ($41/mo): No watermark, all formats
 * 
 * Uses HMAC-signed URLs via their REST endpoint
 */

// Reliable Unsplash fallbacks by vehicle type
const unsplashByType: Record<string, string[]> = {
  Sedan: [
    '1555215695-3004980ad54e',
    '1606619818732-a1e26a767553',
    '1618877144877-3558920d044b',
  ],
  SUV: [
    '1519245659640-e3e3061e7a38',
    '1533473359331-0135ef1b58bf',
    '1606009108912-71cc5a938f25',
  ],
  Luxury: [
    '1563720306849-0c3bdd0cb78b',
    '1553448661-356257174b86',
    '1549317433852-9750b0c3b98',
  ],
  Sports: [
    '1503376763036-066120622c74',
    '1544636656-352f49772756',
    '1617752792996-4c0d64a18644',
  ],
  Electric: [
    '1593966389551-946548f5511e',
    '1619332056524-bb1719243d41',
    '1558618664-f8fd19218800',
  ],
  Hatchback: [
    '1620891794497-48425b3c4c36',
    '1541899583-c5b17d50b756',
    '1609519479132-2827e9ca1160',
  ],
  Van: [
    '1559510083-4907388d03e5',
    '1616455848989-b5888bcc3b71',
    '1583195928016-09f7d27e5695',
  ],
}

const API_KEY = 'ci_37085a06cf9561a235e0d93ffe10381b96875031269376122ad4cfc1'
const BASE_URL = 'https://carimagesapi.com/api/v1'

// Cache signed URLs to avoid wasting quota
const urlCache = new Map<string, string>()

export interface CarImageOptions {
  format?: 'webp' | 'png' | 'jpg'
  angle?: 'front' | 'back' | 'side' | 'three-quarter'
  width?: number
}

/**
 * Fetch a signed URL from CarImages API
 */
async function fetchSignedUrl(
  make: string,
  model: string,
  year: number,
  options: CarImageOptions = {}
): Promise<string | null> {
  const { format = 'webp', angle = 'three-quarter', width = 800 } = options

  // Build cache key
  const cacheKey = `${make}-${model}-${year}-${angle}-${format}-${width}`

  // Check cache first
  if (urlCache.has(cacheKey)) {
    return urlCache.get(cacheKey)!
  }

  try {
    const params = new URLSearchParams({
      api_key: API_KEY,
      make,
      model,
      year: year.toString(),
      angle,
      format,
      width: width.toString(),
    })

    const response = await fetch(`${BASE_URL}/signed-url?${params.toString()}`)

    if (!response.ok) {
      console.warn(`CarImages API error: ${response.status} for ${make} ${model} ${year}`)
      return null
    }

    const data = await response.json()

    if (data.url) {
      urlCache.set(cacheKey, data.url)
      return data.url
    }

    return null
  } catch (error) {
    console.error('CarImages API fetch error:', error)
    return null
  }
}

/**
 * Fetch multiple signed URLs in a batch request
 * More efficient than individual calls
 */
async function fetchBatchUrls(
  vehicles: Array<{ make: string; model: string; year: number; angle?: string }>
): Promise<Record<string, string>> {
  const results: Record<string, string> = {}
  const uncached: typeof vehicles = []

  // Check cache first
  vehicles.forEach((v) => {
    const key = `${v.make}-${v.model}-${v.year}-${v.angle || 'three-quarter'}-webp-800`
    if (urlCache.has(key)) {
      results[key] = urlCache.get(key)!
    } else {
      uncached.push(v)
    }
  })

  if (uncached.length > 0) {
    try {
      const response = await fetch(`${BASE_URL}/signed-urls?api_key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          uncached.map((v) => ({
            make: v.make,
            model: v.model,
            year: v.year,
            angle: v.angle || 'three-quarter',
            format: 'webp',
            width: 800,
          }))
        ),
      })

      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data.urls)) {
          data.urls.forEach((item: any, i: number) => {
            const v = uncached[i]
            const key = `${v.make}-${v.model}-${v.year}-${v.angle || 'three-quarter'}-webp-800`
            if (item.url) {
              results[key] = item.url
              urlCache.set(key, item.url)
            }
          })
        }
      }
    } catch (error) {
      console.error('CarImages batch fetch error:', error)
    }
  }

  return results
}

/**
 * Get a fallback Unsplash URL
 */
function getFallbackUrl(carType: string, index: number = 0): string {
  const photos = unsplashByType[carType] || ['1492144534655-ae79c964c9d7']
  const photoId = photos[index % photos.length]
  return `https://images.unsplash.com/photo-${photoId}?w=800&h=500&fit=crop`
}

/**
 * Get the best available image URL for a vehicle.
 * Tries CarImages API first, falls back to Unsplash.
 */
export async function getCarImageUrl(
  make: string,
  model: string,
  year: number,
  carType: string,
  options: CarImageOptions = {},
  fallbackIndex: number = 0
): Promise<string> {
  const signedUrl = await fetchSignedUrl(make, model, year, options)
  return signedUrl || getFallbackUrl(carType, fallbackIndex)
}

/**
 * Synchronous version that returns Unsplash immediately.
 * Use when you can't use async (like in static data files).
 */
export function getCarImageSync(
  make: string,
  model: string,
  year: number,
  carType: string,
  index: number = 0
): string {
  return getFallbackUrl(carType, index)
}

/**
 * Generate an array of image URLs for a car's gallery.
 * Tries CarImages API for the main image, falls back to Unsplash for all.
 */
export async function getCarImageGallery(
  make: string,
  model: string,
  year: number,
  carType: string
): Promise<string[]> {
  const angles: CarImageOptions['angle'][] = ['three-quarter', 'front', 'side']

  // Try batch fetch
  const batchResults = await fetchBatchUrls(
    angles.map((angle) => ({ make, model, year, angle }))
  )

  const urls: string[] = []
  for (let i = 0; i < angles.length; i++) {
    const angle = angles[i]
    const key = `${make}-${model}-${year}-${angle}-webp-800`
    urls.push(batchResults[key] || getFallbackUrl(carType, i))
  }

  return urls
}

/**
 * Preload images for a list of vehicles (call on app init)
 */
export async function preloadVehicleImages(
  vehicles: Array<{ make: string; model: string; year: number; type: string }>
): Promise<void> {
  const uniqueVehicles = vehicles.filter(
    (v, i, arr) => arr.findIndex((x) => x.make === v.make && x.model === v.model) === i
  )

  // Only preload main image (three-quarter angle) to save quota
  await fetchBatchUrls(
    uniqueVehicles.map((v) => ({ make: v.make, model: v.model, year: v.year, angle: 'three-quarter' }))
  )
}

/**
 * Clear the URL cache (e.g., when URLs expire)
 */
export function clearImageCache(): void {
  urlCache.clear()
}

/**
 * Get cache stats
 */
export function getCacheStats(): { size: number } {
  return { size: urlCache.size }
}
