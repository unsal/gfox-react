export default {
  path: "verbis",
  component: require("../../components/common/Layout").default,

  indexRoute: { onEnter: (nextState, replace) => replace("/containers/profiller") },

  childRoutes: [
    {
      path: "profiller",
      getComponent(nextState, cb) {
        System.import("./containers/profiller").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "birimler",
      getComponent(nextState, cb) {
        System.import("./containers/birimler").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "kv",
      getComponent(nextState, cb) {
        System.import("./containers/kv").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "islemeamaclari",
      getComponent(nextState, cb) {
        System.import("./containers/islemeAmaclari").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "kanallar",
      getComponent(nextState, cb) {
        System.import("./containers/kanallar").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "sistemler",
      getComponent(nextState, cb) {
        System.import("./containers/sistemler").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "dokumanlar",
      getComponent(nextState, cb) {
        System.import("./containers/dokumanlar").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "dayanaklar",
      getComponent(nextState, cb) {
        System.import("./containers/dayanaklar").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "ortamlar",
      getComponent(nextState, cb) {
        System.import("./containers/ortamlar").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "sureler",
      getComponent(nextState, cb) {
        System.import("./containers/sureler").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "kurumlar",
      getComponent(nextState, cb) {
        System.import("./containers/kurumlar").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "paylasimamaclari",
      getComponent(nextState, cb) {
        System.import("./containers/paylasimAmaclari").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "paylasimsekilleri",
      getComponent(nextState, cb) {
        System.import("./containers/paylasimSekilleri").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "ulkeler",
      getComponent(nextState, cb) {
        System.import("./containers/ulkeler").then(m => { cb(null, m.default); });
      }
    },

  ]
};
