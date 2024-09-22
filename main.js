const words = {
  Easy: [
    "Hello",
    "Code",
    "Town",
    "Test",
    "Task",
    "Rust",
    "Roles",
    "Python",
    "Scala",
    "Funny",
  ],
  Normal: [
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Styling",
    "Cascade",
    "Coding",
    "Working",
    "Runner",
    "Playing",
  ],
  Hard: [
    "Javascript",
    "Paradigm",
    "Programming",
    "Documentation",
    "Destructuring",
    "Dependencies",
  ],
};
const times = {
  Easy: 5,
  Normal: 4,
  Hard: 3,
};

let lvls = ["Easy", "Normal", "Hard"];

let v = 0;
let lvlName = lvls[v]; //Change level here
let lvlSeconds = times[lvlName];
let lvlwords = words[lvlName];

let start = document.querySelector(".start");
let word = document.querySelector(".word");
let input = document.querySelector(".input");
let messege = document.querySelector(".messege");
let lvlNameSpan = document.querySelector(".messege .lvl");
let lvlSecondsSpan = document.querySelector(".messege .sec");
let upcomingWordsDiv = document.querySelector(".upcoming-words");
let secondsLeft = document.querySelector(".control .time span");
let points = document.querySelector(".control .score .got");
let totalWordsSpan = document.querySelector(".control .score .total");
let finish = document.querySelector(".finish");

resetLvl();

lvlNameSpan.onclick = () => {
  v++;
  if (v === lvls.length) v = 0;
  lvlName = lvls[v];
  lvlSeconds = times[lvlName];
  lvlwords = words[lvlName];
  resetLvl();
};

function resetLvl() {
  lvlNameSpan.textContent = lvlName;
  lvlSecondsSpan.textContent = lvlSeconds;
  totalWordsSpan.textContent = lvlwords.length;
  secondsLeft.textContent = lvlSeconds;
}

input.onpaste = function () {
  return false;
};

start.onclick = function () {
  this.style.display = "none";
  messege.style.display = "none";
  reset();
  upcomingWords();
  play();
};

function upcomingWords() {
  let myArr = [];
  lvlwords.forEach((word) => myArr.push(word));

  for (let i = 0; i < lvlwords.length; i++) {
    let randWord = myArr[Math.floor(Math.random() * myArr.length)];
    let wordIndex = myArr.indexOf(randWord);
    myArr.splice(wordIndex, 1);
    let div = document.createElement("div");
    div.textContent = randWord;
    upcomingWordsDiv.appendChild(div);
  }
}

function reset() {
  upcomingWordsDiv.innerHTML = "";
  finish.textContent = "";
  points.textContent = 0;
  secondsLeft.textContent = lvlSeconds;
  input.value = "";
}

function play() {
  word.textContent = document.querySelector(".upcoming-words div").textContent;
  document.querySelector(".upcoming-words div").remove();
  input.focus();

  let counter = setInterval(() => {
    secondsLeft.textContent--;
    if (secondsLeft.textContent == 0) {
      clearInterval(counter);
      if (input.value.toLowerCase() == word.textContent.toLowerCase()) {
        input.value = "";
        success();
      } else {
        fail();
      }
    }
  }, 1000);
}

function success() {
  secondsLeft.textContent = lvlSeconds;
  points.textContent++;
  if (points.textContent == lvlwords.length) {
    finish.textContent = "Congratz";
    finish.classList.add("good");
    finish.classList.remove("bad");
    document.querySelector(".upcoming-words").innerHTML =
      "Words will show here";
    word.textContent = "";
    start.style.display = "block";
    messege.style.display = "block";
  } else {
    play();
  }
}

function fail() {
  finish.textContent = "Game Over";
  finish.classList.add("bad");
  finish.classList.remove("good");
  document.querySelector(".upcoming-words").innerHTML = "Words will show here";
  word.textContent = "";
  start.style.display = "block";
  messege.style.display = "block";
}
