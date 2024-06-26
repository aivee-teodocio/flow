# Flow

## Description
[Flow](https://aivee-teodocio.github.io/flow/) is a simple typing test website to help improve your typing speed and accuracy

## Typing Test Modes
Words mode: Type a finite set of words  
Timer mode: Type as many words as you can until the timer runs out  

## Result calculations
**Accuracy**: [(Number of characters typed correctly) / (Total number of characters typed)] * 100

**WPM**: [(Number of characters typed correctly) / 5] / **k**  
In *timer* mode, k = Initial time in minutes  
In *words* mode, k = Time elapsed in minutes until all words are typed

## In progress
- Adding different typing modes
  - Words mode (completed)
  - Timer mode (in progress)  
- The ability to apply themes

## For devs
In the project directory, you can run: `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
