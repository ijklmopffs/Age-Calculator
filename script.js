// Retrieve the necessary elements
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const calculateBtn = document.getElementById("calculate-btn");
const yearsElement = document.getElementById("years");
const monthsElement = document.getElementById("months");
const daysElement = document.getElementById("days");

// Add an event listener to the calculate button
calculateBtn.addEventListener("click", calculateAge);

function validateDate(day, month, year) {
  // Validate the day
  if (day < 1 || day > 31) {
    return false;
  }

  // Validate the month
  if (month < 1 || month > 12) {
    return false;
  }

  // Get the current date
  const currentDate = new Date();

  // Validate the year
  if (year >= currentDate.getFullYear()) {
    return false;
  }

  // Create a new date object with the input values
  const inputDate = new Date(year, month - 1, day);

  // Validate the date object
  if (inputDate.getMonth() !== month - 1 || inputDate.getDate() !== day) {
    return false;
  }

  return true;
}

function calculateAge() {
  // Retrieve the input values
  const day = parseInt(dayInput.value, 10);
  const month = parseInt(monthInput.value, 10);
  const year = parseInt(yearInput.value, 10);

  // Validate the date
  if (!validateDate(day, month, year)) {
    dayInput.style.border = "1px solid red";
    monthInput.style.border = "1px solid red";
    yearInput.style.border = "1px solid red";
    return;
  }

  // Calculate the current date
  const currentDate = new Date();

  // Calculate the date of birth
  const dob = new Date(year, month - 1, day);

  // Calculate the age
  let age = currentDate.getFullYear() - dob.getFullYear();
  const currentMonth = currentDate.getMonth();
  const dobMonth = dob.getMonth();

  if (
    currentMonth < dobMonth ||
    (currentMonth === dobMonth && currentDate.getDate() < day)
  ) {
    age--;
  }

  // Calculate the number of months
  let months = currentDate.getMonth() + 12 - dob.getMonth();
  if (currentDate.getDate() < day) {
    months--;
  }

  // Calculate the number of days
  let days = currentDate.getDate() - day;
  if (days < 0) {
    const tempDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      0
    );
    days += tempDate.getDate();
    months--;
  }

  // Update the text content of the target elements with the calculated age
  yearsElement.textContent = age.toString();
  monthsElement.textContent = months.toString();
  daysElement.textContent = days.toString();
}
