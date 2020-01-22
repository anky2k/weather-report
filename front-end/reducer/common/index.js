export default function reducerTemplate (stateNameSpace = 'global') {
  return function (state = {}, action) {
    const { payload = {}, type = {} } = action
    switch (type) {
      case `${stateNameSpace}_ERROR`: {
        return {
          ...state,
          ...payload
        }
      }

      case `${stateNameSpace}_START`: {
        return {
          ...state,
          ...payload
        }
      }

      case `${stateNameSpace}_UPDATE`: {
        return {
          ...state,
          ...payload
        }
      }

      default: {
        return state
      }
    }
  }
}
