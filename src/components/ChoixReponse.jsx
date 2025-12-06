function ChoixReponse({ choix, onChoisir }) {
  return (
    <ul>
      {choix.map(item => (
        <li key={item}>
          <button type="button" onClick={() => onChoisir(item)}>
            {item}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default ChoixReponse
