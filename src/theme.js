const colors = require('@material-ui/core/colors');
const { createMuiTheme } = require('@material-ui/core/styles');
const { blue, grey, amber } = colors;

const defaultTheme = {
    typography: {
        useNextVariants: true
    },
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary: blue,
        secondary: amber
    },
    alternateTextColor: grey[50]
};

const adminTheme = createMuiTheme(Object.assign(defaultTheme, {}));

module.exports = { adminTheme };
