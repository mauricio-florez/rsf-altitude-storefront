import { useEffect, useState } from 'react'

/**
 *
 * @param {*} query media query
 * @returns if query match viewport size
 */
function useMediaQuery(query) {
  const [matches, setMatches]= useState(false)

  useEffect(() => {
    const matchQueryList = window.matchMedia(query)

    function handleChange({ matches }) {
      setMatches(matches)
    }

    handleChange(matchQueryList)

    matchQueryList.addEventListener('change', handleChange)

    return () => {
      matchQueryList.removeEventListener('change', handleChange)
    }
  }, [query])
  
  return matches
}

export default useMediaQuery
