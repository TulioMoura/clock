const canvas = document.getElementById("clock");
const ctx = canvas.getContext("2d");
const clockSize = 500;
canvas.width = clockSize;
canvas.height = clockSize;

function drawClock() {
    // Obtém a hora atual
    const time = new Date();
    let hour = time.getHours();
    const min = time.getMinutes();
    const sec = time.getSeconds()
    const Milsec = time.getMilliseconds();

    // --- Limpa e desenha a base do relógio ---
    
    // Limpa o canvas completamente a cada quadro
    ctx.clearRect(0, 0, clockSize, clockSize);

    // Círculo principal (borda)
    ctx.beginPath();
    ctx.arc(clockSize / 2, clockSize / 2, clockSize / 2 - 5, 0, 2 * Math.PI);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Fundo branco do relógio
    ctx.beginPath();
    ctx.arc(clockSize / 2, clockSize / 2, clockSize / 2 , 0, 2 * Math.PI);
    ctx.fillStyle = "#a38741";
    ctx.fill();
    
    // --- Desenha os números das horas ---
    const numbers = ["I","II","III","IIII", "V", "VI", "VII", "VIII", "IX","X", "XI","XII"]
    const numbersInAngle = true
    ctx.font = "bold 38px 'Times New Roman'";
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 0; i <= 11; i++) {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = (clockSize / 2) + Math.cos(angle) * (clockSize / 2 * 0.88);
        const y = (clockSize / 2) + Math.sin(angle) * (clockSize / 2 * 0.88);
        ctx.save()
        ctx.translate(x,y)
        ctx.rotate(numbersInAngle * (angle + Math.PI/2))
        ctx.fillText(numbers[i], 0, 0);
        ctx.restore()
    }

    // --- Desenha os ponteiros principais ---

    // Ponteiro das Horas (com movimento suave)
    hour = hour % 12;
    const hourAngle = ((hour * 30) + (min * 0.5) - 90) * (Math.PI / 180);
    drawHand(clockSize / 2, clockSize / 2, hourAngle, clockSize / 2 * 0.5, 1, 'black');

    // Ponteiro dos Minutos (com movimento suave)
    const minAngle = ((min * 6 + sec * 0.1 + Milsec * 0.0001) + (sec * 0.1) - 90) * (Math.PI / 180);
    drawHand(clockSize / 2, clockSize / 2, minAngle, clockSize / 2 * 0.7, 1, 'black');

    // Pino central do relógio principal
    ctx.beginPath();
    ctx.arc(clockSize / 2, clockSize / 2, 3, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

    // --- Mostrador de Segundos dedicado ---

    // Define as propriedades do círculo de segundos
    const secondsDialRadius = clockSize / 8; // 1/4 do diâmetro principal
    const secondsDialCenterX = clockSize / 2;
    const secondsDialCenterY = (clockSize / 1.3); // Reposicionado

    // Desenha o fundo e a borda do mostrador de segundos
    ctx.beginPath();
    ctx.arc(secondsDialCenterX, secondsDialCenterY, secondsDialRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#a38741";
    ctx.fill();
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Desenha as marcações do mostrador de segundos
    ctx.font = "12px Arial";
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 1; i <= 60; i++) {
        const angle = (i * 6 - 90) * (Math.PI / 180);
        // Números principais (15, 30, 45, 60)
        if (i % 15 === 0) {
            const number = i === 60 ? 60 : i;
            const textX = secondsDialCenterX + Math.cos(angle) * (secondsDialRadius * 0.85);
            const textY = secondsDialCenterY + Math.sin(angle) * (secondsDialRadius * 0.85);
            ctx.fillText(number.toString(), textX, textY);
        // Marcações de 5 segundos
        } else if (i % 5 === 0) {
            const startX = secondsDialCenterX + Math.cos(angle) * (secondsDialRadius * 0.88);
            const startY = secondsDialCenterY + Math.sin(angle) * (secondsDialRadius * 0.88);
            const endX = secondsDialCenterX + Math.cos(angle) * secondsDialRadius;
            const endY = secondsDialCenterY + Math.sin(angle) * secondsDialRadius;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = '#777';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
    
    // Ponteiro dos Segundos (dentro do seu próprio mostrador)
    const MilSecAngle = ((sec * 6) + Milsec * 0.006 - 90) * (Math.PI / 180);
    drawHand(secondsDialCenterX, secondsDialCenterY, MilSecAngle, secondsDialRadius * 0.8, 1, 'red');
    
     // Pino central do mostrador de segundos
    ctx.beginPath();
    ctx.arc(secondsDialCenterX, secondsDialCenterY, 1, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
}

/**
 * Função auxiliar para desenhar um ponteiro
 * @param {number} centerX - Coordenada X do centro
 * @param {number} centerY - Coordenada Y do centro
 * @param {number} angle - Ângulo em radianos
 * @param {number} length - Comprimento do ponteiro
 * @param {number} width - Largura do ponteiro
 * @param {string} color - Cor do ponteiro
 */
function drawHand(centerX, centerY, angle, length, width, color) {
    const x = centerX + Math.cos(angle) * length;
    const y = centerY + Math.sin(angle) * length;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    // ctx.lineCap = 'round'; // Removido para pontas retas
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();
}

// Inicia o relógio
setInterval(drawClock, 50);
drawClock(); // Chama a função uma vez para não haver atraso inicial