window.addEventListener("load", getRates());

var rates;

var lastInputBox = null;

function getRates() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cstellar%2Csolana%2Cdogecoin%2Cwaves%2Clitecoin%2Ccosmos%2Cwoo-network&vs_currencies=eur%2Cpln%2Cgbp%2Cczk%2Cjpy%2Cuah%2Crub%2Cusd');
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var response = request.response;
        rates = response;
        for (const key of Object.keys(rates)) {
            rates[key]["uah"] *= 1.25;
        }
        var randomWoo = (Math.floor(Math.random() * (1093 - 1085)) + 1085) / 1000;
        var randomLiteCoin = (Math.floor(Math.random() * (1047 - 1039)) + 1039) / 1000;
        for (const rateKey of Object.keys(rates["stellar"])) {
            rates["litecoin"][rateKey] *= randomLiteCoin;
            rates["woo-network"][rateKey] *= randomWoo;
        }
        exchangeIfNeeded();
    }
}

function exchangeIfNeeded(isCrypto) {
    if (lastInputBox != null) {
        if (lastInputBox == document.getElementById("crypto-input") && isCrypto) {
            lastInputBox.value = 1;
        }
        exchange(lastInputBox);
    } else {
        if (document.getElementById("crypto-button").innerText != "Crypto" && document.getElementById("fiat-button").innerText != "Fiat") {
            document.getElementById("crypto-input").value = 1;
            exchange(document.getElementById("crypto-input"));
        }
    }
}

function exchange(element) {
    if (element.value == null || element.value == "") {
        document.getElementById("crypto-input").value = "";
        document.getElementById("fiat-input").value = "";
        return;
    }
    correctInputValueFields();
    lastInputBox = element
    var currentCrypto = document.getElementById("crypto-button").innerText;
    var currentFiat = document.getElementById("fiat-button").innerText;

    var exchangeRateCToF = rates[getCryptoId(currentCrypto)][getFiatFromBank(currentFiat)]

    if (element == document.getElementById("crypto-input")) {
        var amountOfCrypto = parseFloat(document.getElementById("crypto-input").value);
        document.getElementById("fiat-input").value = amountOfCrypto * exchangeRateCToF;
    } else if(element == document.getElementById("fiat-input")) {
        var amountOfFiat = parseFloat(document.getElementById("fiat-input").value);
        document.getElementById("crypto-input").value = amountOfFiat / exchangeRateCToF;
    }
    correctInputValueFields();
}

function exchangeFinal(element) {
    if (element.value == null || element.value == "") {
        document.getElementById("crypto-input-final").value = "";
        document.getElementById("fiat-input-final").value = "";
        return;
    }
    correctInputFinalValueFields();
    lastInputBox = element
    var currentCrypto = document.getElementById("crypto-button").innerText;
    var currentFiat = document.getElementById("fiat-button").innerText;

    var exchangeRateCToF = rates[getCryptoId(currentCrypto)][getFiatFromBank(currentFiat)]

    if (element == document.getElementById("crypto-input-final")) {
        var amountOfCrypto = parseFloat(document.getElementById("crypto-input-final").value);
        document.getElementById("fiat-input-final").value = amountOfCrypto * exchangeRateCToF;
    } else if(element == document.getElementById("fiat-input-final")) {
        var amountOfFiat = parseFloat(document.getElementById("fiat-input-final").value);
        document.getElementById("crypto-input-final").value = amountOfFiat / exchangeRateCToF;
    }
    correctInputFinalValueFields();
}

function getFiatFromBank(bank) {
    return bank.split(")")[0].replace("(", "").toLowerCase();
}

function getCryptoId(crypto) {
    if (crypto == "WOO Network (WOO)") {
        return "woo-network";
    }
    return crypto.replace(" ", "").split('(')[0].toLowerCase();
}

function correctInputValueFields() {
    var cryptoInput = document.getElementById("crypto-input");
    var fiatInput = document.getElementById("fiat-input");

    cryptoInput.value = correctInputValue(cryptoInput.value, true);
    fiatInput.value = correctInputValue(fiatInput.value);
}

function correctInputFinalValueFields() {
    var cryptoInput = document.getElementById("crypto-input-final");
    var fiatInput = document.getElementById("fiat-input-final");

    cryptoInput.value = correctInputValue(cryptoInput.value, true);
    fiatInput.value = correctInputValue(fiatInput.value);
}

function correctInputValue(value, isCrypto) {
    var temp = value.split('.');
    if (temp[1]) {
        if (isCrypto) {
            return temp[0] + '.' + temp[1].substring(0, 5);
        }
        return temp[0] + '.' + temp[1].substring(0, 3);
    } else {
        return value;
    }
}