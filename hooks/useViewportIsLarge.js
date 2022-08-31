import useMediaQuery from './useMediaQuery'

/**
 *
 * @returns if viewport size is meet (min-width: 768px)
 */
function useViewportIsLarge() {
  return useMediaQuery('(min-width: 768px)')
}

export default useViewportIsLarge
