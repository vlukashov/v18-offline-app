import {Flow} from '@vaadin/flow-frontend/Flow';
import {Router} from '@vaadin/router';

import './global-styles';

const {serverSideRoutes} = new Flow({
  imports: () => import('../target/frontend/generated-flow-imports')
});

const routes = [
  {
    path: '',
    offline: true,
    component: 'main-view',
    action: async () => {
      await import ('./views/main/main-view');
    },
    children: [
      {
        path: '',
        component: 'dashboard-view',
        offline: true,
        action: async () => {
          await import ('./views/dashboard/dashboard-view');
        }
      },
      {
        path: 'dashboard',
        component: 'dashboard-view',
        offline: true,
        action: async () => {
          await import ('./views/dashboard/dashboard-view');
        }
      },
      {
        path: 'master-detail',
        component: 'master-detail-view',
        action: async () => {
          await import ('./views/masterdetail/master-detail-view');
        }
      },
      // for server-side, the next magic line sends all unmatched routes:
      ...serverSideRoutes // IMPORTANT: this must be the last entry in the array
    ]
  },
];

// const router = new Router(
//   document.querySelector('#outlet'), {
//     offline: 'my-offline-view'
//   }
// );
//
// router.setRoutes(routes);

// const offlineRoutes: Router.Route[] = [
//   {
//     path: '',
//     component: 'dashboard-view',
//     action: async () => { await import ('./views/dashboard/dashboard-view'); }
//   },
//   {
//     path: '(.*)',
//     component: 'offline-view'
//   }
// ];
//
// const onlineRoutes: Router.Route[] = [
//   {
//     path: '',
//     component: 'dashboard-view',
//     action: async () => { await import ('./views/dashboard/dashboard-view'); }
//   },
//   {
//     path: 'master-detail',
//     component: 'master-detail-view',
//     action: async () => { await import ('./views/masterdetail/master-detail-view'); }
//   },
//   {
//     path: 'online-only',
//     action: async (_, commands) => {
//       const component = window.navigator.onLine
//         ? 'online-only-view' : 'offline-placeholder';
//       return commands.component(component);
//     }
//   },
//
//   ...serverSideRoutes
// ];
//
// const routes: Router.Route[] = [
//   {
//     path: '/',
//     component: 'main-view',
//     children: () => window.navigator.onLine ? onlineRoutes : offlineRoutes
//   }
// ];

export const router = new Router(document.querySelector('#outlet'));
router.setRoutes(routes);

// router.setOfflineFallback();
