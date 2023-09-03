document.addEventListener("DOMContentLoaded", function () {
    var startButton = document.getElementById("startButton");
    var secretSection = document.getElementById("secretSection");
    var additionalLink = document.getElementById("additionalLink"); // Get the "Get Key" link

    startButton.addEventListener("click", function () {
        // Create an input element
        var inputField = document.createElement("input");
        inputField.type = "text"; // You can change the input type as needed
        inputField.placeholder = "Enter a valid key to continue"; // Optional placeholder text
        inputField.id = "inputField"; // Set an ID for the input field

        // Replace the button with the input field
        startButton.parentNode.replaceChild(inputField, startButton);

        // Add an event listener to check the entered key
        inputField.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                var enteredKey = inputField.value;

                // Check if the entered key is correct (replace "YOUR_KEY" with the actual key)
                if (enteredKey === "shark") {
                    // Display the secret section
                    secretSection.style.display = "block";

                    // Remove the input field
                    inputField.parentNode.removeChild(inputField);

                    // Hide the "Get Key" link
                    additionalLink.style.display = "none";
                } else {
                    alert("Incorrect key. Try again."); // You can customize this message
                }
            }
        });
    });
});
