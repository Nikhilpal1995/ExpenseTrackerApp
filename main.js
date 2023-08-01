const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#expenseAmount");
const descriptionInput = document.querySelector("#description");
const categoryInput = document.querySelector("#category");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#list");

myForm.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  // Get the input values
  const expenseAmount = nameInput.value;
  const description = descriptionInput.value;
  const category = categoryInput.value;

  // Validate the input
  if (expenseAmount === "" || description === "" || category === "") {
    msg.textContent = "Please fill in all fields";
    return;
  }

  // Clear the input fields
  nameInput.value = "";
  descriptionInput.value = "";

  // Store the input in an object
  const obj = {
    expenseAmount,
    description,
    category,
  };

  // Retrieve existing expense details from localStorage
  let userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];

  // Add the new expense object to the array
  userDetails.push(obj);

  // Store the updated expense details in localStorage
  localStorage.setItem("userDetails", JSON.stringify(userDetails));

  // Clear the list and re-render the updated expense list
  userList.innerHTML = "";
  initExpenseList();

  // Display a success message
  msg.textContent = "Expense added successfully";
}

// Function to initialize the expense list from localStorage on page load
function initExpenseList() {
  let userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
  userDetails.forEach((expense) => showExpenseOnScreen(expense));
}

// Call the function to initialize the expense list on page load
initExpenseList();

function showExpenseOnScreen(expense) {
  const parentElem = document.getElementById("list");
  const expenseItem = document.createElement("li");
  expenseItem.textContent =
    expense.expenseAmount + " - " + expense.description + " - " + expense.category;

  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "Delete";
  deleteButton.onclick = () => {
    // Remove the expense from the localStorage and the list
    let userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
    userDetails = userDetails.filter((item) => item.expenseAmount !== expense.expenseAmount);
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    parentElem.removeChild(expenseItem);
  };

  const editButton = document.createElement("input");
  editButton.type = "button";
  editButton.value = "Edit";
  editButton.onclick = () => {
    // Show the edit modal with pre-filled data
    nameInput.value = expense.expenseAmount;
    descriptionInput.value = expense.description;
    categoryInput.value = expense.category;
  };

  expenseItem.appendChild(deleteButton);
  expenseItem.appendChild(editButton);
  parentElem.appendChild(expenseItem);
}
