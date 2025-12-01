# Hexapawn Reinforcement Learning

A browser-based implementation of 3x3 Hexapawn comparing a baseline random agent against a reinforcement learning agent.

## Project Structure

* **`Tutorial Random Bot/`**
    * **Matchup:** Random Bot (White) vs. Human (Black).
    * **Logic:** The White bot calculates legal moves and selects one at random.
* **`Reinforcement Learning/`**
    * **Matchup:** Human (White) vs. Learning AI (Black).
    * **Logic:** The AI uses a negative reinforcement model (MENACE-style), banning moves that lead to losses to improve over time.

## Game Rules

* **Movement:** Pawns move one square forward to empty tiles.
* **Capturing:** Pawns capture diagonally forward.
* **Win Conditions:**
    1.  Reach the opponent's starting row.
    2.  Capture all opponent pieces.
    3.  Opponent has no legal moves remaining.

## Installation & Usage

1.  Clone this repository.
2.  Open `Reinforcement Learning/index.html` or `Tutorial Random Bot/index.html` in any modern web browser.
3.  **For Random Bot:** You play as Black using drag-and-drop; the Bot plays White automatically.
4.  **For RL Bot:** You play as White; the Bot plays Black.
5.  Click the "Restart" button to reset the board and playing state.