# EMI Ease

A polished, responsive EMI calculator built for the Digital Heroes developer trial. It calculates monthly EMI, total interest payable, and total repayment using the standard reducing-balance formula.

## Features

- Accurate EMI calculation, including 0% interest loans
- Indian Rupee formatting
- Field-level validation with accessible error messages
- Responsive desktop, tablet, and mobile layouts
- Payment breakdown visualization
- Reset control and privacy-first, client-side calculation

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The generated `dist` directory can be deployed directly to Vercel. Use the Vite framework preset; no environment variables are required.

## Formula

```text
EMI = [P × R × (1 + R)^N] / [(1 + R)^N - 1]
```

- `P`: Principal loan amount
- `R`: Monthly interest rate (annual rate / 12 / 100)
- `N`: Loan tenure in months

## Project structure

```text
.
├── src/
│   ├── components/
│   │   ├── EMIForm.jsx
│   │   └── ResultCard.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

Developed by Jabir Imteyaz.
