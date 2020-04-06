// import Home from '../Home/Home'
// import MembersPage from '../../containers/MembersPage'
// import AdminForm from '../../components/AdminForm'
// import MusicForm from '../../components/MusicForm'
// import AddMusicPage from '../../containers/AddMusicPage'
import AdminDashboard from '../AdminDashboardScreen/index'
import AdminUserList from '../AdminUserListScreen/index'
import AdminCreateUser from '../AdminCreateUserScreen/index'
import AdminUserDetail from '../AdminUserDetailScreen/index'

export const routes = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    menu: 'Dashboard',
    icon: 'dashboard',
    component: AdminDashboard,
  },
  {
    path: 'users',
    title: 'Users',
    menu: 'Users',
    icon: 'usergroup-add',
    children: [
      { path: '',
        menu: 'User List',
        icon: 'bars',
        component: AdminUserList,
      },
      { path: 'create',
        menu: 'Create User',
        title: 'Create',
        icon: 'plus',
        component: AdminCreateUser,
      },
      { path: ':id',
        title: 'Member\'s info',
        // menu: 'User\'s info',
        // icon: 'woman',
        component: AdminUserDetail,
      },
    ],
  },
  {
    path: 'menu3',
    title: 'menu3',
    menu: 'menu3',
    icon: 'dashboard',
    component: AdminDashboard,
  },
]
