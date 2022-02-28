(function() {

    var sum = 0;

    function randomID() {
        return "_" + Math.random(),toString(32).substring(2);
    }

    function animate(obj, initVal, lastVal, duration) {
        let startTime = null;
        //let currentTime = Date.now();
        const step = function(currentTime ) {
            if (!startTime) {
                  startTime = currentTime ;
            }
            const progress = Math.min((currentTime  - startTime) / duration, 1);
            var value = Math.floor(progress * (lastVal - initVal) + initVal);
            if (value === 69) {
                obj.innerHTML = value + " (Haha! Nice...)";
            } else {
                obj.innerHTML = value;
            }
            if (progress < 1) {
                  window.requestAnimationFrame(step);
            } else{
                  window.cancelAnimationFrame(window.requestAnimationFrame(step));
            }
        };
        window.requestAnimationFrame(step);
    }

    function updateSum(value) {
        var oldValue = sum;
        sum += value;
        animate(document.getElementById("total"), oldValue, sum, 300);
    }

    function getColorVariation(color, amount) {
        var usePound = false;
        if (color.startsWith("#")) {
            color = color.slice(1);
            usePound = true;
        }
        var num = parseInt(color, 16);
        var r = (num >> 16) + amount;
        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }
        var b = ((num >> 8) & 0x00FF) + amount;
        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }
        var g = (num & 0x0000FF) + amount;
        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }

    function drawCoin(target) {
        /**
         * @type CanvasRenderingContext2D | null
         */
        var ctx = target.getContext("2d");
        if (ctx) {
            var width = target.width;
            var height = target.height;
            var color = target.getAttribute("data-color");
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(Math.floor(width / 2), Math.floor(height / 2), Math.floor(Math.min(width, height) * 0.5), 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    function drawPyramid(target) {
        /**
         * @type CanvasRenderingContext2D | null
         */
        var ctx = target.getContext("2d");
        if (ctx) {
            var width = target.width;
            var height = target.height;
            var color = target.getAttribute("data-color");
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(Math.floor(width / 2), 0);
            ctx.lineTo(0, Math.floor((height / 4) * 3));
            ctx.lineTo(Math.floor(width / 3), Math.floor((height / 4) * 3.5));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, 20);
            ctx.beginPath();
            ctx.moveTo(Math.floor(width / 2), 0);
            ctx.lineTo(width, Math.floor((height / 4) * 3));
            ctx.lineTo(Math.floor(width / 3), Math.floor((height / 4) * 3.5));
            ctx.closePath();
            ctx.fill();
        }
    }

    function drawCube(target) {
        /**
         * @type CanvasRenderingContext2D | null
         */
        var ctx = target.getContext("2d");
        if (ctx) {
            var width = target.width;
            var height = target.height;
            var color = target.getAttribute("data-color");
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(Math.floor(width / 2), Math.floor(height / 2));
            ctx.lineTo(0, Math.floor(height / 4));
            ctx.lineTo(Math.floor(width / 2), 0);
            ctx.lineTo(width, Math.floor(height / 4));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, -20);
            ctx.beginPath();
            ctx.moveTo(0, Math.floor(height / 4));
            ctx.lineTo(0, Math.floor((height / 4) * 3));
            ctx.lineTo(Math.floor(width / 2), height);
            ctx.lineTo(Math.floor(width / 2), Math.floor(height / 2));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, 20);
            ctx.beginPath();
            ctx.moveTo(Math.floor(width / 2), Math.floor(height / 2));
            ctx.lineTo(width, Math.floor(height / 4));
            ctx.lineTo(width, Math.floor((height / 4) * 3));
            ctx.lineTo(Math.floor(width / 2), height);
            ctx.closePath();
            ctx.fill();
        }
    }

    function drawOctahedron(target) {
        /**
         * @type CanvasRenderingContext2D | null
         */
        var ctx = target.getContext("2d");
        if (ctx) {
            var width = target.width;
            var height = target.height;
            var color = target.getAttribute("data-color");
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(Math.floor((width / 4) * 3), 0);
            ctx.lineTo(0, Math.floor(height / 4));
            ctx.lineTo(Math.floor(height / 3), Math.floor(height / 2));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, 20);
            ctx.beginPath();
            ctx.moveTo(Math.floor((width / 4) * 3), 0);
            ctx.lineTo(width, Math.floor((height / 4) * 3));
            ctx.lineTo(Math.floor(width / 3), Math.floor(height / 2));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, 10);
            ctx.beginPath();
            ctx.moveTo(width, Math.floor((height / 4) * 3));
            ctx.lineTo(Math.floor(width / 3), Math.floor(height / 2));
            ctx.lineTo(Math.floor(width / 4), height);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, -30);
            ctx.beginPath();
            ctx.moveTo(0, Math.floor(height / 4));
            ctx.lineTo(Math.floor(height / 3), Math.floor(height / 2));
            ctx.lineTo(Math.floor(width / 4), height);
            ctx.closePath();
            ctx.fill();
        }
    }

    function drawDecahedron(target) {
        /**
         * @type CanvasRenderingContext2D | null
         */
        var ctx = target.getContext("2d");
        if (ctx) {
            var width = target.width;
            var height = target.height;
            var color = target.getAttribute("data-color");
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(Math.floor(width / 2), Math.floor(height / 8));
            ctx.lineTo(Math.floor(width / 3), Math.floor(height / 2));
            ctx.lineTo(Math.floor(width / 2), Math.floor((height / 4) * 2.5));
            ctx.lineTo(Math.floor((width / 4) * 2.5), Math.floor(height / 2));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, -15);
            ctx.beginPath();
            ctx.moveTo(Math.floor(width / 2), Math.floor(height / 8));
            ctx.lineTo(Math.floor(width / 6), Math.floor(height / 3));
            ctx.lineTo(Math.floor(width / 8), Math.floor((height / 4) * 2.25));
            ctx.lineTo(Math.floor(width / 3), Math.floor(height / 2));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, 20);
            ctx.beginPath();
            ctx.moveTo(Math.floor(width / 2), Math.floor(height / 8));
            ctx.lineTo(Math.floor(width - (width / 6)), Math.floor(height / 3));
            ctx.lineTo(Math.floor((width / 8) * 7), Math.floor((height / 4) * 2.25));
            ctx.lineTo(Math.floor((width / 4) * 2.5), Math.floor(height / 2));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, -20);
            ctx.beginPath();
            ctx.moveTo(Math.floor(width / 8), Math.floor((height / 4) * 2.25));
            ctx.lineTo(Math.floor(width / 2), Math.floor((height / 8) * 7));
            ctx.lineTo(Math.floor(width / 2), Math.floor((height / 4) * 2.5));
            ctx.lineTo(Math.floor(width / 3), Math.floor(height / 2));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, 10);
            ctx.beginPath();
            ctx.moveTo(Math.floor((width / 4) * 2.5), Math.floor(height / 2));
            ctx.lineTo(Math.floor(width / 2), Math.floor((height / 4) * 2.5));
            ctx.lineTo(Math.floor(width / 2), Math.floor((height / 8) * 7));
            ctx.lineTo(Math.floor((width / 8) * 7), Math.floor((height / 4) * 2.25));
            ctx.closePath();
            ctx.fill();
        }
    }

    function drawDodecahedron(target) {
        /**
         * @type CanvasRenderingContext2D | null
         */
        var ctx = target.getContext("2d");
        if (ctx) {
            var width = target.width;
            var height = target.height;
            var color = target.getAttribute("data-color");
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(Math.floor(width / 2), Math.floor(height / 4));
            ctx.lineTo(Math.floor((width / 4) * 3), Math.floor(height / 2.25));
            ctx.lineTo(Math.floor((width / 6) * 4), Math.floor((height / 4) * 3));
            ctx.lineTo(Math.floor(width / 3), Math.floor((height / 4) * 3));
            ctx.lineTo(Math.floor(width / 4), Math.floor(height / 2.25));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, 20);
            ctx.beginPath();
            ctx.moveTo(Math.floor(width / 2), Math.floor(height / 4));
            ctx.lineTo(Math.floor(width / 2), 0);
            ctx.lineTo(Math.floor((width / 4) * 3), Math.floor(height / 10));
            ctx.lineTo(Math.floor((width / 4) * 3.75), Math.floor(height / 3));
            ctx.lineTo(Math.floor((width / 4) * 3), Math.floor(height / 2.25));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, 10);
            ctx.beginPath();
            ctx.moveTo(Math.floor((width / 4) * 3.75), Math.floor(height / 3));
            ctx.lineTo(Math.floor((width / 4) * 3), Math.floor(height / 2.25));
            ctx.lineTo(Math.floor((width / 6) * 4), Math.floor((height / 4) * 3));
            ctx.lineTo(Math.floor((width / 6) * 5), Math.floor((height / 10) * 9));
            ctx.lineTo(width, Math.floor((height / 4) * 2.5));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, -10);
            ctx.beginPath();
            ctx.moveTo(Math.floor((width / 6) * 4), Math.floor((height / 4) * 3));
            ctx.lineTo(Math.floor(width / 3), Math.floor((height / 4) * 3));
            ctx.lineTo(Math.floor(width / 4), Math.floor((height / 10) * 9));
            ctx.lineTo(Math.floor(width / 2), height);
            ctx.lineTo(Math.floor((width / 6) * 5), Math.floor((height / 10) * 9));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, -20);
            ctx.beginPath();
            ctx.moveTo(Math.floor(width / 3), Math.floor((height / 4) * 3));
            ctx.lineTo(Math.floor(width / 4), Math.floor((height / 10) * 9));
            ctx.lineTo(0, Math.floor((height / 4) * 2.5));
            ctx.lineTo(Math.floor(width / 10), Math.floor(height / 3));
            ctx.lineTo(Math.floor(width / 4), Math.floor(height / 2.25));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, -15);
            ctx.beginPath();
            ctx.moveTo(Math.floor(width / 2), 0);
            ctx.lineTo(Math.floor(width / 2), Math.floor(height / 4));
            ctx.lineTo(Math.floor(width / 4), Math.floor(height / 2.25));
            ctx.lineTo(Math.floor(width / 10), Math.floor(height / 3));
            ctx.lineTo(Math.floor(width / 4), Math.floor(height / 10));
            ctx.closePath();
            ctx.fill();
        }
    }

    function drawIcosahedron(target) {
        /**
         * @type CanvasRenderingContext2D | null
         */
        var ctx = target.getContext("2d");
        if (ctx) {
            var width = target.width;
            var height = target.height;
            var color = target.getAttribute("data-color");
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(Math.floor(width / 2), Math.floor(height / 4));
            ctx.lineTo(Math.floor(width / 4), Math.floor((height / 4) * 3));
            ctx.lineTo(Math.floor((width / 4) * 3), Math.floor((height / 4) * 3));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, 10);
            ctx.beginPath();
            ctx.moveTo(Math.floor(width / 2), Math.floor(height / 4));
            ctx.lineTo(Math.floor((width / 4) * 3.25), Math.floor(height / 4));
            ctx.lineTo(Math.floor((width / 4) * 3), Math.floor((height / 4) * 3));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, -10);
            ctx.beginPath();
            ctx.moveTo(Math.floor(width / 2), Math.floor(height / 4));
            ctx.lineTo(Math.floor(width / 8), Math.floor(height / 4));
            ctx.lineTo(Math.floor(width / 4), Math.floor((height / 4) * 3));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, -20);
            ctx.beginPath();
            ctx.moveTo(Math.floor(width / 2), height);
            ctx.lineTo(Math.floor(width / 4), Math.floor((height / 4) * 3));
            ctx.lineTo(Math.floor((width / 4) * 3), Math.floor((height / 4) * 3));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, 20);
            ctx.beginPath();
            ctx.moveTo(Math.floor(width / 2), Math.floor(height / 4));
            ctx.lineTo(Math.floor(width / 2), 0);
            ctx.lineTo(Math.floor((width / 4) * 3.25), Math.floor(height / 4));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, -15);
            ctx.beginPath();
            ctx.moveTo(Math.floor(width / 2), Math.floor(height / 4));
            ctx.lineTo(Math.floor(width / 2), 0);
            ctx.lineTo(Math.floor(width / 8), Math.floor(height / 4));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, -20);
            ctx.beginPath();
            ctx.moveTo(Math.floor(width / 8), Math.floor(height / 4));
            ctx.lineTo(width / 4, Math.floor((height / 4) * 3));
            ctx.lineTo(Math.floor(width / 20), Math.floor((height / 4) * 3));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, 25);
            ctx.beginPath();
            ctx.moveTo(Math.floor((width / 4) * 3), Math.floor((height / 4) * 3));
            ctx.lineTo(Math.floor((width / 4) * 3.25), Math.floor(height / 4));
            ctx.lineTo(Math.floor((width / 20) * 19), Math.floor((height / 4) * 3));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, -25);
            ctx.beginPath();
            ctx.moveTo(Math.floor(width / 4), Math.floor((height / 4) * 3));
            ctx.lineTo(Math.floor(width / 20), Math.floor((height / 4) * 3));
            ctx.lineTo(Math.floor(width / 2), height);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = getColorVariation(color, 15);
            ctx.beginPath();
            ctx.moveTo(Math.floor((width / 4) * 3), Math.floor((height / 4) * 3));
            ctx.lineTo(Math.floor((width / 20) * 19), Math.floor((height / 4) * 3));
            ctx.lineTo(Math.floor(width / 2), height);
            ctx.closePath();
            ctx.fill();
        }
    }

    function roll(max) {
        return Math.floor(Math.random() * (max - 1)) + 1;
    }

    function generateCustomDice(size, mod) {
        var value = roll(size + 1);
        var div = document.createElement("div");
        div.classList.add("dice");
        div.classList.add("hiden");
        div.addEventListener("click", function(e) {
            div.classList.remove("show");
            updateSum(value * -1);
            setTimeout(function() {
                div.remove();
            }, 300);
        });
        var draw = document.createElement("img");
        draw.classList.add("dice-display");
        draw.src = "https://img.icons8.com/color/48/000000/what.png"
        div.appendChild(draw);
        var sp = document.createElement("span");
        sp.classList.add("dice-label");
        if (mod > 0) {
            sp.appendChild(document.createTextNode("" + value + "+" + mod));
            value += mod
        } else {
            sp.appendChild(document.createTextNode("" + value));
        }
        div.appendChild(draw);
        div.appendChild(sp);
        document.getElementById("output").appendChild(div);
        div.classList.add("show");
        updateSum(value);
    }

    function rollDie(id, d, color, drawFn) {
        var value = roll(d + 1);
        var div = document.createElement("div");
        div.classList.add("dice");
        div.classList.add("hiden");
        div.addEventListener("click", function() {
            div.classList.remove("show");
            updateSum(value * -1);
            setTimeout(function() {
                div.remove();
            }, 300);
        });
        var draw = document.createElement("canvas");
        draw.classList.add("dice-display");
        draw.width = 48;
        draw.height = 48;
        draw.setAttribute("data-color", color);
        div.appendChild(draw);
        var sp = document.createElement("span");
        sp.classList.add("dice-label");
        var modifierItem = document.querySelector("[data-modifier-for='#" + id + "']");
        if (modifierItem && modifierItem.value !== "0") {
            sp.appendChild(document.createTextNode("" + value + "+" + modifierItem.value));
            value += parseInt(modifierItem.value);
        } else {
            sp.appendChild(document.createTextNode("" + value));
        }
        div.appendChild(draw);
        div.appendChild(sp);
        document.getElementById("output").appendChild(div);
        requestAnimationFrame(function() {
            drawFn(draw);
            div.classList.add("show");
            updateSum(value);
        });
    }

    window.addEventListener("load", function() {
        document.querySelectorAll("canvas.dice-display[data-faces='2']").forEach(function(e) {
            drawCoin(e);
        });
        document.querySelectorAll("canvas.dice-display[data-faces='4']").forEach(function(e) {
            drawPyramid(e);
        });
        document.querySelectorAll("canvas.dice-display[data-faces='6']").forEach(function(e) {
            drawCube(e);
        });
        document.querySelectorAll("canvas.dice-display[data-faces='8']").forEach(function(e) {
            drawOctahedron(e);
        });
        document.querySelectorAll("canvas.dice-display[data-faces='10']").forEach(function(e) {
            drawDecahedron(e);
        });
        document.querySelectorAll("canvas.dice-display[data-faces='12']").forEach(function(e) {
            drawDodecahedron(e);
        });
        document.querySelectorAll("canvas.dice-display[data-faces='20']").forEach(function(e) {
            drawIcosahedron(e);
        });
        document.querySelectorAll(".dice[data-rolls='d2']").forEach(function(e) {
            e.addEventListener("click", function() {
                rollDie(e.id, 2, "#95a5a6", drawCoin);
            });
        });
        document.querySelectorAll(".dice[data-rolls='d4']").forEach(function(e) {
            e.addEventListener("click", function() {
                rollDie(e.id, 4, "#1abc9c", drawPyramid);
            });
        });
        document.querySelectorAll(".dice[data-rolls='d6']").forEach(function(e) {
            e.addEventListener("click", function() {
                rollDie(e.id, 6, "#2ecc71", drawCube);
            });
        });
        document.querySelectorAll(".dice[data-rolls='d8']").forEach(function(e) {
            e.addEventListener("click", function() {
                rollDie(e.id, 8, "#f1c40f", drawOctahedron);
            });
        });
        document.querySelectorAll(".dice[data-rolls='d10']").forEach(function(e) {
            e.addEventListener("click", function() {
                rollDie(e.id, 10, "#9b59b6", drawDecahedron);
            });
        });
        document.querySelectorAll(".dice[data-rolls='d12']").forEach(function(e) {
            e.addEventListener("click", function() {
                rollDie(e.id, 10, "#e67e22", drawDodecahedron);
            });
        });
        document.querySelectorAll(".dice[data-rolls='d20']").forEach(function(e) {
            e.addEventListener("click", function() {
                rollDie(e.id, 20, "#e74c3c", drawIcosahedron);
            });
        });
        document.querySelectorAll(".dice[data-rolls='d100']").forEach(function(e) {
            e.addEventListener("click", function() {
                rollDie(e.id, 100, "#34495e", drawDecahedron);
            });
        });
        document.querySelectorAll(".dice[data-rolls='dx']").forEach(function(e) {
            e.addEventListener("click", function() {
                
            });
        });
        document.getElementById("clear").addEventListener("click", function() {
            document.querySelectorAll("#output > .dice:not(#clear)").forEach(function(d) {
                d.remove();
                animate(document.getElementById("total"), sum, 0, 300);
                sum = 0;
            });
        });
        document.getElementById("dice-custom").addEventListener("keypress", function(e) {
            if (e.key === "Space" || e.key === " ") {
                e.preventDefault();
            } else if (e.key === "Enter") {
                var rx = /^(\d+)?d(\d+)([+-]\d+)?/;
                var input = document.getElementById("dice-custom");
                if (rx.test(input.value)) {
                    var values = rx.exec(input.value);
                    var count = (values[1] ? parseInt(values[1]) : 1);
                    var size = parseInt(values[2]);
                    var mod = (values[3] ? parseInt(values[3]) : 0);
                    for (var i = 0; i < count; i++) {
                        generateCustomDice(size, mod);
                    }
                }
            }
        });
        document.getElementById("custom-roll").addEventListener("click", function() {
            var rx = /^(\d+)?d(\d+)([+-]\d+)?/;
            var input = document.getElementById("dice-custom");
            if (rx.test(input.value)) {
                var values = rx.exec(input.value);
                var count = (values[1] ? parseInt(values[1]) : 1);
                var size = parseInt(values[2]);
                var mod = (values[3] ? parseInt(values[3]) : 0);
                for (var i = 0; i < count; i++) {
                    generateCustomDice(size, mod);
                }
            }
        })
    });
})();