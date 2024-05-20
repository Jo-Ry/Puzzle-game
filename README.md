# Puzzle-game using React.js, Vite and SCSS
This puzzle game is a generalized variant of the so-called 15-puzzle, as it can handle an arbitrary number of rows and columns. It is built solely as a frontend application.

![Image showing the game](https://github.com/Jo-Ry/Puzzle-game/assets/55887405/8a4874e4-eca5-4bf2-9832-8de46626fd43)

**Features for this project**
* Allow users to adjust the difficulty level based on their preferences trough a config file that contains the amount of rows and columns on the board.
* Responsive.
* The tiles are numbered from 1 and upwards.
* There is exactly one empty space at all time.
* Tiles are moved by clicking on a tile in the same column or row as the empty space; then that tile and all tiles between it and the empty space move one step towards the empty space.
* Using the Google font "Open Sans".
* The initial order of the tiles are shuffled when page loads in.
* There is a button that shuffles the order of your tiles that you can press at any time during the game session.
* If the user solves the puzzle, it displayes an appropriate message on the screen.

## Prerequisites

- **Node.js**: Ensure that you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/en).
- **npm**: npm is includeed with Node.js, so you should have it after installing Node.js.
- **Git**: Ensure that you have git installed. You can download it from [git-scm.com](https://git-scm.com/).

## Setup and run

### Step 1: Clone the repository

1. **Open your terminal**.
2. **Navigate to the directory** where you want to clone the project.
3. **Run the following command** to clone the repository.

```bash
git clone git@github.com:Jo-Ry/Puzzle-game.git
```

4. **Navigate into your project directory**

```bash
cd puzzle-game
```

### Step 2: Install dependencies

Inside you project directory, run the following command to install the necessary dependencies:

```bash
npm install
```

### Step 3: Run the development server

To start the development server, run:

```bash
npm run dev
```

**_Congratulations! You are now able to feast upon the glory of this game :)_**

## Usage

To change the rows and columns, modify the config file under `src/data`.