import { useState } from 'react'

const initialValues = {
  loanAmount: '2500000',
  annualRate: '8.5',
  tenureYears: '20',
}

const fieldConfig = [
  {
    name: 'loanAmount',
    label: 'Loan amount',
    prefix: '₹',
    step: '10000',
    min: '1',
    max: '100000000',
    hint: 'Maximum ₹10 crore',
  },
  {
    name: 'annualRate',
    label: 'Annual interest rate',
    suffix: '%',
    step: '0.01',
    min: '0',
    max: '100',
    hint: '0% to 100% per year',
  },
  {
    name: 'tenureYears',
    label: 'Loan tenure',
    suffix: 'Years',
    step: '0.5',
    min: '0.5',
    max: '50',
    hint: '6 months to 50 years',
  },
]

function validate(values) {
  const errors = {}
  const amount = Number(values.loanAmount)
  const rate = Number(values.annualRate)
  const years = Number(values.tenureYears)

  if (values.loanAmount.trim() === '') {
    errors.loanAmount = 'Enter a loan amount.'
  } else if (!Number.isFinite(amount) || amount <= 0) {
    errors.loanAmount = 'Loan amount must be greater than ₹0.'
  } else if (amount > 100000000) {
    errors.loanAmount = 'Loan amount cannot exceed ₹10 crore.'
  }

  if (values.annualRate.trim() === '') {
    errors.annualRate = 'Enter an annual interest rate.'
  } else if (!Number.isFinite(rate) || rate < 0) {
    errors.annualRate = 'Interest rate cannot be negative.'
  } else if (rate > 100) {
    errors.annualRate = 'Interest rate cannot exceed 100%.'
  }

  if (values.tenureYears.trim() === '') {
    errors.tenureYears = 'Enter a loan tenure.'
  } else if (!Number.isFinite(years) || years <= 0) {
    errors.tenureYears = 'Loan tenure must be greater than 0.'
  } else if (years < 0.5 || years > 50) {
    errors.tenureYears = 'Choose a tenure between 0.5 and 50 years.'
  }

  return errors
}

function EMIForm({ onCalculate, onReset }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))

    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      onCalculate({
        loanAmount: Number(values.loanAmount),
        annualRate: Number(values.annualRate),
        tenureYears: Number(values.tenureYears),
      })
    }
  }

  const handleReset = () => {
    setValues(initialValues)
    setErrors({})
    onReset()
  }

  return (
    <form className="emi-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <span className="eyebrow">Loan details</span>
        <h2>Plan your repayment</h2>
        <p>Enter your loan details to see an instant repayment estimate.</p>
      </div>

      <div className="fields-grid">
        {fieldConfig.map((field) => {
          const error = errors[field.name]
          const hintId = `${field.name}-hint`
          const errorId = `${field.name}-error`

          return (
            <div className="field-group" key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <div className={`input-shell${error ? ' input-shell--error' : ''}`}>
                {field.prefix && <span className="input-affix input-affix--prefix">{field.prefix}</span>}
                <input
                  id={field.name}
                  name={field.name}
                  type="number"
                  inputMode="decimal"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={values[field.name]}
                  onChange={handleChange}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? errorId : hintId}
                />
                {field.suffix && <span className="input-affix input-affix--suffix">{field.suffix}</span>}
              </div>
              {error ? (
                <p className="field-message field-message--error" id={errorId} role="alert">
                  <span aria-hidden="true">!</span> {error}
                </p>
              ) : (
                <p className="field-message" id={hintId}>{field.hint}</p>
              )}
            </div>
          )
        })}
      </div>

      <div className="form-actions">
        <button className="button button--primary" type="submit">
          Calculate EMI
          <span className="button-arrow" aria-hidden="true">→</span>
        </button>
        <button className="button button--secondary" type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
      <p className="privacy-note">
        <span className="shield-icon" aria-hidden="true">✓</span>
        Your information stays in your browser and is never stored.
      </p>
    </form>
  )
}

export default EMIForm
