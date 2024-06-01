/* eslint-disable */
import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

// This is the component that is being looped through to generate the list.
// We'll pass it into the findAllComponents() function.
import SongItem from "@/components/SongItem.vue";

describe("Home.vue", () => {
  // call the test function inside the callback function of the described function
  test("renders list of songs", () => {
    // The component should generate three song item components based on the data of the home component.
    const songs = [{}, {}, {}];
    // We want to change these songs array above the function. We'll create a variable called songs.

    // mount the component if we want to test it, create a variable called component.
    // Its value will be the shallow mount function with the home component passed in.
    const component = shallowMount(Home, {
      // We're going to add an options object to the shallow mount function.
      // We can change the data in a component by adding the data function to the options object.
      data() {
        return {
          songs,
        };
      },
      // We can mock global functions by adding the mocks object.
      global: {
        // the mocks object allows us to define global variables and functions.
        // It's important to understand that this is not for adding methods to a component.
        // The functions you define in this object will act as global functions.
        mocks: {
          $t: message => message,
        },
      },
    });

    // We'll check if the component (home) is capable of rendering the correct number of songs.
    // in the home component, we have one data property called 'songs'.

    // The next step is to select the list of songs in the component below the shallow mount function.
    // Its value will be the value returned by the component.
    // The findAllComponents() function is similar to the query selector all function.
    // It will return an array of components it finds inside the component it's being called on.
    // It's specifically for selecting components, not regular HTML elements.
    const items = component.findAllComponents(SongItem);
    // The findAllComponents() function will search for all song item components in the home component.

    // We can begin to write the test assertion. Call the expected function.
    // We'll check if the items array is equal to the length of the songs array.
    expect(items).toHaveLength(songs.length);

    // We'll want to compare this value to its corresponding item in the array
    // they should both match, since the home component will loop through them in the order of their passed in
    items.forEach((wrapper, i) => {
      // chain the two function will pass in songs i.
      expect(wrapper.props().song).toStrictEqual(songs[i]);
    });
  });
});

/**
 * We're not going to rely on this request (http request) to add data to the array.
 * There are a couple of reasons why you don't want to send HTTP requests in a test.
 * The reason we're not doing so is because it can be unreliable if the request fails.
 * A request can fail because an API is down. If that's the case, our test will fail.
 * It's not our tests fault.
 * In addition, requests take a while to complete. We want our tests to run as fast as possible.
 * Lastly, we have no idea how much data will be returned.
 * It's easier to run a test when we know how many results we can expect.
 *
 * We can resolve this issue by using mock data.
 * Mock data is another way of saying dummy data. We're not going to use real data.
 * It's common for unit tests to use mock data because it's faster.
 */

/**
 * $t error because of i18n library
 * The library isn't registered because the component is being tested in isolation.
 * We have 2 options: we can register the plugin or mock the function.
 * We're going to mock the function because the test we're writing doesn't need the plug in to be completely available
 * Mocking is the process of creating a fake feature in our app.
 * We can mock functions, components, directives, almost anything.
 *
 * If the test requires a specific feature, we'll import it.
 * Otherwise, if it can be mocked, it should be mocked.
 */

/**
 * In this case, the reason we're not mocking the router link component is
 * because we're using the shallow mount function.
 * If our child components are using other components, they will not work,
 * nor will the test throw an error
 * The shallow mount function limits what children components can do.
 * Therefore, we don't need to mock the router link component.
 */
