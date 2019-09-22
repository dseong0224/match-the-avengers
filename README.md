# Match the Avengers

## What are the specifications for the app?
1. Cards are created dynamically using jQuery JS. 
2. Each game-level draws eigth random cards from a card bank and difficulty goes up.
3. Game includes features such as:
    - game preview + play button
    - background music
    - card click sound
    - flip animation
    - restart button
    - end of round, end of game modal
    
<details>
<summary> &#8592; Click arrow for gameplay instructions</summary>

1. Match the Avengers is a web game in which a player attempts to match the images contained on "playing cards".
2. There are a total of 16 cards:
    - Each card contains 1 of 8 images
    - There are two of each image allowing for 8 total matches
3. The following stats are tracked:
    - Number of seconds passed in current round of game
    - Total number of matches
    - Game score based on how fast the player matches all the cards
4. The cards are displayed face down and "flip" over when they are clicked.
5. Two cards can be flipped each attempt.
6. If the images of the two cards which are flipped over match:
    - The cards remain flipped over and the player gets 1 point for the match
    - 1 point is added to the total number matches
7. If the two flipped over cards do not match:
    - The cards are flipped back over
    - 1 is added to the total number of attempts
    - The player must choose two cards again to continue searching for a match
8. Once all 8 cards have been matched:
    - A modal is shown to the player telling them they have won the round
    - A button is provided which leads to a more difficult level
9. A restart button is always available.
10. Restarting the game performs the following actions:
    - All cards are flipped back over
    - The total number of matches are reset
    - The score resets
