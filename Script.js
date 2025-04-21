const form = document.querySelector("#bmi-form");
const results = document.querySelector("#results");
const message = document.querySelector("#message");

const getInputValue = (selector) => document.querySelector(selector).value.trim();

const isValidNumber = (value) => !isNaN(value) && value > 0;

const showError = (text) => {
  results.innerHTML = text;
  message.innerHTML = "";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const height = parseInt(getInputValue("#height"));
  const weight = parseInt(getInputValue("#weight"));
  const age = parseInt(getInputValue("#age"));
  const gender = getInputValue("#gender");

  // Input validation
  if (!isValidNumber(height)) return showError("Please provide a valid height.");
  if (!isValidNumber(weight)) return showError("Please provide a valid weight.");
  if (!isValidNumber(age)) return showError("Please provide a valid age.");
  if (!gender) return showError("Please select your gender.");

  // Calculate BMI
  const bmi = (weight / ((height / 100) ** 2)).toFixed(2);

  // Provide BMI category feedback
  const bmiValue = parseFloat(bmi);
  let feedback = "";

  if (bmiValue < 18.5) {
    feedback = "You are underweight.";
  } else if (bmiValue <= 24.9) {
    feedback = "You have a normal weight.";
  } else if (bmiValue <= 29.9) {
    feedback = "You are overweight.";
  } else {
    feedback = "You are obese.";
  }
  results.innerHTML = `Your BMI is: <strong>${bmi}</strong>`;

  message.innerHTML = feedback;
});

