// <!-- sw -->
navigator.serviceWorker &&
	navigator.serviceWorker.register("SW.js").then(function (registration) {});
// const preloader = document.querySelector(".preloader");

// options
const durationCalculationOptionButton = document.querySelector(
	".duration-calculation-option"
);
const targetRemaingOptionButton = document.querySelector(
	".target-remaing-option"
);
const waterAnimationOptionButton = document.querySelector(
	".water-animation-option"
);
let durationCalculationOption =
	localStorage.getItem("durationCalculationOption") == null
		? true
		: localStorage.getItem("durationCalculationOption");
let targetRemaingOption =
	localStorage.getItem("targetRemaingOption") == null
		? true
		: localStorage.getItem("targetRemaingOption");
// pregress Animation
let progressAnimationOption =
	localStorage.getItem("progressAnimationOption") == null
		? false
		: localStorage.getItem("progressAnimationOption");

const note = document.querySelector(".tasbeeh-textarea");
const noteValue = note.value;
const slideMenu = document.querySelector(".slide-menu");
const slideMenuItems = document.querySelectorAll(".slide-menu li");
const hamMenu = document.querySelector(".ham-menu");
const localStorageClear = document.querySelector(".local-storage");
const optionsButton = document.querySelector(".options-button");
const optionsContainer = document.querySelector(".options-container");
const target = document.querySelector(".target");
const targetTime = document.querySelector(".target-time");
const targetTextDuration = document.querySelector(".target-text-duration");
const targetValue = target.value;
const progress = document.querySelector(".loading-progress");

// sounds
const huaweiClick = document.querySelector(".huawei-click");
const vibrate = document.querySelector(".vibrate");
// voice icons
const VTT = document.querySelector(".voice-to-text");
const recordingOff = "https://img.icons8.com/ios/80/000000/high-volume.png";
const recordingOn = "https://img.icons8.com/officel/80/000000/high-volume.png";

// Time
const targetDurationDiv = document.querySelector(".target-duration");
const date = new Date();
let startingTime;
let endingTime;
let targetReachedAt;
hamMenu.addEventListener("click", () => {
	slideMenu.classList.toggle("slide");
	// Animate Link
	slideMenuItems.forEach((link, index) => {
		if (link.getElementsByClassName.animation) {
			link.style.animation = ``;
		} else {
			link.style.animation = `navLinkFade 0.5s ease forwards ${
				index / 7 + 0.5
			}s`;
		}
	});
	// Burger Slide
	hamMenu.classList.toggle("toggle");
});

optionsButton.addEventListener("click", function () {
	optionsContainer.classList.toggle("toggle-options");
});

localStorageClear.addEventListener("click", function () {
	if (confirm("Press'Ok'if you want to clear all data!!!")) {
		localStorage.clear();
	}
});

const vibrateDevice = (milsec) => {
	return navigator.vibrate(milsec);
};

// progress animation
const progressAnimation = (percentage) => {
	if (progressAnimationOption) {
		progress.style.height = `${100 - percentage}%`;
	}
	if (percentage == 0) {
		progress.style.height = `${0}%`;
	}
};
// get percentage completed and remaining

const percentageRemaining = (currentVal, targetVal) => {
	let total = parseInt(currentVal) + parseInt(targetVal);
	let remaining = Math.round((targetVal / total) * 100);
	console.log(100 - remaining);

	// if (targetVal == 0) {
	// 	targetTextDuration.innerText = "Set Target";
	// 	progressAnimation("0%");
	// } else {
	targetTextDuration.innerText = `${remaining}% remaining`;
	progressAnimation(remaining);
	// }
};

const digitalTasbeeh = () => {
	const digitalInput = document.querySelector(".digital-tasbeeh-value");
	let digitalInputValue = digitalInput.value;
	const digitalResetButton = document.querySelector(".reset");
	const digitalAddButton = document.querySelector(".add");
	const digitalDeductButton = document.querySelector(".deduct");

	window.addEventListener("load", function () {
		// sound effect
		let effect = getFromLocalStorage("click-effect");
		if (effect == null) {
			setEffect("vibrate");
		}
		if (effect == "") {
			setEffect("vibrate");
		}
		// options
		// targetRemaingOption = getFromLocalStorage("targetRemaingOption") || true;
		// durationCalculationOption = getFromLocalStorage("targetRemaingOption") || true;

		// count
		digitalValue = getFromLocalStorage("digital");
		if (digitalValue == null) {
			digitalValue = 0;
			digitalInput.value = 0;
			digitalInputValue = digitalInput.value;
		} else {
			digitalInput.value = digitalValue;
			digitalInputValue = digitalInput.value;
		}
	});

	digitalInput.addEventListener("keyup", function () {
		digitalInputValue = digitalInput.value;
		setLocalStorage("digital", digitalInputValue);
		if (targetRemaingOption) {
			target.value != 0
				? percentageRemaining(digitalInputValue, target.value)
				: null;
		}
	});

	//   Resetting input filed to 0
	digitalResetButton.addEventListener("click", function () {
		const resetDT = confirm("Are you sure you want to reset your record?");
		let targetValueBefore = digitalInput.value;
		if (resetDT == true) {
			// vibrateDevice(200);
			clickEffect(200);
			digitalInputValue = parseInt(digitalInputValue);
			digitalInputValue = digitalInputValue - digitalInputValue;
			digitalInput.value = digitalInputValue;
			targetStore("reset", targetValueBefore);
			setLocalStorage("digital", digitalInputValue);
			if (targetRemaingOption) {
				target.value != 0
					? percentageRemaining(digitalInputValue, target.value)
					: null;
			}
		}
	});

	//   Adding one to input filed
	digitalAddButton.addEventListener("click", function () {
		// vibrateDevice(200);
		clickEffect(100);
		digitalInputValue = parseInt(digitalInputValue);
		digitalInputValue = digitalInputValue + 1;
		digitalInput.value = digitalInputValue;
		targetStore("add", 0);
		setLocalStorage("digital", digitalInputValue);
		if (targetRemaingOption) {
			target.value != 0
				? percentageRemaining(digitalInputValue, target.value)
				: null;
		}
	});

	//   Deducting one to input filed
	digitalDeductButton.addEventListener("click", function () {
		// vibrateDevice(200);
		clickEffect(200);
		digitalInputValue = parseInt(digitalInputValue);
		if (digitalInputValue == 0) {
			digitalInputValue = 0;
		} else {
			digitalInputValue = digitalInputValue - 1;
		}
		targetStore("deduct", digitalInput.value);
		setLocalStorage("digital", digitalInputValue);
		digitalInput.value = digitalInputValue;
		if (targetRemaingOption) {
			target.value != 0
				? percentageRemaining(digitalInputValue, target.value)
				: null;
		}
	});
};

//Setting localStorage
const setLocalStorage = (key, val) => {
	localStorage.setItem(key, val);
	// console.log(localStorage.getItem(key));
};
//   Getting item from localstorage
const getFromLocalStorage = (key) => {
	const storeVal = localStorage.getItem(key);
	return storeVal;
};

note.addEventListener("keyup", () => {
	setLocalStorage("note", note.value);
});
note.addEventListener("change", () => {
	setLocalStorage("note", note.value);
});
note.addEventListener("onChange", () => {
	setLocalStorage("note", note.value);
});

window.addEventListener("load", function () {
	const theme = getFromLocalStorage("theme");
	addTheme(theme);
	// preloader.classList.add("loading-finish");~
	const oldNote = getFromLocalStorage("note");
	const oldTarget = getFromLocalStorage("target");
	if (oldNote != null) {
		note.value = oldNote;
	}

	if (oldTarget != null) {
		target.value = oldTarget;
		// startingTime = [
		// 	new Date().getHours(),
		// 	new Date().getMinutes(),
		// 	new Date().getSeconds(),
		// ];
		startingTime = new Date();
	} else {
		target.value = 0;
	}
});

target.addEventListener("keyup", () => {
	setLocalStorage("target", target.value);
	//set timing
	if (durationCalculationOption) {
		targetDurationDiv.classList.remove("visible");
		// startingTime = [
		// 	new Date().getHours(),
		// 	new Date().getMinutes(),
		// 	new Date().getSeconds(),
		// ];
		startingTime = new Date();
		console.log(startingTime);
	}
});

const targetStore = (action, inputVal) => {
	if (target.value <= 0) {
		target.value = 0;
	} else {
		if (action == "add") {
			setLocalStorage("target", target.value - 1);
			target.value = target.value - 1;
			if (target.value == 0) {
				setLocalStorage("target", 0);
				progressAnimation(0);
				if (durationCalculationOption) {
					// endingTime = [
					// 	new Date().getHours(),
					// 	new Date().getMinutes(),
					// 	new Date().getSeconds(),
					// ];
					endingTime = new Date();
					console.log(endingTime);
					// targetReachedAt = `${endingTime[0] - startingTime[0]} : ${
					// 	endingTime[1] - startingTime[1]
					// } : ${endingTime[2] - startingTime[2]} `;
					// reached time calculation hours:minutes:seconds
					let hours = endingTime.getHours() - startingTime.getHours();
					let minutes = endingTime.getMinutes() - startingTime.getMinutes();
					let seconds = endingTime.getSeconds() - startingTime.getSeconds();
					targetReachedAt = `${Math.abs(hours)} : ${Math.abs(
						minutes
					)} : ${Math.abs(seconds)}`;

					targetTime.innerText = targetReachedAt;
					targetDurationDiv.classList.add("visible");
				}
				// vibrateDevice(300);
				clickEffect(300);
				// reset the target text
				targetTextDuration.innerText = "Set Target";
				alert("Target Reached");
			}
		}

		if (action == "deduct") {
			if (inputVal != 0) {
				setLocalStorage("target", Math.abs(-target.value - 1));
				target.value = Math.abs(-target.value - 1);
			}
		}

		if (action == "reset") {
			let input = inputVal;
			let tar = target.value;
			console.log(Math.abs(-tar - input));
			setLocalStorage("target", Math.abs(-tar - input));
			target.value = Math.abs(-tar - input);
		}
	}
};

// dark theme
// function
function addTheme(theme) {
	const body = document.querySelector("body");
	if (theme == "default") {
		body.classList.remove("dark");
	} else {
		body.classList.toggle(theme);
	}
}
// Theme's
darkTheme = document.querySelector(".dark-theme");
defaultTheme = document.querySelector(".default-theme");

darkTheme.addEventListener("click", function () {
	addTheme("dark");
	setLocalStorage("theme", "dark");
});

defaultTheme.addEventListener("click", function () {
	addTheme("default");
	setLocalStorage("theme", "default");
});

// options
targetRemaingOptionButton.addEventListener("click", () => {
	if (targetRemaingOption == true) {
		targetRemaingOption = false;
	} else {
		targetRemaingOption = true;
	}
	setLocalStorage("targetRemaingOption", targetRemaingOption);
});

durationCalculationOptionButton.addEventListener("click", () => {
	if (durationCalculationOption == true) {
		durationCalculationOption = false;
	} else {
		durationCalculationOption = true;
	}
	setLocalStorage("durationCalculationOption", durationCalculationOption);
});

waterAnimationOptionButton.addEventListener("click", () => {
	if (progressAnimationOption == true) {
		progressAnimationOption = false;
	} else {
		progressAnimationOption = true;
	}
	setLocalStorage("progressAnimationOption", progressAnimationOption);
});

// sound effect
const setEffect = (sound) => {
	if (getFromLocalStorage("click-effect")) {
		localStorage.removeItem("click-effect");
	}
	setLocalStorage("click-effect", sound);
};

huaweiClick.addEventListener("click", () => {
	setEffect("huaweiClick");
	playClickEffect("assets/beep/beep.mp3");
});
vibrate.addEventListener("click", () => {
	setEffect("vibrate");
	vibrateDevice(200);
});

const playClickEffect = (path) => {
	const clickEffect = new Audio(path);
	// clickEffect.volume(0.5);
	clickEffect.play();
};

const clickEffect = (duration = 200) => {
	// save current effect type
	let effect = getFromLocalStorage("click-effect");
	// get current effect type
	if (effect == "vibrate") {
		vibrateDevice(duration);
	}
	if (effect == "huaweiClick") {
		playClickEffect("assets/beep/beep.mp3");
	}
};
let listening = false;
// voice to text
const record = () => {
	VTT.setAttribute("src", recordingOn);
	const SpeechRecognition =
		window.speechRecognition || window.webkitSpeechRecognition;
	const recognition = new SpeechRecognition();
	recognition.interimResults = true;

	recognition.addEventListener("result", (e) => {
		for (const res of e.results) {
			const transcript = res[0].transcript;
			console.log(transcript);
			note.innerHTML = transcript;
		}
	});
	recognition.addEventListener("end", (e) => {
		VTT.setAttribute("src", recordingOff);
	});
	if (recognition.interimResults) {
		VTT.setAttribute("src", recordingOn);
	} else {
		VTT.setAttribute("src", recordingOff);
	}
	recognition.start();
};

digitalTasbeeh();
