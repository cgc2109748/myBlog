import Login from '@/pages/Login'
import MainFrame from '@/pages/MainFrame'
import HomePage from '@/pages/HomePage'
import Album from '@/pages/Album'
import Notepad from '@/pages/Notepad'
import Travels from '@/pages/Travels'

const routes = [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: { noCheckSession: true }
    },
    {
      path: '/',
      // path: '/MainFrame',
      name: 'MainFrame',
      component: MainFrame,
      meta: { noCheckSession: true },
      children: [
        {
          path: '/',
          name: 'HomePage',
          component: HomePage,
          meta: { noCheckSession: true }
        },
        {
          path: '/Album',
          name: 'Album',
          component: Album,
          meta: { noCheckSession: true }
        },
        {
          path: '/Notepad',
          name: 'Notepad',
          component: Notepad,
          meta: { noCheckSession: true }
        },
        {
          path: '/Travels',
          name: 'Travels',
          component: Travels,
          meta: { noCheckSession: true }
        },
      ]
    }
  ]

export default routes
