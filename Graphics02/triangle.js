
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
    var vertices = new Float32Array([-1,0, 0,1, 0,0, 0,1, 1,0, 0,0]);

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    // 여기에 위에서 만든 데이터 배열을 넘겨줘서 gl로 쓸 수 있게 만든다. 즉 버퍼에 데이터를 넣는 행위.
    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );

    // Associate vertex data buffer with shader variables
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    // vertex를 2개씩 묶어서(좌표) 쓰겠다는 뜻.
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    // 삼각형을 그리되 bufferData에 전달된 배열의 0번부터 6번까지 인덱스를 사용하여 그려라.
    gl.drawArrays( gl.TRIANGLES, 0, 6);    
}
