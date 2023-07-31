document.addEventListener("DOMContentLoaded", () => {
    const myForm = document.querySelector("#my-form");
    const nameInput = document.querySelector("#expenseAmount");
    const descriptionInput = document.querySelector("#description");
    const categoryInput = document.querySelector("#category");
    const msg = document.querySelector(".msg");
    const userList = document.querySelector("#list");
  
    myForm.addEventListener("submit", onSubmit);
  
    function onSubmit(e) {
      e.preventDefault();
  
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
  
      // Retrieve existing user details from localStorage
      let userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
  
      // Create a new user object
      const newUser = {
        expenseAmount,
        description,
        category,
      };
  
      // Add the new user object to the array
      userDetails.push(newUser);
  
      // Store the updated user details in localStorage
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
  
      // Display a success message
      msg.textContent = "Expense added successfully";
  
      // Render the updated user list
      showUserOnScreen();
    }
  
    function showUserOnScreen() {
      // Retrieve user details from localStorage
      let userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
  
      // Clear the user list on the screen
      userList.innerHTML = "";
  
      // Render each user in the list
      userDetails.forEach(user => {
        const userItem = document.createElement("li");
        userItem.textContent =
          user.expenseAmount + " - " + user.description + " - " + user.category;
  
        const deleteButton = document.createElement("input");
        deleteButton.type = "button";
        deleteButton.value = "Delete";
        deleteButton.onclick = () => {
          // Remove the user from the list and update localStorage
          userDetails = userDetails.filter(u => u.expenseAmount !== user.expenseAmount);
          localStorage.setItem("userDetails", JSON.stringify(userDetails));
          // Re-render the user list on the screen
          showUserOnScreen();
        };
  
        const editButton = document.createElement("input");
        editButton.type = "button";
        editButton.value = "Edit";
        editButton.onclick = () => {
          // Set the user details in the form for editing
          nameInput.value = user.expenseAmount;
          descriptionInput.value = user.description;
          categoryInput.value = user.category;
        };
  
        userItem.appendChild(deleteButton);
        userItem.appendChild(editButton);
        userList.appendChild(userItem);
      });
    }
  
    // Initial rendering of the user list on page load
    showUserOnScreen();
  });
  