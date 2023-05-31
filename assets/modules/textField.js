export class TextField {
  constructor(id) {
    this.callback = () => true;
    this.text_field = "";
    this.id = id;
  }

  createForm() {
    // Create form element
    const form = document.createElement("form");
    form.id = this.id;

    // Create name input element
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.id = "text";
    this.text_field = nameInput;

    // Create submit button element
    const submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "Add";
    submitButton.id = "submit_add";
    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.handleEvent();
    });

    // Add elements to form
    form.appendChild(nameInput);
    form.appendChild(submitButton);

    return form;
  }

  // Get input field value
  fieldValue() {
    return this.text_field.value;
  }

  // Set callback function
  setCallback(callback) {
    this.callback = callback;
  }

  // Handle submit event
  handleEvent() {
    // Invoke the callback function
    this.callback();
    this.text_field.value = "";
  }
}
