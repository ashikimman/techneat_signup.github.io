document.getElementById("myForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Stop form submission for validation
    let isValid = true;

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const address = document.getElementById("address").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Helper function to show error messages
    const showError = (id, message) => {
        const element = document.getElementById(id);
        element.textContent = message;
        element.style.display = "inline";
        isValid = false;
    };

    // Helper function to clear error messages
    const clearError = (id) => {
        const element = document.getElementById(id);
        element.textContent = "";
        element.style.display = "none";
    };

    // First Name Validation (No Numbers, 4-30 characters)
    if (!firstName) {
        showError("firstNameRequired", "* Required");
    } else if (!/^[a-zA-Z\s]+$/.test(firstName)) {
        showError("firstNameError", "First name should only contain letters");
    } else if (firstName.length < 4 || firstName.length > 30) {
        showError("firstNameError", "First name should be 4-30 characters long");
    }

    // Last Name Validation (No Numbers, 4-30 characters)
    if (!lastName) {
        showError("lastNameRequired", "* Required");
    } else if (!/^[a-zA-Z\s]+$/.test(lastName)) {
        showError("lastNameError", "Last name should only contain letters");
    } else if (lastName.length < 4 || lastName.length > 30) {
        showError("lastNameError", "Last name should be 4-30 characters long");
    }

    // Address Validation (15-70 characters)
    if (!address) {
        showError("addressRequired", "* Required");
    } else if (address.length < 15 || address.length > 70) {
        showError("addressError", "Address should be 15-70 characters long");
    }

    // Phone Number Validation (Start with '91', followed by 10 digits)
    if (!phoneNumber) {
        showError("phoneNumberRequired", "* Required");
    } else if (!/^91\d{10}$/.test(phoneNumber)) {
        showError("phoneNumberError", "Phone number must start with '91' and be exactly 12 digits long");
    } else {
        await validateUniqueness("phoneNumber", phoneNumber, "phoneNumberError");
    }

    // Email Validation
    if (!email) {
        showError("emailRequired", "* Required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError("emailError", "Please enter a valid email");
    } else {
        await validateUniqueness("email", email, "emailError");
    }

    // Username Validation (5-15 characters)
    if (!username) {
        showError("usernameRequired", "* Required");
    } else if (username.length < 5 || username.length > 15) {
        showError("usernameError", "Username must be 5-15 characters long");
    } else {
        await validateUniqueness("username", username, "usernameError");
    }

    // Password Validation (8-20 characters)
    if (!password) {
        showError("passwordRequired", "* Required");
    } else if (password.length < 8 || password.length > 20) {
        showError("passwordError", "Password must be 8-20 characters long");
    }

    // Confirm Password Validation
    if (!confirmPassword) {
        showError("confirmPasswordRequired", "* Required");
    } else if (confirmPassword !== password) {
        showError("confirmPasswordError", "Passwords do not match");
    }

    // Submit the form if all validations pass
    if (isValid) {
        document.getElementById("myForm").submit();
    }
});

// Real-time input error clearing
const fields = [
    { id: "firstName", required: "firstNameRequired", error: "firstNameError" },
    { id: "lastName", required: "lastNameRequired", error: "lastNameError" },
    { id: "address", required: "addressRequired", error: "addressError" },
    { id: "phoneNumber", required: "phoneNumberRequired", error: "phoneNumberError" },
    { id: "email", required: "emailRequired", error: "emailError" },
    { id: "username", required: "usernameRequired", error: "usernameError" },
    { id: "password", required: "passwordRequired", error: "passwordError" },
    { id: "confirmPassword", required: "confirmPasswordRequired", error: "confirmPasswordError" },
];

// Add real-time validation
fields.forEach((field) => {
    const input = document.getElementById(field.id);
    input.addEventListener("input", function () {
        clearError(field.required);
        clearError(field.error);
    });

    // Add character restrictions for first and last names
    if (field.id === "firstName" || field.id === "lastName") {
        input.addEventListener("input", function () {
            if (input.value.length > 30) {
                input.value = input.value.slice(0, 30);
            }
        });
    }

    // Restrict phone number input to digits only and validate length
    if (field.id === "phoneNumber") {
        input.addEventListener("input", function () {
            // Allow only digits and enforce starting with "91"
            input.value = input.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
            if (!input.value.startsWith("91")) {
                input.value = "91"; // Automatically add "91" if missing
            }
            if (input.value.length > 12) {
                input.value = input.value.slice(0, 12); // Restrict length to 12 digits
            }
        });
    }

    // Submit the form if all validations pass
    if (isValid) {
        document.getElementById("myForm").submit();
    }
});

// Function to validate uniqueness via server-side API call
async function validateUniqueness(field, value, errorId) {
    try {
        const response = await fetch(`/validate-uniqueness.php?field=${field}&value=${value}`);
        
        // Check if the response is okay
        if (!response.ok) {
            throw new Error("Server returned an error response");
        }

        const data = await response.json(); // Parse JSON response

        if (!data.unique) {
            showError(errorId, `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`);
        }
    } catch (error) {
        console.error("Error validating uniqueness:", error);
        showError(errorId, "There was an error checking uniqueness. Please try again.");
    }
}
