/* eslint-disable */
// import { mount } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';
/**
 * The main difference (mount & shallowMount) is it'll limit how many children components the instance may have.
 * The mount function will allow the component to load as many children as it wants.
 * The shallowMount function will limit the component to one level of children components.
 * If the child component of the component where mounting attempts to load additional components, they will not get loaded.
 * It's a useful method for isolating the components.
 * It'll prevent a test from returning a false positive.
 * This issue can occur if the children component contains the content we were checking for in the component we mounted.
 * 
 * For the rest of this course, we're going to use the shallowMount function whenever possible.
 * It's much faster and efficient than the mount function.
 * 
 * There is an alternative syntax for shallow mounting a component.
 * We can use the mount function to shallow mount a component.
*/

import About from '@/views/About.vue';

// We're going to write a test that will check if the component is rendering the text content inside it.
// This is a common test you may write.

// The described function allows us to group one or more tests together. This is what's called a test suite.
// Every time we write a new suite of tests, we'll wrap the tests with a described block.
describe('About.vue', () => {
  // The tests we're writing will check if the component renders the inner text we have in the template.
  test('renders inner text', () => {
    // before we can check if the text is present, we need to mount the component.
    const wrapper = shallowMount(About);
    // We expect the text (in about component) to contain the string 'about'.
    expect(wrapper.text()).toContain('about');
  });
});
