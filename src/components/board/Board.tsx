import { useEffect, useState } from "react";
import { TileProps } from "../app/validation.ts";

type BoardProps = {
	tileList: TileProps[]
}

const Board = ( { tileList } : BoardProps ) => {
	const [modifiedTileList, setModifiedTileList] = useState<TileProps[]>(tileList)

	useEffect(() => {
        setModifiedTileList(tileList);
    }, [tileList]);

	return (
		<ul className="board">
			{modifiedTileList.map( property => (
				<li key={property.number} className="board__tile" style={{ gridColumn: property.column, gridRow: property.row }}>
					<button disabled={property.disabled}>
						{property.number}
					</button>
				</li>
			))}
		</ul>
	)
}


export default Board
