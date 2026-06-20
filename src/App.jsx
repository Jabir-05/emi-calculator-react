import { useState } from 'react'
import EMIForm from './components/EMIForm.jsx'
import ResultCard from './components/ResultCard.jsx'

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

function calculateEMI({ loanAmount, annualRate, tenureYears }) {
  const months = Math.round(tenureYears * 12)
  const monthlyRate = annualRate / 12 / 100
  const monthlyEMI = monthlyRate === 0
    ? loanAmount / months
    : (loanAmount * monthlyRate * (1 + monthlyRate) ** months)
      / ((1 + monthlyRate) ** months - 1)
  const totalPayment = monthlyEMI * months

  return {
    monthlyEMI,
    totalInterest: Math.max(0, totalPayment - loanAmount),
    totalPayment,
    principal: loanAmount,
    months,
    annualRate,
  }
}

function App() {
  const [result, setResult] = useState(null)

  const interestShare = result
    ? (result.totalInterest / result.totalPayment) * 100
    : 0

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="EMI Ease home">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span>EMI<span>Ease</span></span>
        </a>
        <a
          className="hero-link"
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noreferrer"
        >
          Built for Digital Heroes
          <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="page-title">
          <div className="hero-copy">
            <span className="hero-kicker"><i /> Smart loan planning</span>
            <h1 id="page-title">Know your EMI.<br /><em>Plan with clarity.</em></h1>
            <p>Calculate your monthly instalment, total interest, and repayment amount in seconds.</p>
            <div className="trust-row" aria-label="Calculator benefits">
              <span><b aria-hidden="true">✓</b> Free to use</span>
              <span><b aria-hidden="true">✓</b> Instant results</span>
              <span><b aria-hidden="true">✓</b> No sign-up</span>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="visual-glow" />
            <div className="mini-card mini-card--back">
              <span>Loan health</span>
              <strong>Excellent</strong>
              <div><i /><i /><i /><i /></div>
            </div>
            <div className="mini-card mini-card--front">
              <div className="mini-card__head">
                <span>Monthly payment</span>
                <b>₹</b>
              </div>
              <strong>₹21,696</strong>
              <small>Estimated EMI</small>
              <div className="mini-chart">
                <i /><i /><i /><i /><i /><i /><i />
              </div>
            </div>
          </div>
        </section>

        <section className="calculator-section" aria-label="EMI calculator">
          <div className="calculator-panel">
            <EMIForm onCalculate={(values) => setResult(calculateEMI(values))} onReset={() => setResult(null)} />

            <div className="results-panel" aria-live="polite">
              <div className="results-heading">
                <div>
                  <span className="eyebrow">Your estimate</span>
                  <h2>Repayment summary</h2>
                </div>
                {result && <span className="result-status"><i /> Calculated</span>}
              </div>

              {result ? (
                <>
                  <div className="results-grid">
                    <ResultCard
                      label="Monthly EMI"
                      value={currencyFormatter.format(result.monthlyEMI)}
                      note="Payable every month"
                      accent
                    />
                    <ResultCard
                      label="Total interest"
                      value={currencyFormatter.format(result.totalInterest)}
                      note={`At ${result.annualRate}% annual rate`}
                    />
                    <ResultCard
                      label="Total payment"
                      value={currencyFormatter.format(result.totalPayment)}
                      note={`Across ${result.months} months`}
                    />
                  </div>

                  <div className="breakdown-card">
                    <div
                      className="donut-chart"
                      style={{ '--interest-share': `${interestShare}%` }}
                      aria-label={`${interestShare.toFixed(1)}% interest and ${(100 - interestShare).toFixed(1)}% principal`}
                    >
                      <span><strong>{interestShare.toFixed(0)}%</strong> interest</span>
                    </div>
                    <div className="breakdown-copy">
                      <h3>Payment breakdown</h3>
                      <div className="legend-row">
                        <span><i className="legend-principal" />Principal</span>
                        <strong>{currencyFormatter.format(result.principal)}</strong>
                      </div>
                      <div className="legend-row">
                        <span><i className="legend-interest" />Interest</span>
                        <strong>{currencyFormatter.format(result.totalInterest)}</strong>
                      </div>
                    </div>
                  </div>
                  <p className="estimate-note">This is an estimate. Your lender's EMI may vary due to fees, rounding, or rate changes.</p>
                </>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon" aria-hidden="true">
                    <span>₹</span>
                  </div>
                  <h3>Your results will appear here</h3>
                  <p>Fill in your loan details and select “Calculate EMI” to view a complete repayment breakdown.</p>
                  <div className="empty-lines" aria-hidden="true"><i /><i /><i /></div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="formula-section" aria-labelledby="formula-title">
          <div>
            <span className="eyebrow">Transparent by design</span>
            <h2 id="formula-title">How we calculate your EMI</h2>
            <p>We use the standard reducing-balance formula used by banks and financial institutions.</p>
          </div>
          <div className="formula-card">
            <div className="formula">EMI = <span>P × R × (1 + R)<sup>N</sup></span><i /><span>(1 + R)<sup>N</sup> − 1</span></div>
            <div className="formula-key">
              <span><b>P</b> Principal amount</span>
              <span><b>R</b> Monthly interest rate</span>
              <span><b>N</b> Tenure in months</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <a className="brand brand--footer" href="#top">
            <span className="brand-mark" aria-hidden="true"><span /></span>
            <span>EMI<span>Ease</span></span>
          </a>
          <p>A simple, private tool for smarter borrowing decisions.</p>
        </div>
        <div className="developer-info">
          <span>Developed by Jabir Imteyaz</span>
          <a href="mailto:jabirimteyaz123@gmail.com">jabirimteyaz123@gmail.com</a>
        </div>
        <a
          className="footer-heroes"
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noreferrer"
        >
          Built for Digital Heroes <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </div>
  )
}

export default App
