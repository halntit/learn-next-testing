import { defineConfig } from "cypress";
import { addBand } from "./lib/features/bands/queries";
import { resetDB } from "./__tests__/__mocks__/db/util/reset-db";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        "db:reset": () => {
          resetDB().then(() => null);
          console.log("DB reset");
          return null;
        },
        addBand: (newBand) => addBand(newBand).then(() => null)
      })
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
