document.getElementById("loan-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Hide results and show loader
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "block";

  setTimeout(calculate, 2000);
});

function calculate() {
  // Get input values
  const amount = document.getElementById("loan_amount").value;
  const interest = document.getElementById("interest").value;
  const years = document.getElementById("years").value;

  const monthlyPayment = document.getElementById("monthly_payment");
  const yearlyPayment = document.getElementById("yearly_payment");
  const totalAmount = document.getElementById("total_amount");
  const totalInterest = document.getElementById("total_interest");

  const principal = parseFloat(amount);
  const calculatedInterest = parseFloat(interest) / 100 / 12;
  const calculatedPayments = parseFloat(years) * 12;

  // Calculate monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    // Display results
    monthlyPayment.value = monthly.toFixed(2);
    yearlyPayment.value = (monthly * 12).toFixed(2);
    totalAmount.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    document.getElementById("results").style.display = "block";
    document.getElementById("loading").style.display = "none";
  } else {
    showAlert("Please provide valid inputs.");
    document.getElementById("loading").style.display = "none";
  }
}

function showAlert(message) {
  const errorDiv = document.createElement("div");

  // Add classes and message
  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(message));

  // Insert alert above the form
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  card.insertBefore(errorDiv, heading);

  // Remove after 3 seconds
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}
