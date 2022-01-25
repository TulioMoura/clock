const pontHora= document.getElementById('hora')
const pontMinuto= document.getElementById('minuto')
const pontSegundo= document.getElementById('segundos')

pontHora.style.transform = `rotate(90deg)`
pontMinuto.style.transform = `rotate(90deg)`
pontSegundo.style.transform = `rotate(90deg)`

function drawtime(){
const time = new Date(Date.now());
let hour = time.getHours();
if(hour>12){
    hour = hour-12
}
let min = time.getMinutes();
let sec = time.getSeconds();
pontHora.style.transform = `rotate(${(hour * 30)+90 + min*0.6 }deg)`
pontMinuto.style.transform = `rotate(${(min * 6 )+90}deg)`
pontSegundo.style.transform = `rotate(${(sec * 6)+90 }deg)`
}

setInterval(drawtime, 1000)