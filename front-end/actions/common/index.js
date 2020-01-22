export function errorFetchTemplate (stateNameSpace = 'global') {
  return (payload, stateNameSpace) => ({
    type: `${stateNameSpace}_ERROR`,
    payload,
    stateNameSpace
  })
}

// Start the fetch, toggle is `isLoading` value
export function startFetchTemplate (stateNameSpace = 'global') {
  return (payload, stateNameSpace) => ({
    type: `${stateNameSpace}_START`,
    payload,
    stateNameSpace
  })
}

/**
   * Resolve the fetch with the returned data
   * @param {object} payload - the data returned from the fetch
   */

export function updateFetchTemplate (stateNameSpace = 'global') {
  return (payload, stateNameSpace) => ({
    type: `${stateNameSpace}_UPDATE`,
    payload,
    stateNameSpace
  })
}
