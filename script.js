const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const polygon = {
  centerX: canvas.width / 2,
  centerY: canvas.height / 2,
  movespeedX: 5,
  movespeedY: -3,
  radius: 60,
  changeRadius: 0.15,
  angle: 0,
  angleSpeed: Math.PI * 0.03,
  color: {
    r: 2,
    g: 243,
    b: 3
  },
  colorChangeR: 2,
  colorChangeG: 1,
  colorChangeB: 3,
}

animate({
  clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  },

  update() {
    polygon.angle += polygon.angleSpeed

    polygon.radius += polygon.changeRadius
    if (polygon.radius < 20) {
      polygon.radius = 20
    }
    if (polygon.radius > 100) {
      polygon.radius = 100
    }

    polygon.centerX += polygon.movespeedX
    if (polygon.centerX > canvas.width - polygon.radius) {
      polygon.movespeedX = -(1 + Math.ceil(Math.random() * 5))
      polygon.angleSpeed = Math.random() / 5
      polygon.angleSpeed = -polygon.angleSpeed
      polygon.changeRadius = -polygon.changeRadius
    }

    if (polygon.centerX < polygon.radius) {
      polygon.movespeedX = 1 + Math.ceil(Math.random() * 5)
      polygon.angleSpeed = Math.random() / 5
      polygon.angleSpeed = -polygon.angleSpeed
      polygon.changeRadius = -polygon.changeRadius
    }

    polygon.centerY += polygon.movespeedY
    if (polygon.centerY > canvas.height - polygon.radius) {
      polygon.movespeedY = -(1 + Math.ceil(Math.random() * 5))
      polygon.angleSpeed = -polygon.angleSpeed
      polygon.angleSpeed = Math.random() / 5
      polygon.changeRadius = -polygon.changeRadius
    }

    if (polygon.centerY < polygon.radius) {
      polygon.movespeedY = 1 + Math.ceil(Math.random() * 5)
      polygon.angleSpeed = Math.random() / 5
      polygon.angleSpeed = -polygon.angleSpeed
      polygon.changeRadius = -polygon.changeRadius
    }

    polygon.color.r += polygon.colorChangeR
    if (polygon.color.r > 255 || polygon.color.r < 0) {
      polygon.colorChangeR = -polygon.colorChangeR
    }

    polygon.color.g += polygon.colorChangeG
    if (polygon.color.g > 255 || polygon.color.g < 0) {
      polygon.colorChangeG = -polygon.colorChangeG
    }

    polygon.color.b += polygon.colorChangeB
    if (polygon.color.b > 255 || polygon.color.b < 0) {
      polygon.colorChangeB = -polygon.colorChangeB
    }
  },

  render() {
    const dAngle = (Math.PI * 2) / 5

    ctx.beginPath()
    ctx.moveTo(
      polygon.centerX + polygon.radius * Math.cos(polygon.angle),
      polygon.centerY + polygon.radius * Math.sin(polygon.angle)
    )
    ctx.lineTo(
      polygon.centerX + polygon.radius * Math.cos(polygon.angle + dAngle),
      polygon.centerY + polygon.radius * Math.sin(polygon.angle + dAngle)
    )

    ctx.lineTo(
      polygon.centerX + polygon.radius * Math.cos(polygon.angle + 2 * dAngle),
      polygon.centerY + polygon.radius * Math.sin(polygon.angle + 2 * dAngle)
    )

    ctx.lineTo(
      polygon.centerX + polygon.radius * Math.cos(polygon.angle + 3 * dAngle),
      polygon.centerY + polygon.radius * Math.sin(polygon.angle + 3 * dAngle)
    )
    ctx.lineTo(
      polygon.centerX + polygon.radius * Math.cos(polygon.angle + 4 * dAngle),
      polygon.centerY + polygon.radius * Math.sin(polygon.angle + 4 * dAngle)
    )
    ctx.closePath()
    ctx.fillStyle = `rgb(${polygon.color.r}, ${polygon.color.g}, ${polygon.color.b}`
    ctx.fill()
  }
})

function animate(obj) {
  const { clear, update, render } = obj

  requestAnimationFrame(tick)

  function tick() {
    requestAnimationFrame(tick)
    update()
    clear()
    render()
  }
}