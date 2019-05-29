import { 
  calculateProductPrice,
  formatPrice,
  calculateCommuterPrice,

} from '../pricing'
import { medical, voluntaryLife, longTermDisability, commuter } from './products'
import { employee } from './employee'
import chai, { expect } from 'chai'
import { describe, it } from 'mocha'
// import { spy } from 'sinon'
// import 

describe('pricing', () => {
  describe ('formatPrice', () => {
    it('returns the price given, truncating it to 2 decimals', () => {
      const price = formatPrice(16.999)
    
      expect(price).to.equal(16.99)
    })
  })

  describe('calculateCommuterPrice', () => {
    it('returns the price for a commuter product for someone who is parking', () => {
      const selectedOptions = { transport: 'parking' }
      const price = calculateCommuterPrice(commuter, employee, selectedOptions)
      expect(price).to.equal(250) 
    })
    it('returns the price for a commuter product for someone who is riding the train', () => {
      const selectedOptions = { transport: 'train' }
      const price = calculateCommuterPrice(commuter, employee, selectedOptions)
      expect(price).to.equal(84.75) 
    })
  })


  describe('calculateProductPrice', () => {
    it('returns the price for a medical product for a single employee', () => {
      const selectedOptions = { familyMembersToCover: ['ee'] }
      const price = calculateProductPrice(medical, employee, selectedOptions)

      expect(price).to.equal(19.26)
    })

    it('returns the price for a medical product for an employee with a spouse', () => {
      const selectedOptions = { familyMembersToCover: ['ee', 'sp'] }
      const price = calculateProductPrice(medical, employee, selectedOptions)

      expect(price).to.equal(21.71)
    })

    it('returns the price for a medical product for an employee with a spouse and one child', () => {
      const selectedOptions = { familyMembersToCover: ['ee', 'sp', 'ch'] }
      const price = calculateProductPrice(medical, employee, selectedOptions)

      expect(price).to.equal(22.88)
    })

    it('returns the price for a voluntary life product for a single employee', () => {
      const selectedOptions = {
        familyMembersToCover: ['ee'],
        coverageLevel: [{ role: 'ee', coverage: 125000 }],
      }
      const price = calculateProductPrice(voluntaryLife, employee, selectedOptions)

      expect(price).to.equal(39.37)
    })

    it('returns the price for a voluntary life product for an employee with a spouse', () => {
      const selectedOptions = {
        familyMembersToCover: ['ee', 'sp'],
        coverageLevel: [
          { role: 'ee', coverage: 200000 },
          { role: 'sp', coverage: 75000 },
        ],
      }
      const price = calculateProductPrice(voluntaryLife, employee, selectedOptions)

      expect(price).to.equal(71.09)
    })

    it('returns the price for a disability product for an employee', () => {
      const selectedOptions = {
        familyMembersToCover: ['ee']
      }
      const price = calculateProductPrice(longTermDisability, employee, selectedOptions)

      expect(price).to.equal(22.04)
    })

    it('throws an error on unknown product type', () => {
      const unknownProduct = { type: 'vision' }

      expect(() => calculateProductPrice(unknownProduct, {}, {})).to.throw('Unknown product type: vision')
    })
  })
})
