enum Currency {
  CAD = 'CAD',
}

namespace Currency {
  // Helper function to parse a string value to a Currency enum
  export function parse(value: string): Currency {
    return (Object.values(Currency) as string[]).includes(value)
      ? (value as Currency)
      : Currency.CAD;
  }
}

export default Currency;
