import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _b7a4dd08 = () => interopDefault(import('../pages/actes/index.vue' /* webpackChunkName: "pages/actes/index" */))
const _37bc448b = () => interopDefault(import('../pages/archives/index.vue' /* webpackChunkName: "pages/archives/index" */))
const _d665b782 = () => interopDefault(import('../pages/biens/index.vue' /* webpackChunkName: "pages/biens/index" */))
const _64e83be7 = () => interopDefault(import('../pages/comparent/index.vue' /* webpackChunkName: "pages/comparent/index" */))
const _50ebff4b = () => interopDefault(import('../pages/comptabilite/index.vue' /* webpackChunkName: "pages/comptabilite/index" */))
const _714805fb = () => interopDefault(import('../pages/devis/index.vue' /* webpackChunkName: "pages/devis/index" */))
const _1651b6e2 = () => interopDefault(import('../pages/dossiers/index.vue' /* webpackChunkName: "pages/dossiers/index" */))
const _741f74de = () => interopDefault(import('../pages/factures/index.vue' /* webpackChunkName: "pages/factures/index" */))
const _6f555176 = () => interopDefault(import('../pages/home.vue' /* webpackChunkName: "pages/home" */))
const _988ddada = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _cd8c783c = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _bdfff55a = () => interopDefault(import('../pages/modeles/index.vue' /* webpackChunkName: "pages/modeles/index" */))
const _47f58fa9 = () => interopDefault(import('../pages/test.vue' /* webpackChunkName: "pages/test" */))
const _3db0a21c = () => interopDefault(import('../pages/actes/ajouter.vue' /* webpackChunkName: "pages/actes/ajouter" */))
const _285ecd6b = () => interopDefault(import('../pages/archives/ajouter.vue' /* webpackChunkName: "pages/archives/ajouter" */))
const _f692dfc2 = () => interopDefault(import('../pages/biens/ajouter.vue' /* webpackChunkName: "pages/biens/ajouter" */))
const _8b2b4472 = () => interopDefault(import('../pages/comparent/ajouter.vue' /* webpackChunkName: "pages/comparent/ajouter" */))
const _96ea4faa = () => interopDefault(import('../pages/comptabilite/ajouter.vue' /* webpackChunkName: "pages/comptabilite/ajouter" */))
const _2dfff2db = () => interopDefault(import('../pages/devis/ajouter.vue' /* webpackChunkName: "pages/devis/ajouter" */))
const _78c6fddb = () => interopDefault(import('../pages/devis/devi.vue' /* webpackChunkName: "pages/devis/devi" */))
const _913df3fc = () => interopDefault(import('../pages/dossiers/ajouter.vue' /* webpackChunkName: "pages/dossiers/ajouter" */))
const _0cd2b61e = () => interopDefault(import('../pages/factures/ajouter.vue' /* webpackChunkName: "pages/factures/ajouter" */))
const _4fb57c33 = () => interopDefault(import('../pages/modeles/ajouter.vue' /* webpackChunkName: "pages/modeles/ajouter" */))
const _65720880 = () => interopDefault(import('../pages/actes/modifier/_acte.vue' /* webpackChunkName: "pages/actes/modifier/_acte" */))
const _3a5493ba = () => interopDefault(import('../pages/biens/modifier/_bien.vue' /* webpackChunkName: "pages/biens/modifier/_bien" */))
const _414d4d79 = () => interopDefault(import('../pages/comparent/modifier/_comparent.vue' /* webpackChunkName: "pages/comparent/modifier/_comparent" */))
const _3fd24eaf = () => interopDefault(import('../pages/comptabilite/modifier/_comptabilite.vue' /* webpackChunkName: "pages/comptabilite/modifier/_comptabilite" */))
const _056b96d4 = () => interopDefault(import('../pages/dossiers/modifier/_dossier.vue' /* webpackChunkName: "pages/dossiers/modifier/_dossier" */))
const _dc67ca5c = () => interopDefault(import('../pages/modeles/modifier/_modele.vue' /* webpackChunkName: "pages/modeles/modifier/_modele" */))
const _76b8ab9c = () => interopDefault(import('../pages/actes/_acte.vue' /* webpackChunkName: "pages/actes/_acte" */))
const _06de5eda = () => interopDefault(import('../pages/archives/_archive.vue' /* webpackChunkName: "pages/archives/_archive" */))
const _c6186db2 = () => interopDefault(import('../pages/comparent/_comparent.vue' /* webpackChunkName: "pages/comparent/_comparent" */))
const _574b8aee = () => interopDefault(import('../pages/comptabilite/_comptabilite.vue' /* webpackChunkName: "pages/comptabilite/_comptabilite" */))
const _4ec4aaa8 = () => interopDefault(import('../pages/dossiers/_dossier.vue' /* webpackChunkName: "pages/dossiers/_dossier" */))
const _0e91b13c = () => interopDefault(import('../pages/modeles/_modele.vue' /* webpackChunkName: "pages/modeles/_modele" */))
const _60dbbe6a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/actes",
    component: _b7a4dd08,
    name: "actes"
  }, {
    path: "/archives",
    component: _37bc448b,
    name: "archives"
  }, {
    path: "/biens",
    component: _d665b782,
    name: "biens"
  }, {
    path: "/comparent",
    component: _64e83be7,
    name: "comparent"
  }, {
    path: "/comptabilite",
    component: _50ebff4b,
    name: "comptabilite"
  }, {
    path: "/devis",
    component: _714805fb,
    name: "devis"
  }, {
    path: "/dossiers",
    component: _1651b6e2,
    name: "dossiers"
  }, {
    path: "/factures",
    component: _741f74de,
    name: "factures"
  }, {
    path: "/home",
    component: _6f555176,
    name: "home"
  }, {
    path: "/inspire",
    component: _988ddada,
    name: "inspire"
  }, {
    path: "/login",
    component: _cd8c783c,
    name: "login"
  }, {
    path: "/modeles",
    component: _bdfff55a,
    name: "modeles"
  }, {
    path: "/test",
    component: _47f58fa9,
    name: "test"
  }, {
    path: "/actes/ajouter",
    component: _3db0a21c,
    name: "actes-ajouter"
  }, {
    path: "/archives/ajouter",
    component: _285ecd6b,
    name: "archives-ajouter"
  }, {
    path: "/biens/ajouter",
    component: _f692dfc2,
    name: "biens-ajouter"
  }, {
    path: "/comparent/ajouter",
    component: _8b2b4472,
    name: "comparent-ajouter"
  }, {
    path: "/comptabilite/ajouter",
    component: _96ea4faa,
    name: "comptabilite-ajouter"
  }, {
    path: "/devis/ajouter",
    component: _2dfff2db,
    name: "devis-ajouter"
  }, {
    path: "/devis/devi",
    component: _78c6fddb,
    name: "devis-devi"
  }, {
    path: "/dossiers/ajouter",
    component: _913df3fc,
    name: "dossiers-ajouter"
  }, {
    path: "/factures/ajouter",
    component: _0cd2b61e,
    name: "factures-ajouter"
  }, {
    path: "/modeles/ajouter",
    component: _4fb57c33,
    name: "modeles-ajouter"
  }, {
    path: "/actes/modifier/:acte?",
    component: _65720880,
    name: "actes-modifier-acte"
  }, {
    path: "/biens/modifier/:bien?",
    component: _3a5493ba,
    name: "biens-modifier-bien"
  }, {
    path: "/comparent/modifier/:comparent?",
    component: _414d4d79,
    name: "comparent-modifier-comparent"
  }, {
    path: "/comptabilite/modifier/:comptabilite?",
    component: _3fd24eaf,
    name: "comptabilite-modifier-comptabilite"
  }, {
    path: "/dossiers/modifier/:dossier?",
    component: _056b96d4,
    name: "dossiers-modifier-dossier"
  }, {
    path: "/modeles/modifier/:modele?",
    component: _dc67ca5c,
    name: "modeles-modifier-modele"
  }, {
    path: "/actes/:acte",
    component: _76b8ab9c,
    name: "actes-acte"
  }, {
    path: "/archives/:archive",
    component: _06de5eda,
    name: "archives-archive"
  }, {
    path: "/comparent/:comparent",
    component: _c6186db2,
    name: "comparent-comparent"
  }, {
    path: "/comptabilite/:comptabilite",
    component: _574b8aee,
    name: "comptabilite-comptabilite"
  }, {
    path: "/dossiers/:dossier",
    component: _4ec4aaa8,
    name: "dossiers-dossier"
  }, {
    path: "/modeles/:modele",
    component: _0e91b13c,
    name: "modeles-modele"
  }, {
    path: "/",
    component: _60dbbe6a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  const router = new Router(routerOptions)
  const resolve = router.resolve.bind(router)

  // encodeURI(decodeURI()) ~> support both encoded and non-encoded urls
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = encodeURI(decodeURI(to))
    }
    return resolve(to, current, append)
  }

  return router
}
