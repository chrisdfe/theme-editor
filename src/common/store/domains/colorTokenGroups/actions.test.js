import { omit } from "lodash";
import * as actions from "./actions";
import * as types from "./types";
import * as colorTokenTypes from "../colorTokens/types";

import PayloadError from "common/store/errors/PayloadError";

import {
  getActionTypes,
  getActionPayload,
  createMockStore,
  createMockColorToken,
  createMockColorTokenGroup,
  createGenericStateSlice,
} from "tests/utils";

const mockStore = createMockStore();

const initialStoreState = {
  entities: {
    ...createGenericStateSlice("colorTokenGroups"),
  },
};

describe("colorTokenGroup actions", () => {
  let store;
  let payload;

  beforeEach(() => {
    store = mockStore(initialStoreState);
    payload = {};
  });

  afterEach(() => {
    store.clearActions();
  });

  xdescribe("#setColorTokenGroup", () => {
    xit("fires SET_COLOR_TOKEN_GROUP");
    xdescribe("validation");
  });

  describe("#setColorTokenGroups", () => {
    describe("with a valid payload", () => {
      it("creates SET_COLOR_TOKEN_GROUPS", () => {
        const colorTokenGroup = createMockColorTokenGroup();
        const colorTokenGroups = [colorTokenGroup];
        store.dispatch(actions.setColorTokenGroups({ colorTokenGroups }));
        expect(getActionTypes(store)).toContain(types.SET_COLOR_TOKEN_GROUPS);
      });

      it("sends the expected payload", () => {
        const colorTokenGroup = createMockColorTokenGroup();
        const colorTokenGroups = [colorTokenGroup];
        store.dispatch(actions.setColorTokenGroups({ colorTokenGroups }));
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ colorTokenGroups });
      });
    });

    describe("with an invalid payload", () => {
      it("throws a payload error", () => {
        expect(() => store.dispatch(actions.setColorTokenGroups())).toThrow(
          PayloadError
        );
      });
    });

    xdescribe("validation");
  });

  describe("#addColorTokenGroup", () => {
    describe("with a valid payload", () => {
      it("creates ADD_COLOR_TOKEN_GROUP", () => {
        const colorTokenGroup = createMockColorTokenGroup();
        store.dispatch(actions.addColorTokenGroup({ colorTokenGroup }));
        expect(getActionTypes(store)).toContain(types.ADD_COLOR_TOKEN_GROUP);
      });

      it("sends the expected payload", () => {
        const colorTokenGroup = createMockColorTokenGroup();
        store.dispatch(actions.addColorTokenGroup({ colorTokenGroup }));
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ colorTokenGroup });
      });
    });

    describe("with an invalid payload", () => {
      it("throws a payload error", () => {
        expect(() => store.dispatch(actions.addColorTokenGroup())).toThrow(
          PayloadError
        );
      });
    });
  });

  describe("#createColorTokenGroup", () => {
    describe("with a valid payload", () => {
      it("creates ADD_COLOR_TOKEN_GROUP", async () => {
        const colorTokenGroup = createMockColorTokenGroup();
        await store.dispatch(
          actions.createColorTokenGroup({ colorTokenGroup })
        );
        expect(getActionTypes(store)).toContain(types.ADD_COLOR_TOKEN_GROUP);
      });

      it("sends the expected payload", async () => {
        const colorTokenGroup = createMockColorTokenGroup();
        await store.dispatch(
          actions.createColorTokenGroup({ colorTokenGroup })
        );
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ colorTokenGroup });
      });

      it("uses default parameters when there aren't any required", async () => {
        const colorTokenGroup = createMockColorTokenGroup();
        await store.dispatch(actions.createColorTokenGroup());
        expect(getActionTypes(store)).toContain(types.ADD_COLOR_TOKEN_GROUP);
      });
    });

    // describe("colorTokens", () => {
    //   it("creates ADD_COLOR_TOKENS", async () => {
    //     const colorTokenGroup = createMockColorTokenGroup({ id: 1 });
    //     const colorToken = createMockColorToken({
    //       colorTokenGroupId: colorTokenGroup.id,
    //     });

    //     const colorTokens = [colorToken];
    //     await store.dispatch(
    //       actions.createColorTokenGroup({ colorTokenGroup, colorTokens })
    //     );
    //     expect(getActionTypes(store)).toContain(
    //       colorTokenTypes.ADD_COLOR_TOKENS
    //     );
    //   });
    // });

    xdescribe("colorTokenGroup validation", () => {
      xdescribe("invalid colorTokenGroup");
      xdescribe("valid");
    });
  });

  xdescribe("#createColorTokenGroups");

  describe("#createColorTokenGroupForTheme", () => {
    it("creates ADD_COLOR_TOKEN_GROUP", async () => {
      const theme = { id: 1 };
      await store.dispatch(actions.createColorTokenGroupForTheme({ theme }));
      expect(getActionTypes(store)).toContain(types.ADD_COLOR_TOKEN_GROUP);
    });

    it("creates a colorTokenGroup with the expected attributes", async () => {
      const theme = { id: 1 };
      await store.dispatch(actions.createColorTokenGroupForTheme({ theme }));
      const actionPayload = getActionPayload(store.getActions()[0]);
      expect(actionPayload).toMatchObject({
        colorTokenGroup: expect.objectContaining({ themeId: theme.id }),
      });
    });
  });

  describe("#updateColorTokenGroup", () => {
    describe("with a valid payload", () => {
      it("creates UPDATE_COLOR_TOKEN_GROUP", async () => {
        const colorTokenGroup = createMockColorTokenGroup();
        const attributes = { name: "new colorTokenGroup name" };
        await store.dispatch(
          actions.updateColorTokenGroup({ id: colorTokenGroup.id, attributes })
        );
        expect(getActionTypes(store)).toContain(types.UPDATE_COLOR_TOKEN_GROUP);
      });

      it("sends the expected payload", () => {
        const colorTokenGroup = createMockColorTokenGroup();
        const attributes = { name: "new colorTokenGroup name" };
        store.dispatch(
          actions.updateColorTokenGroup({ id: colorTokenGroup.id, attributes })
        );
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({
          id: colorTokenGroup.id,
          attributes,
        });
      });

      xdescribe("colorTokenGroup validation", () => {
        xdescribe("invalid colorTokenGroup");
        xdescribe("valid");
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", async () => {
        await expect(
          store.dispatch(actions.updateColorTokenGroup())
        ).rejects.toThrow(PayloadError);
      });
    });
  });

  describe("#updateColorTokenGroups", () => {
    describe("with a valid payload", () => {
      it("creates UPDATE_COLOR_TOKEN_GROUPS", async () => {
        const colorTokenGroups = {
          1: { name: "new colorTokenGroup name" },
          2: { name: "another new colorTokenGroup name" },
        };
        await store.dispatch(
          actions.updateColorTokenGroups({ colorTokenGroups })
        );
        expect(getActionTypes(store)).toContain(
          types.UPDATE_COLOR_TOKEN_GROUPS
        );
      });

      it("sends the expected payload", async () => {
        const colorTokenGroups = {
          1: { name: "new colorTokenGroup name" },
          2: { name: "another new colorTokenGroup name" },
        };
        await store.dispatch(
          actions.updateColorTokenGroups({ colorTokenGroups })
        );
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ colorTokenGroups });
      });

      xdescribe("colorTokenGroup validation", () => {
        xdescribe("invalid colorTokenGroup");
        xdescribe("valid");
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", async () => {
        await expect(
          store.dispatch(actions.updateColorTokenGroups())
        ).rejects.toThrow(PayloadError);
      });
    });
  });

  describe("#removeColorTokenGroupById", () => {
    describe("with a valid payload", () => {
      it("creates REMOVE_COLOR_TOKEN_GROUP", () => {
        const { id } = createMockColorTokenGroup();
        store.dispatch(actions.removeColorTokenGroupById({ id }));
        expect(getActionTypes(store)).toContain(types.REMOVE_COLOR_TOKEN_GROUP);
      });

      it("sends the expected payload", () => {
        const { id } = createMockColorTokenGroup();
        store.dispatch(actions.removeColorTokenGroupById({ id }));
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ id });
      });
    });

    describe("with an invalid payload", () => {
      it("throws an error", () => {
        expect(() =>
          store.dispatch(actions.removeColorTokenGroupById())
        ).toThrow(PayloadError);
      });
    });
  });

  xdescribe("#removeColorTokenGroupsById");

  describe("#deleteColorTokenGroupById", () => {
    describe("with a valid payload", () => {
      it("creates REMOVE_COLOR_TOKEN_GROUP", async () => {
        const colorTokenGroupToDelete = createMockColorTokenGroup();
        store = mockStore({
          colorTokenGroups: {
            byId: {
              [colorTokenGroupToDelete.id]: colorTokenGroupToDelete,
            },
            allIds: [colorTokenGroupToDelete.id],
          },
        });
        await store.dispatch(
          actions.deleteColorTokenGroupById({ id: colorTokenGroupToDelete.id })
        );
        expect(getActionTypes(store)).toContain(types.REMOVE_COLOR_TOKEN_GROUP);
      });

      it("sends the expected payload", async () => {
        const colorTokenGroupToDelete = createMockColorTokenGroup({
          id: 1,
        });
        store = mockStore({
          colorTokenGroups: {
            byId: {
              [colorTokenGroupToDelete.id]: colorTokenGroupToDelete,
            },
            allIds: [colorTokenGroupToDelete.id],
          },
        });
        await store.dispatch(
          actions.deleteColorTokenGroupById({ id: colorTokenGroupToDelete.id })
        );
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({ id: colorTokenGroupToDelete.id });
      });

      xdescribe("withRelated", () => {
        xit("deletes related colorTokens");
      });

      describe("with an invalid payload", () => {
        it("throws an error", async () => {
          await expect(() =>
            store.dispatch(actions.deleteColorTokenGroupById())
          ).rejects.toThrow(PayloadError);
        });
      });
    });

    describe("#deleteColorTokenGroupsByThemeId", () => {
      let deletedTheme;
      let colorTokenGroupToDelete1;
      let colorTokenGroupToDelete2;
      let colorTokenGroupsToDelete;

      beforeEach(async () => {
        deletedTheme = { id: 1 };
        colorTokenGroupToDelete1 = createMockColorTokenGroup({
          id: 1,
          themeId: deletedTheme.id,
        });
        colorTokenGroupToDelete2 = createMockColorTokenGroup({
          id: 2,
          themeId: deletedTheme.id,
        });

        store = mockStore({
          entities: {
            colorTokenGroups: {
              byId: {
                [colorTokenGroupToDelete1.id]: colorTokenGroupToDelete1,
                [colorTokenGroupToDelete2.id]: colorTokenGroupToDelete2,
              },
              allIds: [
                colorTokenGroupToDelete1.id,
                colorTokenGroupToDelete2.id,
              ],
            },
          },
        });

        await store.dispatch(
          actions.deleteColorTokenGroupsByThemeId({ themeId: deletedTheme.id })
        );
      });

      it("creates REMOVE_COLOR_TOKEN_GROUPS", () => {
        expect(getActionTypes(store)).toContain(
          types.REMOVE_COLOR_TOKEN_GROUPS
        );
      });

      it("sends the expected payload", () => {
        const actionPayload = getActionPayload(store.getActions()[0]);
        expect(actionPayload).toMatchObject({
          ids: [colorTokenGroupToDelete1.id, colorTokenGroupToDelete2.id],
        });
      });
    });

    xdescribe("#deleteColorTokenGroupsById");
  });
});
