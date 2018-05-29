export default {
  path: "verbis",
  component: require("../../components/common/Layout").default,

  indexRoute: { onEnter: (nextState, replace) => replace("/containers/profiller") },

  childRoutes: [
    {
      path: "profiller",
      getComponent(nextState, cb) {
        System.import("./containers/ProfillerPage").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "birimler",
      getComponent(nextState, cb) {
        System.import("./containers/BirimlerPage").then(m => { cb(null, m.default); });
      }
    },
  ]
};