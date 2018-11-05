function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawArrow() {
    clearCanvas();
    ctx.beginPath();
    const angle = Math.atan2(points.B.y - points.A.y, points.B.x - points.A.x);
    const arrowDegree = Math.PI / 6;
    const a = Math.abs(points.A.y - points.B.y);
    const b = Math.abs(points.B.x - points.A.x);
    hypotenuse = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    const len = hypotenuse / 6;

    ctx.moveTo(points.A.x, points.A.y);
    ctx.lineTo(points.B.x, points.B.y);
    ctx.lineTo(
        points.B.x - len * Math.cos(angle - arrowDegree),
        points.B.y - len * Math.sin(angle - arrowDegree)
    );
    ctx.moveTo(points.B.x, points.B.y);
    ctx.lineTo(
        points.B.x - len * Math.cos(angle + arrowDegree),
        points.B.y - len * Math.sin(angle + arrowDegree)
    );
    ctx.stroke();
}

function listenToCanvas(e) {
    if (points.A === undefined) {
        setPoint('A', e.offsetX, e.offsetY)
        if (points.A.second === 0) {
            writeMsg('El vídeo no ha cargado aún', true)
        } else {
            writeMsg('Muy bien, ahora avanza el vídeo y sitúate en el último frame donde aparece el meteoro')
        }
    } else {
        setPoint('B', e.offsetX, e.offsetY)
        if (points.A.second === points.B.second) {
            points = {
                A: undefined,
                B: undefined
            };
            writeMsg('No puede estar el inicio y final en el mismo tiempo', true)
        } else {
            console.log(points);
            step3()
            drawArrow()
        }
    }
}

function changeWidth() {
    const range = document.getElementById('range');
    ctx.lineWidth = range.value;
    drawArrow();
}

function endDraw() {
    if (!isDrawing) {
        return;
    }
    isDrawing = false;
    const msg = document.getElementById('message');
    msg.innerHTML = '';

    // In the y axis, we substract 540 minus Y, because Y is in top.
    // See: https://www.w3schools.com/graphics/canvas_coordinates.asp
    let line = {
        pointA: {
            x: firstX,
            y: 540 - firstY
        },
        pointB: {
            x: lastX,
            y: 540 - lastY
        }
    };
    let degrees =
        (Math.atan2(line.pointA.y - line.pointB.y, line.pointA.x - line.pointB.x) *
            180) /
        Math.PI;

    const a = Math.abs(line.pointA.y - line.pointB.y);
    const b = Math.abs(line.pointB.x - line.pointA.x);
    hypotenuse = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

    if (hypotenuse < 20) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        msg.innerHTML = 'Línea muy corta';
        setTimeout(() => {
            msg.innerHTML = '';
        }, 4000);
        console.log(`Linea muy corta: ${hypotenuse}`);
        return;
    }

    let rotate = 0;
    if (Math.abs(degrees) <= 22.5) {
        rotate = 180;
        console.log('Horizontal hacia la izquierda');
    } else if (degrees > 0 && degrees <= 67.5) {
        rotate = 135;
        console.log('Arriba hacia izquierda');
    } else if (degrees < 0 && degrees >= -67.5) {
        rotate = -135;
        console.log('Abajo hacia la izquierda');
    } else if (degrees > 0 && degrees <= 112.5) {
        rotate = 90;
        console.log('Vertical hacia abajo');
    } else if (degrees < 0 && degrees >= -112.5) {
        rotate = -90;
        console.log('Vertical hacia arriba');
    } else if (degrees > 0 && degrees <= 157.5) {
        rotate = 45;
        console.log('Arriba hacia derecha');
    } else if (degrees < 0 && degrees >= -157.5) {
        rotate = -45;
        console.log('Abajo hacia la derecha');
    } else {
        rotate = 0;
        console.log('Horizontal hacia la derecha');
    }
    degrees = degrees + 180;

    drawArrow();

    const arrow = document.querySelector('.arrow');
    arrow.querySelector('img').style.transform = `rotate(${rotate}deg)`;
    arrow.style.display = 'flex';
}

function setPoint(l, x, y) {
    points[l] = {
        x,
        y,
        second: player.getCurrentTime()
    }
}

function changeColor(color) {
    document.querySelector(':root').style.setProperty('--primary', color)
    ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--primary');
    drawArrow()
}

function initCanvas() {
    canvas = document.querySelector('.video-wrapper canvas');

    ctx = canvas.getContext('2d');
    ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--primary');
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 4;

    canvas.addEventListener('click', e => {
        listenToCanvas(e)
    });

    const colorInput = document.getElementById('colorInput')
    colorInput.addEventListener('change', e => {
        changeColor(e.target.value)
    });
}