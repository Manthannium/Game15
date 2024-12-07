import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const getCellColor = (cell) => {
    let index = 255 - 15*(cell-1);
    if(cell == 16) index = 0;
    const cellColor = 'rgb(' + index.toString() + ',' + index.toString() + ',' + index.toString() + ')';
    return cellColor;
}

export default function Board({board, onPress}) {
    return (
        <View style={styles.board}>
            {board.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {
                        row.map((cell, cellIndex) => (
                            <TouchableOpacity
                                activeOpacity={1} 
                                key={cellIndex}
                                style={[{backgroundColor: getCellColor(cell)}, styles.cell]}
                                onPress={() => onPress(rowIndex,cellIndex)}
                            >
                                <Text style={[{color: getCellColor(cell)} ,styles.cellText]}>
                                        {cell}
                                </Text>
                                {/* { cell == 4*rowIndex + cellIndex + 1 ? (
                                    <Text style={[{color: 'black'} ,styles.cellText]}>
                                        {cell}
                                    </Text>
                                ) : (
                                    <Text style={[{color: getCellColor(cell)} ,styles.cellText]}>
                                        {cell}
                                    </Text>
                                )} */}
                                
                            </TouchableOpacity>
                        ))
                    }
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    board: {
        marginTop: 20,
        borderColor: 'black',
        borderWidth: 1,
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 80,
        height: 80,
        borderWidth: 0,   
        justifyContent: 'center',
        alignItems: 'center',
    },
    cellText: {
        fontSize: 36,
        fontFamily: 'monospace',
    },
});