import "@testing-library/cypress/add-commands";
import { State } from "@laundry/store";
import localForage from "localforage";

const VERSION = 1;
const databaseName = "barry";
const savedGameKey = "saved_game";

localForage.config({
  version: VERSION,
  name: databaseName,
  storeName: databaseName,
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      /**
       * Get an element by data-test attribute.
       * @example
       * cy.getId("print-button")
       */
      alias: typeof alias;
      /** Load a saved game. */
      loadSave: typeof loadSave;
      /** Delete the current saved game. */
      deleteSave: typeof deleteSave;
    }
  }
}

type Aliases = {
  // Add alias types here
  [key: string]: unknown;
};
const alias = <TAlias extends keyof Aliases>(
  alias: TAlias,
): Cypress.Chainable<Aliases[TAlias]> => {
  return cy.get(`@${alias}`) as any;
};

const loadSave = (data: State) => {
  return cy.wrap(localForage.setItem(savedGameKey, data));
};
const deleteSave = () => {
  return cy.wrap(localForage.removeItem(savedGameKey));
};

Cypress.Commands.add("alias", alias);
Cypress.Commands.add("loadSave", loadSave);
Cypress.Commands.add("deleteSave", deleteSave);
