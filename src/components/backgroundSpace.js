import { renderCanvas } from "./backgroundSpaceCanvas"
import { useEffect, useRef, useState } from "react"
import { renderCanvasWebGL } from "./backgroundSpaceWebGL"

const BackgroundSpace = () => {
  const konvaContainerRef = useRef(null)
  const webGLCanvasRef = useRef(null)
  const animationLoopID = useRef(null)
  const glResult = useRef(null)
  const lastStage = useRef(null)

  const [showPreview, setShowPreview] = useState(true)
  const [useWebGL, setUseWebGL] = useState(true)
  const [webGLUnsupported, setWebGLUnsupported] = useState(false)
  const [fps, setFPS] = useState(45)

  function debounce(func, delay) {
    let timeoutId
    return () => {
      setShowPreview(true)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func()
      }, delay())
    }
  }

  const cleanup = () => {
    if (lastStage.current !== null) {
      for (let child of lastStage.current.children) {
        for (let child2 of child.children) {
          child2.destroy()
        }
        child.destroy()
      }
      lastStage.current.destroy()
      lastStage.current = null
    }
    if (animationLoopID.current) {
      window.cancelAnimationFrame(animationLoopID.current)
      animationLoopID.current = null
    }
  }

  const renderCanvasInternal = (rerender = true, webgl = null) => {
    cleanup()
    const tryUseWebGL = webgl === null ? useWebGL : webgl
    const gl = tryUseWebGL
      ? webGLCanvasRef?.current?.getContext("webgl", {
          premultipliedAlpha: false,
          alpha: false,
        })
      : null
    if (gl) {
      if (
        webGLCanvasRef.current &&
        window.getComputedStyle(webGLCanvasRef.current).display == "none"
      ) {
        return
      }
      const glResultOut = renderCanvasWebGL(
        gl,
        rerender,
        glResult.current,
        animationLoopID,
        fps,
        setFPS
      )
      glResult.current = glResultOut
    } else {
      if (
        konvaContainerRef.current &&
        window.getComputedStyle(konvaContainerRef.current).display == "none"
      ) {
        return
      }
      if (tryUseWebGL) {
        setWebGLUnsupported(true)
      }
      lastStage.current = renderCanvas(konvaContainerRef)
    }
    setShowPreview(false)
  }

  const switchUse = async () => {
    setShowPreview(true)
    setUseWebGL(oldUseWebGL => {
      renderCanvasInternal(false, !oldUseWebGL)
      return !oldUseWebGL
    })
  }

  const debouncedSwitchUse = debounce(switchUse, () => 500)

  const debouncedRenderCanvas = debounce(renderCanvasInternal, () =>
    useWebGL ? 500 : 2500
  )

  const debouncedRenderCanvasResize = debounce(renderCanvasInternal, () =>
    useWebGL ? 750 : 2500
  )

  useEffect(() => {
    if (!window) {
      return
    }

    window.addEventListener("resize", debouncedRenderCanvasResize)
    if (window.HTMLCanvasElement) renderCanvasInternal(false)
    return () => {
      window.removeEventListener("resize", debouncedRenderCanvasResize)
      if (animationLoopID.current)
        window.cancelAnimationFrame(animationLoopID.current) // eslint-disable-line react-hooks/exhaustive-deps
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <button
        type="button"
        className="background-space-button"
        onClick={async () => {
          if (showPreview) return
          debouncedRenderCanvas()
        }}
      >
        {showPreview ? "..." : "Regenerate"}
      </button>
      {webGLUnsupported ? null : (
        <button
          type="button"
          className="background-space-button-2"
          onClick={debouncedSwitchUse}
        >
          {useWebGL ? `WebGL (${fps}FPS)` : "Canvas (Static)"}
        </button>
      )}
      <div
        className={`background-stars-wrapper ${
          showPreview
            ? "background-stars-wrapper-preview"
            : "background-stars-wrapper-live"
        }`}
      >
        <div className="background-stars" />
        <div id="background-space" ref={konvaContainerRef} />
        <canvas id="background-space-webgl" ref={webGLCanvasRef} />
      </div>
    </>
  )
}

export default BackgroundSpace
