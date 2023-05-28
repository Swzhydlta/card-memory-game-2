# Memory Card Game

## How to run:

To run, clone the repo and open it in your favorite editor. Cd to the root folder and run "npm install" to to get the required dependencies (React and React-Bootstrap). Once they have installed, run "npm start" to open the app in your browser.

## Description of functionality:

- User visits the game url
- State for cards and game functionality are set to values in local storage if they exist, and hard-coded values otherwise
- Once state is loaded, a useEffect shuffles the cards if user has no local storage (this useEffect also runs when user clicks replay)
- The card array is mapped into JSX 
- User clicks a card
- This triggers a function that changes the visibility of the card
- This triggers a useEffect that handles the calculations relating to whether a user has won the turn or not, and how many turns the user has     left. It checks if two cards are visible, and if so, whether they match. If two are visible and they match, the card status is set to solved.   If they don't match, the cards are set back to unsolved. One turn is subtracted.
- When a turn is subtracted, this triggers a different useEffect that handles whether the user has won or lost the round. It checks if all         cards are set to solved, and if so, provided the user still has over 0 turns left, the user wins, and game is set to false. If cards are still   unsolved and the turn is equal to 0, the user loses and game is set to false.
- Each time there is any change to game state, a useEffect runs that pushes all state objects to local storage to ensure the game state is         maintained if the user closed the browser.
