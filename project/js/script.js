// Get Element
let eleTime = document.getElementById("time");

function getTheTime() {
  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let getPmAm = hours >= 13 ? `Pm` : `Am`;
  let ifHours = hours > 9 ? `` : `0`;
  let ifMinutes = minutes > 9 ? `` : `0`;
  let ifSeconds = seconds > 9 ? `` : `0`;
  if (hours >= 13) {
    hours -= 12;
  }
  eleTime.innerHTML =
    ifHours +
    hours +
    ":" +
    ifMinutes +
    minutes +
    ":" +
    ifSeconds +
    seconds +
    ` ` +
    getPmAm;
}

(function () {
  setInterval(getTheTime, 500);
})();

//
/*  DARK LIGHT THEME  */
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
