// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Game2048 {
    // Mapping from player address to their high score
    mapping(address => uint256) public highScores;

    // Event emitted when a player updates their score
    event ScoreUpdated(address indexed player, uint256 score);

    // Function to submit a new score.
    // It only accepts scores that are higher than the current high score.
    function submitScore(uint256 score) public {
        require(score > highScores[msg.sender], "New score must be higher than your current high score.");
        highScores[msg.sender] = score;
        emit ScoreUpdated(msg.sender, score);
    }

    // Optional: A helper function to get a player's high score
    function getHighScore(address player) public view returns (uint256) {
        return highScores[player];
    }
}
