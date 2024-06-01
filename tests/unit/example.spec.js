// If the sanity test doesn't pass, we know that there's a problem with the tool
// and not our code base.
// it === test
it('sanity test', () => {
  // test assertion: an expression that evaluates to either true or false
  expect(true).toBe(true);
});
// The purpose of a unit test is to test bits and pieces of our code in isolation.
