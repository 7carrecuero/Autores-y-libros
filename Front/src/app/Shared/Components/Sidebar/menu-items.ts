import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '', actions: [],
    title: 'menu.administration.title', icon: 'mdi mdi-desktop-mac', class: 'has-arrow', label: '', labelClass: '', extralink: false,
    submenu: [
      {
        path: '/Profiles',
        title: 'menu.administration.profiles.title',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: [],
        actions: [],
      },
      {
        path: '/Services',
        title: 'menu.administration.services.title',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: [],
        actions: [],
      },
      {
        path: '',
        title: 'menu.administration.users.title', icon: '', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        actions: [],
        submenu: [
          {
            path: '/Users/UsersADM',
            actions: [],
            title: 'menu.administration.users.usersADM.title',
            icon: '',
            class: '',
            label: '',
            labelClass: '',
            extralink: false,
            submenu: [],
          }
        ]
      }
    ]
  },
];
