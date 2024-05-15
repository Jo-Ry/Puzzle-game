type BoardProps = {
	tileList: []
}

const Board = ( { tileList } : BoardProps ) => {
	console.log("🚀 ~ Board ~ tileList:", tileList)

	return (
		<ul className="board">
			<li className="board_tile">1</li>
		</ul>
	)
}

export default Board
