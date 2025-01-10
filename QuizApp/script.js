const key = "CU4tPkYHalOR4DJI5y3OcRcD43Os18sb5lLA2E70"
const url = "https://quizapi.io/api/v1/questions"
var j = 0
var time = 30;
var correct = 0;
var timerInterval;
var h3;

// SELECTION 
var category = localStorage.getItem("category");
var difficulty = localStorage.getItem("difficulty");
var name = localStorage.getItem("name");
var check= localStorage.getItem("check");

async function main() {

    let tbody = document.querySelector('tbody')
    if (tbody){
        tbody.innerHTML = localStorage.getItem('tbody')
    }
    if(check == "true"){
        let tbody = document.querySelector('tbody')
        if (tbody){
            tbody.innerHTML = localStorage.getItem('tbody')
        }
    
        let tr_new = document.createElement('tr')
    
        if (tbody) {
            tr_new.innerHTML = localStorage.getItem("tr_data")
            tbody.appendChild(tr_new)
    
            localStorage.setItem("tbody", tbody.innerHTML)
        }
        localStorage.setItem("check", "flase")
    }

    h3 = document.querySelector(".card-2 h3");
    if (h3 && name !== "null") {
        h3.innerHTML = name + "'s " + " Scores"
    }

    const request = await fetch(`${url}?apiKey=${key}&limit=10 &category=${category} &difficulty=${difficulty}`)
    let data = await request.json()

    while (j < 10) {
        await getQuestion(data, j);
        j++
    }

    showResult();
}

function getQuestion(data, i) {
    return new Promise((resolve) => {
        document.querySelector(".no").innerHTML = `${i + 1}.`;
        document.querySelector(".que").innerHTML = `${data[i].question}`;

        let answers = document.querySelectorAll("li");
        answers[0].innerHTML = data[i].answers.answer_a || "N/A";
        answers[1].innerHTML = data[i].answers.answer_b || "N/A";
        answers[2].innerHTML = data[i].answers.answer_c || "N/A";
        answers[3].innerHTML = data[i].answers.answer_d || "N/A";

        document.querySelector("span").innerHTML = `${i + 1}/10`;

        // Timer
        time = 30;
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (time === 0) {
                clearInterval(timerInterval);
                resolve();
            } else {
                document.querySelector(".time").innerHTML = `${time}s`;
                time--;
            }
        }, 1000);

        // Correct answer
        const correctKey = Object.keys(data[i].correct_answers).find(
            (key) => data[i].correct_answers[key] === "true"
        );

        // Reset answer
        let answered = false;

        // New event listeners
        answers.forEach((answer) => {
            let clonedAnswer = answer.cloneNode(true);
            answer.parentNode.replaceChild(clonedAnswer, answer);

            clonedAnswer.addEventListener("click", async () => {
                if (answered) return; // Prevent further clicks
                answered = true;

                clearInterval(timerInterval);

                if (clonedAnswer.getAttribute("id") === correctKey) {
                    clonedAnswer.style.backgroundColor = "#3dc91ad3";
                    correct++; // Increment only once

                    await new Promise((resolveTimeout) => setTimeout(resolveTimeout, 1000));

                    clonedAnswer.style.backgroundColor = "";
                    resolve();
                } else {
                    clonedAnswer.style.backgroundColor = "#f70e16e7";
                    document.getElementById(correctKey).style.backgroundColor = "#3dc91ad3";

                    await new Promise((resolveTimeout) => setTimeout(resolveTimeout, 1000));

                    document.getElementById(correctKey).style.backgroundColor = "";
                    clonedAnswer.style.backgroundColor = "";
                    resolve();
                }
            });
        });
    });
}

function showResult() {

    const ul = document.querySelector("ul")
    const remarks = ["Better Luck Next Time 😭", "It's a Nice Try 👍", "Amazing Job 💪", "Congratulations 🎉, You're our Top scorer"]
    document.querySelector(".question").innerHTML = `You scored: ${correct}/10`;
    document.querySelector("span").innerHTML = "";
    document.querySelector(".time").innerHTML = "";

    let endBtn = document.createElement('button')
    endBtn.setAttribute("class", "normal-btn")
    endBtn.innerText = "End Test"

    document.querySelector(".card").appendChild(endBtn)

    endBtn.addEventListener("click", () => {
        
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        let td3 = document.createElement('td')
        
        td1.innerHTML = localStorage.getItem("category");
        td2.innerHTML = localStorage.getItem("difficulty")
        td3.innerHTML = correct
        
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)

        localStorage.setItem("tr_data", tr.innerHTML)

        window.location.href = "index.html"
        localStorage.setItem("check", "true")
    })

    if (correct < 4) {
        ul.innerHTML = `${remarks[0]}`;
    } else if (correct >= 4 && correct <= 7) {
        ul.innerHTML = `${remarks[1]}`;
    } else if (correct > 7) {
        ul.innerHTML = `${remarks[2]}`;
    }
}

function dataSet() {

    let selection_1 = document.querySelector('#category')
    let selection_2 = document.querySelector('#difficulty')
    let input = document.querySelector('.input-box input')

    category = localStorage.setItem("category", selection_1.value)
    difficulty = localStorage.setItem("difficulty", selection_2.value)
    name = localStorage.setItem("name", input.value)

    window.location.href = "quiz.html"
}

function clearAll(){
    localStorage.clear()
}

main();