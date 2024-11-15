export default [
  {
    path: '/',
    layout: false,
    component: './Home',
  },
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', name: '登录', component: './UserPage/Login' },
      { component: './404' },
    ],
  },
  {
    path: '/dashboard',
    name: '展示板',
    icon: 'smile',
    component: './Dashboard'
  },
  {
    path: '/portSerial',
    name: '端口连接',
    icon: 'smile',
    component: './PortSerial'
  },
  {
    path: '/uploadFireWare',
    name: '固件上载',
    icon: 'smile',
    component: './UploadFireWare'
  },
  {
    path: '/jointCalibration',
    name: '关节校准',
    icon: 'smile',
    component: './JointCalibration'
  },
  {
    path: '/programming',
    name: '编程',
    icon: 'smile',
    component: './Programming'
  },
  {
    path: '/skillCreation',
    name: '技能创作',
    icon: 'smile',
    component: './SkillCreation'
  },
  {
    path: '/debugger',
    name: '调试器',
    icon: 'smile',
    component: './Debugger'
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin/manage', name: '用户管理', icon: 'smile', component: './AdminPage/UserManager' },
      { path: '/admin/auth', name: '权限管理', icon: 'smile', component: './AdminPage/AuthManager' },
      { path: '/admin/manage/add', name: '添加用户', hideInMenu: true, component: './AdminPage/UserManager/AddUser' },
      { path: '/admin/manage/edit/:id', name: '修改用户', hideInMenu: true, component: './AdminPage/UserManager/EditUser' },
      { path: '/admin/manage/detail/:id', name: '用户详情', hideInMenu: true, component: './AdminPage/UserManager/DetailUser' },
      { component: './404' },
    ],
  },
  {
    path: '/account/center',
    name: '个人中心',
    hideInMenu: true,
    component: './UserPage/Center'
  },
  {
    component: './404'
  },
];
