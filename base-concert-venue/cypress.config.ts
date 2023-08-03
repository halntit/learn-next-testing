import { defineConfig } from "cypress";
import { addBand } from "./lib/features/bands/queries";
import { resetDB } from "./__tests__/__mocks__/db/util/reset-db";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;
      // to access within a test function:
      //   Cypress.env("REVALIDATION_SECRET");
      on('task', {
        "db:reset": () => {
          resetDB().then(() => null);
          console.log("DB reset");
          return null;
        },
        addBand: (newBand) => addBand(newBand).then(() => null)
      });

      return config;
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
