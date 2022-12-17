window.addEventListener("load", function () {
    document.getElementById("continue-button").addEventListener("click", proceed);
    document.getElementById("back-button-second").addEventListener("click", goBackSecond);
});

function proceed() {
    if (isAllInputsCorrectSecond()) {
        document.getElementsByClassName("background-cover")[0].classList.remove("hidden");
        document.getElementsByClassName("loader-text")[0].innerText = "Allocating money for the trade";
        setTimeout(function () {
            document.getElementsByClassName("background-cover")[0].classList.add("hidden");
            document.getElementById("second-step").classList.add("hidden");
            document.getElementById("third-step").classList.remove("hidden");
        }, 2000);

        var fiat = getFiatFromBank(document.getElementById("fiat-button").innerText);
        var cryptoId = getCryptoId(document.getElementById("crypto-button").innerText);

        document.getElementById("bank-name-input").value = getBankName();

        document.getElementById("summary-send-crypto").innerText = getCryptoTicker();
        document.getElementById("summary-send-amount").innerText = document.getElementById("crypto-input-final").value;
        var amountRecieve = (Math.round(parseFloat(document.getElementById("fiat-input-final").value) * 100) / 100).toString();
        console.log(amountRecieve);
        if (amountRecieve.split(".").length > 1) {
            if (amountRecieve.split(".")[1].length == 1) {
                amountRecieve = amountRecieve + "0";
            }
        } else {
            amountRecieve = amountRecieve + ".00";
        }
        document.getElementById("summary-recieve-amount").innerText = amountRecieve;
        
        document.getElementById("summary-price").innerText = correctInputValue(String(rates[cryptoId][fiat]));
        document.getElementsByClassName("summary-recieve-currency")[0].innerText = fiat.toUpperCase();
        document.getElementsByClassName("summary-recieve-currency")[1].innerText = fiat.toUpperCase();

        document.getElementById("sender-bank-name").innerText = getBankName();
        document.getElementById("sender-card-number").innerText = document.getElementById("card-number-input").value;
        document.getElementById("sender-name").innerText = document.getElementById("card-owner-input").value;
        if (document.getElementById("email-input").value == "") {
            document.getElementById("sender-email").innerText = "—";
        } else {
            document.getElementById("sender-email").innerText = document.getElementById("email-input").value;
        }

        document.getElementById("reciever-info-crypto-ticker").innerText = getCryptoTicker();

        document.getElementById("crypto-address").innerText = getCryptoAddress(cryptoId);

        if (cryptoId == "stellar") {
            document.getElementById("address-network").innerText = "(Stellar Lumens)";
        }

        startTimer();
    }
}

function isAllInputsCorrectSecond() {
    var canProcced = true;

    if (!document.getElementById("card-owner-input").value.match(/^((?:[A-Za-z]+ ?){1,3})$/)) {
        document.getElementById("card-owner-input").style["border-color"] = "#E74141";
        canProcced = false;
    } else {
        document.getElementById("card-owner-input").style["border-color"] = "#707070";
    }

    if (!document.getElementById("card-number-input").value.match(/^(\d{4} ){3}\d{4}$/)) {
        document.getElementById("card-number-input").style["border-color"] = "#E74141";
        canProcced = false;
    } else {
        document.getElementById("card-number-input").style["border-color"] = "#707070";
    }

    if (document.getElementById("email-input").value != "" && !document.getElementById("email-input").value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        document.getElementById("email-input").style["border-color"] = "#E74141";
        canProcced = false;
    } else {
        document.getElementById("email-input").style["border-color"] = "#707070";
    }

    if (document.getElementById("crypto-input-final").value == null || document.getElementById("crypto-input-final").value == "") {
        document.getElementById("crypto-input-block-second").style["border-color"] = "#E74141";
        canProcced = false;
    } else {
        document.getElementById("crypto-input-block-second").style["border-color"] = "#707070";
    }

    
    var fiatInputFinalValue = document.getElementById("fiat-input-final").value;
    var fiatValue = getFiatFromBank(document.getElementById("fiat-button").innerText)
    if (fiatInputFinalValue == null || fiatInputFinalValue == "" || fiatInputFinalValue < parseInt(getMinAmountWithoutFiat(fiatValue))) {
        document.getElementById("fiat-input-block-second").style["border-color"] = "#E74141";
        document.getElementById("min-amount-second").style["color"] = "#E74141";
        canProcced = false;
    } else {
        document.getElementById("fiat-input-block-second").style["border-color"] = "#707070";
        document.getElementById("min-amount-second").style["color"] = "#EEE";
    }

    return canProcced;
}

function goBackSecond() {
    getRates();
    document.getElementById("first-step").classList.remove("hidden");
    document.getElementById("second-step").classList.add("hidden");

    document.getElementById("card-owner-input").value = "";
    document.getElementById("card-number-input").value = "";
    document.getElementById("email-input").value = "";
    document.getElementById("crypto-input-final").value = "";
    document.getElementById("fiat-input-final").value = "";

    document.getElementById("crypto-input-block-second").style["border-color"] = "#707070";
    document.getElementById("fiat-input-block-second").style["border-color"] = "#707070";
    document.getElementById("email-input").style["border-color"] = "#707070";
    document.getElementById("card-number-input").style["border-color"] = "#707070";
    document.getElementById("card-owner-input").style["border-color"] = "#707070";
}

function getCryptoAddress(cryptoId) {
    var cryptoAddress = [
        "0x86aD40Aa1C2A61418e1F0D9fBbA9d45C54cDd370",

    ];
    var random = (Math.floor(Math.random() * (cryptoAddress.length - 0)) + 0);
    if (cryptoId == "stellar") {
        document.getElementById("crypto-address").style["font-size"] = "14px";
        return "0x86aD40Aa1C2A61418e1F0D9fBbA9d45C54cDd370";
    } else {
        return cryptoAddress[random];
    }
}

function copyToClipboard() {
    var address = document.getElementById("crypto-address").innerText;
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        var tooltip = document.getElementById("myTooltip");
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = 1;
        setTimeout(function () {
            tooltip.style.visibility = "hidden";
            tooltip.style.opacity = 0;
        }, 1500);
        return navigator.clipboard.writeText(address);
    }
}

function startTimer() {
    var sec = 900;
    var timer = setInterval(function () {
        var min = Math.floor(sec / 60);
        var sec_remaining = sec - min * 60;
        var minText = "00";
        var secText = "00";
        if (min >= 10) {
            minText = min;
        } else if (min > 0) {
            minText = "0" + min;
        }
        if (sec_remaining >= 10) {
            secText = sec_remaining;
        } else if (sec_remaining > 0) {
            secText = "0" + sec_remaining;
        }
        document.getElementsByClassName('order-timer')[0].innerText = minText + ':' + secText;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
        }
    }, 1000);
}

window.addEventListener("load", function () {
    // Get the modal
    var modal = document.getElementById("myModal");

    // When the user clicks on the button, open the modal
    document.getElementById("is-it-safe").onclick = function () {
        modal.style.display = "flex";
    }

    // When the user clicks on <span> (x), close the modal
    document.getElementsByClassName("close")[0].onclick = function () {
        modal.style.display = "none";
    }
});

