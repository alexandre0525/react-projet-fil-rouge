import { useEffect, useState } from "react"
import "./App.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Accueil from "./components/Accueil"
import Question from "./components/Question"
import ChoixReponse from "./components/ChoixReponse"

const URL_API = "/questions.json"

function formatTemps(secondes) {
  const m = Math.floor(secondes / 60)
  const s = secondes % 60
  const mm = String(m).padStart(2, "0")
  const ss = String(s).padStart(2, "0")
  return `${mm}:${ss}`
}

function App() {
  const [questions, setQuestions] = useState([])
  const [enChargement, setEnChargement] = useState(true)
  const [erreur, setErreur] = useState(null)

  const [indexQuestion, setIndexQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [termine, setTermine] = useState(false)
  const [reponseChoisie, setReponseChoisie] = useState(null)
  const [bonne, setBonne] = useState(null)
  const [tempsRestant, setTempsRestant] = useState(60)

  const questionActuelle = questions[indexQuestion] || null

  useEffect(() => {
    setEnChargement(true)
    fetch(URL_API)
      .then(res => res.json())
      .then(data => {
        setQuestions(data)
        setIndexQuestion(0)
        setScore(0)
        setTermine(false)
        setReponseChoisie(null)
        setBonne(null)
        setTempsRestant(60)
        setErreur(null)
        setEnChargement(false)
      })
      .catch(() => {
        setErreur("Impossible de charger les questions pour le moment.")
        setEnChargement(false)
      })
  }, [])

  useEffect(() => {
    if (termine || enChargement || questions.length === 0) {
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
  }, [termine, enChargement, questions.length])

  function gererChoix(reponse) {
    if (!questionActuelle || reponseChoisie || termine) {
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

      {enChargement && <p>Chargement des questions...</p>}
      {erreur && <p className="erreur">{erreur}</p>}

      {!enChargement && !erreur && questions.length > 0 && (
        <>
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
              {bonne === true && (
                <p className="feedback bonne-texte">Bonne réponse</p>
              )}
              {bonne === false && (
                <p className="feedback mauvaise-texte">Mauvaise réponse</p>
              )}
            </>
          )}
        </>
      )}

      <Footer />
    </div>
  )
}

export default App
