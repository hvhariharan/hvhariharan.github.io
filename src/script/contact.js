// Page Local Scripts JS & jQ

window.onload = CaptchaTimer();
window.onload = Captcha();

function ValidateInputs() {
    const constraints = {
      name: {
        presence: { allowEmpty: false }
      },
      email: {
        presence: { allowEmpty: false },
        email: true
      },
      message: {
        presence: { allowEmpty: false }
      }
    };

    const form = document.getElementById('contact-form');

    const formValues = {
      name: form.elements.Name.value,
      email: form.elements.Email.value,
      message: form.elements.Message.value,
      urgent: form.elements.Urgent.value
    }
    const errors = validate(formValues, constraints);

    if (errors) {
      event.preventDefault();
      const errorMessage = Object
        .values(errors)
        .map(function (fieldValues) { return fieldValues.join(', ')})
        .join("\n");

      alert(errorMessage);
      return false;
    } else {
      return true;
    }
}


function SendToSheets() {
    const form = document.getElementById('contact-form');
    // Create new FormData object:
    const formData = new FormData(form);
    // Convert formData object to URL-encoded string:
    const payload = new URLSearchParams(formData);
    // Post the payload using Fetch:
    fetch('https://script.google.com/macros/s/AKfycbzculrmG0ElR_Oe9C4j2N3UASwY4TcuXWx86WU5--g7_QkEB_gBIn7voKZOk2B_TEdv/exec', {
    method: 'POST',
    body: payload,
    })
    .then(res => res.json())
    .then(data => console.log(data))
}


function ValidateAndSheets() {

    if (ValidCaptcha()){
        tr = "Captcha: Success!";
        if (ValidateInputs()) {
        SendToSheets();
        tr = "Captcha: Success!; Form sent!";
        } else {
        tr = "Captcha: Success!; Form Inputs Error!";
        };
    }else{  
        tr = "Captcha: Failiure!";
    }
    alert(tr);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function Captcha(){
    var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 
            '0','1','2','3','4','5','6','7','8','9');
    
    var i;

    for (i=0;i<6;i++){
        var a = alpha[Math.floor(Math.random() * alpha.length)];
        var b = alpha[Math.floor(Math.random() * alpha.length)];
        var c = alpha[Math.floor(Math.random() * alpha.length)];
        var d = alpha[Math.floor(Math.random() * alpha.length)];
        var e = alpha[Math.floor(Math.random() * alpha.length)];
        var f = alpha[Math.floor(Math.random() * alpha.length)];
        var g = alpha[Math.floor(Math.random() * alpha.length)];
    }
        
    var capWidth = 12;

    var refWidth = capWidth + 6;

    var randomColor1 =  String('#'+ Math.floor(Math.random()*16777215).toString(16));
    var randomColor2 =  String('#'+ Math.floor(Math.random()*16777215).toString(16));
    var randomColor3 =  String('#'+ Math.floor(Math.random()*16777215).toString(16));

    var randomColor1 = getRandomColor();
    var randomColor2 = getRandomColor();
    var randomColor3 = getRandomColor();

    var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' '+ f + ' ' + g;
    var capWidthstr = capWidth+"rem";

    var captchaObj = document.getElementById('mainCaptcha');
    var captchaInputObj = document.getElementById('captchaInput');
    var captchaProgObj = document.getElementById('CaptchaTimeoutProgress');

    captchaObj.innerHTML = code;
    captchaObj.value = code;
    captchaObj.style.color = randomColor1;
    captchaObj.style.textDecoration = "line-through " + randomColor2 + " 0.15rem";
    captchaObj.style.backgroundColor = randomColor3;
    captchaObj.style.width = capWidthstr;

    captchaInputObj.style.color = randomColor1;
    captchaInputObj.style.width = capWidthstr;

    captchaProgObj.style.width = capWidthstr;

}

function CaptchaTimer(){
    var timeout = 20;
    var seconds = timeout;
    capTime = setInterval(function() {
        updateProg(timeout-seconds+1, timeout);
        if (seconds == 0) {
            clearTimeout(capTime);
            Captcha();
            CaptchaTimer();
        };
        seconds = seconds-1;
    }, 1000);
}

function RefreshCaptcha() {
    clearTimeout(capTime);
    Captcha();
    captchaInput = document.getElementById('captchaInput');
    clearTextArea(captchaInput);
    CaptchaTimer();
}

function updateProg(val, max) {
    document.getElementById('CaptchaTimeoutProgress').value = val;
    document.getElementById('CaptchaTimeoutProgress').max = max;
}

function ValidCaptcha(){
    var string1 = removeSpaces(document.getElementById('mainCaptcha').value);
    var string2 = removeSpaces(document.getElementById('captchaInput').value);
    if (string1 == string2){
        return true;
    }else{       
        return false;
    }
}

function removeSpaces(string){
    return string.split(' ').join('');
}

function clearTextArea(element){
    element.value = '';
}

