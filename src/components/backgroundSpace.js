import { renderCanvas } from "./backgroundSpaceCanvas"
import { useEffect, useRef, useState } from "react"
import { renderCanvasWebGL } from "./backgroundSpaceWebGL"

const BackgroundSpace = () => {
  const spaceRef = useRef(null)
  const spaceRefWebGL = useRef(null)
  const supportsWebGL = useRef(false)
  const animationLoopID = useRef(null)
  const glResult = useRef(null)
  const lastStage = useRef(null)

  const [showPreview, setShowPreview] = useState(true)
  const [useWebGL, setUseWebGL] = useState(true)
  const [webGLUnsupported, setWebGLUnsupported] = useState(false)

  const debounce = (callback, delay) => {
    let timer = 0
    return () => {
      setShowPreview(true)
      if (Date.now() - timer > delay()) {
        callback()
      } else {
        setTimeout(() => {
          callback()
          timer = Date.now()
        }, Date.now() - timer)
      }
      timer = Date.now()
    }
  }

  const renderCanvasInternal = (rerender = true, webgl = null) => {
    const tryUseWebGL = webgl === null ? useWebGL : webgl
    const gl = tryUseWebGL
      ? spaceRefWebGL?.current?.getContext("webgl", {
          premultipliedAlpha: false,
          alpha: false,
        })
      : null
    if (gl) {
      if (lastStage.current !== null) {
        for (let child of lastStage.current.children) {
          for (let child2 of child.children) {
            child2.destroy()
          }
          child.destroy()
        }
        lastStage.current.destroy()
      }
      supportsWebGL.current = true
      if (rerender && animationLoopID.current) {
        window.cancelAnimationFrame(animationLoopID.current)
      }
      const glResultOut = renderCanvasWebGL(
        gl,
        rerender,
        glResult.current,
        animationLoopID
      )
      glResult.current = glResultOut
      setShowPreview(false)
    } else {
      if (tryUseWebGL) {
        setWebGLUnsupported(true)
      }
      renderCanvas(spaceRef, lastStage, setShowPreview)
    }
  }

  const debouncedRenderCanvas = debounce(renderCanvasInternal, () =>
    supportsWebGL.current ? 500 : 2500
  )

  const debouncedRenderCanvasResize = debounce(renderCanvasInternal, () => 2500)

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
          onClick={async () => {
            setShowPreview(true)
            setUseWebGL(!useWebGL)
            renderCanvasInternal(false, !useWebGL)
          }}
        >
          {useWebGL ? "<Use Canvas>" : "<Use WebGL>"}
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
        <div id="background-space" ref={spaceRef} />
        <canvas id="background-space-webgl" ref={spaceRefWebGL} />
      </div>
    </>
  )
}

export default BackgroundSpace
