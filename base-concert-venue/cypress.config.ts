import { defineConfig } from "cypress";
import { resetDB } from "./__tests__/__mocks__/db/util/reset-db";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        "db:reset": () => {
          resetDB().then(() => null);
          return null;
        }
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
