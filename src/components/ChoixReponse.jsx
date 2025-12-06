function ChoixReponse({ choix, onChoisir, reponseChoisie, bonneReponse, bloque }) {
  return (
    <ul>
      {choix.map(item => {
        let classe = ""

        if (reponseChoisie) {
          if (item === bonneReponse) {
            classe = "bonne"
          } else if (item === reponseChoisie) {
            classe = "mauvaise"
          } else {
            classe = "neutre"
          }
        }

        return (
          <li key={item}>
            <button
              type="button"
              onClick={() => onChoisir(item)}
              disabled={bloque}
              className={classe}
            >
              {item}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default ChoixReponse
