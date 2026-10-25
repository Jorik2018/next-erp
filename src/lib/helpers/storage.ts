export const saveState = <T>(state: T): void => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('store', serializedState)
  } catch (error) {
    console.error(
      'Could not save Redux state:',
      error instanceof Error ? error.message : error
    )
  }
}

export const loadState = <T>(): T | undefined => {
  if (typeof window === 'undefined') {
    return undefined
  }

  try {
    const serializedState = localStorage.getItem('store')

    if (serializedState === null) {
      return undefined
    }

    return JSON.parse(serializedState) as T
  } catch (error) {
    console.error(
      'Could not load Redux state:',
      error instanceof Error ? error.message : error
    )

    return undefined
  }
}