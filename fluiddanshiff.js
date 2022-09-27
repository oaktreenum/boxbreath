//https://github.com/CodingTrain/website/blob/main/CodingChallenges/CC_132_FluidSimulation/P5/fluid.js

let theta
let iter = 1
let SCALEe = xw/45
let t =0

// function to use 1D array and fake the extra two dimensions --> 3D
function IX(x, y) {
  return x + y * xw
}

// Fluid cube class
class Fluid {
  constructor(dt, diffusion, viscosity) {
    this.size = xw
    this.dt = dt
    this.diff = diffusion
    this.visc = viscosity

    this.s = new Array(xw * xw).fill(0)
    this.density = new Array(xw * xw).fill(0)

    this.Vx = new Array(xw * xw).fill(0)
    this.Vy = new Array(xw * xw).fill(0)

    this.Vx0 = new Array(xw * xw).fill(0)
    this.Vy0 = new Array(xw * xw).fill(0)
  }

  // step method
  step() {
    let xw = this.size
    let visc = this.visc
    let diff = this.diff
    let dt = this.dt
    let Vx = this.Vx
    let Vy = this.Vy
    let Vx0 = this.Vx0
    let Vy0 = this.Vy0
    let s = this.s
    let density = this.density

    diffuse(1, Vx0, Vx, visc, dt)
    diffuse(2, Vy0, Vy, visc, dt)

    project(Vx0, Vy0, Vx, Vy)

    advect(1, Vx, Vx0, Vx0, Vy0, dt)
    advect(2, Vy, Vy0, Vx0, Vy0, dt)

    project(Vx, Vy, Vx0, Vy0)
    diffuse(0, s, density, diff, dt)
    advect(0, density, s, Vx, Vy, dt)
  }

  // method to add density
  rhoDye(x, y, amount) {
    let index = IX(x, y)
    this.density[index] += amount
  }

  // method to add velocity
  vel(x, y, amountX, amountY) {
    let index = IX(x, y)
    this.Vx[index] += amountX
    this.Vy[index] += amountY
  }

  // function to render density
  renderD() {
    for (let i = 0; i <= xw/SCALEe+1; i++) {
      for (let j = 0; j <= xw/SCALEe+1; j++) {
        let x = i * SCALEe
        let y = j * SCALEe
        let d = this.density[IX(i, j)]
        let mod = millis()%4000
        colorr = d 
        
        let colorrh=colorr%360
        colorMode(HSB)
        if (color != d){
          colorr = constrain(colorr, 24, 64)
        }
        colorr += 10
        //colorrh = constrain(colorrh, 150, 360)
        //map(colorr, 0, 4000*d, 0,255)
        fill(colorrh,18,colorr)
        noStroke()
        if (x == 256 && y == 320){
          console.log(colorrh+'&'+colorr)
        }
        //rect(x, y, SCALEe, SCALEe)
        ellipse(x, y, SCALEe, SCALEe)
      }
    }
  }

  // function to render velocity
  renderV() {
    for (let i = 0; i <= xw; i++) {
      for (let j = 0; j <= xw; j++) {
        let x = i * SCALEe
        let y = j * SCALEe
        let vx = this.Vx[IX(i, j, k)]
        let vy = this.Vy[IX(i, j, k)]
        this.canvas.stroke(0)

        if (!(abs(vx) < 0.1 && abs(vy) <= 0.1)) {
          line(x, y, x + vx * SCALEe, y + vy * SCALEe)
        }
      }
    }
  }
}