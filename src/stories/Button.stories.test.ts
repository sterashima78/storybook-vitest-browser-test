import { composeStories, composeStory } from "@storybook/preview-api"
import { render } from '@testing-library/vue';
import * as Stories from "./Button.stories";
import { afterEach, describe, test } from "vitest";
import { h } from "vue";
const stories = composeStories(Stories, {
    render:(props,{component})=> h(component,props),
}, composeStory)

describe(Stories.default.title, ()=> {
    Object.entries(stories).forEach(([title, story]) => {
        let canvas: ReturnType<typeof render>
        test(title, async ()=> {
            canvas = render(story)
            await canvas.findByRole("button")
        })
        afterEach(()=> {
            canvas?.unmount()
        })
    })
})
