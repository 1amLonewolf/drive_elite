import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/cars',
    name: 'BrowseCars',
    component: () => import('@/views/BrowseCarsView.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/CartView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/booking/cart',
    name: 'Checkout',
    component: () => import('@/views/CartView.vue'),
  },
  {
    path: '/car/:id',
    name: 'CarDetails',
    component: () => import('@/views/CarDetailsView.vue'),
    props: true,
  },
  {
    path: '/booking/:carId',
    name: 'Booking',
    component: () => import('@/views/BookingView.vue'),
    props: true,
  },
  {
    path: '/booking/confirm/:bookingId',
    name: 'BookingConfirmation',
    component: () => import('@/views/BookingConfirmationView.vue'),
    props: true,
  },
  {
    path: '/my-bookings',
    name: 'MyBookings',
    component: () => import('@/views/MyBookingsView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// Navigation guard for auth routes
router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth) {
    const authStore = JSON.parse(localStorage.getItem('auth') || '{}')
    if (!authStore.isAuthenticated) {
      // Show auth modal instead of redirecting
      window.dispatchEvent(new CustomEvent('open-auth'))
      next(false)
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
