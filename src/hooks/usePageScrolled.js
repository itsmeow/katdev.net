import { useState, useEffect } from "react"

export default function usePageScrolled() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function scroll() {
      setScrolled(window.pageYOffset > 0)
    }

    window.addEventListener("scroll", scroll)
    return () => window.removeEventListener("scroll", scroll)
  }, [])

  return scrolled
}
