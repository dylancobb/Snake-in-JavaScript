# Planning
- I decided to build a clone of the classic game Snake.
- From my research, I will probably need to use the `<canvas>` element, which will be a new experience!
# Building
- Deployed standard HTML boilerplate and settled on fonts + colour scheme.
- Began by creating the "board" dimenions and context and painted the canvas black.
- Created a function to update the status of the canvas.
- Created the snake's "head" and the "food" objects, and figured out how to paint them their respective colours.
- Created a function to place the snake's "food" at random coordinates.
- Created an event listener that takes user key presses to change the snake's direction by manipulating "velocity" variables.
- Added the snake's velocities to the canvas update function so it now moves each frame and changes direction as desired.
- Added a call to place the snake's "food" in a random location again if the head and food's coordinates are identical.
- Added the snake's "body" as an empty array.
- Each time the snake "eats" food, its head's current coordinates are pushed onto the body array to create the new body segment.
- Inside the update function, a for loop starts from the tip of the tail and moves each segment to the location of the segment in front of it, *before* the head's position is updated, to create the slithering snake effect.
- I decided to paint every odd-numbered segment a slightly darker shade of green for a stripy snake.
- Added game over conditions: out-of-bounds and self-intersection.
- Added a game over `<div>` message that is set to hidden until gameOver === true
- Added a score and high score tracker which updates as the snake eats food and upon game over in the event the game over score was higher than the previous high score.
# Debugging
- Took a few tries to get the canvas to even display at first 😅
- Body segments were not working as intended; has to be updated from the *end of the tail* first.
- Going out-of-bounds off the positive X or Y axis wasn't registering until the snake head was a whole extra square out-of-bounds, because it's 0-indexed. Easy fix.
- The snake shouldn't be able to move in the direction directly opposite its current heading. Added checks on each direction change to make sure only 90-degree turns are permitted!
- The game over message box was throwing an error. I'd placed the `<div>` for it below the `<script>` tag (d'oh!).