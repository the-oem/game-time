# TRON - Simply put, a classic.

This is a game that was built as part of the *Turing School of Software and Design* curriculum. This is a module 2 group project for the front-end engineering program.

## Installation

Tron is a Javascript based game built using jQuery 3.2.1 and ES6. In order to install and play, follow these instructions:
1. Clone the repository with `git clone git@github.com:the-oem/game-time.git`
2. In a terminal window, navigate to the repository and run `npm install`. This will install all the dependencies for the project.
3. In the same terminal window, run `npm start` to start the server.
4. Open a browser window and navigate to `http://http://localhost:8080/`.
5. Enjoy!

*Start Screenshot*
![Tron Start Screen](/media/screenshots/tron_start_screen.png)

*Gameplay Screenshot*
![Tron Gameplay Screen](/media/screenshots/tron_gameplay_screen.png)

## Usage

Tron is a 2-player game, with a fairly intuitive interface. The goal of the game is to box the other player in such that they crash into either their bike trail or yours. Some features of the game are:

* Players can cross the grid boundary and appear on the other side of the game board. This adds an element of strategy to the game.
* The trail of your bike will start to disappear after 10 seconds. This also adds an element of strategy. When you think you've boxed your opponent in, they may discover a way to avoid death because of this feature!

Movement is documented visually in the game, as follows:
* Player 1 uses the `W` (up), `A` (left), `S` (down), `D` (right) keys for movement.
* Player 2 uses the arrows keys for movement, with the arrow corresponding to the direction.
* `R` will reset the reload the entire game, and reset the scores.
* `N` will start a new game, but maintain the player scores.
* `Spacebar` will pause the game.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

This is currently Version 1 of Tron, however we'll be adding additional features in the coming months. The proposed feature list is below. If you have ideas, let us know!
0. Add sprite graphics for the player bikes.
1. Single player mode (vs a computer controlled bike).
2. Ability for users to choose bike color and type (big and slow or small and fast?).
3. Ability for users to mute all sound effects.
4. More difficult game modes, such as random obstacles placed on the game board, and randomly placed starting locations for each player.
5. Ability for 2 players to compete on different computers (via Web Sockets).
6. Power-ups for each player, such as a limited number of turbo boosts.

## Credits

This game was built with a tremendous amount of blood, sweat, and tears by two really humble guys named Jason "JC" Collins and Evan Miller. They're rad dudes, and we think you should totally be friends with them.

* Jason "JC" Collins [GitHub profile](https://github.com/the-oem)
* Evan Miller [GitHub profile](https://github.com/EvanSays)
