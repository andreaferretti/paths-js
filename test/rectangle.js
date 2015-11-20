import Rectangle from '../dist/node/rectangle.js'
import expect from 'expect.js'

describe('rectangle shape', () => {
  it('should have four vertices', () => {
    let rectangle = Rectangle({
      left: 0,
      right: 5,
      top: 3,
      bottom: -1
    })
    expect(rectangle.path.points()).to.have.length(4)
  })

  it('should be made of straight lines', () => {
    let rectangle = Rectangle({
      left: 1,
      right: 3,
      top: 6,
      bottom: 2
    })
    expect(rectangle.path.print()).to.match(/L \d+ \d+ L \d+ \d+ L \d+ \d+/)
  })

  it('should be closed', () => {
    let rectangle = Rectangle({
      left: -3,
      right: 3,
      top: 6,
      bottom: 2
    })
    expect(rectangle.path.print()).to.match(/Z/)
  })

  it('should have center halfway between the sides', () => {
    let rectangle = Rectangle({
      left: 1,
      right: 9,
      top: 5,
      bottom: 1
    })
    expect(rectangle.centroid).to.eql([5, 3])
  })
})