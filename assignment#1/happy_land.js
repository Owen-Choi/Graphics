var gl;
var points;
var offsetLoc;
var size;
var snowPos;
var snowAnim = 0.0;
var flag = false;
var reverseFlag = false;
var index = 0;

var rand1 = Math.floor(Math.random() * 3) + 1;
var rand2 = Math.floor(Math.random() * 2) + 1;
var rand3 = Math.floor(Math.random() * 1) + 1;
var rand4 = Math.floor(Math.random() * 3) + 1;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    var vertices = new Float32Array([
        //background
        // -2.0, 2.0, -2.0, -1.5, 2.0, 2.0, //triangle
        // -2.0, -1.5, 2.0, 2.0, 2.0, -1.5, //triangle

        -4.0, 4.0, -4.0, -3.0, 4.0, 4.0, //triangle
        -4.0, -3.0, 4.0, 4.0, 4.0, -3.0, //triangle

        //small house
        -0.6, -0.5, -0.6, -0.3, -0.2, -0.3, //triangle
        -0.6, -0.5, -0.2, -0.5, -0.2, -0.3, //triangle
        -0.6, -0.3, -0.6, -0.1, -0.2, -0.1, //triangle
        -0.6, -0.3, -0.2, -0.3, -0.2, -0.1, //triangle

        -0.6, -0.1, -0.2, -0.1, -0.4, 0.1, //triangle

        // large house
        -0.3, -0.5, -0.3, -0.1, 0.3, -0.1, //triangle
        -0.3, -0.5, 0.3, -0.5, 0.3, -0.1,//triangle
        -0.3, -0.1, -0.3, 0.3, 0.3, 0.3, //triangle
        -0.3, -0.1, 0.3, -0.1, 0.3, 0.3, //triangle

        -0.3, 0.3, 0.3, 0.3, 0, 0.7,

        //ground
        -2.0, -0.5, -2.0, -2.0, 2.0, -0.5, //triangle
        -2.0, -2.0, 2.0, -0.5, 2.0, -2.0, //triangle

        //small tree
        0, 0, -0.2, -0.2, 0.2, -0.2,   //triangle
        0, -0.2, -0.2, -0.4, 0.2, -0.4,     //triangle
        0, -0.4, -0.2, -0.6, 0.2, -0.6,  //triangle
        -0.05, -0.6, 0.05, -0.6, -0.05, -0.8, //triangle
        0.05, -0.6, -0.05, -0.8, 0.05, -0.8,     //triangle

        //large tree
        0.35, 0.8, 0.1, 0.5, 0.6, 0.5,   //triangle
        0.35, 0.5, 0.1, 0.2, 0.6, 0.2,     //triangle
        0.35, 0.2, 0.1, -0.1, 0.6, -0.1,  //triangle
        0.25, -0.1, 0.45, -0.1, 0.25, -0.7, //triangle
        0.25, -0.7, 0.45, -0.7, 0.45, -0.1,     //triangle

        //star
        0, 0.05, -0.1, -0.1, 0.1, -0.1, //triangle
        -0.1, 0.0, 0.1, 0.0, 0, -0.15 //triangle

    ]);

    var sky = 0.0
    var redAnim = 0.7
    var greenAnim = 0.6
    var blueAnim = 0.4

    var colors = [
        //background
        // vec4(1.0, 1.0, 1.0, 1.0),
        // vec4(0.0, 0.4, 0.7, 0.6),
        // vec4(1.0, 1.0, 1.0, 1.0),
        // vec4(0.588, 0.70, 0.874, 0.6),
        // vec4(1.0, 1.0, 1.0, 1.0),
        // vec4(0.0, 0.4, 0.7, 0.6),
        vec4(redAnim, greenAnim, blueAnim, 1.0),
        vec4(0.0, 0.0, 0.0, 1.0),
        vec4(sky, 0.0, 0.0, 1.0),
        vec4(0.0, 0.0, 0.0, 1.0),
        vec4(sky, 0.0, 0.0, 1.0),
        vec4(redAnim, greenAnim, blueAnim, 1.0),

        //small house
        //rectangle
        vec4(0.7, 0.6, 0.27, 0.95),
        vec4(0.7, 0.6, 0.27, 0.95),
        vec4(0.7, 0.6, 0.27, 0.95),
        vec4(0.7, 0.6, 0.27, 0.95),
        vec4(0.7, 0.6, 0.27, 0.95),
        vec4(0.7, 0.6, 0.27, 0.95),

        //rectangle
        vec4(1, 0.8, 0.05, 0.95),
        vec4(1, 0.8, 0.05, 0.95),
        vec4(1, 0.8, 0.05, 0.95),
        vec4(1, 0.8, 0.05, 0.95),
        vec4(1, 0.8, 0.05, 0.95),
        vec4(1, 0.8, 0.05, 0.95),

        //triangle
        vec4(0.5, 0.6, 0.5, 0.95),
        vec4(0.5, 0.6, 0.5, 0.95),
        vec4(0.5, 0.6, 0.5, 0.95),

        //large house
        //rectangle
        vec4(0.721, 0.592, 0.835, 0.95),
        vec4(0.721, 0.592, 0.835, 0.95),
        vec4(0.721, 0.592, 0.835, 0.95),
        vec4(0.721, 0.592, 0.835, 0.95),
        vec4(0.721, 0.592, 0.835, 0.95),
        vec4(0.721, 0.592, 0.835, 0.95),

        //rectangle
        vec4(0.721, 0.592, 0.835, 0.95),
        vec4(0.721, 0.592, 0.835, 0.95),
        vec4(0.721, 0.592, 0.835, 0.95),
        vec4(0.721, 0.592, 0.835, 0.95),
        vec4(0.721, 0.592, 0.835, 0.95),
        vec4(0.721, 0.592, 0.835, 0.95),

        //triangle
        vec4(0.5, 0.6, 0.5, 0.95),
        vec4(0.5, 0.6, 0.5, 0.95),
        vec4(0.5, 0.6, 0.5, 0.95),

        //ground
        vec4(0.886, 0.886, 0.886, 0.6),
        vec4(0.886, 0.886, 0.886, 0.6),
        vec4(0.886, 0.886, 0.886, 0.6),

        vec4(0.0, 0.4, 0.0, 0.6),
        vec4(0.0, 0.4, 0.0, 0.6),
        vec4(0.0, 0.4, 0.0, 0.6),

        //small tree
        //triangle
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(0.24, 0.411, 0.329, 1.0),
        vec4(0.24, 0.411, 0.329, 1.0),
        vec4(0.24, 0.411, 0.329, 1.0),
        vec4(0.24, 0.411, 0.329, 1.0),
        vec4(0.24, 0.411, 0.329, 1.0),
        vec4(0.24, 0.411, 0.329, 1.0),
        vec4(0.24, 0.411, 0.329, 1.0),
        vec4(0.24, 0.411, 0.329, 1.0),

        //rectangle
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),

        //large tree
        //triangle
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(0.278, 0.619, 0.447, 1.0),
        vec4(0.278, 0.619, 0.447, 1.0),
        vec4(0.278, 0.619, 0.447, 1.0),
        vec4(0.278, 0.619, 0.447, 1.0),
        vec4(0.278, 0.619, 0.447, 1.0),
        vec4(0.278, 0.619, 0.447, 1.0),
        vec4(0.278, 0.619, 0.447, 1.0),
        vec4(0.278, 0.619, 0.447, 1.0),

        //rectangle
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),

        //star
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(1.0, 1.0, 1.0, 1.0),
    ];

    // canvas.addEventListener("mousedown", function(event){
    //     gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId);
    //     var t = vec2(2*event.clientX/canvas.width-1,
    //         2*(canvas.height-event.clientY)/canvas.height-1);
    //     gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(t));
    //
    //     gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
    //     t = vec4(0.0,0.0,0.0,1.0);
    //     gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));
    //     index++;
    // } );

    //Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 1.0, 1.0);

    //Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    //Load the data into the GPU
    var vertexPositionBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    //Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    //vertex color
    var vertexColorBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    gl.clear(gl.COLOR_BUFFER_BIT);

    //uniform variable
    offsetLoc = gl.getUniformLocation(program, "offset");

    //uniform variable
    size = gl.getUniformLocation(program, "size");

    document.getElementById("down").onclick = function () {
        flag = !flag;
        reverseFlag = false;
    };

    document.getElementById("up").onclick = function () {
        reverseFlag = !reverseFlag;
        flag = false;
    };

    document.getElementById("slider").onchange = function (event) {
        sky = event.target.value;
        var vColor = gl.getAttribLocation(program, "vColor");
        gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vColor);
    }

    render()
    intervalId = setInterval(render, 100);
}


function render() {

    snowPos = [0.5 - snowAnim * rand1, 0.4 - snowAnim * rand2, 0.8 - snowAnim * rand3, 0.9 - snowAnim * rand4, 0.9 - snowAnim * rand1,
    0.9 - snowAnim * rand1, 0.7 - snowAnim * rand2, 0.3 - snowAnim * rand3, 0.0 - snowAnim * rand4, 0.7 - snowAnim * rand1]

    for (var i = 0; i < snowPos.length; i++) {
        if (snowPos[i] < -1) {
            snowAnim = 0.0;
        } else if (snowPos[i] > 1.5) {
            snowAnim = 0.0;
        }
    }

    if (flag) {
        snowAnim += 0.01;
    }

    if (reverseFlag) {
        snowAnim -= 0.01;
    }

    //size option
    // gl.uniform4fv(size, [1, 1, 1, 1]);
    //background
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    //small house
    gl.uniform4fv(offsetLoc, [1.05, 0, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 6, 6);
    gl.drawArrays(gl.TRIANGLES, 12, 6);
    gl.drawArrays(gl.TRIANGLES, 18, 3);

    //large house
    gl.uniform4fv(offsetLoc, [-0.2, 0, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 21, 6);
    gl.drawArrays(gl.TRIANGLES, 27, 6);
    gl.drawArrays(gl.TRIANGLES, 33, 3);

    //ground
    gl.drawArrays(gl.TRIANGLES, 36, 6);

    //small tree
    gl.uniform4fv(offsetLoc, [-0.25, 0.05, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 42, 9);
    gl.drawArrays(gl.TRIANGLES, 51, 6);

    //offset of small tree
    gl.uniform4fv(offsetLoc, [-0.8, 0.15, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 42, 9);
    gl.drawArrays(gl.TRIANGLES, 51, 6);

    //offset of small tree
    gl.uniform4fv(offsetLoc, [-0.5, -0.15, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 42, 9);
    gl.drawArrays(gl.TRIANGLES, 51, 6);

    //offset of large tree
    gl.uniform4fv(offsetLoc, [0.4, -0.05, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 57, 9);
    gl.drawArrays(gl.TRIANGLES, 66, 6);



    //star
    gl.uniform4fv(offsetLoc, [0.33, snowPos[0], 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 72, 6);

    //size option
    gl.uniform4fv(size, [0.8, 0.8, 1, 1]);

    //star
    gl.uniform4fv(offsetLoc, [-0.75, snowPos[1], 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 72, 6);

    // star
    // gl.uniform4fv(offsetLoc, [0.25, -0.65 - snowAnim, 0, 0]);
    // gl.drawArrays(gl.TRIANGLES, 72, 6);

    //star
    gl.uniform4fv(offsetLoc, [0.5, snowPos[2], 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 72, 6);

    //size option
    // gl.uniform4fv(size, [0.4, 0.4, 1, 1]);

    //star
    gl.uniform4fv(offsetLoc, [-0.3, snowPos[3], 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 72, 6);

    //star
    gl.uniform4fv(offsetLoc, [0.6, snowPos[4], 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 72, 6);

    //star
    gl.uniform4fv(offsetLoc, [-0.85, snowPos[5], 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 72, 6);

    //star
    gl.uniform4fv(offsetLoc, [-0.6, snowPos[6], 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 72, 6);

    //star
    gl.uniform4fv(offsetLoc, [-0.3, snowPos[7], 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 72, 6);

    //star
    gl.uniform4fv(offsetLoc, [0.0, snowPos[8], 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 72, 6);

    //star
    // gl.uniform4fv(offsetLoc, [-0.1, snowPos[9], 0, 0]);
    // gl.drawArrays(gl.TRIANGLES, 72, 6);

    //size option
    // gl.uniform4fv(size, [0.2, 0.2, 1, 1]);

    //star
    gl.uniform4fv(offsetLoc, [0, snowPos[9], 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 72, 6);

    // star
    // gl.uniform4fv(offsetLoc, [0.3, snowPos[11], 0, 0]);
    // gl.drawArrays(gl.TRIANGLES, 72, 6);

    // requestAnimFrame(render)
}
