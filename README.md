# Labyrinth

# How to start

cd into the client folder and run 'npm start'

cd into the server folder and run 'nodemon'

* change the proxy within package.json (client folder) to your local IP address. Currently working on this issue to make it dynamic.

# Rules

There are 7x7 (49) tiles on the board, plus one extra tile.

Game is played by pushing walls and moving your player.

Extra tile is used to push walls, thereby creating paths.

Earn points by reaching tiles that contain your goal.

After scoring, you receive a new goal.

When there are no more unique goals to draw, the game ends. Player with most points wins the game.

# How to play

Click on the extra tile to rotate it. Then, click on an edge tile where you want to insert the extra tile.

After moving a wall, click on a reachable tile to move your player. Tile is reachable if there is an open path to it from your location. If you wish to remain where you are, click on your current location.

Every EVEN wall is movable - tiles you can push will be indicated on hover.

You cannot return a move - it is not possible to push back the wall pushed by the previous player and undo their move.

Square around players' circles indicates whose turn it is.

Messages on the dashboard will provide useful information.
