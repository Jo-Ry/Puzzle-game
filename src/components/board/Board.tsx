import { useEffect, useState } from "react";
import { TileProps } from "../app/validation.ts";

type BoardProps = {
	tileList: TileProps[]
}

const Board = ({ tileList }: BoardProps) => {
	const [modifiedTileList, setModifiedTileList] = useState<TileProps[]>(tileList)

	useEffect(() => {
		setModifiedTileList(tileList);
	}, [tileList]);

	const handleTileClick = ( clickedTile: TileProps ) => {
		const emptyTile = modifiedTileList.find(tile => tile.is_empty_tile);

		// Handle the case where emptyTile is undefined
		if (!emptyTile) {
			console.error("empty tile can not be found");
			return
		}

		/*
			Only apply logic for the clicked tile if it is inside the
			the same row or column as the empty tile
		*/
		const isSameRow = clickedTile.row === emptyTile.row;
		const isSameColumn = clickedTile.column === emptyTile.column;

		if (isSameRow || isSameColumn) {

			// Returns the range between the clicked tile and the empty tile.
			const movableTiles = modifiedTileList.filter(tile => {
				if (isSameRow) {
					const rowItems = tile.row === clickedTile.row
					const tilesLeftOfEmptyTileToClickedTile = clickedTile.column < emptyTile.column && tile.column >= clickedTile.column && tile.column <= emptyTile.column
					const tilesRightOfEmptyTileToClickedTile = clickedTile.column > emptyTile.column && tile.column <= clickedTile.column && tile.column >= emptyTile.column

					return rowItems && (tilesLeftOfEmptyTileToClickedTile || tilesRightOfEmptyTileToClickedTile);
				} else {
					const columnItems = tile.column === clickedTile.column
					const tilesOverEmptyTileToClickedTile = clickedTile.row < emptyTile.row && tile.row >= clickedTile.row && tile.row <= emptyTile.row
					const tilesUnderEmptyTileToClickedTile = clickedTile.row > emptyTile.row && tile.row <= clickedTile.row && tile.row >= emptyTile.row

					return columnItems && (tilesOverEmptyTileToClickedTile || tilesUnderEmptyTileToClickedTile);
				}
			});

			/*
				To understand what new array wolud look like, i am using the
				movable array is the key for this shifts to work.
			*/
			const updatedTiles = modifiedTileList.map(tile => {
				const xAxis = isSameRow && tile.row === clickedTile.row
				const yAxis = isSameColumn && tile.column === clickedTile.column
				let updatedTile = tile

				const moveTile = (direction: boolean) => {
					// Find the index of the current item in the movableTiles array.
					const index = movableTiles.findIndex(movableTile => movableTile.index === tile.index);
					const affectedTiles = index !== -1

					if (affectedTiles) {
						if (tile.index === clickedTile.index) {
							return {
								...tile,
								number: emptyTile.number,
								is_empty_tile: true
							};

						} else {
							// Determine the adjacent tile based on the relative position of the current tile compared to the clicked tile.
							const adjacent = movableTiles[direction ? index + 1 : index - 1]

							return {
								...tile,
								number: adjacent ? adjacent.number : clickedTile.number,
								is_empty_tile: false
							};
						}
					} else {
						// return the tiles that were not pressed in respective axis untouched.
						return tile
					}
				}

				/*
					Move the pieces on X-xis
				*/
				if (xAxis) {
					updatedTile = moveTile(tile.column < clickedTile.column)
				}

				/*
					Move the pieces on Y-axis
				*/
				if (yAxis) {
					updatedTile = moveTile(tile.row < clickedTile.row)
				}

				// return non movable tiles unchanged
				return updatedTile;
			});

			setModifiedTileList(updatedTiles);
		}
	};

	return (
		<ul className="board">
			{modifiedTileList.map( property => (
				<li key={property.index} className="board__tile" style={{ gridColumn: property.row, gridRow: property.column }}>
					<button
						disabled={property.is_empty_tile}
						onClick={() => handleTileClick(property)}
						className={`board__tile-button${property.index === property.number ? " board__tile-button--correct-postion" : ""}`}
					>
						<p>{property.number}</p>
					</button>
				</li>
			))}
		</ul>
	)
}


export default Board