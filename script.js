var canvas = document.getElementById("clock")
var ctx = canvas.getContext("2d")
const pontHora= document.getElementById('hora')
const pontMinuto= document.getElementById('minuto')
const pontSegundo= document.getElementById('segundos')


const clockSize = 500

function drawtime(){
const time = new Date(Date.now());
let hour = time.getHours();
if(hour>12){
    hour = hour-12
}
let min = time.getMinutes();
let sec = time.getSeconds();






ctx.fillStyle = "white"
ctx.beginPath();
ctx.moveTo(clockSize/2,clockSize/2)
ctx.arc(clockSize/2,clockSize/2,(clockSize/100*40),0, Math.PI *2, false)
ctx.fill();
ctx.moveTo(0,0)
let ang = (hour*30 -90) * (Math.PI/180)

let posx = Math.cos(ang)*(clockSize/100*25)+Math.sin(ang)*0;
let posy = Math.sin(ang)*(clockSize/100*25)+Math.cos(ang)*0;

    posx = posx+(clockSize/2);
    posy = posy+(clockSize/2);
    ctx.beginPath()
    ctx.moveTo(clockSize/2,clockSize/2)
    ctx.lineTo(posx, posy)
    ctx.stroke()

ang = (min*6 -90) * (Math.PI/180)

posx = Math.cos(ang)*(clockSize/100*35)+Math.sin(ang)*0;
posy = Math.sin(ang)*(clockSize/100*35)+Math.cos(ang)*0;

    posx = posx+(clockSize/2);
    posy = posy+(clockSize/2);
    ctx.beginPath()
    ctx.moveTo(clockSize/2,clockSize/2)
    ctx.lineTo(posx, posy)
    ctx.stroke()


ang = (sec*6 -90) * (Math.PI/180)

posx = Math.cos(ang)*(clockSize/100*40)+Math.sin(ang)*0;
posy = Math.sin(ang)*(clockSize/100*40)+Math.cos(ang)*0;

    posx = posx+(clockSize/2);
    posy = posy+(clockSize/2);
    ctx.strokeStyle = 'red' 
    ctx.beginPath()
    ctx.moveTo(clockSize/2,clockSize/2)
    ctx.lineTo(posx, posy)
    ctx.stroke()
    
    ctx.strokeStyle = 'black' 

}

setInterval(drawtime, 1000)



ctx.beginPath()
ctx.arc(clockSize/2,clockSize/2,(clockSize/2),0,2*Math.PI)
ctx.stroke()

for (let index = 1; index <= 12; index++) {
    let ang = (index*30 -90) * (Math.PI/180)
    let posx = Math.cos(ang)*(clockSize/100*44)+Math.sin(ang)*0;
    let posy = Math.sin(ang)*(clockSize/100*44)+Math.cos(ang)*0;


    posx = posx+(clockSize/2);
    posy = posy+(clockSize/2);  
    if(posx < (clockSize/2)){
        posx = posx-22;
    }

    if(posy>(clockSize/2)){
        posy = posy+22;
    }

    ctx.font = "22px Arial"
    ctx.fillText(index+"",posx, posy)
}