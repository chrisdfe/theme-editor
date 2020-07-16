import { v4 as uuid } from "uuid";
import { omit } from "lodash";

export const copyEntityWithNewId = (entity, copyFn) => {
  const copiedEntity = copyFn ? copyFn(entity) : { ...entity };
  const copiedAttributes = omit(copiedEntity, "id");
  const id = uuid();

  return {
    id,
    originalId: entity.id,
    ...copiedAttributes,
  };
};

export default copyEntityWithNewId;
