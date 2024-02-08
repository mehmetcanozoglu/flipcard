const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("add-question-card");
const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-flashcard");
const closeBtn = document.getElementById("close-btn");
let editBool = false;

//Add question when user clicks 'Add Flashcard' button
addQuestion.addEventListener("click", () => {
    container.classList.add("hide")
    question.value = ""
    answer.value = ""
    addQuestionCard.classList.remove("hide")
});

closeBtn.addEventListener('click', (hideQuestion = () => {
    container.classList.remove('hide')
    addQuestionCard.classList.add('hide')
    if (editBool) {
        editBool = false
    }
}))

cardButton.addEventListener('click', (submitQuestion = () => {
    editBool = false
    tempQuestion = question.value.trim()
    tempAnswer = answer.value.trim()
    if (!tempQuestion || !tempQuestion) {
        errorMessage.classList.remove('hide')
    } else {
        container.classList.remove('hide')
        errorMessage.classList.add('hide')
        viewlist()
        answer.value = ""
        question.value = ""
    }
}))

function viewlist() {
let listCard = document.getElementsByClassName("card-list-container")
let div = document.createElement("div")
div.classList.add("card")    

div.innerHTML += `
<p class="question-div">${question.value}</p>
`
let displayAnswer = document.createElement("p")
displayAnswer.classList.add("answer-div", "hide")
displayAnswer.innerText = answer.value;

let link = document.createElement("a")
link.setAttribute("href", "#")
link.setAttribute("class", "show-hide-btn")
link.innerHTML = "Show/hide"
link.addEventListener("click", () =>{
    displayAnswer.classList.toggle("hide")
})

div.appendChild(link)
div.appendChild(displayAnswer)


  //Edit button
let buttonsCon = document.createElement("div")
buttonsCon.classList.add("buttons-con")
let editButton = document.createElement("button")
editButton.setAttribute("class", "edit")
editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
editButton.addEventListener('click', () => {
    editBool = true
    modifyElement(editButton, true)
    addQuestionCard.classList.remove("hide")
})
buttonsCon.appendChild(editButton)
disableButtons(false);


  //Delete Button
let deleteButton = document.createElement("button")
deleteButton.setAttribute("class", "delete")
deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton)
})
buttonsCon.appendChild(deleteButton)

div.appendChild(buttonsCon)
listCard[0].appendChild(div)
hideQuestion()
}

let modifyElement = (Element, edit = false) =>{
    let parentDiv = Element.parentElement.parentElement;
    let parentQuestion = parentDiv.querySelector(".question-div").innerText
    if(edit){
        let parentAns = parentDiv.querySelector('.answer-div').innerText
        question.value = parentQuestion
        answer.value = parentAns
        disableButtons(true)
    }
    parentDiv.remove()
}

disableButtons = (value) =>{
    let editButton = document.getElementsByClassName("edit")
    Array.from(editButton).forEach((Element) =>{
        Element.disabled = value
    })
}