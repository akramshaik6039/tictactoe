import React, { useState, useEffect } from 'react';

const TicTacToe = () => {
    const [cells, setCells] = useState(Array(9).fill("")); // 9 cells for a 3x3 grid
    const [isX, setIsX] = useState(true); // Toggle between 'X' and 'O'
    const [winner, setWinner] = useState(null); // State to track the winner

    const handleClick = (index) => {
        if (cells[index] === "" && !winner) {
            const newCells = [...cells];
            newCells[index] = isX ? "X" : "O";
            setCells(newCells);
            setIsX(!isX); // Switch turns
        }
    };

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        
        for (let [a, b, c] of winningCombinations) {
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                setWinner(cells[a]); // Set the winner
                return;
            }
        }
        
        if (cells.every(cell => cell !== "")) {
            setWinner("draw"); // Set to draw
        }
    };

    useEffect(() => {
        checkWinner();
    }, [cells]);

    const resetGame = () => {
        setCells(Array(9).fill("")); // Reset board
        setWinner(null); // Reset winner state
    };

    return (
        <div className="table-container">
            <h2>{winner ? `Winner: ${winner}` : `Current Player: ${isX ? "X" : "O"}`}</h2>
            <table border={1} style={{ borderCollapse: 'collapse', width: '150px', height: '150px' }}>
                <tbody>
                    {[0, 1, 2].map(row => (
                        <tr key={row}>
                            {[0, 1, 2].map(col => {
                                const index = row * 3 + col;
                                return (
                                    <td 
                                        key={index} 
                                        onClick={() => handleClick(index)} 
                                        style={{ textAlign: 'center', fontSize: '24px', cursor: 'pointer', width: '50px', height: '50px' }}
                                    >
                                        {cells[index]}
                                    </td>
                                );
                            })}
                        </tr>
                        
                    ))} 
                </tbody>
            </table>
            {winner && <button onClick={resetGame}>Reset Game</button>}
        </div>
    );
};

export default TicTacToe;