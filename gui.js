MOUSE_DOWN = [ false, false ]

function initGUI() {
	// autofill fields:
	document.getElementById( 'speed' ).value = REFRESH_RATE
	document.getElementById( 'randomSeed' ).value = RANDOM_SEED
	document.getElementById( 'cellSize' ).value = CELL_SIZE

	switch( SEED ) {
		case 'blank': document.getElementById( 'seedBlank' ).checked = true; break
		default:			document.getElementById( 'seedRandom' ).checked = true; break
	}

	switch( COLOR ) {
		case 'black': document.getElementById( 'colorBlack' ).checked = true; break
		default:			document.getElementById( 'colorTime' ).checked = true; break
	}

	// auto hide/reveal random seed selector:
	if( SEED == 'random' ) { document.getElementById( 'randomSelector' ).style.display = 'block' }
	else { document.getElementById( 'randomSelector' ).style.display = 'none' }
}

function guiIterations( text ) { document.getElementById( 'iterations' ).innerHTML = text }

function guiSetSeed( s ) { 
	// hide/show random selector:
	if( s == 'random' ) { document.getElementById( 'randomSelector' ).style.display = 'block' }
	else if( SEED == 'random' ) { document.getElementById( 'randomSelector' ).style.display = 'none' }

	SEED = s;
	guiReset() 
}

function guiSetRandomSeed() { RANDOM_SEED = document.getElementById( 'randomSeed' ).value; guiReset() }
function guiSetSpeed() { REFRESH_RATE = document.getElementById( 'speed' ).value }
function guiSetColor( c ) { COLOR = c }
function guiSetCellSize() { s = document.getElementById( 'cellSize' ); if( s > 0 ) { CELL_SIZE = document.getElementById( 'cellSize' ).value; guiReset() } }
function guiReset() { ITERATIONS = 0; initBoard() }

function guiTogglePause() {
	if( REFRESH_RATE ) {
		REFRESH_RATE = false
		document.getElementById( 'pause' ).value = 'Resume'
	} else {
		guiSetSpeed()
		update()
		document.getElementById( 'pause' ).value = 'Pause'
	}
}

function guiSetMouse( e ) {
	if( e.button == 0 ) {
		( e.type == 'mousedown' )? MOUSE_DOWN[ 0 ] = true : MOUSE_DOWN[ 0 ] = false
	} else if( e.button == 2 ) {
		( e.type == 'mousedown' )? MOUSE_DOWN[ 1 ] = true : MOUSE_DOWN[ 1 ] = false
	}

	return false // prevents menus from popping up
}

function guiEditBoard( e ) {
	board = document.getElementById( 'board' )
	x = e.pageX - board.offsetLeft - Math.floor( CELL_SIZE / 2 )
	y = e.pageY - board.offsetTop - Math.floor( CELL_SIZE / 2 )

	if( MOUSE_DOWN[ 0 ] ) { editCell( true, x, y ) } else if( MOUSE_DOWN[ 1 ] ) { editCell( false, x, y ) }
}
