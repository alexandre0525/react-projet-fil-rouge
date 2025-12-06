import { useEffect, useState } from "react"
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
    texte: "Que représente le X dans JSX ?",
    choix: ["XML", "XHTML", "Extend"],
    bonneReponse: "XML",
  },
  {
    texte: "Quel hook est utilisé pour gérer des états dans un composant ?",
    choix: ["useEffect", "useState", "useContext"],
    bonneReponse: "useState",
  },
  {
    texte: "Quel hook s'exécute après le rendu du composant ?",
    choix: ["useAfter", "useEffect", "useRender"],
    bonneReponse: "useEffect",
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
    texte: "Quelle commande permet de lancer le projet en mode développement ?",
    choix: ["npm start", "npm run dev", "npm run build"],
    bonneReponse: "npm run dev",
  },
  {
    texte: "Quel mot-clé permet d'exporter un composant React ?",
    choix: ["expose", "export default", "module.export"],
    bonneReponse: "export default",
  },
]

function formatTemps(secondes) {
  const m = Math.floor(secondes / 60)
  const s = secondes % 60
  const mm = String(m).padStart(2, "0")
  const ss = String(s).padStart(2, "0")
  return `${mm}:${ss}`
}

function App() {
  const [indexQuestion, setIndexQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [termine, setTermine] = useState(false)
  const [reponseChoisie, setReponseChoisie] = useState(null)
  const [bonne, setBonne] = useState(null)
  const [tempsRestant, setTempsRestant] = useState(60)

  const questionActuelle = questions[indexQuestion]

  useEffect(() => {
    if (termine) {
      return
    }

    const id = setInterval(() => {
      setTempsRestant(t => {
        if (t <= 1) {
          clearInterval(id)
          setTermine(true)
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(id)
  }, [termine])

  function gererChoix(reponse) {
    if (reponseChoisie || termine) {
      return
    }

    setReponseChoisie(reponse)

    const estBonne = reponse === questionActuelle.bonneReponse
    setBonne(estBonne)

    if (estBonne) {
      setScore(score + 1)
    }

    setTimeout(() => {
      const prochaineQuestion = indexQuestion + 1
      if (prochaineQuestion < questions.length && tempsRestant > 0) {
        setIndexQuestion(prochaineQuestion)
        setReponseChoisie(null)
        setBonne(null)
      } else {
        setTermine(true)
      }
    }, 900)
  }

  function recommencer() {
    setIndexQuestion(0)
    setScore(0)
    setTermine(false)
    setReponseChoisie(null)
    setBonne(null)
    setTempsRestant(60)
  }

  return (
    <div className="app">
      <Header />
      <Accueil />
      <div className="infos">
        <p className="score">
          Score : {score} / {questions.length}
        </p>
        <p className="timer">Temps restant : {formatTemps(tempsRestant)}</p>
      </div>
      {termine ? (
        <div className="resultat">
          <h2>Quiz terminé</h2>
          <p>
            Tu as obtenu {score} point(s) sur {questions.length}.
          </p>
          {tempsRestant === 0 && <p>Le temps est écoulé.</p>}
          <button type="button" onClick={recommencer}>
            Rejouer
          </button>
        </div>
      ) : (
        <>
          <Question texte={questionActuelle.texte} />
          <ChoixReponse
            choix={questionActuelle.choix}
            onChoisir={gererChoix}
            reponseChoisie={reponseChoisie}
            bonneReponse={questionActuelle.bonneReponse}
            bloque={Boolean(reponseChoisie)}
          />
          {bonne === true && <p className="feedback bonne-texte">Bonne réponse</p>}
          {bonne === false && <p className="feedback mauvaise-texte">Mauvaise réponse</p>}
        </>
      )}
      <Footer />
    </div>
  )
}

export default App
