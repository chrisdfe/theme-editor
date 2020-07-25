# TODO

- Add 'GoalRevision' resource + the ability to update Goals without affecting past (e.g changing 'work out for 20 minutes' to '40 minutes' after a week - it shouldn't affect the past week of reaching the goal of 20 minutes)
- Add Goal validation
- Add confirmation modals to destructive actions (i.e delete goal)
- Figure out a better way of implementing 'LinkButton' - looks idential to a button but is a link
- move selectors to store/ (they shouldn't just be anonymous functions inside useSelector)
- EditGoalPage should go back to previous page after submission
- EditGoalPage submit button should say "create goal" if the goal is new (right now it always says 'update')
- Add NumberInput component
- Change TextInput/NumberInput to pass the 'value' into onChange, not 'event.target.value'
- Move away from current theme system & use my own theme format instead
- Textarea shouldnt use Input class (same problem as LinkButton)
- switch to redux for setTheme
- Put CalendarGrid and Navbar into subfolders ('misc' and 'layout'? could CalendarGrid a form component)
- Add local persistence to current theme (so I don't have to keep entering in the same values each time)
- nest action payloads inside of a 'payload' object
- experiment with using react-helmet to insert theme style variables into app
- stop mocking state in action tests
- nest entities inside of editing one more level (editing/entities), to separate them from lookup tables etc
- Write tests for the experimental copy/editing stuff I threw together
- Expand/collapse accordions
- Change over to new theme format
  - white/black theme
  - black/white theme
- replace 'omit' with a more performant version (https://levelup.gitconnected.com/omit-is-being-removed-in-lodash-5-c1db1de61eaf)
- better api for Commands
  - const { saveTheme } = useCommands();
- theme spec
  - defines the colorTokenGroups/what colorTokens each group has
- fully switch over to namespaced action naming convention ("themes/updated", "themes/editing/updated")
- Look into abstracting common CRUD actions/reducers out
- objectDiff is returning the whole object if one of its fields is different - it should just be the field that is different eg
  { themes: { name: ['theme', 'new theme name'] }}
  instead of (what it is now)
  { themes: [{ name: 'theme', ... }, { name: 'new theme name', ... }]}
- Handle 2 theme files containing the same theme - duplicate id error
- fix objectDiff tests
- Change 'swatches' to 'swatchGroup' and 'swatchColor' to 'swatch'
- Debounced TextInput
- Split byId/allIds in editing reducers up into separate files like they are in entities
- Look into reducing duplication between editing/entities reducers (i.e just pull things out into functions that both can import)

## MVP themeeditor

- Normalize/denormalize swatch
- 'directory' redux object
  - themes
  - swatches
- Add/remove theme directories (via redux + persist in appData)
  - relation to theme via 'directoryId'
- Add/remove swatch directories (via redux + persist in appData)
  - relation to swatch via 'directoryId'
- Save swatch to file
- Load swatch from file

# Done

- Move form components into a 'forms/' subfolder
- Add nicer-looking select dropdowns
- Add nicer-looking radio buttons
- basic form input styles
- rename 'Input' to 'TextInput' - don't justuse html 'type' attribute to specify input type
- Add design system page
- Get rid of all of these relative imports
- Move components into renderer/
- Create a 'Theme editor' page
- ProgressLogger should use ds components
- Put router into separate file
- Add Row/Column components
- Basic page layout components
- switch the argument order for createReducers
- switch from mocha/chai to jest
- sublime (tmTheme) -> json/swatch color converter script
- Implement the Page/Grid components in the app itself
- Switch to using redux for ThemeEditor themes/swatches/colorTokens
- Basic page layout components
- Cancel button to clear editing state
- Normalize/denormalize theme
- When creating a new theme + editing, don't add it to the main entities state first
- "Commands" - top level functions/actions to be called from menus or keyboard combinations
- Diffing function to determine whether theme/relations have had any changes made
  - Add something to editing reducer to save a copy of theme/relations when the editing started
    in order to be able to perform this diff
- Save theme to file
- Load theme from file
- Split theme editor out into separate app
- switch redux state from arrays to an object with id keys
- 'themeBundle' actions - 'addThemeBundle', 'types.ADD_THEME_BUNDLE' etc
