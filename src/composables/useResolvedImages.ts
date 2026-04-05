/**
 * Composable for resolving CarImages API images in components.
 * Handles async image loading with fallback to Unsplash.
 */

import { ref, onMounted } from 'vue'
import { getCarImageUrl, getCarImageSync, type CarImageOptions } from './useCarImages'

export function useResolvedImages(
  make: string,
  model: string,
  year: number,
  carType: string
) {
  const mainImage = ref(getCarImageSync(make, model, year, carType, 0))
  const gallery = ref<string[]>([
    getCarImageSync(make, model, year, carType, 0),
    getCarImageSync(make, model, year, carType, 1),
    getCarImageSync(make, model, year, carType, 2),
  ])
  const loading = ref(false)

  const resolveMain = async (options?: CarImageOptions) => {
    loading.value = true
    try {
      mainImage.value = await getCarImageUrl(make, model, year, carType, options)
    } finally {
      loading.value = false
    }
  }

  const resolveGallery = async () => {
    loading.value = true
    try {
      const angles: CarImageOptions['angle'][] = ['three-quarter', 'front', 'side']
      const promises = angles.map((angle, i) =>
        getCarImageUrl(make, model, year, carType, { angle }, i)
      )
      gallery.value = await Promise.all(promises)
      mainImage.value = gallery.value[0]
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    await resolveGallery()
  })

  return {
    mainImage,
    gallery,
    loading,
    resolveMain,
    resolveGallery,
  }
}
