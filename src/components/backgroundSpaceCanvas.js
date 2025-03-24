import Konva from "konva"
import { createNoise2D } from "simplex-noise"

const randomElement = array => array[Math.floor(Math.random() * array.length)]

const accentColors = [
  "#007F52",
  "#AF0F5A",
  "#DD4D32",
  "#962279",
  "#C9D300",
  "#00C2D3",
  "#D30003",
]

const StarsFilter = imageData => {
  for (let i = 0; i < imageData.data.length; i += 4) {
    if (Math.random() > 0.001) {
      continue
    }
    let v = 215 + Math.floor(Math.random() * 40 - 20)
    imageData.data[i] = v
    imageData.data[i + 1] = v
    imageData.data[i + 2] = v
  }
}

const perlinCache = {}

const perlinFilter = (
  id,
  canvasWidth,
  canvasHeight,
  resolution,
  octaves,
  roughness,
  localize,
  localizationSize = 30
) => {
  let octaveNoise = perlinCache[id]
  if (!octaveNoise) {
    perlinCache[id] = []
    for (let i = 0; i < octaves; i++) {
      perlinCache[id].push(createNoise2D())
    }
    octaveNoise = perlinCache[id]
  }
  return imageData => {
    let xCoord = 0
    let yCoord = 0
    if (localize) {
      xCoord = Math.random() * canvasWidth
      yCoord = Math.random() * canvasHeight
    }
    for (let x = 0; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
        const pos = x + y * imageData.width

        if (localize) {
          const distance = Math.pow(xCoord - x, 2) + Math.pow(yCoord - y, 2)
          const calculatedAlpha = Math.min(
            Math.max(
              255 -
                (distance / (canvasWidth * canvasHeight)) *
                  localizationSize *
                  255,
              0
            ),
            255
          )
          // we can skip perlin generation for this entire coordinate! :)
          if (calculatedAlpha < 1) {
            imageData.data[pos * 4] = 0
            imageData.data[pos * 4 + 1] = 0
            imageData.data[pos * 4 + 2] = 0
            imageData.data[pos * 4 + 3] = 0
            continue
          }
          imageData.data[pos * 4 + 3] = calculatedAlpha
        }

        let fscale = 1
        let maxamp = 0
        let amp = 1
        let sum = 0
        for (let i = 0; i < octaves; i++) {
          let t = octaveNoise[Math.min(octaveNoise.length, i)](
            x * fscale * (1 / resolution),
            y * fscale * (1 / resolution)
          )
          sum += t * amp
          maxamp += amp
          amp *= roughness
          fscale *= 2
        }

        let noiseVal = (sum / maxamp + 0.5) * 0.5 + 0.25
        let result = 1 - noiseVal

        imageData.data[pos * 4] *= result
        imageData.data[pos * 4 + 1] *= result
        imageData.data[pos * 4 + 2] *= result
      }
    }
  }
}

export async function renderCanvas(spaceRef, lastStage, setShowPreview) {
  if (!spaceRef.current || !window || !window.HTMLCanvasElement) {
    return
  }
  // no memory leaking pls
  if (lastStage.current) {
    for (let child of lastStage.current.children) {
      for (let child2 of child.children) {
        child2.destroy()
      }
      child.destroy()
    }
    lastStage.current.destroy()
  }
  const canvas = spaceRef.current
  // Optimizations
  Konva.pixelRatio = 1
  Konva.autoDrawEnabled = false

  // Adaptive canvas size

  let canvasWidth = window.innerWidth
  let canvasHeight = window.innerHeight

  const maxSize = 500

  if (window.innerWidth > maxSize || window.innerHeight > maxSize) {
    const ratio = window.innerWidth / window.innerHeight
    canvasWidth = maxSize * ratio
    canvasHeight = maxSize
  }

  const stage = new Konva.Stage({
    container: canvas,
    width: window.innerWidth,
    height: window.innerHeight,
    scaleX: window.innerWidth / canvasWidth,
    scaleY: window.innerHeight / canvasHeight,
  })
  lastStage.current = stage

  // BG
  const backgroundLayer = new Konva.Layer({
    clearBeforeDraw: true,
    listening: false,
  })

  const backgroundRect = new Konva.Rect({
    x: 0,
    y: 0,
    width: canvasWidth,
    height: canvasHeight,
    fill: "#090316",
    listening: false,
  }).cache()
  backgroundLayer.add(backgroundRect)

  // Main space clouds
  const perlinNoise1 = new Konva.Rect({
    x: 0,
    y: 0,
    width: canvasWidth,
    height: canvasHeight,
    fill: "#2FBFD0",
    opacity: 0.2,
    globalCompositeOperation: "lighter",
    listening: false,
    perfectDrawEnabled: false,
  })
    .filters([perlinFilter("1", canvasWidth, canvasHeight, 200, 5, 0.5)])
    .cache()
  backgroundLayer.add(perlinNoise1)

  const perlinNoise2 = new Konva.Rect({
    x: 0,
    y: 0,
    width: canvasWidth,
    height: canvasHeight,
    fill: "#CD0003",
    opacity: 0.24,
    globalCompositeOperation: "lighter",
    listening: false,
    perfectDrawEnabled: false,
  })
    .filters([perlinFilter("2", canvasWidth, canvasHeight, 200, 5, 0.5)])
    .cache()
  backgroundLayer.add(perlinNoise2)

  const perlinNoise3 = new Konva.Rect({
    x: 0,
    y: 0,
    width: canvasWidth,
    height: canvasHeight,
    fill: "#4300EE",
    opacity: 0.11,
    globalCompositeOperation: "lighter",
    listening: false,
    perfectDrawEnabled: false,
  })
    .filters([perlinFilter("3", canvasWidth, canvasHeight, 200, 5, 0.5)])
    .cache()
  backgroundLayer.add(perlinNoise3)

  // Darkening clouds
  for (let i = 0; i < 3 + Math.round(Math.random() * 2); i++) {
    const darkeningNoise = new Konva.Rect({
      x: 0,
      y: 0,
      width: canvasWidth,
      height: canvasHeight,
      fill: "#000000",
      opacity: 0.7,
      globalCompositeOperation: "darken",
      listening: false,
      perfectDrawEnabled: false,
    })
      .filters([
        perlinFilter(
          `dark_${i}`,
          canvasWidth,
          canvasHeight,
          300,
          3,
          0.5,
          true,
          15
        ),
      ])
      .cache()
    backgroundLayer.add(darkeningNoise)
  }

  // Accent clouds
  for (let i = 0; i < Math.round(Math.random() * 4); i++) {
    const accentNoise = new Konva.Rect({
      x: 0,
      y: 0,
      width: canvasWidth,
      height: canvasHeight,
      fill: randomElement(accentColors),
      opacity: 0.8,
      globalCompositeOperation: "lighten",
      listening: false,
      perfectDrawEnabled: false,
    })
      .filters([
        perlinFilter(
          `decor_${i}`,
          canvasWidth,
          canvasHeight,
          300,
          5,
          0.5,
          true,
          35
        ),
      ])
      .cache()
    backgroundLayer.add(accentNoise)
  }

  // White stars
  const starNoise = new Konva.Rect({
    x: 0,
    y: 0,
    width: canvasWidth,
    height: canvasHeight,
    fill: "#000000",
    globalCompositeOperation: "lighten",
    listening: false,
    perfectDrawEnabled: false,
  })
    .filters([StarsFilter])
    .cache()
  backgroundLayer.add(starNoise)

  stage.add(backgroundLayer)
  setShowPreview(false)
}
