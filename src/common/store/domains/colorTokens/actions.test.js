import { omit } from "lodash";
import * as actions from "./actions";
import * as types from "./types";

import PayloadError from "common/store/errors/PayloadError";

import {
  getActionTypes,
  getActionPayload,
  createMockStore,
  createMockColorToken,
  createGenericStateSlice,
} from "tests/utils";

const mockStore = createMockStore();

const initialStoreState = {
  entities: {
    ...createGenericStateSlice("colorTokenS"),
  },
};

describe("colorToken actions", () => {
  let store;
  let payload;

  beforeEach(() => {
    store = mockStore(initialStoreState);
    payload = {};
  });

  afterEach(() => {
    store.clearActions();
  });

  xdescribe("#setColorToken", () => {
    xit("fires SET_COLOR_TOKEN");
    xdescribe("validation");
  });

  describe("#setColorTokens", () => {
    describe("with a valid payload", () => {
      it("creates SET_COLOR_TOKENS", () => {
        const colorToken = createMockColorToken();
        const colorTokens = [colorToken];
        store.dispatch(actions.setColorTokens({ colorTokens }));
        expect(getActionTypes(store)).toContain(types.SET_COLOR_TOKENS);
      });

      it("sends the expected payload", () => {
        const colorToken = createMockColorToken();
        const colorTokens = [colorToken];
        store.dispatch(actions.setColorTokens({ colorTokens }));
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ colorTokens });
      });
    });

    describe("with an invalid payload", () => {
      it("throws a payload error", () => {
        expect(() => store.dispatch(actions.setColorTokens())).toThrow(
          PayloadError
        );
      });
    });

    xdescribe("validation");
  });

  describe("#addColorToken", () => {
    describe("with a valid payload", () => {
      it("creates ADD_COLOR_TOKEN", () => {
        const colorToken = createMockColorToken();
        store.dispatch(actions.addColorToken({ colorToken }));
        expect(getActionTypes(store)).toContain(types.ADD_COLOR_TOKEN);
      });

      it("sends the expected payload", () => {
        const colorToken = createMockColorToken();
        store.dispatch(actions.addColorToken({ colorToken }));
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ colorToken });
      });
    });

    describe("with an invalid payload", () => {
      it("throws a payload error", () => {
        expect(() => store.dispatch(actions.addColorToken())).toThrow(
          PayloadError
        );
      });
    });
  });

  describe("#addColorTokens", () => {
    describe("with a valid payload", () => {
      it("creates ADD_COLOR_TOKENS", () => {
        const colorToken1 = createMockColorToken();
        const colorToken2 = createMockColorToken();
        const colorTokens = [colorToken1, colorToken2];

        store.dispatch(actions.addColorTokens({ colorTokens }));
        expect(getActionTypes(store)).toContain(types.ADD_COLOR_TOKENS);
      });

      it("sends the expected payload", () => {
        const colorToken1 = createMockColorToken();
        const colorToken2 = createMockColorToken();
        const colorTokens = [colorToken1, colorToken2];

        store.dispatch(actions.addColorTokens({ colorTokens }));
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ colorTokens });
      });
    });

    describe("with an invalid payload", () => {
      it("throws a payload error", () => {
        expect(() => store.dispatch(actions.addColorToken())).toThrow(
          PayloadError
        );
      });
    });
  });

  describe("#createColorToken", () => {
    describe("with a valid payload", () => {
      it("creates ADD_COLOR_TOKEN", async () => {
        const colorToken = createMockColorToken();
        await store.dispatch(actions.createColorToken({ colorToken }));
        expect(getActionTypes(store)).toContain(types.ADD_COLOR_TOKEN);
      });

      it("sends the expected payload", async () => {
        const colorToken = createMockColorToken();
        await store.dispatch(actions.createColorToken({ colorToken }));
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ colorToken });
      });

      xdescribe("colorToken validation", () => {
        xdescribe("invalid colorToken");
        xdescribe("valid");
      });

      it("creates a unique id for each new colorToken", () => {
        const colorToken1 = omit(createMockColorToken(), "id");
        const colorToken2 = omit(createMockColorToken(), "id");
        const colorTokens = [colorToken1, colorToken2];

        store.dispatch(actions.createColorTokens({ colorTokens }));

        const payload = getActionPayload(store.getActions()[0]);

        payload.colorTokens.forEach((colorToken) => {
          expect(colorToken.id).toBeTruthy();
        });
      });
    });
  });

  describe("#createColorTokens", () => {
    describe("with a valid payload", () => {
      it("creates ADD_COLOR_TOKENS", async () => {
        const colorToken1 = createMockColorToken();
        const colorToken2 = createMockColorToken({ id: 2 });
        const colorTokens = [colorToken1, colorToken2];

        await store.dispatch(actions.createColorTokens({ colorTokens }));

        expect(getActionTypes(store)).toContain(types.ADD_COLOR_TOKENS);
      });

      it("sends the expected payload", async () => {
        const colorToken1 = createMockColorToken();
        const colorToken2 = createMockColorToken({ id: 2 });
        const colorTokens = [colorToken1, colorToken2];

        await store.dispatch(actions.createColorTokens({ colorTokens }));

        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ colorTokens });
      });

      xdescribe("colorToken validation", () => {
        xdescribe("invalid colorToken");
        xdescribe("valid");
      });
    });
  });

  describe("#updateColorToken", () => {
    describe("with a valid payload", () => {
      it("creates UPDATE_COLOR_TOKEN", async () => {
        const colorToken = createMockColorToken();
        const attributes = { name: "new colorToken name" };
        await store.dispatch(
          actions.updateColorToken({ id: colorToken.id, attributes })
        );
        expect(getActionTypes(store)).toContain(types.UPDATE_COLOR_TOKEN);
      });

      it("sends the expected payload", () => {
        const colorToken = createMockColorToken();
        const attributes = { name: "new colorToken name" };
        store.dispatch(
          actions.updateColorToken({ id: colorToken.id, attributes })
        );
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ id: colorToken.id, attributes });
      });

      xdescribe("colorToken validation", () => {
        xdescribe("invalid colorToken");
        xdescribe("valid");
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", async () => {
        await expect(
          store.dispatch(actions.updateColorToken())
        ).rejects.toThrow(PayloadError);
      });
    });
  });

  describe("#updateColorTokens", () => {
    describe("with a valid payload", () => {
      it("creates UPDATE_COLOR_TOKENS", async () => {
        const colorTokens = {
          1: { name: "new colorToken name" },
          2: { name: "another new colorToken name" },
        };
        await store.dispatch(actions.updateColorTokens({ colorTokens }));
        expect(getActionTypes(store)).toContain(types.UPDATE_COLOR_TOKENS);
      });

      it("sends the expected payload", async () => {
        const colorTokens = {
          1: { name: "new colorToken name" },
          2: { name: "another new colorToken name" },
        };
        await store.dispatch(actions.updateColorTokens({ colorTokens }));
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ colorTokens });
      });

      xdescribe("colorToken validation", () => {
        xdescribe("invalid colorToken");
        xdescribe("valid");
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", async () => {
        await expect(
          store.dispatch(actions.updateColorTokens())
        ).rejects.toThrow(PayloadError);
      });
    });
  });

  describe("#removeColorTokenById", () => {
    describe("with a valid payload", () => {
      it("creates REMOVE_COLOR_TOKEN", () => {
        const { id } = createMockColorToken();
        store.dispatch(actions.removeColorTokenById({ id }));
        expect(getActionTypes(store)).toContain(types.REMOVE_COLOR_TOKEN);
      });

      it("sends the expected payload", () => {
        const { id } = createMockColorToken();
        store.dispatch(actions.removeColorTokenById({ id }));
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ id });
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", () => {
        expect(() => store.dispatch(actions.removeColorTokenById())).toThrow(
          PayloadError
        );
      });
    });
  });

  describe("#removeColorTokensById", () => {
    describe("with a valid payload", () => {
      it("creates REMOVE_COLOR_TOKENS", () => {
        const ids = [1, 2];
        store.dispatch(actions.removeColorTokensById({ ids }));
        expect(getActionTypes(store)).toContain(types.REMOVE_COLOR_TOKENS);
      });

      it("sends the expected payload", () => {
        const ids = [1, 2];
        store.dispatch(actions.removeColorTokensById({ ids }));
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ ids });
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", () => {
        expect(() => store.dispatch(actions.removeColorTokensById())).toThrow(
          PayloadError
        );
      });
    });
  });

  describe("#deleteColorTokenById", () => {
    describe("with a valid payload", () => {
      it("creates REMOVE_COLOR_TOKEN", async () => {
        const colorTokenToDelete = createMockColorToken();
        store = mockStore({
          colorTokens: {
            byId: {
              [colorTokenToDelete.id]: colorTokenToDelete,
            },
            allIds: [colorTokenToDelete.id],
          },
        });

        await store.dispatch(
          actions.deleteColorTokenById({ id: colorTokenToDelete.id })
        );

        expect(getActionTypes(store)).toContain(types.REMOVE_COLOR_TOKEN);
      });

      it("sends the expected payload", async () => {
        const colorTokenToDelete = createMockColorToken({
          id: 1,
        });
        store = mockStore({
          colorTokens: {
            byId: {
              [colorTokenToDelete.id]: colorTokenToDelete,
            },
            allIds: [colorTokenToDelete.id],
          },
        });
        await store.dispatch(
          actions.deleteColorTokenById({ id: colorTokenToDelete.id })
        );
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ id: colorTokenToDelete.id });
      });

      describe("with an invalid payload", () => {
        it("throws an error", async () => {
          await expect(() =>
            store.dispatch(actions.deleteColorTokenById())
          ).rejects.toThrow(PayloadError);
        });
      });
    });

    describe("#deleteColorTokensById", () => {
      describe("with a valid payload", () => {
        it("creates REMOVE_COLOR_TOKENS", async () => {
          const ids = [1, 2];
          await store.dispatch(actions.deleteColorTokensById({ ids }));
          expect(getActionTypes(store)).toContain(types.REMOVE_COLOR_TOKENS);
        });

        it("sends the expected payload", async () => {
          const ids = [1, 2];
          await store.dispatch(actions.deleteColorTokensById({ ids }));
          const actionPayload = getActionPayload(store.getActions()[0]);
          expect(actionPayload).toMatchObject({ ids });
        });
      });

      describe("with an invalid payload", () => {
        it("throws an error", async () => {
          await expect(() =>
            store.dispatch(actions.deleteColorTokensById())
          ).rejects.toThrow(PayloadError);
        });
      });
    });
  });
});
