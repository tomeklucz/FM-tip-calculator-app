"use strict";

/* VARIABLES */
const billInput = document.querySelector(".bill-input");
const customTipInput = document.querySelector(".custom-tip-field");
const peopleInput = document.querySelector(".people-input");
const tipContainer = document.querySelector(".tip-container");
const tipBtns = document.querySelectorAll(".tip-value");
const billError = document.querySelector(".bill-error");
const tipError = document.querySelector(".tip-error");
const peopleError = document.querySelector(".people-error");
const tipAmount = document.querySelector(".tip-amount");
const total = document.querySelector(".total");
const resetBtn = document.querySelector(".reset-btn");

/* TIP CALCULATOR APP */
const tipApp = function () {
  let billValue = 0;
  let tipValue = 0;
  let peopleValue = 0;

  /* EVENT LISTENERS */
  billInput.addEventListener("input", function () {
    billValue = +this.value;
    activateResetBtn();
    checkError(billValue, billError, billInput);
    calculations();
  });

  tipContainer.addEventListener("click", function (e) {
    customTipInput.value = "";
    if (e.target.classList.contains("tip-value")) {
      clearTipBtns();
      activateResetBtn();
      removeError(tipError, customTipInput);
      e.target.classList.add("active-btn");
      tipValue = e.target.value;
      calculations();
    }
  });

  customTipInput.addEventListener("input", function () {
    clearTipBtns();
    tipValue = +this.value;
    activateResetBtn();
    checkError(tipValue, tipError, customTipInput);
    calculations();
  });

  peopleInput.addEventListener("input", function () {
    peopleValue = +this.value;
    activateResetBtn();
    checkError(peopleValue, peopleError, peopleInput);
    calculations();
  });

  resetBtn.addEventListener("click", function () {
    resetApp();
  });

  /* FUNCTIONS */
  const clearTipBtns = function () {
    tipBtns.forEach((btn) => btn.classList.remove("active-btn"));
  };

  const activateResetBtn = function () {
    resetBtn.classList.add("full-opacity");
  };

  const resetApp = function () {
    billInput.value = "";
    customTipInput.value = "";
    peopleInput.value = "";
    billValue = 0;
    tipValue = 0;
    peopleValue = 0;
    tipAmount.innerHTML = "0.00";
    total.innerHTML = "0.00";
    resetBtn.classList.remove("full-opacity");
    clearTipBtns();
    removeError(billError, billInput);
    removeError(peopleError, peopleInput);
    removeError(tipError, customTipInput);
  };

  const checkError = function (number, error, input) {
    if (number === 0) {
      addError(error, input);
    } else {
      removeError(error, input);
    }
  };

  const addError = function (error, input) {
    error.classList.remove("hidden");
    input.classList.add("error-border");
  };

  const removeError = function (error, input) {
    error.classList.add("hidden");
    input.classList.remove("error-border");
  };

  const calculations = function () {
    if (billValue > 0 && peopleValue > 0 && tipValue > 0) {
      const tipAmountValue = (billValue * (tipValue / 100)) / peopleValue;
      const totalValue = billValue / peopleValue + tipAmountValue;
      tipAmount.innerHTML = tipAmountValue.toFixed(2);
      total.innerHTML = totalValue.toFixed(2);
    }
  };
};

tipApp();
