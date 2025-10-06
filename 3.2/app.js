import { units } from "./resource.js";

const app = Vue.createApp({
  data() {
    return { code: "", desc: "", type: "All", units: units };
  },

  methods: {
    filteredUnits(unitCode, unitDesc, unitType) {
      let result = [];

      // every day of having to code in JS, my hatred for it goes higher
      return this.units.filter((unit) => {
        return (
          unit.code.toLowerCase().includes(unitCode.toLowerCase()) &&
          unit.desc.toLowerCase().includes(unitDesc.toLowerCase()) &&
          (unitType == "All" ||
            unit.type.toLowerCase().includes(unitType.toLowerCase()))
        );
      });
    },
  },
});

// unit

// filterd units
app.mount("#app");
