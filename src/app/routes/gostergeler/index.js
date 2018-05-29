export default {
  path: "gostergeler",
  component: require("../../components/common/Layout").default,

  indexRoute: { onEnter: (nextState, replace) => replace("/gostergeler/kpi") },

  childRoutes: [
    {
      path: "kpi",
      getComponent(nextState, cb) {
        System.import("./containers/KPI").then(m => { cb(null, m.default); });
      }
    },
    {
      path: "raporlar",
      getComponent(nextState, cb) {
        System.import("./containers/Raporlar").then(m => { cb(null, m.default); });
      }
    }
  ]
};
