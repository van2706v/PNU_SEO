window.addEventListener("load", function() {
    document.getElementById("trade-button").addEventListener("click", trade);
});

function trade() {
    if (isAllInputsCorrect()) {
        document.getElementsByClassName("background-cover")[0].classList.remove("hidden");
        document.getElementsByClassName("loader-text")[0].innerText = "Looking for the best proposition";
        setTimeout(function() {
            document.getElementsByClassName("background-cover")[0].classList.add("hidden");
            document.getElementById("first-step").classList.add("hidden");
            document.getElementById("second-step").classList.remove("hidden");
        }, 2500);
        document.getElementById("bank-name-input").value = getBankName();
        document.getElementById("crypto-title-final").innerText = document.getElementById("crypto-button").innerText;

        var fiat = getFiatFromBank(document.getElementById("fiat-button").innerText);
        var cryptoId = getCryptoId(document.getElementById("crypto-button").innerText);

        document.getElementById("fiat-title-final").innerText = fiat.toUpperCase() + " ";
        document.getElementById("min-amount-second").innerText = "(Min: " + getMinAmountWithoutFiat(fiat) + ")"
        document.getElementsByClassName("exchange-rate")[0].innerText = "1 " + getCryptoTicker() + " = " + correctInputValue(String(rates[cryptoId][fiat])) + " " + fiat.toUpperCase();
    }
}

function isAllInputsCorrect() {
    var passedCheck = true;

    var currentCrypto = document.getElementById("crypto-button").innerText;
    var currentFiat = document.getElementById("fiat-button").innerText;

    if (currentCrypto == "Crypto") {
        document.getElementById("crypto-dropdown-block").style["border-bottom-color"] = "#E74141";
        passedCheck = false;
    } else {
        document.getElementById("crypto-dropdown-block").style["border-bottom-color"] = "#707070";
    }

    if (currentFiat == "Fiat") {
        document.getElementById("fiat-dropdown-block").style["border-bottom-color"] = "#E74141";
        passedCheck = false;
    } else {
        document.getElementById("fiat-dropdown-block").style["border-bottom-color"] = "#707070";
    }

    return passedCheck;
}

function getBankName() {
    return document.getElementById("fiat-button").innerText.split(')')[1].trimStart();
}

function getCryptoTicker() {
    return document.getElementById("crypto-button").innerText.split('(')[1].replace(')', '');
}