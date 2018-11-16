var spriteWidth = null
var spriteHeight = null
var fileWidth = 1
var fileHeight = 1
var source
var img
var includeSource = true

function changeFile(files) {
  var reader = new FileReader()
  var preview = document.querySelector('#preview')

  reader.addEventListener('load', function () {
    preview.src = reader.result

    applyImage(reader.result)
  })

  reader.readAsDataURL(files[0])
}

function applyImage(source, callback) {
  img = new Image()
  img.src = source
  img.onload = function () {
    applyOptions({
      fileWidth: img.width,
      fileHeight: img.height,
      source: source
    })
  }
}

function applyOptions(options) {
  if (options.width !== undefined) {
    console.log('Applying width ' + options.width)

    spriteWidth = parseInt(options.width, 10)
  }

  if (options.height !== undefined) {
    console.log('Applying height ' + options.height)

    spriteHeight = parseInt(options.height, 10)
  }

  if (options.fileWidth !== undefined) {
    console.log('Applying fileWidth ' + options.fileWidth)

    fileWidth = parseInt(options.fileWidth, 10)
  }

  if (options.fileHeight !== undefined) {
    console.log('Applying fileHeight ' + options.fileHeight)

    fileHeight = parseInt(options.fileHeight, 10)
  }

  if (options.source !== undefined) {
    console.log('Applying source ' + options.source)

    source = options.source
  }

  if (options.includeSource !== undefined) {
    console.log('Applying source ' + options.includeSource)

    includeSource = options.includeSource
  }
}

function validateOptions () {
  if (
    sprite !== null &&
    spriteWidth !== null &&
    spriteHeight !== null &&
    fileWidth % spriteWidth === 0 &&
    fileHeight === spriteHeight
  ) {
    return true
  }
  return false
}

function renderFlipped () {
  if (!validateOptions()) {
    return alert('something is wrong')
  }

  var canvas = document.createElement('canvas')
  canvas.width = img.width
  if (includeSource) {
    canvas.height = img.height * 2
  } else {
    canvas.height = img.height
  }
  var ctx = canvas.getContext('2d')

  var offsetY = 0

  if (includeSource) {
    ctx.drawImage(img, 0, 0)
    offsetY = img.height
  }

  for (var x = 0; x < img.width; x += spriteWidth) {
    ctx.save()
    ctx.translate(x + spriteWidth, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(
      img,
      x,
      0,
      spriteWidth,
      spriteHeight,
      0,
      offsetY,
      spriteWidth,
      spriteHeight
    )
    ctx.restore()
  }

  document.getElementById('result').src = canvas.toDataURL()
}
