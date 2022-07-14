// DOM Manipulation
const button = document.getElementById("button");
let audio = document.getElementById("audio");
let jokeText = document.getElementById("joke-text");
let jokeCategory = document.getElementById("joke-category");
let picture = document.getElementById("picture");

// Variable declaration
let isJokeFound = false;
let isJokeFinished = true;
let jokeFirstPart;
let jokeSecondPart;
let timeOutDuration;

// Assign the information received through JSON to the respective DOM elements
const assignJSON = async (data) => {
   formatJoke(data);
   audio.src = data.audio;
   jokeText.innerHTML = jokeFirstPart;
   await new Promise(res => setTimeout(res, timeOutDuration));
   jokeText.innerHTML = jokeText.innerHTML + "<br><br>" + jokeSecondPart;
   await new Promise(res => setTimeout(res, 1500));
   isJokeFinished = true;
   button.disabled = false;

   //112 = 4s
   //46 = 4s 

}

// Format the joke according to its length and position in the joke (delivery or setup part)
const formatJoke = (data) => {
   isJokeFound = true;
   jokeFirstPart = data.joke.split("*")[0];
   jokeSecondPart = data.joke.split("*")[1];
   if (jokeFirstPart.length < 80) {
      timeOutDuration = 3000;
   } if (jokeFirstPart.length === 80) {
      timeOutDuration = 4000;
   } if (jokeFirstPart.length > 80) {
      timeOutDuration = 5000;
   } if (jokeFirstPart.length > 100) {
      timeOutDuration = 6000;
   }
}

// API call to get a JSON with the joke and the link where the voice model reads the joke
const getJoke = () => {
   stateOfLoader(true);
   fetch("https://c3po-api.herokuapp.com/getjoke", 
   {method: "GET", 
   headers: {
   "jokeCategory": jokeCategory.value},
   "Access-Control-Allow-Origin":"https://c3po-api.herokuapp.com/getjoke",
   "Access-Control-Allow-Methods" : "OPTIONS, POST, GET",
   "Access-Control-Allow-Headers" : "Content-Type",
   "Access-Control-Allow-Credentials" : true})
      .then(res => res.json())
      .then(data => assignJSON(data))
      .catch(err => console.log(err))
}

// Checks if a joke is being fetched or displayed and adds a little "Loading..." animation to the text box
const stateOfLoader = async (loading) => {
   if (loading) {
      let i = 0;
      isJokeFound = false;
      isJokeFinished = false;
      button.disabled = true;
      jokeText.innerHTML = "Loading";
      while (i < 4 && !isJokeFound) {
         await new Promise(res => setTimeout(res, 1000));
         jokeText.innerHTML = jokeText.innerHTML + "."
         i++;
         if (i === 4 && !isJokeFound) {
            jokeText.innerHTML = "Loading"
            i = 0;
         }
      }
   }
}

// Changes the display text of the text box according to the selected joke category
const changeDisplayText = () => {
   if (isJokeFinished) {
      switch (jokeCategory.value) {
         case "Programming":
            jokeText.textContent = "Hi, my name is C-3PO and I'm a nerdy jokester."
            break;
         case "Dark":
            jokeText.textContent = "Hi, my name is C-3PO and I'm fueled by racism, misogyny and hatred."
            break;
         case "Pun":
            jokeText.textContent = "Hi, my name is C-3PO and dad jokes and puns are my thing."
            break;
         case "Spooky":
            jokeText.textContent = "Hi, my name is C-3PO and I'm gonna scare you to death with these jokes."
            break;
         case "Christmas":
            jokeText.textContent = "Hi, my name is C-3PO and I'm all in for Christmas and jokes."
            break;
         case "Misc":
            jokeText.textContent = "Hi, my name is C-3PO and I have a wide variety of random jokes for you."
            break;
         default:
            break;
      }
   }
}

// Event Listeners
jokeCategory.addEventListener('change', changeDisplayText)
button.addEventListener('click', getJoke);