import { createRouter, createWebHistory } from 'vue-router'
import { useApplicationStore } from '@/stores/application.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogoutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/citizens',
      name: 'citizens',
      component: () => import('../views/CitizensView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/citizen/new',
      name: 'citizen-new',
      component: () => import('../views/CreateCitizenView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/citizen/:id',
      name: 'citizen',
      component: () => import('../views/CitizenView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'citizen-details',
          component: () => import('../views/CitizenDetailsView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'family',
          name: 'citizen-family',
          component: () => import('../views/CitizenFamilyView.vue'),
          meta: { requiresAuth: true },
          children: [
            {
              path: '',
              name: 'citizen-family-details',
              component: () => import('../views/CitizenFamilyDetailsView.vue'),
              meta: { requiresAuth: true},
              children: [
                {
                  path: 'appointment',
                  name: 'member-appointment',
                  component: () => import('../views/AppointmentView.vue'),
                  meta: { requiresAuth: true} 
                }
              ]
            }
          ]
        },
        {
          path: 'doctor',
          name: 'family-doctor',
          component: () => import('../views/CitizenFamilyDoctorView.vue'),
          meta: {requiresAuth: true }
        },
        {
          path: 'doctor/find',
          name: 'find-doctor',
          component: () => import('../views/FindADoctorView.vue'),
          meta: { requiresAuth: true}
        },
      ]
    },
    {
      path: '/doctors',
      name: 'doctors',
      component: () => import('../views/DoctorsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/doctor/new',
      name: 'doctor-new',
      component: () => import('../views/CreateDoctorView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/doctor/:id',
      name: 'doctor',
      component: () => import('../views/DoctorView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'doctor-details',
          component: () => import('../views/DoctorDetailsView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'appointments',
          name: 'doctor-appointments',
          component: () => import('../views/DoctorAppointmentsView.vue'),
          meta: { requiresAuth: true}
        },
        {
          path: 'citizens',
          name: 'doctor-citizens',
          component: () => import('../views/DoctorCitizensView.vue'),
          meta: { requiresAuth: true },
          children: [
            {
              path: '',
              name: 'doctor-citizen-details',
              component: () => import('../views/CitizenDetailsView.vue'),
              meta: { requiresAuth: true }
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useApplicationStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !isAuthenticated) {
    console.log('user not authenticated. redirecting to /login')
    next('/login')
  } else {
    next()
  }
})

export default router
