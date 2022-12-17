window.addEventListener("click", function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show-dropdown')) {
                openDropdown.classList.remove('show-dropdown');
            }
        }
    }
})

function openCryptoDropdown() {
    document.getElementById("crypto-dropdown").classList.toggle("show-dropdown");
    document.getElementById("bank-dropdown").classList.remove("show-dropdown");
}

function openBankDropdown() {
    document.getElementById("bank-dropdown").classList.toggle("show-dropdown");
    document.getElementById("crypto-dropdown").classList.remove("show-dropdown");
}

function setSelectedCrypto(element) {
    element.classList.toggle("item-option-selected");
    var options = document.getElementById("crypto-dropdown").children;
    for (var i = 0; i < options.length; i++) {
        if (options[i] == element) continue;
        options[i].classList.remove("item-option-selected");
    }

    var button = document.getElementById("crypto-button")
    if (button.innerText != element.innerText) {
        button.innerText = element.innerText;
        document.getElementById("crypto-title").innerText = element.innerText;
        if (element.innerText == "WOO Network (WOO)") {
            document.getElementById("crypto-title").style["font-size"] = "17px";
            document.getElementById("crypto-title-final").style["font-size"] = "17px";
        } else {
            document.getElementById("crypto-title").style["font-size"] = "21px";
            document.getElementById("crypto-title-final").style["font-size"] = "21px";
        }
    }
    if (document.getElementById("fiat-button").innerText != "Fiat" && button.innerText != "Crypto") {
        document.getElementById("crypto-input").disabled = false;
        document.getElementById("fiat-input").disabled = false;
        exchangeIfNeeded(true)
    }
}

function setSelectedBank(element) {
    element.classList.toggle("item-option-selected");
    var options = document.getElementById("bank-dropdown").children;
    for (var i = 0; i < options.length; i++) {
        if (options[i] == element) continue;
        options[i].classList.remove("item-option-selected");
    }
    var button = document.getElementById("fiat-button")
    if (button.innerText != element.innerText) {
        button.innerText = element.innerText;
        document.getElementById("fiat-title").innerText = element.innerText;
        document.getElementById("fiat-input").disabled = false;
    }
    if (document.getElementById("crypto-button").innerText != "Crypto" && button.innerText != "Fiat") {
        document.getElementById("crypto-input").disabled = false;
        document.getElementById("fiat-input").disabled = false;
        exchangeIfNeeded()
    }
}

function getMinAmount(bank) {
    var fiat = getFiatFromBank(bank).toLowerCase();
    switch(fiat) {
        case "uah": return "1900 UAH";
        case "usd": return "50 USD";
        case "eur": return "50 EUR";
        case "rub": return "8000 RUB";
        case "gbp": return "100 GBP";
        case "czk": return "3000 CZK";
        case "pln": return "500 PLN";
        case "jpy": return "20000 JPY"
        default : return "--";
    }
}

function getMinAmountWithoutFiat(fiat) {
    switch(fiat) {
        case "uah": return "1900";
        case "usd": return "50";
        case "eur": return "50";
        case "rub": return "8000";
        case "gbp": return "100";
        case "czk": return "3000";
        case "pln": return "500";
        case "jpy": return "20000"
        default : return "--";
    }
}

function moneyInputFormat(element) {

}

function cc_format(element) {
    var value = element.value;
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []

    for (i=0, len=match.length; i<len; i+=4) {
        parts.push(match.substring(i, i+4))
    }

    if (parts.length) {
        element.value = parts.join(' ');
    }
}

function checkDigit() {
    var allowedChars = "0123456789 ";
    var entryVal = document.getElementById('card-number-input').value;
    var flag;

    for(var i=0; i<entryVal.length; i++){       
        flag = false;

        for(var j=0; j<allowedChars.length; j++){
            if(entryVal.charAt(i) == allowedChars.charAt(j)) {
                flag = true;
                break;
            }
        }

        if(flag == false) { 
            entryVal = entryVal.replace(entryVal.charAt(i),""); i--; 
            document.getElementById('card-number-input').value = entryVal;
        }
    }
}

function limit(element) {
    var max_chars = 7;

    if(element.value.length > max_chars) {
        element.value = element.value.substr(0, max_chars);
    }
}

// function setInputFilter(textbox, inputFilter) {
//     ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function(event) {
//       textbox.addEventListener(event, function(e) {
//         if (inputFilter(this.value)) {
//           this.oldValue = this.value;
//           this.oldSelectionStart = this.selectionStart;
//           this.oldSelectionEnd = this.selectionEnd;
//         } else if (this.hasOwnProperty("oldValue")) {
//           this.value = this.oldValue;
//           this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
//         } else {
//           // Rejected value - nothing to restore
//           this.value = "";
//         }
//       });
//     });
//   }