const randomElement = (array, random) =>
  array[Math.floor(random * array.length)]

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (success) {
    return shader
  }

  console.log(gl.getShaderInfoLog(shader))
  gl.deleteShader(shader)
}

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  const success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (success) {
    return program
  }

  console.log(gl.getProgramInfoLog(program))
  gl.deleteProgram(program)
}

function resizeCanvasToDisplaySize(canvas) {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth = canvas.clientWidth
  const displayHeight = canvas.clientHeight

  // Check if the canvas is not the same size.
  const needResize =
    canvas.width !== displayWidth || canvas.height !== displayHeight

  if (needResize) {
    // Make the canvas the same size
    canvas.width = displayWidth
    canvas.height = displayHeight
  }

  return needResize
}

const vertexSize = 3

function setupProgram(gl, vertexShaderSource, fragmentShaderSource) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  )

  const program = createProgram(gl, vertexShader, fragmentShader)
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position")
  const resLocation = gl.getUniformLocation(program, "u_resolution")
  const offsetLocation = gl.getUniformLocation(program, "u_offset")
  const timeLocation = gl.getUniformLocation(program, "u_time")
  const colorLocation = gl.getUniformLocation(program, "u_color")
  const detailUniformLocation = gl.getUniformLocation(program, "u_detail")
  const positionUniformLocation = gl.getUniformLocation(program, "u_position")
  const sizeUniformLocation = gl.getUniformLocation(program, "u_size")

  return [
    program,
    positionAttributeLocation,
    resLocation,
    offsetLocation,
    timeLocation,
    colorLocation,
    detailUniformLocation,
    positionUniformLocation,
    sizeUniformLocation,
  ]
}

function drawBackgroundLayer(
  gl,
  vertexBuffer,
  indexBuffer,
  vertexCount,
  setupResult,
  canvasWidth,
  canvasHeight,
  randomOffset,
  now
) {
  const [
    program,
    positionAttributeLocation,
    resolutionUniformLocation,
    offsetUniformLocation,
    timeUniformLocation,
  ] = setupResult
  gl.useProgram(program)

  // Update uniforms
  gl.uniform1f(timeUniformLocation, now)
  gl.uniform2f(resolutionUniformLocation, canvasWidth, canvasHeight)
  gl.uniform1f(offsetUniformLocation, randomOffset)

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)

  gl.vertexAttribPointer(
    positionAttributeLocation,
    vertexSize,
    gl.FLOAT,
    false,
    0,
    0
  )
  gl.enableVertexAttribArray(positionAttributeLocation)

  gl.disable(gl.BLEND)
  gl.disable(gl.DEPTH_TEST)
  gl.drawElements(gl.TRIANGLES, vertexCount, gl.UNSIGNED_SHORT, 0)
}

function drawLayer(
  gl,
  vertexBuffer,
  indexBuffer,
  vertexCount,
  blendMode,
  setupResult,
  canvasWidth,
  canvasHeight,
  detail,
  color,
  randomOffset,
  now,
  localPosition = null,
  localSize = null
) {
  const [
    program,
    positionAttributeLocation,
    resolutionUniformLocation,
    offsetUniformLocation,
    timeUniformLocation,
    colorUniformLocation,
    detailUniformLocation,
    positionUniformLocation,
    sizeUniformLocation,
  ] = setupResult
  gl.useProgram(program)

  // Update uniforms
  gl.uniform1f(timeUniformLocation, now)
  gl.uniform2f(resolutionUniformLocation, canvasWidth, canvasHeight)
  gl.uniform4f(colorUniformLocation, color[0], color[1], color[2], color[3])
  gl.uniform1f(detailUniformLocation, detail)
  gl.uniform1f(offsetUniformLocation, randomOffset)

  if (localPosition !== null && localSize !== null) {
    gl.uniform2f(positionUniformLocation, localPosition[0], localPosition[1])
    gl.uniform1f(sizeUniformLocation, localSize)
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)

  gl.vertexAttribPointer(
    positionAttributeLocation,
    vertexSize,
    gl.FLOAT,
    false,
    0,
    0
  )
  gl.enableVertexAttribArray(positionAttributeLocation)

  // blending
  gl.enable(gl.BLEND)
  if (blendMode === "additive") {
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.blendEquation(gl.FUNC_ADD)
  } else if (blendMode === "overlay") {
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
  }

  gl.disable(gl.DEPTH_TEST)
  gl.drawElements(gl.TRIANGLES, vertexCount, gl.UNSIGNED_SHORT, 0)
}

function setupWebGL(gl) {
  // eslint-disable-next-line no-undef
  const quadVertices = new Float32Array([
    -1, 1, 0.0, -1, -1, 0.0, 1, -1, 0.0, 1, 1, 0.0,
  ])
  const quadIndices = new Uint16Array([3, 2, 1, 3, 1, 0]) // eslint-disable-line no-undef

  let backgroundProgram = setupProgram(
    gl,
    require("../glsl/basic_position_vertex.glsl"),
    require("../glsl/background_fragment.glsl")
  )

  let cloudLayerProgram = setupProgram(
    gl,
    require("../glsl/basic_position_vertex.glsl"),
    require("../glsl/space_layer_fragment.glsl")
  )

  let cloudLayerBoundedProgram = setupProgram(
    gl,
    require("../glsl/basic_position_vertex.glsl"),
    require("../glsl/space_layer_bounded_fragment.glsl")
  )

  // Vertex Buffer
  const vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  // eslint-disable-next-line no-undef
  gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW)
  gl.bindBuffer(gl.ARRAY_BUFFER, null)

  // Index Buffer
  const indexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, quadIndices, gl.STATIC_DRAW)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

  return [
    vertexBuffer,
    indexBuffer,
    6,
    backgroundProgram,
    cloudLayerProgram,
    cloudLayerBoundedProgram,
  ]
}

export function renderCanvasWebGL(gl, rerender, oldGLResult, animationLoopID) {
  const glResult = rerender ? oldGLResult : setupWebGL(gl)
  const [
    vertexBuffer,
    indexBuffer,
    vertexCount,
    backgroundProgram,
    cloudLayerProgram,
    cloudLayerBoundedProgram,
  ] = glResult

  const accentColors = [
    new Float32Array([0, 0.498, 0.322, 0.8]), // eslint-disable-line no-undef
    new Float32Array([0.686, 0.059, 0.353, 0.8]), // eslint-disable-line no-undef
    new Float32Array([0.8666, 0.302, 0.196, 0.8]), // eslint-disable-line no-undef
    new Float32Array([0.588, 0.133, 0.475, 0.8]), // eslint-disable-line no-undef
    new Float32Array([0.788, 0.827, 0, 0.8]), // eslint-disable-line no-undef
    new Float32Array([0, 0.761, 0.827, 0.8]), // eslint-disable-line no-undef
    new Float32Array([0.827, 0, 0.012, 0.8]), // eslint-disable-line no-undef
  ]
  const darkColor = new Float32Array([0, 0, 0, 0.9]) // eslint-disable-line no-undef
  const layerColors = [
    new Float32Array([0.184, 0.749, 0.816, 0.2]), // eslint-disable-line no-undef
    new Float32Array([0.804, 0, 0.012, 0.24]), // eslint-disable-line no-undef
    new Float32Array([0.263, 0, 0.933, 0.11]), // eslint-disable-line no-undef
  ]

  resizeCanvasToDisplaySize(gl.canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  const layerOffsets = []
  for (let i = 0; i < 25; i++) {
    layerOffsets.push(
      Math.floor(i * gl.canvas.width * 100 + Math.random() * gl.canvas.width)
    )
  }

  const darknessOffsets = []
  const darknessLocalOffsets = []
  for (let i = 0; i < Math.round(Math.random() * 3) + 1; i++) {
    darknessOffsets.push(
      Math.floor(i * gl.canvas.width * 100 + Math.random() * gl.canvas.width)
    )
    darknessLocalOffsets.push([
      Math.floor(Math.random() * gl.canvas.width),
      Math.floor(Math.random() * gl.canvas.height),
    ])
  }

  const selectedAccentColors = []
  const accentOffsets = []
  const accentLocalOffsets = []
  const accentDetails = []
  for (let i = 0; i < Math.round(Math.random() * 4); i++) {
    selectedAccentColors.push(randomElement(accentColors, Math.random()))
    accentOffsets.push(
      Math.floor(i * gl.canvas.width * 100 + Math.random() * gl.canvas.width)
    )
    accentLocalOffsets.push([
      Math.floor(Math.random() * gl.canvas.width),
      Math.floor(Math.random() * gl.canvas.height),
    ])
    accentDetails.push(Math.random() * 3 + 1.25)
  }

  const renderSize = 4
  const largerScale =
    gl.canvas.width > gl.canvas.height ? gl.canvas.width : gl.canvas.height
  const renderScale = largerScale / renderSize

  const doRender = now => {
    // Clear the canvas
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.clear(gl.DEPTH_BUFFER_BIT)

    const scaledTime = now * 0.00005

    drawBackgroundLayer(
      gl,
      vertexBuffer,
      indexBuffer,
      vertexCount,
      backgroundProgram,
      largerScale,
      largerScale,
      layerOffsets[0],
      scaledTime
    )

    drawLayer(
      gl,
      vertexBuffer,
      indexBuffer,
      vertexCount,
      "additive",
      cloudLayerProgram,
      renderScale,
      renderScale,
      1.5,
      layerColors[0],
      layerOffsets[1],
      scaledTime
    )

    drawLayer(
      gl,
      vertexBuffer,
      indexBuffer,
      vertexCount,
      "additive",
      cloudLayerProgram,
      renderScale,
      renderScale,
      1.5,
      layerColors[1],
      layerOffsets[2],
      scaledTime
    )

    drawLayer(
      gl,
      vertexBuffer,
      indexBuffer,
      vertexCount,
      "additive",
      cloudLayerProgram,
      renderScale,
      renderScale,
      1.5,
      layerColors[2],
      layerOffsets[3],
      scaledTime
    )

    // Darkening clouds
    for (let i = 0; i < darknessOffsets.length; i++) {
      drawLayer(
        gl,
        vertexBuffer,
        indexBuffer,
        vertexCount,
        "overlay",
        cloudLayerBoundedProgram,
        renderScale,
        renderScale,
        1.25,
        darkColor,
        darknessOffsets[i],
        0,
        darknessLocalOffsets[i],
        150
      )
    }

    for (let i = 0; i < selectedAccentColors.length; i++) {
      drawLayer(
        gl,
        vertexBuffer,
        indexBuffer,
        vertexCount,
        "additive",
        cloudLayerBoundedProgram,
        renderScale,
        renderScale,
        accentDetails[i],
        selectedAccentColors[i],
        accentOffsets[i],
        scaledTime * 0.45,
        accentLocalOffsets[i],
        60
      )
    }
    animationLoopID.current = window.requestAnimationFrame(doRender)
  }
  animationLoopID.current = window.requestAnimationFrame(doRender)
  return glResult
}
