window.onload = function () {
    const stage = document.getElementById("stage")
    const ctx = stage.getContext("2d")
    const recordElement = document.getElementById("record")
    const pointsElement = document.getElementById("points")

    document.addEventListener("keydown", keyPush)

    setInterval(game, 80)

    const vel = 1   
    const piece = 30    // Tamanho de cada pixel
    const qtPiece = 20
    var velX = 0
    var velY = record = pont = 0
    var X = 10
    var Y = 10
    var appleX = 15
    var appleY = 15
    var trail = []
    var tail = 5

    function game() {
        recordElement.innerHTML = record
        pointsElement.innerHTML = pont

        X += velX
        Y += velY

        if (X < 0) {
            X = qtPiece - 1
        }
        if (X > qtPiece - 1) {
            X = 0
        }
        if (Y < 0) {
            Y = qtPiece - 1
        }
        if (Y > qtPiece - 1) {
            Y = 0
        }

        ctx.fillStyle = "black"
        ctx.fillRect(0,0, stage.width, stage.height)

        ctx.fillStyle = "red"
        ctx.fillStyle.borderRadius = "10px"
        ctx.fillRect(appleX * piece, appleY * piece, piece, piece)

        ctx.fillStyle = "green"

        for (let i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * piece, trail[i].y * piece, piece-1, piece-1)
            if (trail[i].x == X && trail[i].y == Y) {
                gameOver()
            }
        }

        trail.push({ x: X, y: Y })
        while (trail.length > tail) {
            trail.shift()
        }

        if (appleX == X && appleY == Y) {
            pont++

            if (pont > record) {
                record++
            }

            tail++
            appleX = Math.floor(Math.random() * qtPiece)
            appleY = Math.floor(Math.random() * qtPiece)

        }
    }

    function keyPush(event){
 
        switch (event.keyCode) {
            case 37: // Left
                velX = -vel
                velY = 0
                break
            case 38: // up
                velX = 0
                velY = -vel
                break;
            case 39: // right
                velX = vel
                velY = 0
                break
            case 40: // down
                velX = 0
                velY = vel
                break      
            default:
               
                break
        }
    }

    function gameOver() {
        velX = velY = pont = 0
        tail = 5
    }
}

/*
     vx = vy velX e velY
     px   X
     py = Y
     tp = largP
     qp = qtP
     ax=ay= appleX e appleY
*/
