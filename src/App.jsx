import { useState } from "react"
import "./App.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Accueil from "./components/Accueil"
import Question from "./components/Question"
import ChoixReponse from "./components/ChoixReponse"

const questions = [
  {
    texte: "Quelle technologie utilise ce projet ?",
    choix: ["React", "Vue", "Angular"],
    bonneReponse: "React",
  },
  {
    texte: "Quel outil a été utilisé pour créer ce projet ?",
    choix: ["Create React App", "Vite", "Next.js"],
    bonneReponse: "Vite",
  },
  {
    texte: "Dans quel langage ce projet est écrit ?",
    choix: ["Java", "TypeScript", "JavaScript"],
    bonneReponse: "JavaScript",
  },
  {
    texte: "Quelle méthode permet d'afficher un élément React dans la page ?",
    choix: ["ReactDOM.render()", "renderReact()", "mount()"],
    bonneReponse: "ReactDOM.render()",
  },
  {
    texte: "Quel hook est utilisé pour gérer des états dans un composant ?",
    choix: ["useEffect", "useState", "useContext"],
    bonneReponse: "useState",
  },
  {
    texte: "Que signifie JSX ?",
    choix: ["JavaScript XML", "JSON Extended Syntax", "Java Syntax Xpress"],
    bonneReponse: "JavaScript XML",
  },
  {
    texte: "Quel attribut permet d'appliquer une classe CSS en JSX ?",
    choix: ["className", "cssClass", "class"],
    bonneReponse: "className",
  },
  {
    texte: "React est principalement utilisé pour construire...",
    choix: ["des bases de données", "des interfaces utilisateurs", "des serveurs web"],
    bonneReponse: "des interfaces utilisateurs",
  },
  {
    texte: "Quel hook s'exécute après le rendu du composant ?",
    choix: ["useAfter", "useEffect", "useRender"],
    bonneReponse: "useEffect",
  },
  {
    texte: "Quel mot-clé permet d'exporter un composant React ?",
    choix: ["expose", "export default", "module.export"],
    bonneReponse: "export default",
  }
]


function App() {
  const [indexQuestion, setIndexQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [termine, setTermine] = useState(false)

  const questionActuelle = questions[indexQuestion]

  function gererChoix(reponse) {
    if (reponse === questionActuelle.bonneReponse) {
      setScore(score + 1)
    }

    const prochaineQuestion = indexQuestion + 1
    if (prochaineQuestion < questions.length) {
      setIndexQuestion(prochaineQuestion)
    } else {
      setTermine(true)
    }
  }

  function recommencer() {
    setIndexQuestion(0)
    setScore(0)
    setTermine(false)
  }

  return (
    <div className="app">
      <Header />
      <Accueil />
      <p className="score">Score : {score} / {questions.length}</p>
      {termine ? (
        <div className="resultat">
          <h2>Quiz terminé</h2>
          <p>Tu as obtenu {score} point(s) sur {questions.length}.</p>
          <button type="button" onClick={recommencer}>
            Rejouer
          </button>
        </div>
      ) : (
        <>
          <Question texte={questionActuelle.texte} />
          <ChoixReponse choix={questionActuelle.choix} onChoisir={gererChoix} />
        </>
      )}
      <Footer />
    </div>
  )
}

export default App
