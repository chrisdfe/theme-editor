import Ajv from "ajv";

const schema = {
  type: "object",
  properties: {
    title: { type: "string" },
    definitionGroups: {
      type: "array",
      items: {
        properties: {
          name: {
            type: "string",
          },
          color: {
            type: "string",
          },
        },
        required: ["color"],
      },
    },
  },
  required: ["title", "definitionGroups"],
};

// TODO
// 1) extra validation layer to validate the presence of certain color names -
// 'background'
//    default
//    -> text-primary
//    -> text-secondary?
//    -> text-color-interactive
//    -> text-color-interactive
//    -> border-primary
//    -> border-secondary?
//    -> border-interactive (usualy the same as text-color interactive probably?)
//    -> background-interactive
//    -> text-interactive
//    -> border-interactive
//    -> background-interactive-hover
//    -> text-interactive-hover
//    -> border-interactive-hover
// 'background-secondary'
//    -> text-primary
//    -> ...etc
// 'background-tertiary'
//    -> text-primary
//    -> ...etc
//
// structure brainstorming:
// primary (default)
//       // the background color
//    -> background
//        // contrast states - all should be derived from base 'background'
//        // all should be legible with foreground text
//        -> high
//        -> medium
//        -> low
//    -> foreground
//        -> text
//            -> primary
//            -> secondary
//        -> border
//            -> primary
//            -> secondary
//        // etc
//    // e.g buttons, links, form input focus state
//    // used for both background and foreground?
//    -> interactive
//        // if there needs to be something on top of an interactive element,
//        // e.g button -> button text
//        -> foreground
//        // different interactivity states
//        -> hover
//            -> foreground
//        -> active
//            -> foreground
// // follows the same structure as default
// secondary
//    -> background
//        -> ...etc
//    -> foreground
//    -> interactive
// 2) think about contrast rules
// 3) ability to define 'tokens' -> colors for reuse throughout theme (separate semantic variable names + encourage reuse)
export const validateTheme = (theme = {}) => {
  const ajv = new Ajv();

  try {
    const parsedTheme = JSON.parse(theme);

    const validate = ajv.compile(schema);
    const isValid = validate(parsedTheme);

    return {
      isValid,
      isValidJSON: true,
      validationErrors: validate.errors || [],
    };
  } catch (e) {
    console.log("e", e.message);
    // invalid JSON
    return { isValid: false, isValidJSON: false, validationErrors: [] };
  }
};

const loadTheme = () => {};
