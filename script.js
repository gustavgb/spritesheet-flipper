var spriteWidth = null
var spriteHeight = null
var fileWidth = 1
var fileHeight = 1
var source
var img

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
  if (options.width) {
    console.log('Applying width ' + options.width)

    spriteWidth = parseInt(options.width, 10)
  }

  if (options.height) {
    console.log('Applying height ' + options.height)

    spriteHeight = parseInt(options.height, 10)
  }

  if (options.fileWidth) {
    console.log('Applying fileWidth ' + options.fileWidth)

    fileWidth = parseInt(options.fileWidth, 10)
  }

  if (options.fileHeight) {
    console.log('Applying fileHeight ' + options.fileHeight)

    fileHeight = parseInt(options.fileHeight, 10)
  }

  if (options.source) {
    console.log('Applying source ' + options.source)

    source = options.source
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
  canvas.height = img.height
  var ctx = canvas.getContext('2d')

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
      0,
      spriteWidth,
      spriteHeight
    )
    ctx.restore()
  }

  document.getElementById('result').src = canvas.toDataURL()
}
