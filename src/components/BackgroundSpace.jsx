'use client'
import { renderCanvas } from './backgroundSpaceCanvas'
import { useEffect, useRef, useState } from 'react'
import { renderCanvasWebGL } from './backgroundSpaceWebGL'
import { FaAngleDoubleRight } from 'react-icons/fa'
import { FaGears } from 'react-icons/fa6'

const BackgroundSpace = () => {
    const konvaContainerRef = useRef(null)
    const webGLCanvasRef = useRef(null)
    const animationLoopID = useRef(null)
    const glResult = useRef(null)
    const lastStage = useRef(null)
    const frozeLastRender = useRef(false)

    const [showPreview, setShowPreview] = useState(true)
    const [webGLUnsupported, setWebGLUnsupported] = useState(false)
    const [fps, setFPS] = useState(45)
    const [buttonsVisible, setButtonsVisible] = useState(false)

    function debounce(func, delay) {
        let timeoutId
        return () => {
            setShowPreview(true)
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                func()
            }, delay)
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

    const renderCanvasInternal = (rerender = true, fps = 45) => {
        cleanup()
        const gl = webGLUnsupported
            ? null
            : webGLCanvasRef?.current?.getContext('webgl', {
                  premultipliedAlpha: false,
                  alpha: false,
              })
        if (gl) {
            if (
                webGLCanvasRef.current &&
                window.getComputedStyle(webGLCanvasRef.current).display ==
                    'none'
            ) {
                return
            }
            const glResultOut = renderCanvasWebGL(
                gl,
                rerender,
                glResult.current,
                animationLoopID,
                fps,
                setFPS,
                frozeLastRender
            )
            glResult.current = glResultOut
        } else {
            // Fallback method using Canvas API
            setWebGLUnsupported(true)
            if (
                konvaContainerRef.current &&
                window.getComputedStyle(konvaContainerRef.current).display ==
                    'none'
            ) {
                return
            }
            lastStage.current = renderCanvas(konvaContainerRef)
        }
        setShowPreview(false)
    }

    const switchUse = async () => {
        // Do nothing, it was locked by the WebGL engine at static
        if (fps === -1) {
            return
        }
        setShowPreview(true)
        setFPS((oldFPS) => {
            if (oldFPS > 0) {
                cleanup()
                renderCanvasInternal(true, 0)
                return 0
            } else {
                cleanup()
                renderCanvasInternal(true, 45)
                return 45
            }
        })
    }

    const debouncedSwitchUse = debounce(switchUse, 750)

    const debouncedRenderCanvas = debounce(
        () => renderCanvasInternal(false, fps),
        500
    )

    // When the browser freezes a tab and resumes it, the FPS handler gets confused and can lock the renderer
    const handleDocumentResume = () => {
        frozeLastRender.current = true
    }

    const handleDocumentVisibility = () => {
        if (!document.hidden) {
            frozeLastRender.current = true
            renderCanvasInternal(true, fps)
        } else {
            // Document is hidden. Let's stop rendering for now.
            cleanup()
        }
    }

    useEffect(() => {
        if (!window || !document) {
            return
        }

        window.addEventListener('resize', debouncedRenderCanvas)
        document.addEventListener('resume', handleDocumentResume)
        document.addEventListener('visibilitychange', handleDocumentVisibility)
        if (window.HTMLCanvasElement) renderCanvasInternal(false)
        return () => {
            window.removeEventListener('resize', debouncedRenderCanvas)
            document.removeEventListener('resume', handleDocumentResume)
            document.removeEventListener(
                'visibilitychange',
                handleDocumentVisibility
            )
            if (animationLoopID.current)
                window.cancelAnimationFrame(animationLoopID.current) // eslint-disable-line react-hooks/exhaustive-deps
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <button
                type="button"
                className="background-space-button-collapse"
                style={{
                    right: !buttonsVisible ? '8px' : undefined,
                }}
                onClick={() => setButtonsVisible((v) => !v)}
            >
                {!buttonsVisible ? <FaGears /> : <FaAngleDoubleRight />}
            </button>
            {webGLUnsupported ? null : (
                <button
                    type="button"
                    className="background-space-button-2"
                    style={{
                        right: !buttonsVisible ? '-120vw' : undefined,
                    }}
                    onClick={debouncedSwitchUse}
                    disabled={fps === -1 || !buttonsVisible}
                >
                    {fps > 0 ? `WebGL (${fps}FPS)` : 'WebGL (Static)'}
                </button>
            )}
            <button
                type="button"
                className="background-space-button"
                style={{
                    right: !buttonsVisible ? '-120vw' : undefined,
                }}
                onClick={async () => {
                    if (showPreview || !buttonsVisible) return
                    debouncedRenderCanvas()
                }}
                disabled={!buttonsVisible}
            >
                {showPreview ? '...' : 'Regenerate'}
            </button>
            <div
                className={`background-stars-wrapper ${
                    showPreview
                        ? 'background-stars-wrapper-preview'
                        : 'background-stars-wrapper-live'
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
