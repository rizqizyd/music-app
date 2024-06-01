/* eslint-disable */
import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import SongItem from "@/components/SongItem.vue";

// The purpose of a snapshot is to check if a component is rendering fully.
// Unlike unit tests where you need to write multiple test blocks for a single component,
// most components will only need a single snapshot test.
describe("Snapshot SongItem.vue", () => {
  test("renders correctly", () => {
    const song = {
      docID: "abc",
      modified_name: "test",
      display_name: "test",
      comment_count: 5,
    };

    const wrapper = shallowMount(SongItem, {
      propsData: { song },
      global: {
        components: {
          "router-link": RouterLinkStub,
        },
      },
    });

    /**
     * it'll compare the snapshot it's generated with an existing snapshot.
     * If a previous snapshot doesn't exist. It'll create a file with the snapshot it generated.
     * The file will be saved in a special directory.
     * If a snapshot does exist, it'll compare the generated snapshot with the previous snapshot.
     * The test will pass if the snapshots match.
     */
    expect(wrapper.element).toMatchSnapshot();
  });
});
