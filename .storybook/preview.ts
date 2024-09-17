import type { Preview } from "@storybook/react";
import "../src/styles/style.scss";
import "../src/components/buttons/styled-button/StyledButton.scss";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
