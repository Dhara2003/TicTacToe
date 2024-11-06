import React, { useRef, useState, useEffect } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assests/circle.png';
import cross_icon from '../Assests/cross.png';

let data = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const titleRef = useRef(null);
    
    useEffect(() => {
        const savedPlayer1Score = localStorage.getItem("player1Score");
        const savedPlayer2Score = localStorage.getItem("player2Score");
        if (savedPlayer1Score) setPlayer1Score(parseInt(savedPlayer1Score));
        if (savedPlayer2Score) setPlayer2Score(parseInt(savedPlayer2Score));
    }, []);

    function toggle(e, num) {
        if (lock || data[num] !== " ") return;

        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${cross_icon}'>`;
            data[num] = "x";
        } else {
            e.target.innerHTML = `<img src='${circle_icon}'>`;
            data[num] = "o";
        }
        setCount(count + 1);
        checkWin();
    }
const checkWin=()=>{
     if(data[0]===data[1] && data[1]===data[2] && data[2]!==" "){
         won(data[2]);
     }
    else if(data[3]===data[4] && data[4]===data[5] && data[5]!==" "){
        won(data[5]);
    }
    else if(data[6]===data[7] && data[7]===data[8] && data[8]!==" "){
        won(data[8]);
    }
    else if(data[3]===data[4] && data[4]===data[5] && data[5]!==" "){
        won(data[5]);
    }
    else if(data[0]===data[3] && data[3]===data[6] && data[6]!==" "){
        won(data[6]);
    }
    else if(data[1]===data[4] && data[4]===data[7] && data[7]!==" "){
       won(data[7]);
    }
    else if(data[2]===data[5] && data[5]===data[8] && data[8]!==" "){
      won(data[8]);
    }
    else if(data[0]===data[4] && data[4]===data[8] && data[8]!==" "){
       won(data[8]);
    }
    else if(data[0]===data[1] && data[1]===data[2] && data[2]!==" "){
      won(data[2]);
    }
    else if(data[2]===data[4] && data[4]===data[6] && data[6]!==" "){
      won(data[6]);
    }
    else if(!data.includes(" ")) {
       titleRef.current.innerHTML = "It's a Draw!";
        setLock(true);
    }

}

    const won = (winner) => {
        setLock(true);
        titleRef.current.innerHTML = `Congratulations: ${winner === "x" ? `<img src='${cross_icon}'>` : `<img src='${circle_icon}'>`} Wins`;

        if (winner === "x") {
            const newScore = player1Score + 1;
            setPlayer1Score(newScore);
            localStorage.setItem("player1Score", newScore);
        } else {
            const newScore = player2Score + 1;
            setPlayer2Score(newScore);
            localStorage.setItem("player2Score", newScore);
        }
    };

    function reset() {
        setLock(false);
        data = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        titleRef.current.innerHTML = "Tic Tac Toe Game";
        
        const cells = document.querySelectorAll(".boxes");
        cells.forEach(cell => (cell.innerHTML = ""));
        
        setCount(0); 
    }
    function resetScores() {
        setPlayer1Score(0);
        setPlayer2Score(0);
        localStorage.removeItem("player1Score");
        localStorage.removeItem("player2Score");
    }
    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>Tic Tac Toe Game</h1>
            <div className="scoreboard">
                <div>Player 1 (X) Score: {player1Score}</div>
                <div>Player 2 (O) Score: {player2Score}</div>
            </div>
            <div className="horizontal-layout">
                <div className={`player player1 ${count % 2 === 0 ? "active" : ""}`}>Player 1 (X)</div>
                <div className="board">
                    <div className="row">
                        <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
                        <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
                        <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
                    </div>
                    <div className="row">
                        <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
                        <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
                        <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
                    </div>
                    <div className="row">
                        <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
                        <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
                        <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
                    </div>
                </div>
                <div className={`player player2 ${count % 2 !== 0 ? "active" : ""}`}>Player 2 (O)</div>
            </div>
            <button className="reset" onClick={reset}>Reset</button>
            <button className="resets" onClick={resetScores}>Reset Scores</button>
        </div>
    );
}

export default TicTacToe;
