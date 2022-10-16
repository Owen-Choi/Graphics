
var gl;
var points;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }


    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU

    // Associate out shader variables with our data buffer

    var vResolution = gl.getUniformLocation(program, "vResolution");
    var vPosition = gl.getAttribLocation(program, "vPosition");
    var vColor = gl.getAttribLocation(program, "vColor");
    var offset = gl.getUniformLocation(program, "offset");
    var colorLoc = gl.getAttribLocation(program, "color");
    // gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    // gl.enableVertexAttribArray( vPosition );

    gl.uniform2f(vResolution, gl.canvas.width, gl.canvas.height);

    gl.clear(gl.COLOR_BUFFER_BIT);

    // drawHexagonVertices(vPosition, vColor, offset);
    drawTrees(vPosition, vColor, offset, colorLoc);
    drawGround(vPosition, vColor);
    // render();
};


// function render() {
//     gl.clear( gl.COLOR_BUFFER_BIT );
//     //gl.drawArrays( gl.TRIANGLES, 0, 6 );
// 	//gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
// 	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
// }

const renderwithParams = (first, count) => {
    gl.drawArrays(gl.TRIANGLES, first, count);
}

function setBuffer(data) {
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
}

// const drawBackgroundRect = () => {
//     itemSize = 2;
//     numberOfItem = 2;
//     var RectVertices = [
//         vec2( -0.8, 0.8 ), // v0
// 		vec2( -0.8, -0.8 ), // v1
//         vec2( 0.8, 0.8 ), // v2
// 		vec2( 0.8, -0.8 ), //v3
// 		vec2( 0.8, 0.8 ), // v4 =v2
// 		vec2( -0.8, -0.8 ), // v5=v1        
//     ];
//     setBuffer(flatten(RectVertices))

//     gl.vertexAttribPointer( vPosition, itemSize, gl.FLOAT, false, 0, 0 );	
//     gl.enableVertexAttribArray( vPosition );

// 	gl.disableVertexAttribArray(vColor);    // We disable the vertex attrib array since we want to use a constant color for all vertices in the hexagon
// 	gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 1.0);  //specify constant values for generic vertex attributes.

// 	gl.drawArrays(gl.LINE_LOOP, 0, numberOfItem); 	
// }


function drawHexagonVertices(vPosition, vColor, offset) {
    // hexagon vertices	 
    itemSize = 2;
    numberOfItem = 6;
    var hexagonVertices = [
        vec2(-0.3, 0.6), //v0
        vec2(-0.4, 0.8), //v1
        vec2(-0.6, 0.8), //v2
        vec2(-0.7, 0.6), //v3
        vec2(-0.6, 0.4), //v4
        vec2(-0.4, 0.4), //v5                
    ];
    setBuffer(flatten(hexagonVertices))


    gl.vertexAttribPointer(vPosition, itemSize, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.disableVertexAttribArray(vColor);    // We disable the vertex attrib array since we want to use a constant color for all vertices in the hexagon
    gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 1.0);  //specify constant values for generic vertex attributes.

    gl.drawArrays(gl.LINE_LOOP, 0, numberOfItem);

    gl.uniform4fv(offset, [0.5, 0.0, 0.0, 0.0]);

    gl.drawArrays(gl.LINE_LOOP, 0, numberOfItem);
}


const drawGround = (vPosition, vColor) => {
    var ground = [
        // 2.0, -2.0, 1.0, -0.9, 0, -0,9,
        // 2.0, -1.0, 1.0, -1.0, 1.0, -0.9
        // -2.0, -0.5, -2.0, -2.0, 2.0, -0.5,
        // -2.0, -2.0, 2.0, -0.5, 2.0, -2.0,
        0, 0.5, 0.5, 0, 0, 0
    ]

    setBuffer(flatten(ground));

    var first = 0;
    var count = 3;

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.24, 0.411, 0.329, 1.0);

    renderwithParams(first, count);
}

const drawTrees = (vPosition, vColor, offsetLoc) => {


    var leaf = [
        0, -0.7, -0.05, -0.75, 0.05, -0.75,   // triangle 
    ];
    // gl.bufferData(gl.ARRAY_BUFFER, leaf, gl.STATIC_DRAW );	
    setBuffer(flatten(leaf));

    // color
    // gl.uniform4fv(colorLoc,[0,1,0,1]); // color (R,G,B,A)	
    var first = 0 // the starting index in the array of vector points.
    var count = 3 // the number of indices to be rendered.


    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.24, 0.411, 0.329, 1.0);

    renderwithParams(first, count) // render function

    gl.uniform4fv(offsetLoc, [0, -0.05, 0, 0]); // color (R,G,B,A)	
    renderwithParams(first, count) // render function

    gl.uniform4fv(offsetLoc, [0, -0.1, 0, 0]); // color (R,G,B,A)	
    renderwithParams(first, count) // render function

    gl.uniform4fv(offsetLoc, [0.05, -0.05, 0, 0]);
    renderwithParams(first, count)

    gl.uniform4fv(offsetLoc, [0.05, -0.1, 0, 0]);
    renderwithParams(first, count)

    gl.uniform4fv(offsetLoc, [0.05, -0., 0, 0]);
    renderwithParams(first, count)

    var body = [
        -0.015, -0.05, 0.015, -0.05, -0.015, -0.1, // triangle
        0.015, -0.05, -0.015, -0.1, 0.015, -0.1     // triangle
    ];
    // gl.bufferData(gl.ARRAY_BUFFER, body, gl.STATIC_DRAW );
    setBuffer(flatten(body));

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 0.32, 0.18, 0.18, 1.0);

    // color 
    gl.uniform4fv(offsetLoc, [0, -0.8, 0, 0]); // color (R,G,B,A)		

    var first = 0
    var count = 6
    renderwithParams(first, count) // render function

    gl.uniform4fv(offsetLoc, [0.05, -0.8, 0, 0]);

    renderwithParams(first, count);

}