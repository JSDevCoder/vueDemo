import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import store from '../store'

Vue.use(VueRouter)

export const routeMap = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
      path: '/login',
      name: 'login',
      component: Login
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]

const router = new VueRouter({
  routes: routeMap
})

export default router;

router.beforeEach((to, from, next) => {
    let token = '123';

    if(token){
        if(to.path === '/login'){
            next({path: '/'})
            return
        } else {
            console.log(store.getters.roles)
            if(store.getters.roles.length === 0){
                store.dispatch('getInfos').then(res => {
                    console.log(res)
                    store.dispatch('getMenus').then(data => {
                        console.log(data)
                        initMenu(router, data)
                    })
                    next()
                }).catch(err => {
                    store.dispatch('fedLogOut').then(() => {
                        console.log(err)
                        next({ path: '/' })
                    })
                })
            } else {
                next()
            }
        }
    } else {
        next('/login');
    }
})

export function initMenu(router, menu) {
    if(menu.length === 0) return
    let menus = formatRoutes(menu)
    let unfound = { path: '*', redirect: '/404', hidden: true }
    menus.push(unfound)
    router.addRoutes(menus)
    console.log(menus)
    console.log(router)
    store.commit('addRoutes', menus)
}

export function formatRoutes(aMenu) {
    const aRouter = []
    aMenu.forEach(oMenu => {
        const { path, component, name, icon, childrens } = oMenu
        if(!component){
            const oRouter = {
                path,
                component() {
                    // let componentPath = ''
                    // if(component === 'Layout'){
                    //     //..
                    // } else {
                    //     componentPath = component
                    // }
                },
                name,
                icon,
                childrens: childrens ? formatRoutes(childrens) : []
            }
            aRouter.push(oRouter)
        }
    })
    return aRouter
}
