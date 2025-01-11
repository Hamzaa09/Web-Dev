// navbar
const bar = document.getElementById('bar');
const close = document.getElementById('close-icon');
const nav = document.getElementById('navbar');
var check = localStorage.getItem("check");

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}


// single Product 
var main_img = document.querySelector(".sp-left-main img");
var small_img = document.querySelectorAll(".sp-left-small img");

small_img.forEach((img, index) => {
    img.onclick = function () {
        main_img.src = img.src;
        document.querySelector(".sp-right h4").innerHTML = document.querySelectorAll(".pro h5")[index].innerHTML
        document.querySelector(".sp-right h2").innerHTML = document.querySelectorAll(".description h4")[index].innerHTML
    }
});


// Button
let addtocart_btn = document.getElementById("Atc")
var sizeSelection;
var quantity;

if (addtocart_btn) {
    addtocart_btn.addEventListener("click", () => {

        sizeSelection = document.querySelector("select").value
        quantity = document.querySelector(".sp-right input").value

        localStorage.setItem("shirtName", document.querySelector(".sp-right h4").innerHTML)
        localStorage.setItem("shirtPrice", document.querySelector(".sp-right h2").innerHTML)
        localStorage.setItem("shirtSize", document.querySelector(".sp-right #sel-box").value)
        localStorage.setItem("shirtQuan", document.querySelector(".sp-right input").value)
        localStorage.setItem("shirtImg", main_img.src)

        check = localStorage.setItem("check", "true")

        let toast_main = document.querySelector(".toast-main")
        let toast = document.createElement('div')
        toast.innerHTML = `<i class="fa-solid fa-circle-check"></i>
            <p>Added To Cart</p>`;

        toast_main.appendChild(toast)

        setInterval(() => {
            toast.remove()
        }, 5000)
    })
}


function setData() {
    tbody = document.querySelector("tbody")
    if (tbody) {
        tbody.innerHTML = localStorage.getItem("tbody")
    }

    if (check === "true") {
        tbody = document.querySelector("tbody")

        if (tbody) {
            tbody.innerHTML = localStorage.getItem("tbody")
            tr = document.createElement("tr")

            tr.innerHTML = `<td><a><i id="remove" class="fa-solid fa-xmark"></i></a></td>
        <td><img src=${localStorage.getItem("shirtImg")} alt="" width="70px"></td>
        <td>${localStorage.getItem("shirtName")}</td>
        <td>${localStorage.getItem("shirtPrice")}</td>
        <td>${localStorage.getItem("shirtQuan")}</td>
        <td>$${Number(localStorage.getItem("shirtQuan")) * parseInt(localStorage.getItem("shirtPrice").replace(/[^0-9.]/g, ""))}</td>`


            tbody.appendChild(tr)
            localStorage.setItem("tbody", tbody.innerHTML)
        }
        localStorage.setItem("check", "false")
    }


    click = document.querySelectorAll('#remove')
    click.forEach((e) => {
        e.addEventListener("click", (e) => {
            e.target.parentElement.parentElement.parentElement.remove();
            localStorage.setItem("tbody", tbody.innerHTML)
        })
    })
}

inputCheck = document.querySelector(".nl-container-2 input")
span = document.createElement("span")
document.querySelector(".nl-container-2").appendChild(span)
span.innerHTML = "Invalid E-mail"
span.style.display = "none"

document.querySelector(".nl-container-2 button").addEventListener("click", () => {
    if (inputCheck.value.trim() === "") {
        span.innerHTML = "Invalid E-mail"
        span.style.display = "block"
    } else {
        span.innerHTML = ""
        alert("You have Signed Up")
    }
})

function couponAlert() {
    alert("Coupons!, Coming Soon")
}

setData()
