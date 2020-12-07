import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _b7e7ea68 = () => interopDefault(import('../pages/actes/index.vue' /* webpackChunkName: "pages/actes/index" */))
const _0b78ed8a = () => interopDefault(import('../pages/archives/index.vue' /* webpackChunkName: "pages/archives/index" */))
const _d6a8c4e2 = () => interopDefault(import('../pages/biens/index.vue' /* webpackChunkName: "pages/biens/index" */))
const _196ce592 = () => interopDefault(import('../pages/comparent/index.vue' /* webpackChunkName: "pages/comparent/index" */))
const _3fe16bfb = () => interopDefault(import('../pages/comptabilite/index.vue' /* webpackChunkName: "pages/comptabilite/index" */))
const _71267f4b = () => interopDefault(import('../pages/devis/index.vue' /* webpackChunkName: "pages/devis/index" */))
const _4e4e08dc = () => interopDefault(import('../pages/dossiers/index.vue' /* webpackChunkName: "pages/dossiers/index" */))
const _ef10eb7e = () => interopDefault(import('../pages/factures/index.vue' /* webpackChunkName: "pages/factures/index" */))
const _5699b226 = () => interopDefault(import('../pages/home.vue' /* webpackChunkName: "pages/home" */))
const _fc2e983a = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _cafd0d9c = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _23256aa3 = () => interopDefault(import('../pages/modeles/index.vue' /* webpackChunkName: "pages/modeles/index" */))
const _2f39f059 = () => interopDefault(import('../pages/test.vue' /* webpackChunkName: "pages/test" */))
const _8053f128 = () => interopDefault(import('../pages/actes/ajouter.vue' /* webpackChunkName: "pages/actes/ajouter" */))
const _6627a61b = () => interopDefault(import('../pages/archives/ajouter.vue' /* webpackChunkName: "pages/archives/ajouter" */))
const _06dbf56f = () => interopDefault(import('../pages/biens/ajouter.vue' /* webpackChunkName: "pages/biens/ajouter" */))
const _35bc9b17 = () => interopDefault(import('../pages/comparent/ajouter.vue' /* webpackChunkName: "pages/comparent/ajouter" */))
const _88504e4a = () => interopDefault(import('../pages/comptabilite/ajouter.vue' /* webpackChunkName: "pages/comptabilite/ajouter" */))
const _9fb54faa = () => interopDefault(import('../pages/devis/ajouter.vue' /* webpackChunkName: "pages/devis/ajouter" */))
const _dce7caea = () => interopDefault(import('../pages/devis/devi.vue' /* webpackChunkName: "pages/devis/devi" */))
const _15ac429c = () => interopDefault(import('../pages/dossiers/ajouter.vue' /* webpackChunkName: "pages/dossiers/ajouter" */))
const _375f7da1 = () => interopDefault(import('../pages/factures/ajouter.vue' /* webpackChunkName: "pages/factures/ajouter" */))
const _43d264fa = () => interopDefault(import('../pages/modeles/ajouter.vue' /* webpackChunkName: "pages/modeles/ajouter" */))
const _41a1946a = () => interopDefault(import('../pages/biens/modifier/_bien.vue' /* webpackChunkName: "pages/biens/modifier/_bien" */))
const _131e12c9 = () => interopDefault(import('../pages/comparent/modifier/_comparent.vue' /* webpackChunkName: "pages/comparent/modifier/_comparent" */))
const _292dd7ff = () => interopDefault(import('../pages/comptabilite/modifier/_comptabilite.vue' /* webpackChunkName: "pages/comptabilite/modifier/_comptabilite" */))
const _057d58f8 = () => interopDefault(import('../pages/dossiers/modifier/_dossier.vue' /* webpackChunkName: "pages/dossiers/modifier/_dossier" */))
const _34494382 = () => interopDefault(import('../pages/modeles/modifier/_modele.vue' /* webpackChunkName: "pages/modeles/modifier/_modele" */))
const _769724ec = () => interopDefault(import('../pages/actes/_acte.vue' /* webpackChunkName: "pages/actes/_acte" */))
const _fb9ec7ac = () => interopDefault(import('../pages/archives/_archive.vue' /* webpackChunkName: "pages/archives/_archive" */))
const _b77e6c52 = () => interopDefault(import('../pages/comparent/_comparent.vue' /* webpackChunkName: "pages/comparent/_comparent" */))
const _67a0118e = () => interopDefault(import('../pages/comptabilite/_comptabilite.vue' /* webpackChunkName: "pages/comptabilite/_comptabilite" */))
const _53efe7fc = () => interopDefault(import('../pages/dossiers/_dossier.vue' /* webpackChunkName: "pages/dossiers/_dossier" */))
const _c619fae8 = () => interopDefault(import('../pages/modeles/_modele.vue' /* webpackChunkName: "pages/modeles/_modele" */))
const _5e4c53ca = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/actes",
    component: _b7e7ea68,
    name: "actes"
  }, {
    path: "/archives",
    component: _0b78ed8a,
    name: "archives"
  }, {
    path: "/biens",
    component: _d6a8c4e2,
    name: "biens"
  }, {
    path: "/comparent",
    component: _196ce592,
    name: "comparent"
  }, {
    path: "/comptabilite",
    component: _3fe16bfb,
    name: "comptabilite"
  }, {
    path: "/devis",
    component: _71267f4b,
    name: "devis"
  }, {
    path: "/dossiers",
    component: _4e4e08dc,
    name: "dossiers"
  }, {
    path: "/factures",
    component: _ef10eb7e,
    name: "factures"
  }, {
    path: "/home",
    component: _5699b226,
    name: "home"
  }, {
    path: "/inspire",
    component: _fc2e983a,
    name: "inspire"
  }, {
    path: "/login",
    component: _cafd0d9c,
    name: "login"
  }, {
    path: "/modeles",
    component: _23256aa3,
    name: "modeles"
  }, {
    path: "/test",
    component: _2f39f059,
    name: "test"
  }, {
    path: "/actes/ajouter",
    component: _8053f128,
    name: "actes-ajouter"
  }, {
    path: "/archives/ajouter",
    component: _6627a61b,
    name: "archives-ajouter"
  }, {
    path: "/biens/ajouter",
    component: _06dbf56f,
    name: "biens-ajouter"
  }, {
    path: "/comparent/ajouter",
    component: _35bc9b17,
    name: "comparent-ajouter"
  }, {
    path: "/comptabilite/ajouter",
    component: _88504e4a,
    name: "comptabilite-ajouter"
  }, {
    path: "/devis/ajouter",
    component: _9fb54faa,
    name: "devis-ajouter"
  }, {
    path: "/devis/devi",
    component: _dce7caea,
    name: "devis-devi"
  }, {
    path: "/dossiers/ajouter",
    component: _15ac429c,
    name: "dossiers-ajouter"
  }, {
    path: "/factures/ajouter",
    component: _375f7da1,
    name: "factures-ajouter"
  }, {
    path: "/modeles/ajouter",
    component: _43d264fa,
    name: "modeles-ajouter"
  }, {
    path: "/biens/modifier/:bien?",
    component: _41a1946a,
    name: "biens-modifier-bien"
  }, {
    path: "/comparent/modifier/:comparent?",
    component: _131e12c9,
    name: "comparent-modifier-comparent"
  }, {
    path: "/comptabilite/modifier/:comptabilite?",
    component: _292dd7ff,
    name: "comptabilite-modifier-comptabilite"
  }, {
    path: "/dossiers/modifier/:dossier?",
    component: _057d58f8,
    name: "dossiers-modifier-dossier"
  }, {
    path: "/modeles/modifier/:modele?",
    component: _34494382,
    name: "modeles-modifier-modele"
  }, {
    path: "/actes/:acte",
    component: _769724ec,
    name: "actes-acte"
  }, {
    path: "/archives/:archive",
    component: _fb9ec7ac,
    name: "archives-archive"
  }, {
    path: "/comparent/:comparent",
    component: _b77e6c52,
    name: "comparent-comparent"
  }, {
    path: "/comptabilite/:comptabilite",
    component: _67a0118e,
    name: "comptabilite-comptabilite"
  }, {
    path: "/dossiers/:dossier",
    component: _53efe7fc,
    name: "dossiers-dossier"
  }, {
    path: "/modeles/:modele",
    component: _c619fae8,
    name: "modeles-modele"
  }, {
    path: "/",
    component: _5e4c53ca,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
