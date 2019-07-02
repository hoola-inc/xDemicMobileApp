jest.mock('xdemic/lib/utilities/analytics', () => {
  return {
    identify: () => ({}),
    screen: () => ({}),
    track: () => true
  }
})
