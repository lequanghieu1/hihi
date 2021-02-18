import Vue from 'vue';
import Router from 'vue-router';
import AdminLayout from '../layouts/AdminLayout';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('../views/Login'),
    },
    {
      path: '/register',
      component: () => import('../views/Register')
    },
    {
      path: '/forgot',
      component: () => import('../views/ResetPass'),
    },
    {
      path: '/dashboard',
      component: AdminLayout,
      children: [
        {
          path: '',
          component: () => import('../views/Dashboard.vue'),
        },
      ],
    },
    {
      path: '/manager',
      component: AdminLayout,
      children: [
        {
          path: '',
          component: () => import('../views/Manager.vue'),
        },
      ],
    },
    {
      path: '/event-code',
      component: AdminLayout,
      children: [
        {
          path: '',
          component: () => import('../views/EventCode.vue'),
        },
      ],
    },
    {
      path: '/model-device',
      component: AdminLayout,
      children: [
        {
          path: '',
          component: () => import('../views/ModelDevice.vue'),
        },
      ],
    },
    {
      path: '/page-schema',
      component: AdminLayout,
      children: [
        {
          path: '',
          component: () => import('../views/PageSchema.vue'),
        },
      ],
    },
    {
      path: '/roles-access',
      component: AdminLayout,
      children: [
        {
          path: '',
          component: () => import('../views/RolesAccess.vue'),
        },
      ],
    },
  ],
});
