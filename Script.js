const form = document.querySelector("#bmi-form");
const results = document.querySelector("#results");
const message = document.querySelector("#message");

// Listen for form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get input values
  const height = parseInt(document.querySelector("#height").value);
  const weight = parseInt(document.querySelector("#weight").value);
  const age = parseInt(document.querySelector("#age").value);
  const gender = document.querySelector("#gender").value;
 
  // Validate inputs
  if (isNaN(height) || height <= 0) {
    results.innerHTML = "Please provide a valid height.";
    return;
  }

  if (isNaN(weight) || weight <= 0) {
    results.innerHTML = "Please provide a valid weight.";
    return;
  }

  if (isNaN(age) || age <= 0) {
    results.innerHTML = "Please provide a valid age.";
    return;
  }

  if (!gender) {
    results.innerHTML = "Please select your gender.";
    return;
  }

  // Calculate BMI
  const bmi = (weight / ((height * height) / 10000)).toFixed(2); // Convert height from cm to m

  // Display the BMI result
  results.innerHTML = `Your BMI is: <strong>${bmi}</strong>`;

  // Display feedback based on BMI
  if (bmi < 18.5) {
    message.innerHTML = "You are underweight.";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    message.innerHTML = "You have a normal weight.";
  } else if (bmi >= 25 && bmi <= 29.9) {
    message.innerHTML = "You are overweight.";
  } else {
    message.innerHTML = "You are obese.";
  }
});
