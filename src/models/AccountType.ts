enum AccountType {
  SAVING = 'Savings',
  CHEQUING = 'Chequing',
  LOAN = 'Loan',
  CASH = 'Cash',
  GENERAL = 'General',
}

namespace AccountType {
  export function parse(value: string): AccountType {
    return (Object.values(AccountType) as string[]).includes(value)
      ? (value as AccountType)
      : AccountType.SAVING;
  }
}

export default AccountType;
