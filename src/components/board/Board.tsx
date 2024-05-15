import { TileProps } from "../app/validation"

type BoardProps = {
	tileList: TileProps[]
}

const Board = ( { tileList } : BoardProps ) => {
	return (
		<ul className="board">
			{
				tileList.map( property => (
					<li className="board__tile" style={{ gridColumn: property.column, gridRow: property.row }}>
						<button>
							{property.number}
						</button>
					</li>
				))
			}
		</ul>
	)
}

export default Board
