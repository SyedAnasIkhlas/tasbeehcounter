const preloader = document.querySelector(".preloader");
const note = document.querySelector(".tasbeeh-textarea");
const noteValue = note.value;
const slideMenu = document.querySelector(".slide-menu");
const slideMenuItems = document.querySelectorAll(".slide-menu li");
const hamMenu = document.querySelector(".ham-menu");

hamMenu.addEventListener("click", () => {
  slideMenu.classList.toggle("slide");
  // Animate Link
  slideMenuItems.forEach((link, index) => {
    if (link.getElementsByClassName.animation) {
      link.style.animation = ``;
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 +
        0.5}s`;
    }
  });
  // Burger Slide
  hamMenu.classList.toggle("toggle");
});

const vibrateDevice = milsec => {
  window.navigator.vibrate(milsec);
};
const digitalTasbeeh = () => {
  const digitalInput = document.querySelector(".digital-tasbeeh-value");
  let digitalInputValue = digitalInput.value;
  const digitalResetButton = document.querySelector(".reset");
  const digitalAddButton = document.querySelector(".add");
  const digitalDeductButton = document.querySelector(".deduct");

  window.addEventListener("load", function() {
    digitalInput.value = getFromLocalStorage("digital");
    digitalInputValue = digitalInput.value;
  });

  //   Resetting input filed to 0
  digitalResetButton.addEventListener("click", function() {
    const resetDT = confirm("Are you sure you want to reset your record?");
    if (resetDT == true) {
      vibrateDevice(200);
      digitalInputValue = parseInt(digitalInputValue);
      digitalInputValue = digitalInputValue - digitalInputValue;
      digitalInput.value = digitalInputValue;
      setLocalStorage("classic", digitalInputValue);
    }
  });

  //   Adding one to input filed
  digitalAddButton.addEventListener("click", function() {
    vibrateDevice(2000);
    digitalInputValue = parseInt(digitalInputValue);
    digitalInputValue = digitalInputValue + 1;
    digitalInput.value = digitalInputValue;
    setLocalStorage("classic", digitalInputValue);
  });

  //   Deducting one to input filed
  digitalDeductButton.addEventListener("click", function() {
    vibrateDevice(2000);
    digitalInputValue = parseInt(digitalInputValue);
    if (digitalInputValue == 0) {
      digitalInputValue = 0;
    } else {
      digitalInputValue = digitalInputValue - 1;
    }
    setLocalStorage("classic", digitalInputValue);
    digitalInput.value = digitalInputValue;
  });
};

//Setting localStorage
const setLocalStorage = (key, val) => {
  localStorage.setItem(key, val);
};
//   Getting item from localstorage
const getFromLocalStorage = val => {
  const storeVal = localStorage.getItem(val);
  if (storeVal == null) {
    storeVal = 0;
  }
  return storeVal;
};

note.addEventListener("keyup", function() {
  setLocalStorage("note", note.value);
});

window.addEventListener("load", function() {
  preloader.classList.add("loading-finish");
  if (getFromLocalStorage("note") != null) {
    note.vaule = getFromLocalStorage("note");
  }
});

digitalTasbeeh();
