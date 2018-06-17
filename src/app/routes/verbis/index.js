export default {
  path: "verbis",
  component: require("../../components/common/Layout").default,

  indexRoute: { onEnter: (nextState, replace) => replace("/tanimlar/profiller") },

  // GENEL TANIMLAR

  childRoutes: [
    {
      path: "profiller",
      getComponent(nextState, cb) {
        System.import("./tanimlar/profiller").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "birimler",
      getComponent(nextState, cb) {
        System.import("./tanimlar/birimler").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "kv",
      getComponent(nextState, cb) {
        System.import("./tanimlar/kv").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "islemeamaclari",
      getComponent(nextState, cb) {
        System.import("./tanimlar/islemeAmaclari").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "kanallar",
      getComponent(nextState, cb) {
        System.import("./tanimlar/kanallar").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "sistemler",
      getComponent(nextState, cb) {
        System.import("./tanimlar/sistemler").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "dokumanlar",
      getComponent(nextState, cb) {
        System.import("./tanimlar/dokumanlar").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "dayanaklar",
      getComponent(nextState, cb) {
        System.import("./tanimlar/dayanaklar").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "ortamlar",
      getComponent(nextState, cb) {
        System.import("./tanimlar/ortamlar").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "sureler",
      getComponent(nextState, cb) {
        System.import("./tanimlar/sureler").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "kurumlar",
      getComponent(nextState, cb) {
        System.import("./tanimlar/kurumlar").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "paylasimamaclari",
      getComponent(nextState, cb) {
        System.import("./tanimlar/paylasimAmaclari").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "paylasimsekilleri",
      getComponent(nextState, cb) {
        System.import("./tanimlar/paylasimSekilleri").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "ulkeler",
      getComponent(nextState, cb) {
        System.import("./tanimlar/ulkeler").then(m => { cb(null, m.default); });
      }
    },
    // SÜREÇ SAHİBİ
    {
      path: "ss/kurumlar",
      getComponent(nextState, cb) {
        System.import("./ss/kurumlar").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "ss/kvdokumanlar",
      getComponent(nextState, cb) {
        System.import("./ss/kvdokumanlar").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "ss/kanallar",
      getComponent(nextState, cb) {
        System.import("./ss/kanallar").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "ss/sistemler",
      getComponent(nextState, cb) {
        System.import("./ss/sistemler").then(m => { cb(null, m.default); });
      }
    },
  ]
};
