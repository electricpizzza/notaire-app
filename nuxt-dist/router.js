import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0f4f05d0 = () => interopDefault(import('../pages/actes/index.vue' /* webpackChunkName: "pages/actes/index" */))
const _21dc7fb7 = () => interopDefault(import('../pages/archives/index.vue' /* webpackChunkName: "pages/archives/index" */))
const _d210782a = () => interopDefault(import('../pages/aveu/index.vue' /* webpackChunkName: "pages/aveu/index" */))
const _3b1de4d0 = () => interopDefault(import('../pages/banque/index.vue' /* webpackChunkName: "pages/banque/index" */))
const _0022ceda = () => interopDefault(import('../pages/biens/index.vue' /* webpackChunkName: "pages/biens/index" */))
const _8261338a = () => interopDefault(import('../pages/comparent/index.vue' /* webpackChunkName: "pages/comparent/index" */))
const _6ce2c477 = () => interopDefault(import('../pages/comptabilite/index.vue' /* webpackChunkName: "pages/comptabilite/index" */))
const _472d0b62 = () => interopDefault(import('../pages/devis/index.vue' /* webpackChunkName: "pages/devis/index" */))
const _0071f20e = () => interopDefault(import('../pages/dossiers/index.vue' /* webpackChunkName: "pages/dossiers/index" */))
const _9fdefe86 = () => interopDefault(import('../pages/factures/index.vue' /* webpackChunkName: "pages/factures/index" */))
const _e07d58bc = () => interopDefault(import('../pages/home.vue' /* webpackChunkName: "pages/home" */))
const _a66c5e32 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _f363f194 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _6cd496b2 = () => interopDefault(import('../pages/modeles/index.vue' /* webpackChunkName: "pages/modeles/index" */))
const _686191d5 = () => interopDefault(import('../pages/test.vue' /* webpackChunkName: "pages/test" */))
const _66465170 = () => interopDefault(import('../pages/actes/ajouter.vue' /* webpackChunkName: "pages/actes/ajouter" */))
const _0b5ced97 = () => interopDefault(import('../pages/archives/ajouter.vue' /* webpackChunkName: "pages/archives/ajouter" */))
const _b290166a = () => interopDefault(import('../pages/aveu/ajouter.vue' /* webpackChunkName: "pages/aveu/ajouter" */))
const _0df4f190 = () => interopDefault(import('../pages/banque/ajouter.vue' /* webpackChunkName: "pages/banque/ajouter" */))
const _a567811a = () => interopDefault(import('../pages/biens/ajouter.vue' /* webpackChunkName: "pages/biens/ajouter" */))
const _3730431b = () => interopDefault(import('../pages/comparent/ajouter.vue' /* webpackChunkName: "pages/comparent/ajouter" */))
const _a435fb52 = () => interopDefault(import('../pages/comptabilite/ajouter.vue' /* webpackChunkName: "pages/comptabilite/ajouter" */))
const _6334ed1c = () => interopDefault(import('../pages/devis/ajouter/index.vue' /* webpackChunkName: "pages/devis/ajouter/index" */))
const _7c3baf07 = () => interopDefault(import('../pages/devis/devi.vue' /* webpackChunkName: "pages/devis/devi" */))
const _cb41b3a4 = () => interopDefault(import('../pages/dossiers/ajouter.vue' /* webpackChunkName: "pages/dossiers/ajouter" */))
const _5b0e41e0 = () => interopDefault(import('../pages/factures/ajouter/index.vue' /* webpackChunkName: "pages/factures/ajouter/index" */))
const _acc6b2f2 = () => interopDefault(import('../pages/modeles/ajouter.vue' /* webpackChunkName: "pages/modeles/ajouter" */))
const _92631ae4 = () => interopDefault(import('../pages/devis/ajouter/terminer.vue' /* webpackChunkName: "pages/devis/ajouter/terminer" */))
const _5cfcbb60 = () => interopDefault(import('../pages/factures/ajouter/terminer.vue' /* webpackChunkName: "pages/factures/ajouter/terminer" */))
const _5ecc32ac = () => interopDefault(import('../pages/actes/modifier/_acte.vue' /* webpackChunkName: "pages/actes/modifier/_acte" */))
const _0e374f83 = () => interopDefault(import('../pages/aveu/modifier/_aveu.vue' /* webpackChunkName: "pages/aveu/modifier/_aveu" */))
const _4dd3dc63 = () => interopDefault(import('../pages/banque/modifier/_banque.vue' /* webpackChunkName: "pages/banque/modifier/_banque" */))
const _33aebde6 = () => interopDefault(import('../pages/biens/modifier/_bien.vue' /* webpackChunkName: "pages/biens/modifier/_bien" */))
const _3661d4cd = () => interopDefault(import('../pages/comparent/modifier/_comparent.vue' /* webpackChunkName: "pages/comparent/modifier/_comparent" */))
const _4a9df1fa = () => interopDefault(import('../pages/comptabilite/modifier/_comptabilite.vue' /* webpackChunkName: "pages/comptabilite/modifier/_comptabilite" */))
const _1edf2000 = () => interopDefault(import('../pages/dossiers/modifier/_dossier.vue' /* webpackChunkName: "pages/dossiers/modifier/_dossier" */))
const _bf256204 = () => interopDefault(import('../pages/modeles/modifier/_modele.vue' /* webpackChunkName: "pages/modeles/modifier/_modele" */))
const _3c4bc020 = () => interopDefault(import('../pages/actes/_acte.vue' /* webpackChunkName: "pages/actes/_acte" */))
const _f8b777a4 = () => interopDefault(import('../pages/archives/_archive.vue' /* webpackChunkName: "pages/archives/_archive" */))
const _3de20a9d = () => interopDefault(import('../pages/aveu/_aveu.vue' /* webpackChunkName: "pages/aveu/_aveu" */))
const _d364195a = () => interopDefault(import('../pages/comparent/_comparent.vue' /* webpackChunkName: "pages/comparent/_comparent" */))
const _8101d896 = () => interopDefault(import('../pages/comptabilite/_comptabilite.vue' /* webpackChunkName: "pages/comptabilite/_comptabilite" */))
const _55639000 = () => interopDefault(import('../pages/dossiers/_dossier.vue' /* webpackChunkName: "pages/dossiers/_dossier" */))
const _6878db90 = () => interopDefault(import('../pages/modeles/_modele.vue' /* webpackChunkName: "pages/modeles/_modele" */))
const _86b337c2 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _0f4f05d0,
    name: "actes"
  }, {
    path: "/archives",
    component: _21dc7fb7,
    name: "archives"
  }, {
    path: "/aveu",
    component: _d210782a,
    name: "aveu"
  }, {
    path: "/banque",
    component: _3b1de4d0,
    name: "banque"
  }, {
    path: "/biens",
    component: _0022ceda,
    name: "biens"
  }, {
    path: "/comparent",
    component: _8261338a,
    name: "comparent"
  }, {
    path: "/comptabilite",
    component: _6ce2c477,
    name: "comptabilite"
  }, {
    path: "/devis",
    component: _472d0b62,
    name: "devis"
  }, {
    path: "/dossiers",
    component: _0071f20e,
    name: "dossiers"
  }, {
    path: "/factures",
    component: _9fdefe86,
    name: "factures"
  }, {
    path: "/home",
    component: _e07d58bc,
    name: "home"
  }, {
    path: "/inspire",
    component: _a66c5e32,
    name: "inspire"
  }, {
    path: "/login",
    component: _f363f194,
    name: "login"
  }, {
    path: "/modeles",
    component: _6cd496b2,
    name: "modeles"
  }, {
    path: "/test",
    component: _686191d5,
    name: "test"
  }, {
    path: "/actes/ajouter",
    component: _66465170,
    name: "actes-ajouter"
  }, {
    path: "/archives/ajouter",
    component: _0b5ced97,
    name: "archives-ajouter"
  }, {
    path: "/aveu/ajouter",
    component: _b290166a,
    name: "aveu-ajouter"
  }, {
    path: "/banque/ajouter",
    component: _0df4f190,
    name: "banque-ajouter"
  }, {
    path: "/biens/ajouter",
    component: _a567811a,
    name: "biens-ajouter"
  }, {
    path: "/comparent/ajouter",
    component: _3730431b,
    name: "comparent-ajouter"
  }, {
    path: "/comptabilite/ajouter",
    component: _a435fb52,
    name: "comptabilite-ajouter"
  }, {
    path: "/devis/ajouter",
    component: _6334ed1c,
    name: "devis-ajouter"
  }, {
    path: "/devis/devi",
    component: _7c3baf07,
    name: "devis-devi"
  }, {
    path: "/dossiers/ajouter",
    component: _cb41b3a4,
    name: "dossiers-ajouter"
  }, {
    path: "/factures/ajouter",
    component: _5b0e41e0,
    name: "factures-ajouter"
  }, {
    path: "/modeles/ajouter",
    component: _acc6b2f2,
    name: "modeles-ajouter"
  }, {
    path: "/devis/ajouter/terminer",
    component: _92631ae4,
    name: "devis-ajouter-terminer"
  }, {
    path: "/factures/ajouter/terminer",
    component: _5cfcbb60,
    name: "factures-ajouter-terminer"
  }, {
    path: "/actes/modifier/:acte?",
    component: _5ecc32ac,
    name: "actes-modifier-acte"
  }, {
    path: "/aveu/modifier/:aveu?",
    component: _0e374f83,
    name: "aveu-modifier-aveu"
  }, {
    path: "/banque/modifier/:banque?",
    component: _4dd3dc63,
    name: "banque-modifier-banque"
  }, {
    path: "/biens/modifier/:bien?",
    component: _33aebde6,
    name: "biens-modifier-bien"
  }, {
    path: "/comparent/modifier/:comparent?",
    component: _3661d4cd,
    name: "comparent-modifier-comparent"
  }, {
    path: "/comptabilite/modifier/:comptabilite?",
    component: _4a9df1fa,
    name: "comptabilite-modifier-comptabilite"
  }, {
    path: "/dossiers/modifier/:dossier?",
    component: _1edf2000,
    name: "dossiers-modifier-dossier"
  }, {
    path: "/modeles/modifier/:modele?",
    component: _bf256204,
    name: "modeles-modifier-modele"
  }, {
    path: "/actes/:acte",
    component: _3c4bc020,
    name: "actes-acte"
  }, {
    path: "/archives/:archive",
    component: _f8b777a4,
    name: "archives-archive"
  }, {
    path: "/aveu/:aveu",
    component: _3de20a9d,
    name: "aveu-aveu"
  }, {
    path: "/comparent/:comparent",
    component: _d364195a,
    name: "comparent-comparent"
  }, {
    path: "/comptabilite/:comptabilite",
    component: _8101d896,
    name: "comptabilite-comptabilite"
  }, {
    path: "/dossiers/:dossier",
    component: _55639000,
    name: "dossiers-dossier"
  }, {
    path: "/modeles/:modele",
    component: _6878db90,
    name: "modeles-modele"
  }, {
    path: "/",
    component: _86b337c2,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
