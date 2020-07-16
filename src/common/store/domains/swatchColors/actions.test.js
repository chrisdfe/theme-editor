import PayloadError from "common/store/errors/PayloadError";

import * as actions from "./actions";
import * as types from "./types";
import {
  createMockSwatchColor,
  getActionTypes,
  getActionPayload,
  createMockStore,
  createGenericStateSlice,
} from "tests/utils";

const mockStore = createMockStore();

const initialStoreState = {
  swatchColors: createGenericStateSlice("swatchColors"),
};

describe("swatchColors actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialStoreState);
  });

  afterEach(() => {
    store.clearActions();
  });

  xdescribe("#setSwatchColor");

  describe("#setSwatchColors", () => {
    describe("with a valid payload", () => {
      it("creates SET_SWATCH_COLORS", () => {
        const swatchColor = createMockSwatchColor();

        const swatchColors = [swatchColor];
        store.dispatch(actions.setSwatchColors({ swatchColors }));

        expect(getActionTypes(store)).toContain(types.SET_SWATCH_COLORS);
      });

      it("sends the expected payload", () => {
        const swatchColor = createMockSwatchColor();

        const swatchColors = [swatchColor];
        store.dispatch(actions.setSwatchColors({ swatchColors }));

        const payload = getActionPayload(store.getActions()[0]);
        expect(payload).toMatchObject({ swatchColors });
      });

      xdescribe("swatchColor validation");
    });

    describe("with an invalid payload", () => {
      it("throws an error", () => {
        expect(() => store.dispatch(actions.setSwatchColors())).toThrow(
          PayloadError
        );
      });
    });
  });

  describe("#addSwatchColor", () => {
    describe("with a valid payload", () => {
      it("creates ADD_SWATCH_COLOR", () => {
        const swatchColor = createMockSwatchColor();

        store.dispatch(actions.addSwatchColor({ swatchColor }));

        expect(getActionTypes(store)).toContain(types.ADD_SWATCH_COLOR);
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", () => {
        expect(() => store.dispatch(actions.addSwatchColor())).toThrow(
          PayloadError
        );
      });
    });
  });

  describe("#addSwatchColors", () => {
    describe("with a valid payload", () => {
      it("creates ADD_SWATCH_COLORS", () => {
        const swatchColor1 = createMockSwatchColor();
        const swatchColor2 = createMockSwatchColor();
        const swatchColors = [swatchColor1, swatchColor2];

        store.dispatch(actions.addSwatchColors({ swatchColors }));

        expect(getActionTypes(store)).toContain(types.ADD_SWATCH_COLORS);
      });
    });

    it("sends the expected payload", () => {
      const swatchColor1 = createMockSwatchColor();
      const swatchColor2 = createMockSwatchColor();
      const swatchColors = [swatchColor1, swatchColor2];

      store.dispatch(actions.addSwatchColors({ swatchColors }));

      const actionPayload = getActionPayload(store.getActions()[0]);
      expect(actionPayload).toMatchObject({ swatchColors });
    });

    describe("with an invalid payload", () => {
      it("throws an error", () => {
        expect(() => store.dispatch(actions.addSwatchColors())).toThrow(
          PayloadError
        );
      });
    });
  });

  describe("#createSwatchColor", () => {
    describe("with a valid payload", () => {
      it("creates ADD_SWATCH_COLOR", async () => {
        const swatchColor = createMockSwatchColor();

        await store.dispatch(actions.createSwatchColor({ swatchColor }));

        expect(getActionTypes(store)).toContain(types.ADD_SWATCH_COLOR);
      });

      xdescribe("swatchColor validation");
    });

    describe("with an invalid payload", () => {
      it("throws an error", async () => {
        await expect(() =>
          store.dispatch(actions.createSwatchColor())
        ).rejects.toThrow(PayloadError);
      });
    });
  });

  describe("#createSwatchColors", () => {
    describe("with a valid payload", () => {
      it("creates ADD_SWATCH_COLORS", async () => {
        const swatchColor1 = createMockSwatchColor();
        const swatchColor2 = createMockSwatchColor();

        await store.dispatch(
          actions.createSwatchColors({
            swatchColors: [swatchColor1, swatchColor2],
          })
        );

        expect(getActionTypes(store)).toContain(types.ADD_SWATCH_COLORS);
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", async () => {
        await expect(() =>
          store.dispatch(actions.createSwatchColors())
        ).rejects.toThrow(PayloadError);
      });
    });
  });

  describe("#updateSwatchColor", () => {
    describe("with a valid payload", () => {
      it("creates UPDATE_SWATCH_COLOR", async () => {
        const swatchColor = createMockSwatchColor();
        const attributes = { hex: "#ff0000" };
        await store.dispatch(
          actions.updateSwatchColor({ id: swatchColor.id, attributes })
        );
        expect(getActionTypes(store)).toContain(types.UPDATE_SWATCH_COLOR);
      });

      it("sends the expected payload", () => {
        const swatchColor = createMockSwatchColor();
        const attributes = { hex: "#ff0000" };

        store.dispatch(
          actions.updateSwatchColor({ id: swatchColor.id, attributes })
        );

        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ id: swatchColor.id, attributes });
      });

      xdescribe("swatch validation", () => {
        xdescribe("invalid swatch");
        xdescribe("valid");
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", async () => {
        await expect(
          store.dispatch(actions.updateSwatchColor())
        ).rejects.toThrow(PayloadError);
      });
    });
  });

  describe("#updateSwatchColors", () => {
    describe("with a valid payload", () => {
      it("creates UPDATE_SWATCHES", async () => {
        const swatchColors = {
          1: { name: "new swatch name" },
          2: { name: "another new swatch name" },
        };
        await store.dispatch(actions.updateSwatchColors({ swatchColors }));
        expect(getActionTypes(store)).toContain(types.UPDATE_SWATCH_COLORS);
      });

      it("sends the expected payload", async () => {
        const swatchColors = {
          1: { name: "new swatch name" },
          2: { name: "another new swatch name" },
        };

        await store.dispatch(actions.updateSwatchColors({ swatchColors }));

        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ swatchColors });
      });

      xdescribe("swatch validation", () => {
        xdescribe("invalid swatch");
        xdescribe("valid");
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", async () => {
        await expect(
          store.dispatch(actions.updateSwatchColors())
        ).rejects.toThrow(PayloadError);
      });
    });
  });

  describe("#removeSwatchColorById", () => {
    describe("with a valid payload", () => {
      it("creates REMOVE_SWATCH_COLOR", () => {
        const swatchColor = createMockSwatchColor();

        const { id } = swatchColor;
        store.dispatch(actions.removeSwatchColorById({ id }));

        expect(getActionTypes(store)).toContain(types.REMOVE_SWATCH_COLOR);
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", () => {
        expect(() => store.dispatch(actions.removeSwatchColorById())).toThrow(
          PayloadError
        );
      });
    });
  });

  describe("#removeSwatchColorsById", () => {
    describe("with a valid payload", () => {
      it("creates REMOVE_SWATCH_COLORS", () => {
        const swatchColor = createMockSwatchColor();

        const ids = [swatchColor.id];
        store.dispatch(actions.removeSwatchColorsById({ ids }));

        expect(getActionTypes(store)).toContain(types.REMOVE_SWATCH_COLORS);
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", () => {
        expect(() => store.dispatch(actions.removeSwatchColorsById())).toThrow(
          PayloadError
        );
      });
    });
  });

  describe("#deleteSwatchColorById", () => {
    describe("with a valid payload", () => {
      it("creates REMOVE_SWATCH_COLOR", () => {
        const swatchColor = createMockSwatchColor();

        const { id } = swatchColor;
        store.dispatch(actions.deleteSwatchColorById({ id }));

        expect(getActionTypes(store)).toContain(types.REMOVE_SWATCH_COLOR);
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", async () => {
        await expect(() =>
          store.dispatch(actions.deleteSwatchColorById())
        ).rejects.toThrow(PayloadError);
      });
    });
  });

  describe("#deleteSwatchColorsById", () => {
    describe("with a valid payload", () => {
      it("creates REMOVE_SWATCH_COLORS", async () => {
        const swatchColor = createMockSwatchColor();

        const ids = [swatchColor.id];
        await store.dispatch(actions.deleteSwatchColorsById({ ids }));

        expect(getActionTypes(store)).toContain(types.REMOVE_SWATCH_COLORS);
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", async () => {
        await expect(() =>
          store.dispatch(actions.deleteSwatchColorsById())
        ).rejects.toThrow(PayloadError);
      });
    });
  });
});
