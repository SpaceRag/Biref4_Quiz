

//Déclaration Constante

const home: Element | null = document.querySelector("#Home")
const question: Element | null = document.querySelector("#questionBoard")
const goodResult: Element | null = document.querySelector("#goodResult")
const badResult: Element | null = document.querySelector("#badResult")
const end: Element | null = document.querySelector("#end")

const yesButton: Element | null = document.querySelector("#yesButton")
const continuButtonBad: Element | null = document.querySelector("#continuButtonBad")
const continuButtonGood: Element | null = document.querySelector("#continuButtonGood")
const retryButton: Element | null = document.querySelector("#retryButton")
const pseudo: Element | null = document.querySelector('#pseudo')
const btn1: Element | null = document.querySelector("#btn1")
const out1: Element | null = document.querySelector("#output")
const errorMessage: string = "Player Name"
// Déclaration variable 

let currentQuestionIndex = 0
let score: number = 0
let timer: number = 0
let username: string | null = null
// PART HOME

// USER PSEUDO INPUT

pseudo?.addEventListener("input", function (event: Event) {
    username = (event.target as HTMLInputElement).value
})

yesButton?.addEventListener("click", function (event: Event) {
    if (!username) {
        pseudo.value = errorMessage
        pseudo.style.color = "red"
    } else {
        // Quand le button "Let's Go !" est cliké par le user 
        home?.classList.remove("display")
        home?.classList.add("hidden")
        // afficher la section Questions
        question?.classList.remove("hidden")
        question?.classList.add("display")


        populateQuestion(data[currentQuestionIndex])

    }

})

// TIMER 

// function funcTrigeredByTimeOut(timer: number) {
//     console.log("time out!")
// }
// setTimeout(funcTrigeredByTimeOut, 3000)



// PART QUESTIONS

// Récupérer les questions 
// Récuperer les réponses 
// Rendre les réponse clickable 
const blocQuestion: Element | null = document.querySelector("#blocQuestion")
const Q1: Element | null = document.querySelector("#Q1")
Q1?.addEventListener("click", nextQuestion)
const Q2: Element | null = document.querySelector("#Q2")
Q2?.addEventListener("click", nextQuestion)
const Q3: Element | null = document.querySelector("#Q3")
Q3?.addEventListener("click", nextQuestion)
const Q4: Element | null = document.querySelector("#Q4")
Q4?.addEventListener("click", nextQuestion)

// Injécter les questions dans le bloc
// Injecter les réponses

function populateQuestion(question: question) {
    if (blocQuestion && Q1 && Q2 && Q3 && Q4) {
        blocQuestion.innerHTML = question.question
        Q1.innerHTML = question.reponseA
        Q2.innerHTML = question.reponseB
        Q3.innerHTML = question.reponseC
        Q4.innerHTML = question.reponseD

    }
}

// Si le user click sur la bonne réponse affiche section associé 
// Si le user click sur la mauvaise réponse affiche section associé 

function nextQuestion(event: Event) {
    const selectedAnswer = event.target.innerHTML
    const currentQuestion = data[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
        //incrémente le score de 1 quand la réponse user est correcte
        incrementScore(1)
        // Afficher la section Bonne réponse
        question?.classList.remove("display")
        question?.classList.add("hidden")
        goodResult?.classList.remove("hidden")
        goodResult?.classList.add("display")
    } else {
        // Afficher la section Mauvaise réponse
        question?.classList.remove("display")
        question?.classList.add("hidden")
        badResult?.classList.remove("hidden")
        badResult?.classList.add("display")
    }
}

// Affchage et incrémentation du Score 

function incrementScore(points: number) {
    score += points;
    let scoreElement = document.getElementById("score")
    if (scoreElement) {
        scoreElement.innerHTML = " " + score
    }
}


//  Quand le user click sur le button continuer 
//  passer a la question suivante

//Mauvaise Réponse 
continuButtonBad?.addEventListener("click", function (event: Event) {
    //Masquer la section "badResult"
    badResult?.classList.remove("display")
    badResult?.classList.add("hidden")
    // afficher la section Questions
    question?.classList.remove("hidden")
    question?.classList.add("display")

    //incrémenter dans le tableau data
    currentQuestionIndex++
    if (currentQuestionIndex < data.length) {
        populateQuestion(data[currentQuestionIndex])
        question?.classList.remove("hidden")
        question?.classList.add("display")
    } else {
        question?.classList.remove("display")
        question?.classList.add("hidden")
        end?.classList.remove("hidden")
        end?.classList.add("display")

    }


})


//Bonne réponse 
continuButtonGood?.addEventListener("click", function (event: Event) {
    // Masquer la section "goodResult"
    goodResult?.classList.remove("display")
    goodResult?.classList.add("hidden")
    // Afficher la section Questions 
    question?.classList.remove("hidden")
    question?.classList.add("display")

    //incrémenter dans le tableau data
    currentQuestionIndex++
    if (currentQuestionIndex < data.length) {
        populateQuestion(data[currentQuestionIndex])
        question?.classList.remove("hidden")
        question?.classList.add("display")
    } else {
        question?.classList.remove("display")
        question?.classList.add("hidden")
        end?.classList.remove("hidden")
        end?.classList.add("display")

    }

})

// PART END/SCORE

// Quand user click sur retryButton -> Affiche la popup
// Puis quand le bouton est cliké -> refresh la page

retryButton?.addEventListener("click", function (event: Event) {
    showPopup("La planète a besoin de vous !", "Je veux la protéger !");
})

function refresh() {
    // code pour rafraîchir la page
    location.reload()
}
// Création du html/css de la popup avec 'creatElement'
function showPopup(message: string, buttonText: string) {
    const popup = document.createElement("div")
    popup.style.position = "fixed"
    popup.style.top = "0"
    popup.style.left = "0"
    popup.style.width = "100%"
    popup.style.height = "100%"
    popup.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
    popup.style.display = "flex"
    popup.style.justifyContent = "center"
    popup.style.alignItems = "center"
    popup.style.background = "rgba(183, 182, 180, 0.504)"

    const content = document.createElement("div")
    content.style.backgroundColor = "white"
    content.style.padding = "20px"
    content.style.borderRadius = "10px"
    content.style.textAlign = "center"

    const text = document.createElement("p")
    text.textContent = message;
    text.style.marginBottom = "20px"

    const button = document.createElement("button")
    button.textContent = buttonText
    button.style.padding = "1rem"
    button.style.borderRadius = "20px"
    button.style.borderStyle = "none"
    button.style.boxShadow = " 5px 5px 5px rgba(0, 0, 0, 0.25)"
    // Quand le button est cliké par le user ->
    button.addEventListener("click", function () {
        refresh();
    });
    
    // Fait apparaitre la popup 
    content.appendChild(text)
    content.appendChild(button)
    popup.appendChild(content)
    document.body.appendChild(popup)

}



// TABLEAU DATA //

interface question {
    question: string,
    reponseA: string,
    reponseB: string,
    reponseC: string,
    reponseD: string,
    correctAnswer: string
}

const data: question[] = [
    {
        question: "Quel est le moyen de transport le plus écologique ?",
        reponseA: "Voiture électrique",
        reponseB: "Avion",
        reponseC: "Vélo",
        reponseD: "Bus",
        correctAnswer: 'Vélo'
    },
    {
        question: "Comment réduire sa consommation d'énergie à la maison ?",
        reponseA: "Éteindre les appareils en veille",
        reponseB: "Changer les ampoules",
        reponseC: "Installer des panneaux solaires",
        reponseD: "Tout éteindre en partant",
        correctAnswer: 'Éteindre les appareils en veille'
    },
    {
        question: "Quel est le principal gaz à effet de serre évité par l'agriculture biologique ?",
        reponseA: "Le méthane",
        reponseB: "Les gaz florés",
        reponseC: "Le dioxyde de carbone",
        reponseD: "Le protoxyde d'azote",
        correctAnswer: "Le protoxyde d'azote"
    },
    {
        question: "Quelle est la source d'énergie renouvelable la plus utilisée dans le monde ?",
        reponseA: "L'énergie solaire",
        reponseB: "L'énergie éolienne",
        reponseC: "L'hydroélectricité",
        reponseD: "La géothermie",
        correctAnswer: "L'hydroélectricité"
    },
    {
        question: "Comment réduire l'impact environnemental de son alimentation ?",
        reponseA: "Manger moins de viande",
        reponseB: "Acheter des produits locaux",
        reponseC: "Éviter le gaspillage alimentaire",
        reponseD: "Toutes les réponses sont correctes",
        correctAnswer: "Toutes les réponses sont correctes"
    },
    {
        question: "Comment réduire son empreinte carbone lors de ses déplacements ?",
        reponseA: "Prendre les transports en commun",
        reponseB: "Marcher ou faire du vélo",
        reponseC: "Privilégier les trajets courts",
        reponseD: "Jouer aux Jeux Vidéo",
        correctAnswer: "Jouer aux Jeux Vidéo"
    }


]


