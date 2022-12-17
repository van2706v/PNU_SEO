function transferred(element, index) {
    //Received btn
    element.innerText = "Recieved money";
    element.style["font-size"] = "16px";
    element.style["background-color"] = "#DA9835";
    element.style["color"] = "#000000";
    element.style["border"] = "1px solid #000000";
    element.onclick = function() {
        var modal = document.getElementById("myModal");
        modal.style.display = "flex";
        modal.getElementsByClassName("modal-is-it-safe")[0].classList.add("hidden");
        modal.getElementsByClassName("modal-receive-money")[0].classList.remove("hidden");
    
        document.getElementsByClassName("close")[0].onclick = function () {
            cancelRecieveMoney();
        }
    }

    //Appeal btn
    document.getElementsByClassName("go-back-btn")[index].innerText = "Appeal";
    document.getElementsByClassName("go-back-btn")[index].style["background-color"] = "#ddd";
    document.getElementsByClassName("go-back-btn")[index].style["color"] = "#20252F";
    document.getElementsByClassName("go-back-btn")[index].style["font-weight"] = "500";
    document.getElementsByClassName("go-back-btn")[index].style["border"] = "1px solid #000000";
    document.getElementsByClassName("go-back-btn")[index].onclick = function() {
        var modal = document.getElementById("myModal");
        modal.style.display = "flex";
        modal.getElementsByClassName("modal-is-it-safe")[0].classList.add("hidden");
        modal.getElementsByClassName("appeal-part")[0].classList.remove("hidden");
    
        document.getElementsByClassName("close")[0].onclick = function () {
            cancelAppeal();
        }
    }
}

function cancelAppeal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    modal.getElementsByClassName("modal-is-it-safe")[0].classList.remove("hidden");
    modal.getElementsByClassName("appeal-part")[0].classList.add("hidden");

    document.getElementsByClassName("close")[0].onclick = function () {
        modal.style.display = "none";
    }
}

function appeal() {
    if (document.getElementById("modal-email").value == null || document.getElementById("modal-email").value == "") {
        document.getElementById("modal-email").style["border-color"] = "#E74141";
    } else {
        document.getElementById("modal-email").style["border-color"] = "#707070";
        document.location.reload();
    }
}

function cancelOrder() {
    var modal = document.getElementById("myModal");
    modal.style.display = "flex";
    modal.getElementsByClassName("modal-is-it-safe")[0].classList.add("hidden");
    modal.getElementsByClassName("modal-cancel-order")[0].classList.remove("hidden");

    document.getElementsByClassName("close")[0].onclick = function () {
        cancelCancelOrder();
    }
}

function cancelAnyway() {
    document.location.reload();
}

function cancelCancelOrder() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    modal.getElementsByClassName("modal-is-it-safe")[0].classList.remove("hidden");
    modal.getElementsByClassName("modal-cancel-order")[0].classList.add("hidden");

    document.getElementsByClassName("close")[0].onclick = function () {
        modal.style.display = "none";
    }
}

function confirmRecieveMoney() {
    document.location.reload();
}

function cancelRecieveMoney() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    modal.getElementsByClassName("modal-is-it-safe")[0].classList.remove("hidden");
    modal.getElementsByClassName("modal-receive-money")[0].classList.add("hidden");

    document.getElementsByClassName("close")[0].onclick = function () {
        modal.style.display = "none";
    }
}