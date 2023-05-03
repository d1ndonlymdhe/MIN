import React from 'react'
import { useState } from 'react';

const Carousel = () => {
    const [currentCard, setCurrentCard] = useState(2);
  return (
    <>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        height: '150px',
        alignItems: 'center',
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, i) => {
        return (
          <ImagePlaceholder
            n={n}
            key={i}
            i={i}
            isSelected={currentCard == i}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          ></ImagePlaceholder>
        );
      })}
    </div>
    <div style={{ display: 'flex' }}>
      <button
        onClick={() => {
          if (currentCard > 0) {
            setCurrentCard(currentCard - 1);
          }
        }}
      >
        Prev
      </button>
      <button
        onClick={() => {
          if (currentCard < 8) {
            setCurrentCard(currentCard + 1);
          }
        }}
      >
        Next
      </button>
    </div>
  </>
  )
}

const set<T> = 
function ImagePlaceholder (n:number, i:number, setCurrentCard:React.Dispatch<React.SetStateAction<number>>, isSelected:boolean, currentCard:number) {
    return (
      <div
        style={{
          // display: Math.abs(currentCard - i) <= 2 ? 'block' : 'none',
          height: isSelected
            ? '150px'
            : Math.abs(currentCard - i) == 1
            ? '100px'
            : Math.abs(currentCard - i) == 2
            ? '75px'
            : '0px',
          width: isSelected
            ? '150px'
            : Math.abs(currentCard - i) == 1
            ? '100px'
            : Math.abs(currentCard - i) == 2
            ? '75px'
            : '0px',
  
          overflow: 'hidden',
          backgroundColor: isSelected ? 'red' : 'blue',
          transitionDuration: '0.5s',
        }}
        onClick={() => {
          setCurrentCard(i);
        }}
      >
        {n}
      </div>
    );
  }


export default Carousel