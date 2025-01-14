const BankAccount = require('../src/bank-account.js')
const Transaction = require('../src/transaction.js')
const Statement = require('../src/statement.js')

describe('BankAccount', () => {
    let bankAccount

    beforeEach(() => {
        bankAccount = new BankAccount()
    })

    it('customer can deposit money', () => {
        const expected = new Transaction('12/12/2012', 1000, 1000)
        const result = bankAccount.deposit('12/12/2012', 1000)
        expect(result).toEqual(expected)
    })

    it('customer can withdraw money', () => {
        bankAccount.deposit('10/12/2012', 1000)
        const expected = new Transaction('11/12/2012', -500, 500)
        const result = bankAccount.withdraw('11/12/2012', 500)
        expect(result).toEqual(expected)
    })

    it('customer cannot withdraw more than their available balance', () => {
        bankAccount.deposit('10/12/2012', 1000)
        const expected = 'You can only withdraw £1000'
        const result = bankAccount.withdraw('11/12/2012', 1100)
        expect(result).toEqual(expected)
    })

    it('customer can get the available balance', () => {
        bankAccount.deposit('10/12/2012', 1500)
        bankAccount.deposit('11/12/2012', 700)
        bankAccount.deposit('12/12/2012', 200)
        bankAccount.deposit('13/12/2012', 300)
        bankAccount.deposit('14/12/2012', -100)
        bankAccount.deposit('15/12/2012', -100)
        const expected = `Your current available balance is £2500`
        const result = bankAccount.getBalance()
        expect(result).toEqual(expected)
    })

    it('customer can get a list of transactions', () => {
        const expected =
        [
            bankAccount.deposit('10/12/2012', 1000),
            bankAccount.deposit('11/12/2012', 500),
            bankAccount.deposit('12/12/2012', 700)
        ]
        const result = bankAccount.getTransactions()
        expect(result).toEqual(expected)
    })

    it('customer can get a statement with one transaction', () => {
        bankAccount.deposit('10/12/2012', 1000)
        let statement = new Statement(bankAccount)
        const expected =
        `Your current available balance is £1000.\nThis is a list of your transactions:\n   Date    | Amount | Balance\n10/12/2012 | 1000 | 1000\n`
        const result = statement.getStatement()
        expect(result).toEqual(expected)
    })

    it('customer can get a statement with more transactions', () => {
        bankAccount.deposit('10/12/2012', 1000)
        bankAccount.deposit('11/12/2012', 500)
        bankAccount.deposit('12/12/2012', 75)
        bankAccount.deposit('13/12/2012', 125)
        bankAccount.withdraw('14/12/2012', 200)
        let statement = new Statement(bankAccount)
        const expected =
        `Your current available balance is £1500.\nThis is a list of your transactions:\n   Date    | Amount | Balance\n10/12/2012 | 1000 | 1000\n11/12/2012 | 500 | 1500\n12/12/2012 | 75 | 1575\n13/12/2012 | 125 | 1700\n14/12/2012 | -200 | 1500\n`
        const result = statement.getStatement()
        expect(result).toEqual(expected)
    })
})
