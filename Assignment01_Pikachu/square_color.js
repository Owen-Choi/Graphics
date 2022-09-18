
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
    // Four Vertices
    
    var vertices = [
        vec2( -0.5, 0.5 ), // v0
		vec2( -0.5, -0.5 ), // v1
        vec2( 0.5, 0.5 ), // v2
		vec2( 0.5, -0.5 ), //v3
		vec2( 0.5, 0.5 ), // v4 =v2
		vec2( -0.5, -0.5 ), // v5=v1        
    ];

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    // var bufferId = gl.createBuffer();
    // gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    // gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation(program, "vColor");	
    var offset = gl.getUniformLocation(program, "offset");	
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    drawHexagonVertices(vPosition, vColor, offset);

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    //gl.drawArrays( gl.TRIANGLES, 0, 6 );
	//gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}


function setBuffer(data) {    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );	
    gl.bufferData( gl.ARRAY_BUFFER, data, gl.STATIC_DRAW );	
}


function drawHexagonVertices(vPosition, vColor, offset) {
    // hexagon vertices	 
    itemSize = 2;
    numberOfItem = 6;
    var hexagonVertices = [
        vec2(-0.3,  0.6), //v0
        vec2(-0.4,  0.8), //v1
        vec2(-0.6,  0.8), //v2
        vec2(-0.7,  0.6), //v3
        vec2(-0.6,  0.4), //v4
        vec2(-0.4,  0.4), //v5        
    ]; 
    setBuffer(flatten(hexagonVertices)) 	  

	gl.vertexAttribPointer( vPosition, itemSize, gl.FLOAT, false, 0, 0 );	
    gl.enableVertexAttribArray( vPosition );
    
	gl.disableVertexAttribArray(vColor);    // We disable the vertex attrib array since we want to use a constant color for all vertices in the hexagon
	gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 1.0);  //specify constant values for generic vertex attributes.

	gl.drawArrays(gl.LINE_LOOP, 0, numberOfItem); 	
}