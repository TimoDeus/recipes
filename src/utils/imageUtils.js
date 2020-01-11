export const resizeImage = file => new Promise(resolve => {
  const reader = new FileReader()
  reader.onload = function (readerEvent) {
    const image = new Image()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const max_size = 500
      let
        width = image.width,
        height = image.height
      if (width > height) {
        if (width > max_size) {
          height *= max_size / width
          width = max_size
        }
      } else if (height > max_size) {
        width *= max_size / height
        height = max_size
      }
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(image, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg'))
    }
    image.src = readerEvent.target.result
  }
  reader.readAsDataURL(file)
})
