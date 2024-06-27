import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import Board from './Board';

export default function Game() {

    // for adjcanet movements
    const dx = [-1,1,0,0];
    const dy = [0,0,-1,1];

    // checks if tile in within the board
    const isValid = (rowIndex, cellIndex) => {
        if(rowIndex >= 0 && rowIndex <= 3 && cellIndex >= 0 && cellIndex <= 3) return true;
        else return false;
    }

    // configures board to random configuartion 
    // modify this part to make the game difficult
    const getRandomBoard = () => {

        let randomBoard = [
            [1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,16],
        ]

        // longer the pathlength more the displacement from correct configuration
        let pathLength = 100;
        let xPos = 3;
        let yPos = 3;

        for(let i=0; i<pathLength; i++) {
            let direction = Math.floor(Math.random()*4);
            let newxPos = xPos + dx[direction];
            let newyPos = yPos + dy[direction];

            if(isValid(newxPos, newyPos)) {
                randomBoard[xPos][yPos] = randomBoard[newxPos][newyPos];
                randomBoard[newxPos][newyPos] = 16;
                xPos = newxPos;
                yPos = newyPos;
            }
        }
        return randomBoard;
    };

    const instructionsText = 'Arrange the squares so they appear from brightest to darkest going left to right, top to bottom';

    const [board, setBoard] = useState(getRandomBoard);
    const [gameTitle, setGameTitle] = useState('15 SHADES OF GREY');
    const [instructions, setInstructions] = useState(instructionsText);
    const [movesCount, setMovesCount] = useState(0);


    // checks if game is solved
    useEffect(() => {
        checkWinner();
    }, [board]);

    const handlePress = (rowIndex, cellIndex) => {
        // check if tile 16 is a neighbor to swap
        const newBoard = [...board];

        for(let i=0; i<4; i++) {
            let newRow = rowIndex + dx[i];
            let newCol = cellIndex + dy[i];
            
            if(isValid(newRow, newCol) === true && board[newRow][newCol] == '16') {
                newBoard[newRow][newCol] = board[rowIndex][cellIndex];
                newBoard[rowIndex][cellIndex] = '16';
                setMovesCount(1 + movesCount);
                break;
            }
        }
        setBoard(newBoard);
    };

    const checkWinner = () => {
        let allCorrect = true;

        for(let i=0; i<4; i++) {
            for(let j=0; j<4; j++) {
                let num = (4*i + j + 1);
                if(board[i][j] != num.toString()) allCorrect = false;
            }
        }
        if(allCorrect == true) {
            setGameTitle('CONGRATULATIONS!');
            setInstructions(`Great, You did it! Manthan congratulates you for completing in ${movesCount} moves`);
        }
    };

    const resetBoard = () => {
        setBoard(getRandomBoard);
        setMovesCount(0);
        setInstructions(instructionsText);
        setGameTitle('15 SHADES OF GREY');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{gameTitle}</Text>
            <Text style={styles.instructions}>{instructions}</Text>
            <Board board={board} onPress={handlePress}/>
            <Text style={styles.movesCountText}>Moves : {movesCount}</Text>
            <TouchableOpacity
                style={styles.resetButton}
                onPress={resetBoard}
            >
                <Text style={styles.resetButtonText}>Reshuffle</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        padding: 10,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'monospace',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 0,
    },
    instructions: {
        fontSize: 9,
        textAlign: 'center',
        fontFamily: 'monospace',
        padding: 5,
    },
    movesCountText: {
        padding: 0,
        marginTop: 20,
        fontFamily: 'monospace',
        fontSize: 15,
    },
    resetButton: {
        padding: 10,
        borderRadius: 0,
        marginTop: 20,
        borderColor: 'black',
        borderWidth: 2,
    },
    resetButtonText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'monospace',
    },
});