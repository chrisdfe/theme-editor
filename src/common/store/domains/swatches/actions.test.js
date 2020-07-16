import { omit } from "lodash";
import * as actions from "./actions";
import * as types from "./types";
import * as swatchColorTypes from "common/store/domains/swatchColors/types";

import PayloadError from "common/store/errors/PayloadError";

import {
  createMockSwatch,
  createMockSwatchColor,
  getActionTypes,
  getActionPayload,
  createMockStore,
  createGenericStateSlice,
} from "tests/utils";

const mockStore = createMockStore();

const initialStoreState = {
  entities: {
    ...createGenericStateSlice("swatches"),
    ...createGenericStateSlice("swatchColors"),
  },
};

describe("swatch actions", () => {
  let store;
  let payload;

  beforeEach(() => {
    store = mockStore(initialStoreState);
    payload = {};
  });

  afterEach(() => {
    store.clearActions();
  });

  xdescribe("#setSwatch", () => {
    xit("fires SET_SWATCH");
    xdescribe("validation");
  });

  describe("#setSwatches", () => {
    describe("with a valid payload", () => {
      it("creates SET_SWATCHES ", () => {
        const swatch = createMockSwatch();
        const swatches = [swatch];

        store.dispatch(actions.setSwatches({ swatches }));

        expect(getActionTypes(store)).toContain(types.SET_SWATCHES);
      });

      it("sends the expected payload", () => {
        const swatch = createMockSwatch();
        const swatches = [swatch];
        store.dispatch(actions.setSwatches({ swatches }));

        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ swatches });
      });
    });

    describe("with an invalid payload", () => {
      it("throws a payload error", () => {
        expect(() => store.dispatch(actions.setSwatches())).toThrow(
          PayloadError
        );
      });
    });

    xdescribe("validation");
  });

  describe("#addSwatch", () => {
    describe("with a valid payload", () => {
      it("creates ADD_SWATCH", () => {
        const swatch = createMockSwatch();
        store.dispatch(actions.addSwatch({ swatch }));
        expect(getActionTypes(store)).toContain(types.ADD_SWATCH);
      });

      it("sends the expected payload", () => {
        const swatch = createMockSwatch();
        store.dispatch(actions.addSwatch({ swatch }));
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ swatch });
      });
    });

    describe("with an invalid payload", () => {
      it("throws a payload error", () => {
        expect(() => store.dispatch(actions.addSwatch())).toThrow(PayloadError);
      });
    });
  });

  describe("#addSwatches", () => {
    describe("with a valid payload", () => {
      it("creates ADD_SWATCHES", () => {
        const swatch1 = createMockSwatch();
        const swatch2 = createMockSwatch();
        const swatches = [swatch1, swatch2];
        store.dispatch(actions.addSwatches({ swatches }));
        expect(getActionTypes(store)).toContain(types.ADD_SWATCHES);
      });

      it("sends the expected payload", () => {
        const swatch1 = createMockSwatch();
        const swatch2 = createMockSwatch();
        const swatches = [swatch1, swatch2];
        store.dispatch(actions.addSwatches({ swatches }));

        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ swatches });
      });
    });

    describe("with an invalid payload", () => {
      it("throws a payload error", () => {
        expect(() => store.dispatch(actions.addSwatches())).toThrow(
          PayloadError
        );
      });
    });
  });

  describe("#createSwatch", () => {
    describe("with a valid payload", () => {
      it("creates ADD_SWATCH", async () => {
        const swatch = createMockSwatch();
        await store.dispatch(actions.createSwatch({ swatch }));
        expect(getActionTypes(store)).toContain(types.ADD_SWATCH);
      });

      it("sends the expected payload", async () => {
        const swatch = createMockSwatch();
        await store.dispatch(actions.createSwatch({ swatch }));
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ swatch });
      });

      it("uses default parameters when there aren't any required", async () => {
        const swatch = createMockSwatch();
        await store.dispatch(actions.createSwatch());
        expect(getActionTypes(store)).toContain(types.ADD_SWATCH);
      });

      describe("withRelated", () => {
        describe("colorSwatches", () => {
          it("creates ADD_SWATCH_COLORS", async () => {
            const swatch = createMockSwatch({ id: 1 });
            const swatchColor = createMockSwatchColor({ swatchId: swatch.id });
            const swatchColors = [swatchColor];

            await store.dispatch(
              actions.createSwatch({ swatch, swatchColors })
            );
            expect(getActionTypes(store)).toContain(
              swatchColorTypes.ADD_SWATCH_COLORS
            );
          });
        });
      });

      xdescribe("swatch validation", () => {
        xdescribe("invalid swatch");
        xdescribe("valid");
      });
    });
  });

  describe("#createSwatches", () => {});

  describe("#createSwatchForTheme", () => {
    it("creates ADD_SWATCH", async () => {
      const theme = { id: 1 };
      await store.dispatch(actions.createSwatchForTheme({ theme }));
      expect(getActionTypes(store)).toContain(types.ADD_SWATCH);
    });

    it("creates a swatch with the expected attributes", async () => {
      const theme = { id: 1 };
      await store.dispatch(actions.createSwatchForTheme({ theme }));
      const actionPayload = getActionPayload(store.getActions()[0]);
      expect(actionPayload).toMatchObject({
        swatch: expect.objectContaining({ themeId: theme.id }),
      });
    });
  });

  xdescribe("#fetchSwatches");

  describe("#updateSwatch", () => {
    describe("with a valid payload", () => {
      it("creates UPDATE_SWATCH", async () => {
        const swatch = createMockSwatch();
        const attributes = { name: "new swatch name" };
        await store.dispatch(
          actions.updateSwatch({ id: swatch.id, attributes })
        );
        expect(getActionTypes(store)).toContain(types.UPDATE_SWATCH);
      });

      it("sends the expected payload", () => {
        const swatch = createMockSwatch();
        const attributes = { name: "new swatch name" };

        store.dispatch(actions.updateSwatch({ id: swatch.id, attributes }));

        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ id: swatch.id, attributes });
      });

      xdescribe("swatch validation", () => {
        xdescribe("invalid swatch");
        xdescribe("valid");
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", async () => {
        await expect(store.dispatch(actions.updateSwatches())).rejects.toThrow(
          PayloadError
        );
      });
    });
  });

  describe("#updateSwatches", () => {
    describe("with a valid payload", () => {
      it("creates UPDATE_SWATCHES", async () => {
        const swatches = {
          1: { name: "new swatch name" },
          2: { name: "another new swatch name" },
        };
        await store.dispatch(actions.updateSwatches({ swatches }));
        expect(getActionTypes(store)).toContain(types.UPDATE_SWATCHES);
      });

      it("sends the expected payload", async () => {
        const swatches = {
          1: { name: "new swatch name" },
          2: { name: "another new swatch name" },
        };

        await store.dispatch(actions.updateSwatches({ swatches }));

        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ swatches });
      });

      xdescribe("swatch validation", () => {
        xdescribe("invalid swatch");
        xdescribe("valid");
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", async () => {
        await expect(store.dispatch(actions.updateSwatch())).rejects.toThrow(
          PayloadError
        );
      });
    });
  });

  describe("#removeSwatchById", () => {
    describe("with a valid payload", () => {
      it("creates REMOVE_SWATCH", () => {
        const { id } = createMockSwatch();
        store.dispatch(actions.removeSwatchById({ id }));
        expect(getActionTypes(store)).toContain(types.REMOVE_SWATCH);
      });

      it("sends the expected payload", () => {
        const { id } = createMockSwatch();
        store.dispatch(actions.removeSwatchById({ id }));
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ id });
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", () => {
        expect(() => store.dispatch(actions.removeSwatchById())).toThrow(
          PayloadError
        );
      });
    });
  });

  xdescribe("#removeSwatchesById");

  describe("#deleteSwatchById", () => {
    describe("with a valid payload", () => {
      it("creates REMOVE_SWATCH", async () => {
        const swatchToDelete = createMockSwatch();

        store = mockStore({
          entities: {
            swatches: {
              byId: {
                [swatchToDelete.id]: swatchToDelete,
              },
              allIds: [swatchToDelete.id],
            },
          },
        });

        await store.dispatch(
          actions.deleteSwatchById({ id: swatchToDelete.id })
        );

        expect(getActionTypes(store)).toContain(types.REMOVE_SWATCH);
      });

      it("sends the expected payload", async () => {
        const swatchToDelete = createMockSwatch({
          id: 1,
        });

        store = mockStore({
          entities: {
            swatches: {
              byId: {
                [swatchToDelete.id]: swatchToDelete,
              },
              allIds: [swatchToDelete.id],
            },
          },
        });

        await store.dispatch(
          actions.deleteSwatchById({ id: swatchToDelete.id })
        );
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ id: swatchToDelete.id });
      });

      xdescribe("withRelated", () => {
        xit("removes related swatchColors");
      });

      // describe("if the action has swatchColorIds", () => {
      //   it("creates REMOVE_SWATCH_COLORS", async () => {
      //     const swatchColorToDelete = createMockSwatchColor({ id: 1 });
      //     const swatchToDelete = createMockSwatch({
      //       id: 1,
      //       swatchColorIds: [swatchColorToDelete.id],
      //     });

      //     store = mockStore({
      //       swatches: {
      //         byId: {
      //           [swatchToDelete.id]: swatchToDelete,
      //         },
      //         allIds: [swatchToDelete.id],
      //       },
      //       swatchColors: {
      //         byId: {
      //           [swatchColorToDelete.id]: swatchColorToDelete,
      //         },
      //         allIds: [swatchColorToDelete.id],
      //       },
      //     });

      //     await store.dispatch(
      //       actions.deleteSwatchById({ id: swatchColorToDelete.id })
      //     );

      //     expect(getActionTypes(store)).toContain(
      //       swatchColorTypes.REMOVE_SWATCH_COLORS
      //     );
      //   });
      // });

      // describe("if the action does not have swatchColorIds", () => {
      //   it("does not create REMOVE_SWATCH_COLORS", () => {
      //     const swatchToDelete = createMockSwatch({
      //       id: 1,
      //       swatchColorIds: [],
      //     });

      //     store = mockStore({
      //       swatches: {
      //         byId: {
      //           [swatchToDelete.id]: swatchToDelete,
      //         },
      //         allIds: [swatchToDelete.id],
      //       },
      //     });

      //     store.dispatch(actions.deleteSwatchById({ id: swatchToDelete.id }));

      //     expect(getActionTypes(store)).not.toContain(
      //       swatchColorTypes.REMOVE_SWATCH_COLORS
      //     );
      //   });
      // });
    });

    describe("with an invalid payload", () => {
      it("throws an error", async () => {
        await expect(() =>
          store.dispatch(actions.deleteSwatchById())
        ).rejects.toThrow(PayloadError);
      });
    });
  });

  xdescribe("#deleteSwatchesById");

  describe("#deleteSwatchByThemeId", () => {
    let deletedTheme;
    let swatchToDelete;

    beforeEach(async () => {
      deletedTheme = { id: 1 };
      swatchToDelete = createMockSwatch({ themeId: deletedTheme.id });

      store = mockStore({
        entities: {
          swatches: {
            byId: {
              [swatchToDelete.id]: swatchToDelete,
            },
            allIds: [swatchToDelete.id],
          },
        },
      });

      await store.dispatch(
        actions.deleteSwatchByThemeId({ themeId: deletedTheme.id })
      );
    });

    it("creates REMOVE_SWATCH", () => {
      expect(getActionTypes(store)).toContain(types.REMOVE_SWATCH);
    });

    it("sends the expected payload", () => {
      const actionPayload = getActionPayload(store.getActions()[0]);
      expect(actionPayload).toMatchObject({ id: swatchToDelete.id });
    });
  });
});
