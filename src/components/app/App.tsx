import { useCallback, useEffect, useState } from "react"
import { TileProps } from "./validation";
import settings from "data/config.ts";
import Board from "components/board/Board"

const App = () => {
    const [ tiles, setTiles ] = useState<TileProps[]>([]);

    const initializeNewGame = useCallback(() => {

        /*
            Step 1:

            By using the 2-dimensional technique, i can identify each tile's position by its
            own column and row. This is critical for determining wich tiles are affected
            when moving a tile. It also provides the correct number of tiles needed
            for the next step, as the numbers need to be randomized seperately.

            Also by putting this logic inside a function and then RETURNING the modified array
            Typescripts inherently understand the type structure it has, hence i dont need
            to manually specify the type like 'TileProps'
        */
		const gridCoordinates = () => {
            const coordinates = []

            for (let column = 0; column < settings.columns; column++) {
                for (let row = 0; row < settings.rows; row++) {
                    coordinates.push({
                        row: row + 1,
                        column: column + 1
                    })
                }
            }

            return coordinates
        }

        /*
            Step 2:

            By mapping trough the newly updated coordinates array i can achieve two things:
                2.1:
                    Create a new array where i can safely use the index as the value
                    inside a new object with the key 'number'.
                2.2:
                    By having this array seperated instead of just adding it in the first
                    iteration (step 1), lets me randomize the numbers without altering
                    the 'column' and 'rows' information as that data should remain the same!
                2.3
                    After that, i merge the two arrays with some additional data, resulting in an
                    array where the numbers are shuffled but each tile retains its correct
                    positional information.
        */

		/*
            Step 2.1:
            create a new array with the numbers specified by the index.
        */
		const tileNumbers = gridCoordinates().map((_, index) => ({ number: index + 1 }))

		/*
            Step 2.2:
            Shuffle the numbers. Hint: I know this is not the most reliable way to
            randomly change the items inside an array :D
        */
		const shuffledTileNumbers = tileNumbers.sort(() => Math.random() - 0.5)

		/*
            Step 2.3:
            Finally, create a new array to describe the basic structure of each tile.
        */
        const initialTileSetup = shuffledTileNumbers.map((value, index) => ({
            index: index + 1, // The index specifying where each tile exists.
			...value, // The shuffled numbers.
			...gridCoordinates()[index], // The placement of the tile.
            is_empty_tile: value.number === shuffledTileNumbers.length ? true : false // Assign the empty tile.
		}))

        setTiles(initialTileSetup)
    }, [])

    useEffect(() => {
        initializeNewGame()
    },[initializeNewGame])

    return (
        <div className="site-content">
            <Board tileList={tiles} initializeNewGame={initializeNewGame}/>
            <button onClick={() => initializeNewGame() }> Slumpa </button>
        </div>
    )
}

export default App