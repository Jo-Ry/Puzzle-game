import { useCallback, useEffect, useState } from "react";
import { TileProps } from "components/app/validation.ts";

type BoardProps = {
	tileList: TileProps[]
}

const Board = ( { tileList } : BoardProps ) => {
	const [modifiedTileList, setModifiedTileList] = useState<TileProps[]>(tileList)

	/*
		Ensure that only the relevant tiles can be moved by disabling buttons
		that should not be pressed.
	*/
	const disableNonMovableButtons = useCallback(() => {
		const emptyTile = tileList.find(value => value.number === tileList.length)

		const updateTiles = tileList.map(value => ({
			...value,
			disabled: ( value.column !== emptyTile?.column && value.row !== emptyTile?.row ) || value.number === tileList.length
		}))

		return updateTiles
	}, [tileList])

	useEffect(() => {
        setModifiedTileList(disableNonMovableButtons());
    }, [tileList, disableNonMovableButtons]);

	return (
		<ul className="board">
			{modifiedTileList.map( property => (
				<li key={property.number} className="board__tile" style={{ gridColumn: property.column, gridRow: property.row }}>
					<button disabled={property.disabled} className={`board__tile-button${property.is_empty_tile ? " board__tile-button--empty" : ""}`}>
						<p>{property.number}</p>
					</button>
				</li>
			))}
		</ul>
	)
}


export default Board
