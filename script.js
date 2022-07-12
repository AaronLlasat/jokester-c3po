const button = document.getElementById("button");
let audio = document.getElementById("audio");
let jokeText = document.getElementById("joke-text");
let jokeCategory = document.getElementById("joke-category");
let picture = document.getElementById("picture");
let isJokeFound = false;
let isJokeFinished = true;
let jokeFirstPart;
let jokeSecondPart;
let timeOutDuration;

const assignJSON = async (data) => {
   formatJoke(data);


   audio.src = data.audio;
   jokeText.innerHTML = jokeFirstPart;
   await new Promise(res => setTimeout(res, timeOutDuration));
   jokeText.innerHTML = jokeText.innerHTML + "<br><br>" + jokeSecondPart;
   await new Promise(res => setTimeout(res, 1500));
   isJokeFinished = true;
   button.disabled = false;


   console.log(jokeFirstPart.length)
   //112 = 4s
   //46 = 4s 

}

const formatJoke = (data) => {
   isJokeFound = true;
   console.log("data:", data)
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

const getJoke = () => {
   console.log("click")
   stateOfLoader(true);
   fetch("http://localhost:8000/getjoke", { method: "GET", headers: { "jokeCategory": jokeCategory.value } })
      .then(res => res.json())
      .then(data => assignJSON(data))
      .catch(err => console.log(err))
}

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

jokeCategory.addEventListener('change', changeDisplayText)
button.addEventListener('click', getJoke);