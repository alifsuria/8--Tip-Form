(function() {
  const services = [
    {
      value: 1,
      title: "Great - 20%"
    },
    {
      value: 2,
      title: "Good - 10%"
    },
    {
      value: 3,
      title: "Bad - 2%"
    }
  ];
  const inputBill = document.querySelector(".input-bill");
  const inputPerson = document.querySelector(".input-person");
  const selectService = document.querySelector("#select-service");

  const validateInput = function(billAmount, personAmount, selectedService) {
    let isFeedback = false;
    const feedback = document.querySelector(".feedback");
    feedback.innerHTML = "";

    if (billAmount === "" || billAmount <= "0") {
      feedback.classList.add("show");
      feedback.innerHTML += `<p>Bill Amount Cannot Be Blank Or Zero</p>`;
      isFeedback = true;
    }
    if (personAmount === "" || personAmount <= "0") {
      feedback.classList.add("show");
      feedback.innerHTML += `<p>Number Of Person Must Be Greater Than Zero</p>`;
      isFeedback = true;
    }
    if (selectedService === "0") {
      feedback.classList.add("show");
      feedback.innerHTML += `<p>You Must Select a Service</p>`;
      isFeedback = true;
    }
    setTimeout(function() {
      feedback.classList.remove("show");
    }, 10000);

    return isFeedback;
  }; // end of ValidateInput

  const calculateTIp = function(billAmount, personAmount, selectedService) {
    let percentTip = "";
    if (selectedService === "1") {
      percentTip = 0.2;
    } else if (selectedService === "2") {
      percentTip = 0.1;
    } else {
      percentTip = 0.2;
    }

    const tipAmount = Number(billAmount) * percentTip;
    const totalAmount = Number(billAmount) + Number(tipAmount);
    const eachPerson = Number(totalAmount) / Number(personAmount);

    return [tipAmount, totalAmount, eachPerson];
  };

  //FORM Setup - Add Service
  services.forEach(function(service) {
    //create the option element
    const option = document.createElement("option");
    option.textContent = service.title;
    option.value = service.value;
    //select the select element from the DOM
    selectService.appendChild(option);
  });

  const tipForm = document.querySelector(".tip-form");
  tipForm.addEventListener("submit", function(e) {
    e.preventDefault();

    console.log("click");
    //get value from DOM Element
    let billAmount = inputBill.value;
    let personAmount = inputPerson.value;
    let selectedService = selectService.value;

    //get feedback if info not validated
    const isFeedback = validateInput(billAmount, personAmount, selectedService);

    //calculate tip if info was validate
    if (!isFeedback) {
      const loader = document.querySelector(".loader");
      const resultDOM = document.querySelector(".result");
      const tipResultDOM = document.querySelector("#tip-amount");
      const totalResultDOM = document.querySelector("#total-amount");
      const personResultDOM = document.querySelector("#person-amount");

      //calculate result
      const result = calculateTIp(billAmount, personAmount, selectedService);

      //show loader
      loader.classList.add("show");
      //show item after 2 second
      setTimeout(function() {
        loader.classList.remove("show");
        tipResultDOM.textContent = `${(result[0].toFixed(0))}`;
        totalResultDOM.textContent = `${(result[1].toFixed(1))}`;
        personResultDOM.textContent = `${(result[2].toFixed(2))}`;
        resultDOM.classList.add("show");
      }, 2000);

      //clear value from DOM Element after 5 second
      setTimeout(function() {
        inputBill.value = "";
        inputPerson.value = "";
        selectedService.value = 0;
        resultDOM.classList.remove("show");
      }, 5000);
    } //end feedback statement
  }); //end event listener for form
})();
