import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ name: 'home', path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/website/callback',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ name: 'website-callback', path: '', component: () => import('pages/website/Callback.vue') }],
  },

  {
    path: '/playnite/auth',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ name: 'playnite-auth', path: '', component: () => import('pages/playnite/Auth.vue') }],
  },

  {
    path: '/playnite/callback',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ name: 'playnite-callback', path: '', component: () => import('pages/playnite/Callback.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
