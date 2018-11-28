import copy from 'copy-to-clipboard';
import { blankState, newCell, newCellID, newNotebook } from '../state-prototypes';
import { exportJsmdBundle, exportJsmdToString, stateFromJsmd, stringifyStateToJsmd, titleToHtmlFilename } from '../tools/jsmd-tools';

const AUTOSAVE = 'AUTOSAVE: '

function newAppMessage(appMessageId, appMessageText, appMessageDetails, appMessageWhen) {
  return {
    id: appMessageId,
    message: appMessageText,
    details: appMessageDetails,
    when: appMessageWhen,
  }
}

function addAppMessageToState(state, appMessage) {
  const nextAppMessageId = newCellID(state.appMessages)
  state.appMessages
    .push(newAppMessage(nextAppMessageId, appMessage.message, appMessage.details, appMessage.when))
  return state
}

function getSavedNotebooks() {
  const autoSave = Object.keys(localStorage).filter(n => n.includes(AUTOSAVE))[0]
  const locallySaved = Object.keys(localStorage).filter(n => !n.includes(AUTOSAVE))
  locallySaved.sort((a, b) => {
    const p = (_) => {
      let ls: any = localStorage.getItem(_)
      if (!ls) return -1
      ls = stateFromJsmd(ls)
      return Date.parse(ls.lastSaved)
    }
    return p(b) - p(a)
  })
  return {
    autoSave,
    locallySaved,
  }
}

function getUserData() {
  //@ts-ignore
  return { userData: window.userData || {} }
}

function clearHistory(loadedState) {
  // TODO: Don't assign to passed parameter

  /* eslint-disable */
  // remove history and declared properties before exporting the state.
  loadedState.userDefinedVarNames = []
  loadedState.history = []
  loadedState.externalDependencies = []
  loadedState.executionNumber = 0
  loadedState.cells = [...loadedState.cells.slice()]
  loadedState.cells.forEach((cell) => {
    cell.evalStatus = undefined
    if (cell.cellType === 'code' || cell.cellType === 'external dependencies') cell.value = undefined
  })
  /* eslint-enable */
}

function clearUserDefinedVars(userDefinedVarNames) {
  // remove user defined variables when loading/importing a new/saved NB
  userDefinedVarNames.forEach((varName) => {
    try {
      delete window[varName]
    } catch (e) {
      console.log(e)
    }
  })
}

const initialVariables = new Set(Object.keys(window)) // gives all global variables
initialVariables.add('__core-js_shared__')
initialVariables.add('Mousetrap')
initialVariables.add('CodeMirror')

const notebookReducer = (state = newNotebook(), action) => {
  let nextState
  let title
  let cells

  switch (action.type) {
    case 'NEW_NOTEBOOK':
      clearUserDefinedVars(state.userDefinedVarNames)
      return Object.assign(newNotebook(), getSavedNotebooks(), getUserData())

    case 'EXPORT_NOTEBOOK': {
      const exportState = Object.assign(
        {},
        state,
        { viewMode: action.exportAsReport ? 'presentation' : 'editor' },
      )
      if (action.exportToClipboard) {
        const jsmdStr = encodeURIComponent(exportJsmdToString(exportState))
        copy(`${window.location.href.split('?')[0]}?jsmd=${jsmdStr}`)
      } else {
        const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(exportJsmdBundle(exportState))}`
        const dlAnchorElem = document.getElementById('export-anchor')
        dlAnchorElem.setAttribute('href', dataStr)
        title = exportState.title === undefined ? 'new-notebook' : exportState.title
        dlAnchorElem.setAttribute('download', titleToHtmlFilename(title))
        dlAnchorElem.click()
      }

      return state
    }

    case 'IMPORT_NOTEBOOK': {
    // note: loading a NB should always assign to a copy of the latest global
    // and per-cell state for backwards compatibility
      nextState = action.newState
      clearUserDefinedVars(state.userDefinedVarNames)
      clearHistory(nextState)
      cells = nextState.cells.map((cell, i) =>
        Object.assign(newCell(i, cell.cellType), cell))
      return Object.assign(
        blankState(), nextState, { cells }, getSavedNotebooks(),
        getUserData(),
      )
    }

    case 'SAVE_NOTEBOOK': {
      ({ title } = state)
      let lastSaved
      if (!action.autosave) {
        lastSaved = (new Date()).toISOString()
      } else {
        ({ lastSaved } = state)
        title = AUTOSAVE + title
      }
      nextState = Object.assign({}, state, { lastSaved }, {
        cells: state.cells.slice().map((c) => {
          const newC = Object.assign({}, c)
          newC.evalStatus = undefined
          if (newC.cellType === 'code' || newC.cellType === 'external dependencies') {
            newC.value = undefined
          }
          return newC
        }),
      }, { title: state.title })
      clearHistory(nextState)
      window.localStorage.setItem(title, stringifyStateToJsmd(nextState))
      return Object.assign({}, state, { lastSaved }, getSavedNotebooks())
    }

    case 'LOAD_NOTEBOOK': {
      clearUserDefinedVars(state.userDefinedVarNames)
      nextState = stateFromJsmd(window.localStorage.getItem(action.title))
      clearHistory(nextState)
      // note: loading a NB should always assign to a copy of the latest global
      // and per-cell state for backwards compatibility
      cells = nextState.cells.map((cell, i) =>
        Object.assign(newCell(i, cell.cellType), cell))
      return Object.assign(blankState(), nextState, getSavedNotebooks(), getUserData())
    }

    case 'DELETE_NOTEBOOK': {
      ({ title } = action)

      // FIXME: for some reason, airbnb-eslint doesn't like using hasOwnProperty
      // but changing to the recommended syntax breaks a test b/c our localStorage
      // mock is bare-bones. We could upgrade the mock or change the approach
      if (window.localStorage.hasOwnProperty(title)) { // eslint-disable-line
        window.localStorage.removeItem(title)
      }
      nextState = (
        (title === state.title) ?
          Object.assign({}, newNotebook()) :
          Object.assign({}, state)
      )
      return nextState
    }

    case 'CLEAR_VARIABLES': {
      clearUserDefinedVars(state.userDefinedVarNames)
      nextState = Object.assign({}, state)
      nextState.userDefinedVarNames = {}
      nextState.externalDependencies = []
      return nextState
    }

    case 'CHANGE_PAGE_TITLE':
      return Object.assign({}, state, { title: action.title })

    case 'SET_VIEW_MODE': {
      const { viewMode } = action
      return Object.assign({}, state, { viewMode })
    }

    case 'CHANGE_MODE': {
      const { mode } = action
      return Object.assign({}, state, { mode })
    }

    case 'CHANGE_SIDE_PANE_MODE': {
      return Object.assign({}, state, { sidePaneMode: action.mode })
    }

    case 'CHANGE_SIDE_PANE_WIDTH': {
      const width = state.sidePaneWidth + action.widthShift
      return Object.assign({}, state, { sidePaneWidth: width })
    }

    case 'INCREMENT_EXECUTION_NUMBER': {
      let { executionNumber } = state
      executionNumber += 1
      return Object.assign({}, state, { executionNumber })
    }

    case 'LOGIN_SUCCESS': {
      const { userData } = action
      return Object.assign({}, state, { userData })
    }

    case 'LOGOUT': {
      const userData = {}
      return Object.assign({}, state, { userData })
    }

    case 'APPEND_TO_EVAL_HISTORY': {
      const history = [...state.history]
      history.push({
        cellID: action.cellId,
        lastRan: new Date(),
        content: action.content,
      })
      return Object.assign({}, state, { history })
    }

    case 'UPDATE_USER_VARIABLES': {
      const userDefinedVarNames = []
      Object.keys(window)
        .filter(g => !initialVariables.has(g))
        .forEach((g) => { userDefinedVarNames.push(g) })
      return Object.assign({}, state, { userDefinedVarNames })
    }

    case 'UPDATE_APP_MESSAGES': {
      nextState = Object.assign({}, state)
      nextState.appMessages = nextState.appMessages.slice()
      return addAppMessageToState(nextState, Object.assign({}, action.message))
    }

    case 'TEMPORARILY_SAVE_RUNNING_CELL_ID': {
      const { cellID } = action
      return Object.assign({}, state, { runningCellID: cellID })
    }

    case 'SAVE_ENVIRONMENT': {
      let newSavedEnvironment
      if (action.update) {
        newSavedEnvironment = Object
          .assign({}, state.savedEnvironment, action.updateObj)
      } else {
        newSavedEnvironment = action.updateObj
      }
      return Object.assign({}, state, { savedEnvironment: newSavedEnvironment })
    }

    case 'ADD_LANGUAGE': {
      const languages = Object.assign(
        {},
        state.languages,
        { [action.languageDefinition.languageId]: action.languageDefinition },
      )
      return Object.assign({}, state, { languages })
    }

    default: {
      return state
    }
  }
}

export { notebookReducer as default, notebookReducer, getSavedNotebooks, getUserData };

//export default notebookReducer
