/* eslint-disable */
// If we look inside the SongItem component, we'll find that it isn't rendering static content.
// Everything is completely dynamic.
import SongItem from "@/components/SongItem.vue";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";
// The router link stub object is a fake component that mimics
// the behavior of the router link component without relying on the router library.

// We'll use the name of the component as the identifier.
describe("SongItem.vue", () => {
  test("render song.display_name", () => {
    const song = {
      display_name: "test",
    };

    // Passing Data to Components
    // The props data option is where we can add in props for the component.
    const wrapper = shallowMount(SongItem, {
      props: {
        song,
      },
      // The global property will allow us to register global components, plugins and mixins.
      global: {
        // We can register a component by adding the components object.
        components: {
          "router-link": RouterLinkStub,
        },
      },
    });

    // This function will return another wrapper object.
    // Select spesific element for find the author
    const compositionAuthor = wrapper.find(".text-gray-500");

    // This function (wrapper.text()) will return the entire text content of the component.
    // expect(wrapper.text()).toContain(song.display_name);

    // We'll update the test to make an exact match instead of a partial one. This will make an exact match comparison.
    expect(compositionAuthor.text()).toBe(song.display_name);
  });

  // Testing Attributes
  test("renders song.docID in id attribute", () => {
    const song = {
      docID: "abc",
    };

    const wrapper = shallowMount(SongItem, {
      props: {
        song,
      },
      global: {
        components: {
          "router-link": RouterLinkStub,
        },
      },
    });

    // The tests we're writing will check if the ID attribute is being set.
    // We'll need to provide the expected function with the ID in the component.
    // We can access the attributes by calling the attributes function on the wrapper object.
    // The attributes function returns an object of attributes in the component.
    // We can access any of the attributes in the object by their name. We'll access the ID attribute.
    // Next, we'll chain the toBe() function.
    // expect(wrapper.attributes().id).toBe(`song-id-${song.docID}`);

    // This time we'll pass it in the wrapper classes function.
    // The main difference is that the attributes function will return the attributes values as a string.
    // The classes function will take the time to convert the classes into an array.
    // The toContain() function can search both strings and arrays.
    // If the array contains the class we're passing in, it'll pass the tests.
    expect(wrapper.classes()).toContain(`song-id-${song.docID}`);

    // That's how you would test attributes in a component when writing tests for attributes, make sure it's
    // for dynamic attributes only if an attribute is static, there isn't a point in testing it.
  });
});

/**
 * You may be tempted to register the entire router plug in, but that's not considered good practice.
 * We don't care about the other features of the router plug in, we just want the router link component it defines.
 * Also, we don't even need the router link to be functional.
 * We're not testing if the router link works, our code is testing for something entirely different.
 *
 * We can do what's called stubbing, stubs are fake or dummy components.
 * They're a way to trick Vue into rendering a completely different component or element.
 *
 * The Vue Test Utilities Library comes with a predefined set of stubs for mimicking the most common components.
 * It has a stub for the router link component.
 *
 * We were able to fool our application by creating a fake component.
 * This is what's known as stubbing. Stubbing is something that you'll do frequently.
 * Keep in mind, we're trying to test bits and pieces of our application.
 * We don't want the whole app to be functional.
 * That's the purpose of a unit test.
 * Stubbing components is very common in unit tests.
 */
