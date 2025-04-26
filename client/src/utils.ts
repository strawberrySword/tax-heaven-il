export const calculateAnnualSavings = (
  rate: number,
  monthlyIncome: number,
  ceiling: number
): number => {
  const annualIncome = monthlyIncome * 12;
  const annualTax = calculateTax(annualIncome);
  const annualTaxSavings = Math.min(annualIncome, ceiling) * rate;

  return Math.min(annualTax, annualTaxSavings);
};

type TaxBracket = {
  min: number;
  max: number | null;
  rate: number;
};

const taxBrackets: TaxBracket[] = [
  { min: 0, max: 84120, rate: 0.1 },
  { min: 84121, max: 120720, rate: 0.14 },
  { min: 120721, max: 193800, rate: 0.2 },
  { min: 193801, max: 269280, rate: 0.31 },
  { min: 269281, max: 560280, rate: 0.35 },
  { min: 560281, max: 721560, rate: 0.47 },
  { min: 721561, max: null, rate: 0.5 },
];

const calculateTax = (income: number): number => {
  let tax = 0;

  for (const bracket of taxBrackets) {
    if (income > bracket.min) {
      const upperBound = bracket.max ?? income; // if max is null, no upper limit
      const taxableIncome = Math.min(income, upperBound) - bracket.min + 1;
      tax += taxableIncome * bracket.rate;
    } else {
      break;
    }
  }

  return tax;
};
