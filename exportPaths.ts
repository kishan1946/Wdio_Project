// ===================================================================================================================

//                                      EXPORTS PATH MODULE - TO BE USED, NOT TO BE MODIFIED
//
// This module has just the common paths or exports from other modules or the global packages
// Just import / require this module any where in the framework, and use other modules without exporting them separately
// The main reason of this pattern is to avoid explicit imports or require statements within the modules
// Never add the module, that exports itself as it results in CIRCULAR DEPENDENCY ERROR

// Eg: When we add any of the modules within the config dir, results in circular dependency, as they export themselves
//     config/wdio.common.config.js -> exportPaths.js -> config/wdio.common.config.js

// How to use :-

// First import this module into the module in which this exports are to be used
//     >> const packages = require(<relative / absolute path pointing to this module>);
// Then we get what we what using destructuring concept in JS
//     >> const [ {MobileUtilities}, {path,fs,allure}, ... ] = [ packages.utilities, packages.libs, ... ]

// ===================================================================================================================

// Exporting the common paths
export const paths = {
    rootAbsolutePath: `${__dirname}`,
};

// Exporting the paths to environment variables
// Concatenate the following paths with root dir path ...
export const env = {
    commonEnvPath: "env/common.env",
    webEnvPath: "env/web.env",
    apiEnvPath: "env/api.env",
    browserstackEnvPath: "env/browserstack.env",
    mobileCommonEnvPath: "env/mobile.env",
};

// Exporting the npm packages
export const libs = {
    path: require("path"),
};