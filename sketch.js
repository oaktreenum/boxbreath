//Allon Goldberg

//Will make an end screen with quotes about box breathing/meditation from my sources, like "'This technique was instrumental in saving my life several times in crises,' says Mark Divine, former US Navy SEALs Commander, NYT bestselling author"(forbes link))

//The background animation uses real modeling of fluid dynamics with the Navier-Stokes partial differential equations
//I DO NOT OWN CODE FROM RESOURCES (See sources at bottom and at top of other js files) 
//My original portions of code visually tunes/customizes and conceptually uses the fluid simulation in my meditation "game" and uses my specified timing for the breathing
      
/*var j = 0, numwav = 180, num, r1, r2, r3, rw1 = [], rw2 = [], w1, w2, a = [], r4 = [], r5 = []
let b = 160, cc = 180, g = 240*/


      let bpat, whit = 95.5 
      let sceneNum = 0
      let medTime = 0, meddur = 0, meddone = 0, seconds = 0
      ps = 0
      let dmove = 0, moverr = 0, mover = 0, c = 0, iii = 0, count = 0, ssi = 0, si = 0, moveWhit = 0, thetaBounce= 0
      let size = []
      let dt = []
      let diff = []
      let visc = []
      let xw = 360
      
      let s = []
      let density = []
    
      let Vx = []
      let Vy = []
      let Vz = []

      let Vx0 = []
      let Vy0 = []
      let Vz0 = []
      let tim00



function setup() {
  createCanvas(xw, xw);
  frameRate(6);
  fluid = new Fluid(0.2, 0, 0.00000001);
  
  
}

function draw() {
  background(0)
 
        
        let cx = int((0.5 * width) / SCALEe);
        let cy = int((0.5 * height) / SCALEe);
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            fluid.rhoDye(cx + i, cy + j, c*random(64, 400));
          }
        }
        
  
        for (let i = 0; i < 2; i++) {
          let angle = noise(t) * TWO_PI * 2;
          let v = p5.Vector.fromAngle(angle);
          v.mult(0.2);
          t += 0.1;
          fluid.vel(cx, cy, c*24*v.x, c*24*v.y);
        }

        fluid.step();
        fluid.renderD();
        map(dmove, 0, PI/2, 0, PI/2)
        //print(cos(3.14159265358979323838/2))
        //print(mover)
        rectMode(RADIUS)
        fill(255, 0.124)
        //console.log(millis())
        rect(xw/2,xw/2, whit,whit,4)
        fill('rgba(83, 124, 159, 0.14)')
        rect(xw/2,xw/2, whit,whit,4)
        fill(0, 0.124)
        //console.log(millis())
        rect(xw/2,xw/2, whit,whit,4)
        fill(0)
        rect(xw/2, xw/2, mover+40,mover+40,2)
        fill(255)
        arc(xw/2-12, xw/2-8, 8, 8, -4*PI/3, PI/3, OPEN)
        arc(xw/2+12, xw/2-8, 8, 8, -4*PI/3, PI/3, OPEN)
        fill(0)
        arc(xw/2-12, xw/2-6, 6+mover, 6+mover, -4*PI/3, PI/3, OPEN)
        arc(xw/2+12, xw/2-6, 6+mover, 6+mover, -4*PI/3, PI/3, OPEN)
        fill(255)
        arc(xw/2-14, xw/2-4, mover, mover, -4*PI/3, PI/3, OPEN)
        arc(xw/2+10, xw/2-4, mover, mover, -4*PI/3, PI/3, OPEN)
        tim1 = millis()
        bpat = millis()%16000/4000


        iii = int(iii)
        //24ps == 'in'){
        bpat = millis()%16000/4000
        dmove += PI/2*((tim1-tim00)/1000)
        c = 0 
        iii++
        iii = iii%24
        si = iii%4
        if(si == 0){thetaBounce= 0
                   mover = cos(thetaBounce)
        }
        if(si == 1){thetaBounce= PI/3
                                mover = cos(thetaBounce)
        }
        if(si == 2){thetaBounce= 2*PI/3
                   mover = cos(thetaBounce)
        }
        if(si == 3){thetaBounce= 0
                   mover = cos(thetaBounce)
        }
        if (iii == 23){
          ps++
          ps = ps%24
          ssi++
          ssi = ssi%4
          seconds++
        }


        textSize(24)
        fill(0)
        textStyle(BOLD)
        //console.log(seconds)
        
  
        if (seconds%8 == 0||seconds%8 == 1){
          c = 0 
          fill(255)
          rect(xw/2,xw/2+12, 8, 3,2)
          fill(0)
          whit += 296/96
          constrain(whit,48,296)
          iii++
          iii = iii%24
          fill(255)
          textSize(24)
          textAlign(RIGHT, CENTER);
          text('INHALE', (xw/2 - 64),xw/2)
          fill(0)
        }
        if(seconds%8 == 2||seconds%8 == 3){
          bpat = millis()%16000/4000
          c = 0
          fill(255)
          rect(xw/2,xw/2+12, 3.6, .48)
          fill(0)
          iii++
          iii = iii%24
          textAlign(CENTER, BOTTOM);
          fill(0)
          text('hold', xw/2,(xw/2)-36)
          whit -= mover/2
          fill(0)
        }
        if(seconds%8 == 4||seconds%8 == 5){
          bpat = millis()%16000/4000
          dmove += PI/2*((tim1-tim00)/1000)
          c = 1
          fill(255)
          circle(xw/2,xw/2+12, 5)
          fill(0)
          whit -= 296/96 
          constrain(whit,48,296)
          iii++
          iii = iii%24
          textAlign(LEFT, CENTER);
          fill(255)
          text('EXHALE', xw/2+64,xw/2)
          fill(0)
        }
        if(seconds%8 == 7||seconds%8 == 6){
          c = 0    
          fill(255)
          rect(xw/2,xw/2+12, 3.6, .64)
          fill(0)
          constrain(whit,48,296)
          iii++
          iii = iii%24
          textAlign(CENTER, TOP);
          fill(0)
          text('hold', xw/2, xw/2+36)
          whit += mover/2
          fill(0)
        }

        tim00=tim1
        }
      
        
      
        
  

/*
https://www.health.harvard.edu/mind-and-mood/breath-meditation-a-great-way-to-relieve-stress

https://www.health.harvard.edu/mind-and-mood/relaxation-techniques-breath-control-helps-quell-errant-stress-response

https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6137615/

https://blog.humanscale.com/pick-the-perfect-color-for-your-space

https://bluedoormedia.co/2020/06/22/7-science-backed-breathing-techniques/

https://www.forbes.com/sites/nomanazish/2019/05/30/how-to-de-stress-in-5-minutes-or-less-according-to-a-navy-seal/?sh=e4b2f583046d

https://www.youtube.com/watch?v=alhpH6ECFvQ&t=453s

https://mikeash.com/pyblog/fluid-simulation-for-dummies.html

https://www.researchgate.net/publication/2560062_Real-Time_Fluid_Dynamics_for_Games

https://www.youtube.com/watch?v=alhpH6ECFvQ&t=453s

*/