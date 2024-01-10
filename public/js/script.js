/* eslint-disable no-undef */

function Email(address) {
  this.address = address;
}

Email.prototype.validate = function validate() {
  return String(this.address)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

function EmailSubmission({ input, submit }) {
  this.input = input;
  this.submit = submit;
  this.errorElements = document.querySelectorAll('.error');
}

EmailSubmission.prototype = {
  get emailAddress() {
    return document.querySelector(this.input).value;
  },
};

EmailSubmission.prototype.hideErrorElements = function hideErrorElements() {
  this.errorElements.forEach((e) => e.classList.add('hidden'));
};

EmailSubmission.prototype.showErrorElements = function showErrorElements() {
  this.errorElements.forEach((e) => e.classList.remove('hidden'));
};

EmailSubmission.prototype.setErrorDisplay = function setErrorDisplay() {
  const email = new Email(this.emailAddress);
  return email.validate() ? this.hideErrorElements() : this.showErrorElements();
};

EmailSubmission.prototype.registerEvents = function registerEvents() {
  document.querySelector(this.submit).addEventListener('click', () => this.setErrorDisplay());
  document.querySelector(this.input).addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      this.setErrorDisplay();
    }
  });
};

EmailSubmission.prototype.startField = function startField() {
  this.hideErrorElements();
  this.registerEvents();
};

const email = new EmailSubmission({ input: '.sign-up input', submit: '.sign-up .button' });
email.startField();
