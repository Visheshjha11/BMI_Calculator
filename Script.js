const form = document.querySelector("#bmi-form");
const results = document.querySelector("#results");
const message = document.querySelector("#message");
const getInputValue = (selector) => document.querySelector(selector).value.trim();
const isValidNumber = (value) => !isNaN(value) && value > 0;

const showError = (text) => {
  results.innerHTML = "";
  message.innerHTML = `<span style="color: red; font-weight: bold;">⚠️ ${text}</span>`;
};

const getBMICategory = (bmi) => {
  if (bmi < 18.5) {
    return {
      status: "Underweight",
      note: "Try to eat a balanced diet and consult a healthcare provider.",
      color: "#f9a825",
      emoji: "📉"
    };
  } else if (bmi < 25) {
    return {
      status: "Normal weight",
      note: "Keep up the good work! Maintain a healthy lifestyle.",
      color: "#43a047",
      emoji: "✅"
    };
  } else if (bmi < 30) {
    return {
      status: "Overweight",
      note: "Consider regular exercise and healthier eating habits.",
      color: "#fb8c00",
      emoji: "⚠️"
    };
  } else {
    return {
      status: "Obese",
      note: "Consult with a doctor for a health plan.",
      color: "#e53935",
      emoji: "🚨"
    };
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Clear previous messages
  results.innerHTML = "";
  message.innerHTML = "";

  // Get inputs
  const height = parseInt(getInputValue("#height"));
  const weight = parseFloat(getInputValue("#weight"));
  const age = parseInt(getInputValue("#age"));
  const gender = getInputValue("#gender");

  // Input validation
  if (!height || height <= 0 || !weight || weight <= 0) {
  message.innerHTML = "<p style='color: red;'>Please enter valid height and weight values.</p>";
  return;
}
  if (!isValidNumber(height) || height > 300) return showError("Please provide a valid height in cm (e.g., 150 - 250).");
  if (!isValidNumber(weight) || weight > 500) return showError("Please provide a valid weight in kg (e.g., 30 - 300).");
  if (!isValidNumber(age) || age < 5 || age > 120) return showError("Please provide a valid age.");
  if (!gender) return showError("Please select your gender.");

// Calculate BMI
const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
const bmiValue = parseFloat(bmi);
const category = getBMICategory(bmiValue);

results.innerHTML = `
  <div style="color: ${category.color}; font-weight: 500;">
    <p><strong>${category.status} ${category.emoji}</strong></p>
    <p><strong>BMI:</strong> ${bmi}</p>
    <p>${category.note}</p>
  </div>
`;

  // Display Result
  results.innerHTML = `
    <div style="color: ${category.color}; font-size: 1.5rem;">
      ${category.emoji} Your BMI is: <strong>${bmi}</strong>
      <br />
      <strong>Status:</strong> ${category.status}
    </div>
  `;

  message.innerHTML = `
    <p style="color: #fff; background-color: ${category.color}; padding: 10px; border-radius: 8px; margin-top: 10px;">
      ${category.note}
    </p>
  `;

  // Optional: Gender-based note
  const getGenderNote = (gender, bmi) => {
  if (gender === "female" && bmi < 19) {
    return "Note: For women, a healthy BMI may start around 19 depending on body composition.";
  } else if (gender === "male" && bmi < 20) {
    return "Note: For men, BMI ranges may vary slightly based on muscle mass.";
  }
  return "";
};

const genderNote = getGenderNote(gender, bmiValue);
if (genderNote) {
  message.innerHTML += `<p style="font-size: 0.9rem; color: #ffc107;">${genderNote}</p>`;
}

if (!gender) {
  console.warn("Gender is not specified. Skipping gender-specific note.");
  return;
}

});
