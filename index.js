var h;
var m;
var s;
var ap;
var time;
//Here Used Audio Object For When Alarm Goues Up  
var sound = new Audio(
  "https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3"
);
sound.loop = true;

/* Here Adding Clock Face Function To Showing Current Time in (Seconds,Mins,Hrs)*/
let clockFace = () => {
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let am_pm = hour < 12 ? "<span>AM</span>" : "<span>PM</span>";
  hour = hour == 0 ? 12 : hour;
  hour = hour > 12 ? hour - 12 : hour;
  hour = checkTime(hour);
  minutes = checkTime(minutes);
  seconds = checkTime(seconds);

  document.getElementById("clock-face").innerHTML =
    hour + ":" + minutes + ":" + seconds + " " + am_pm;
  let time = setTimeout(() => {
    clockFace();
  }, 1000);
};

let checkTime = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};

clockFace();

/*Here Adding Functions To Set Alarm*/

/*Here Adding Function To Set Hours For Setting Alarm */
let setHours = () => {
  let now = new Date();
  //we are adding one because Javascript returns zero-based hours , 0-23
  hour = now.getUTCHours() + 1;
  sel = document.getElementById("hours");
  let opt;

  for (let i = 1; i < 24; i++) {
    opt = document.createElement("option");
    opt.textContent = i;
    sel.appendChild(opt);
    if (i == hour) {
      opt.selected = true;
    }
  }
};

setHours();

/*Here Adding Function To Set Minutes For Setting Alarm */
let setMinutes = () => {
  let now = new Date();
  //we are adding one because Javascript returns zero-based hours , 0-23
  minutes = now.getUTCMinutes() + 1;
  sel = document.getElementById("minutes");
  let opt;

  for (let i = 1; i < 60; i++) {
    opt = document.createElement("option");
    opt.textContent = i;
    sel.appendChild(opt);
    if (i == hour) {
      opt.selected = true;
    }
  }
};
setMinutes();

/*Here Adding Function To Set Seconds For Setting Alarm */
let setSeconds = () => {
  let now = new Date();
  //we are adding one because Javascript returns zero-based hours , 0-23
  seconds = now.getUTCSeconds() + 1;
  sel = document.getElementById("seconds");
  let opt;

  for (let i = 1; i < 60; i++) {
    opt = document.createElement("option");
    opt.textContent = i;
    sel.appendChild(opt);
    if (i == hour) {
      opt.selected = true;
    }
  }
};
setSeconds();

//Deleting Alarm Here 
let Delete = () => {
  let deleteBtns = document.querySelectorAll(".delete");

  let deleteAlarm = (event) => {
    let deleteBtn = event.target;
    let deleteDiv = deleteBtn.closest('.deleteDiv');
    deleteDiv.remove();
    clearTimeout(time);
    sound.pause();
    alert("Alarm Deleted Successfully");
  };

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", deleteAlarm);
  });
};
/*Accessing Form Data And Displaying Alarm List Here */
let doForm = () => {
  let data = new FormData(document.getElementById("set_Alarm"));
  let hour = data.get("hours");
  let minutes = data.get("minutes");
  let seconds = data.get("seconds");
  let am_pm = data.get("am-pm");
  hour = checkTime(hour);
  minutes = checkTime(minutes);
  seconds = checkTime(seconds);
  //Here Used Global Variable
  h = hour;
  m = minutes;
  s = seconds;
  ap = am_pm;
  //Here Displaying Alarm List
  let alarmList = document.getElementById("displayAlarmList");
  let Div = document.createElement("div");
  Div.setAttribute("class", "deleteDiv");
  let alarmElement = document.createElement("span");
  let btnElement = document.createElement("input");
  btnElement.setAttribute("type", "submit");
  btnElement.setAttribute("class", "delete");
  btnElement.value = "Delete";
  alarmElement.textContent = hour + ":" + minutes + ":" + seconds + " " + am_pm;
  alarmList.appendChild(Div);
  Div.appendChild(alarmElement);
  Div.appendChild(btnElement);

  let deleteBtn = alarmList.querySelector(".delete");
  deleteBtn.addEventListener("click", Delete);
  return false;
};
doForm();
Delete();

//When User Setting Each Alarm They Notified Here
let btn = document.getElementById("button");
btn.addEventListener("click", () => {
  alert("Alarm Set SuccessFully ");
});

//Alerting Here When Alarm  Goes Up
let alertUser = () => {
  let now = new Date();
  let Hour = now.getHours();
  let Minutes = now.getMinutes();
  let Seconds = now.getSeconds();
  Hour = Hour > 12 ? Hour - 12 : Hour;
  if (Hour == h && Minutes == m && Seconds == s) {
    sound.play();
  }
  time = setTimeout(() => {
    alertUser();
  }, 1000);
};
alertUser();
