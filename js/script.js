//console.log(‘Test’);
 
//3. The 'Name' field
// create a variable to reference name element from html file and use focus method to set name field to page load default 
const nameField = document.getElementById('name');
nameField.focus();
 
//4. "Job Role" Section
// Hide Other job role text field and create an event listener that selects other job so that text field is enabled again
 
const otherJobTextField = document.getElementById('other-job-role');
otherJobTextField.style.display = 'none';
 
const selectJobRole = document.getElementById('title'); 
selectJobRole.addEventListener('change', e => {
    if(e.target.value === 'other'){
        otherJobTextField.style.display = 'initial';
    } else {
        otherJobTextField.style.display = 'none';
    }
});
 
 
//5."T-Shirt Info" section 
//create variables for tshirt color and design options and create to select children from color section of the html 
//disable color <select> until tshirt design event listener is changed and then enable color element 
    let designTheme = document.querySelector('#design');
    let colorShirt = document.querySelector('#color');
    colorShirt.disabled = true;

    designTheme.addEventListener ('change', (e) => {
        colorShirt.disabled = false;
        for (let i = 0; i < colorShirt.length; i++){
            let colorOption = colorShirt.children[i].getAttribute("data-theme");
            let colorValue = e.target.value

            if (colorOption === colorValue){
                colorShirt[i].hidden = false;
                colorShirt[i].selected = true;
            } else if (colorOption != colorValue){
                colorShirt[i].hidden = true;
                colorShirt[i].selected = false;
            }
        }
        
        }
        
    );

 
// 6. "Register for Activities" section
//Create variables and create an event listener that listens for change
 
const activitiesFieldset = document.getElementById('activities'); 
const activitiesCost = document.getElementById('activities-cost');
 
let totalCost = 0;
const activitiesCheckboxes = document.querySelectorAll('#activities input');
 
activitiesFieldset.addEventListener('change', e => {
    const clicked = e.target;
    const clickedBoxAttribute = +(clicked.getAttribute('data-cost'));
    
    clicked.checked ? totalCost += clickedBoxAttribute : totalCost -= clickedBoxAttribute;
    activitiesCost.innerHTML = `Total: $${totalCost}`; 
});
 
// 7. "Payment Info section" 
//create payment method variables 
 
const paymentSelection = document.getElementById('payment'); 
const paymentOptionElements = document.querySelectorAll('#payment option'); 
const bitcoinDiv = document.getElementById('bitcoin');
const paypalDiv = document.getElementById('paypal');
const creditDiv = document.getElementById('credit-card');
 
paypalDiv.hidden = true;
bitcoinDiv.hidden = true;
creditDiv.hidden = false;
paymentOptionElements[1].selected = true;
 
paymentSelection.addEventListener('change', e => {
    if(e.target.value === 'paypal'){
        paypalDiv.hidden = false;
        creditDiv.hidden = true;
        bitcoinDiv.hidden = true;
    } else if(e.target.value === 'bitcoin'){
        bitcoinDiv.hidden = false;
        creditDiv.hidden = true;
        paypalDiv.hidden = true;
    } else {
        creditDiv.hidden = false;
        paypalDiv.hidden = true;
        bitcoinDiv.hidden = true;
    }
});
 
// form validation//
 
const emailField = document.getElementById('email');
const ccNumField = document.getElementById('cc-num');
const zipCodeField = document.getElementById('zip');
const cvvField = document.getElementById('cvv');
 
const nameValidator = () => {
    const nameValue = nameField.value;
    const nameRegex = /^[a-z]+ [a-z ,\.'-]+$/i.test(nameValue.trim()); 
 
    nameRegex ? validationPass(nameField) : validationFail(nameField)
    
    return nameRegex;
};
 
const emailValidator = () => {
    const emailValue = emailField.value;
    const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue.trim());
 
    emailRegex ? validationPass(emailField) : validationFail(emailField)
    
    return emailRegex;
 
};
 
const activitiesValidator = () => {
    const activitiesDiv = document.getElementById('activities-box');
    for(activity of activitiesCheckboxes){
        if(activity.checked){
            document.querySelector('p.hint').style.display = 'none';
            validationPass(activitiesDiv);
            return true
        } else {
            document.querySelector('p.hint').style.display = 'block';
            validationFail(activitiesDiv);
        }
    }
}
 
const cardNumValidator = () => {
    const cardNumValue = ccNumField.value;
    const cardNumRegex = /^\d{13,16}$/.test(cardNumValue.trim());
 
    cardNumRegex ? validationPass(ccNumField) : validationFail(ccNumField)
 
    return cardNumRegex;
}
 
const zipCodeValidator = () => {
    const zipCodeValue = zipCodeField.value;
    const zipCodeRegex = /^\d{5}$/.test(zipCodeValue.trim());
 
    zipCodeRegex ? validationPass(zipCodeField) : validationFail(zipCodeField)
 
    return zipCodeRegex;
}
 
const cvvValidator = () => {
    const cvvValue = cvvField.value;
    const cvvRegex = /^\d{3}$/.test(cvvValue.trim());
 
    cvvRegex ? validationPass(cvvField) : validationFail(cvvField)
 
    return cvvRegex;
}
const formElement = document.querySelector('form');
 
formElement.addEventListener('submit', e => { 
    if(!nameValidator()){
        e.preventDefault();
        console.log('Please enter valid name.')
    }
 
    if(!emailValidator()){
        e.preventDefault();
        console.log('Please enter valid email address.')
    }
 
    if(!activitiesValidator()){
        e.preventDefault();
        console.log('Please make at least one selection.');
    }
    if(creditDiv.hidden === false){
        if(!cardNumValidator()){
            e.preventDefault();
            console.log('Please enter valid CC number.');
        } 
        if (!zipCodeValidator()){
            e.preventDefault();
            console.log('Please enter valid zipcode.')
        }
        if(!cvvValidator()){
            e.preventDefault();
            console.log('Please enter valid CVV.')
        }
    }
});
 
// Accessibilty 
const hints = document.querySelectorAll('span.hint');
 
function validationPass(element){
    let parameterParent = element.parentElement;
    parameterParent.classList.add('valid');
    parameterParent.classList.remove('not-valid');
    parameterParent.lastElementChild.hidden = true;
    for (const hint of hints){
        hint.style.display = 'none';
      }  
  }
 
  function validationFail(element){
    let parameterParent = element.parentElement;
    parameterParent.classList.add('not-valid');
    parameterParent.classList.remove('valid');
    parameterParent.lastElementChild.hidden = false;
    for (const hint of hints){
        hint.style.display = 'block';
      }  
  }
 
 
  for(const activity of activitiesCheckboxes){
    activity.addEventListener('focus', e => {
        activity.parentElement.classList.add('focus');
    });
    activity.addEventListener('blur', e => {
            activity.parentElement.classList.remove('focus');
        });
}

