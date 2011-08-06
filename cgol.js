// config
CELL_SIZE = 10
REFRESH_RATE = 200 // milliseconds
RANDOM_SEED = 0.1 // Math.random() must be lower than this to start a cell out alive
SEED = 'random' // 'random' 'blank'
COLOR = 'time' // 'black' 'time' 'random'
// end config

BOARD = [] // initBoard fills this up, it will be sized [rows/CELL_SIZE][cols/CELL_SIZE]
DRAW = null // initalized in initBoard
ITERATIONS = 0

function initBoard() {
	DRAW = document.getElementById( 'board' ).getContext( '2d' )
	rows = document.getElementById( 'board' ).width
	cols = document.getElementById( 'board' ).height

	for( x = 0; x < rows / CELL_SIZE; ++x ) {
		BOARD[ x ] = Array()
		for( y = 0; y < cols / CELL_SIZE; ++y ) {
			if( SEED == 'random' ) { alive = Math.random() < RANDOM_SEED? 1 : 0 } else { alive = 0 }

			BOARD[ x ][ y ] = alive
		}
	}

	update()
}

// initBoard must be called for any of these functions to work:

function update() {
	working = [ BOARD.length ]
	for( i = 0; i < BOARD.length; ++i ) { working[ i ] = BOARD[ i ].slice() } // deep copy array

	for( x = 0; x < working.length; ++x ) {
		for( y = 0; y < working[ x ].length; ++y ) {
			adj = numAdj( working, x, y )
			if( adj < 2 || adj > 3 ) { BOARD[ x ][ y ] = 0 }
				else if( adj == 3 ) { if( BOARD[ x ][ y ] < 255 ) { ++BOARD[ x ][ y ] } }
				else { if( BOARD[ x ][ y ] && BOARD[ x ][ y ] < 255 ) { ++BOARD[ x ][ y ] } }
		}
	}

	guiIterations( ++ITERATIONS )
	draw()

	if( REFRESH_RATE ) { setTimeout( 'update()', REFRESH_RATE ) } // if REFRESH_RATE is false, we pause
}

function draw() {
	DRAW.save()
	DRAW.clearRect( 0, 0, BOARD.length * CELL_SIZE, BOARD[ 0 ].length * CELL_SIZE )

	for( x = 0; x < BOARD.length; ++x ) {
		for( y = 0; y < BOARD[ x ].length; ++ y ) {
			if( BOARD[ x ][ y ] ) {
				DRAW.fillStyle = getCellColor( x, y )
				DRAW.fillRect( x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE )
			}
		}
	}

	DRAW.restore()
}

// returns the number of cells adjecent to cell [x][y]
function numAdj( domain, x, y ) {
	// to determine life, all we really need to know is the total number of neighbors
	num = 0

	// horizontal
	if( x != 0 && domain[ x - 1 ][ y ] ) { ++num }
	if( x != domain.length - 1 && domain[ x + 1 ][ y ] ) { ++num }
	// vertical
	if( y != 0 && domain[ x ][ y - 1 ]  ) { ++num }
	if( y != domain[ x ].length - 1 && domain[ x ][ y + 1 ]  ) { ++num }
	// diagonal
	if( x != 0 ) { // left
		if( y != 0 && domain[ x - 1 ][ y - 1 ]  ) { ++num } // upper-left
		if( y != domain[ x ].length - 1 && domain[ x - 1 ][ y + 1 ]  ) { ++num } // lower-left
	}
	if( x != domain.length - 1 ) { // right
		if( y != 0 && domain[ x + 1 ][ y - 1 ]  ) { ++num } // upper-right
		if( y != domain[ x ].length - 1 && domain[ x + 1 ][ y + 1 ]  ) { ++num } // lower-right
	}

	return num
}

// determines the color of a cell (returns canvas rgb string)
function getCellColor( x, y ) {
	if( COLOR == 'time' ) {
		r = Math.floor( 255 / BOARD[ x ][ y ] )
		g = 0
		b = Math.floor( Math.sqrt( 255 * BOARD[ x ][ y ] ) )
	} else if( COLOR == 'random' ) {
		r = Math.floor( Math.random() * 256 )
		g = Math.floor( Math.random() * 256 )
		b = Math.floor( Math.random() * 256 )
	} else { r = 0; g = 0; b = 0 }

	return 'rgb(' + r + ',' + g + ',' + b + ')'
}

// sets the cell at x, y, to the state given as alive
function editCell( alive, x, y ) {
	x = Math.floor( x / CELL_SIZE )
	y = Math.floor( y / CELL_SIZE )

	if( x >= 0 && y >= 0 && x <= BOARD.length && y <= BOARD[ 0 ].length ) { BOARD[ x ][ y ] = alive }
	draw()
}
