// Navigation
      // DOM Elements
const navLinks = document.querySelectorAll(".nav-links a");
const pages = document.querySelectorAll("#home-page, #charts-page, #about-page");
const hamburger = document.getElementById("hamburger");
const navLinksContainer = document.getElementById("nav-links");

// Tab navigation elements
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

// BMI Form Elements
const bmiForm = document.getElementById("bmi-form");
const metricInputs = document.getElementById("metric-inputs");
const imperialInputs = document.getElementById("imperial-inputs");
const unitInputs = document.querySelectorAll('input[name="unit"]');
const resultSection = document.getElementById("result");
const bmiValueElement = document.getElementById("bmi-value");
const bmiCategoryElement = document.getElementById("bmi-category");
const bmiInfoElement = document.getElementById("bmi-info");

// Hamburger menu toggle
hamburger?.addEventListener("click", () => {
  navLinksContainer.classList.toggle("active");
});

// Navigation link handling
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Update active link styling
    navLinks.forEach((lnk) => lnk.classList.remove("active"));
    link.classList.add("active");

    // Show the corresponding page
    const targetPage = link.getAttribute("data-page");
    pages.forEach((page) => (page.style.display = "none"));
    const targetElement = document.getElementById(`${targetPage}-page`);
    if (targetElement) {
      targetElement.style.display = "block";
    } else {
      console.error(`Page element for "${targetPage}" not found.`);
    }
  });
});


          // Close mobile menu if open
          navLinksContainer.classList.remove("active");
        });
      });

      // Tab functionality for charts page
      tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          tabBtns.forEach((btn) => btn.classList.remove("active"));
          btn.classList.add("active");

          tabContents.forEach((content) => content.classList.remove("active"));
          document
            .getElementById(btn.getAttribute("data-tab"))
            .classList.add("active");
        });
      });

      // Switch between metric and imperial inputs
      unitInputs.forEach((input) => {
        input.addEventListener("change", () => {
          if (input.value === "metric") {
            metricInputs.style.display = "block";
            imperialInputs.style.display = "none";
          } else {
            metricInputs.style.display = "none";
            imperialInputs.style.display = "block";
          }
        });
      });

      // BMI calculation
     bmiForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const unit = document.querySelector('input[name="unit"]:checked')?.value;
  const gender = document.getElementById("gender")?.value;
  const age = parseInt(document.getElementById("age")?.value, 10);

  if (!unit || isNaN(age) || !gender) {
    console.error("Missing required fields.");
    return;
  }

  let bmi;

  if (unit === "metric") {
    const heightCm = parseFloat(document.getElementById("height-cm")?.value);
    const weightKg = parseFloat(document.getElementById("weight-kg")?.value);

    if (isNaN(heightCm) || isNaN(weightKg)) {
      console.error("Invalid height or weight input.");
      return;
    }

    bmi = weightKg / ((heightCm / 100) ** 2);
    console.log(`Calculated BMI (Metric): ${bmi.toFixed(2)}`);
  }

  // You can expand here for other unit types if needed
});


          // Convert height from cm to meters and calculate BMI
          const heightM = heightCm / 100;
          bmi = weightKg / (heightM * heightM);
        } else {
          const heightFt = parseFloat(
            document.getElementById("height-ft").value
          );
          const heightIn = parseFloat(
            document.getElementById("height-in").value
          );
          const weightLbs = parseFloat(
            document.getElementById("weight-lbs").value
          );

          // Convert height to inches and calculate BMI
          const totalHeightInches = heightFt * 12 + heightIn;
          bmi = (weightLbs * 703) / (totalHeightInches * totalHeightInches);
        }

        // Round BMI to 1 decimal place
        bmi = Math.round(bmi * 10) / 10;

        // Determine BMI category and message
        let category, bgColor, message;

        if (age < 20) {
          // For children and teens, we'd ideally use percentiles
          // This is a simplified version
          if (bmi < 18.5) {
            category = "Underweight";
            bgColor = "#64b5f6";
            message =
              "Your BMI indicates that you may be underweight. This can be associated with certain health issues. Consider consulting with a healthcare provider.";
          } else if (bmi < 25) {
            category = "Normal Weight";
            bgColor = "#66bb6a";
            message =
              "Your BMI indicates that you have a healthy weight for your height. Keep up the good habits!";
          } else if (bmi < 30) {
            category = "Overweight";
            bgColor = "#ffd54f";
            message =
              "Your BMI indicates that you may be overweight. Talking to a healthcare provider can help you determine if you need to make any changes to your lifestyle.";
          } else {
            category = "Obesity";
            bgColor = "#ff8a65";
            message =
              "Your BMI indicates obesity, which can increase risk for certain health conditions. It's recommended to consult with a healthcare provider.";
          }
        } else {
          // For adults
          if (bmi < 18.5) {
            category = "Underweight";
            bgColor = "#64b5f6";
            message =
              "Your BMI indicates that you are underweight. This can be associated with malnutrition, vitamin deficiencies, or other health issues. Consider consulting with a healthcare provider.";
          } else if (bmi < 25) {
            category = "Normal Weight";
            bgColor = "#66bb6a";
            message =
              "Your BMI indicates that you have a healthy weight for your height. Maintaining a healthy weight may reduce the risk of chronic diseases associated with overweight and obesity.";
          } else if (bmi < 30) {
            category = "Overweight";
            bgColor = "#ffd54f";
            message =
              "Your BMI indicates that you are overweight. This may increase your risk for certain health conditions. Consider consulting with a healthcare provider about healthy lifestyle changes.";
          } else if (bmi < 35) {
            category = "Obesity (Class 1)";
            bgColor = "#ff8a65";
            message =
              "Your BMI indicates Class 1 obesity. This increases your risk for heart disease, diabetes, and other conditions. It's recommended to consult with a healthcare provider.";
          } else if (bmi < 40) {
            category = "Obesity (Class 2)";
            bgColor = "#ff8a65";
            message =
              "Your BMI indicates Class 2 obesity. This significantly increases your risk for various health conditions. It's highly recommended to consult with a healthcare provider.";
          } else {
            category = "Extreme Obesity";
            bgColor = "#e53935";
            message =
              "Your BMI indicates extreme obesity. This greatly increases your risk for serious health conditions. Please consult with a healthcare provider for guidance.";
          }
        }

        // Display results
        bmiValueElement.textContent = bmi.toFixed(1);
        bmiCategoryElement.textContent = category;
        bmiCategoryElement.style.backgroundColor = bgColor;
        bmiCategoryElement.style.color =
          bgColor === "#ffd54f" ? "#333" : "white";
        bmiInfoElement.innerHTML = `<p>${message}</p>`;

        // Show result section
        resultSection.style.display = "block";

        // Scroll to result
        resultSection.scrollIntoView({ behavior: "smooth" });
      });

      // Close result section on click outside
      document.addEventListener("click", (e) => {
        if (!resultSection.contains(e.target) && !bmiForm.contains(e.target)) {
          resultSection.style.display = "none";
        }
      });
