function ResultCard({ label, value, note, accent = false }) {
  return (
    <article className={`result-card${accent ? ' result-card--accent' : ''}`}>
      <div className="result-card__top">
        <span>{label}</span>
        <span className="result-card__dot" aria-hidden="true" />
      </div>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  )
}

export default ResultCard
