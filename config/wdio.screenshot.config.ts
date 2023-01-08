// const packages = require("../exportPaths");
// const [{ path }, { CommonUtilities }, { commonEnvPath }, { rootAbsolutePath }] = [
//     packages.libs,
//     packages.utilities,
//     packages.env,
//     packages.paths,
// ];

// require("dotenv").config({
//     path: `${path.join(rootAbsolutePath, commonEnvPath)}`,
//     override: true,
// });

// // The reason of not using the exportsPath to get the modules and methods is
// // that it introduces the circular dependency
// const { bootTheAppSession } = require("../config/exception.handler.config");

// const date = new Date().toJSON();

// const config = {
//     afterStep: async function (test, context, { error, result, duration, passed, retries }) {
//         const screenshotsDirPath = path.resolve(__dirname, "..", "reports", "screenshots");
//         let fileName = test.text;
//         fileName = fileName.toLowerCase().replace(new RegExp("/", "g"), " ");

//         if (!passed) {
//             // saving the screen shot locally on failure
//             await CommonUtilities.checkAndCreateDir(screenshotsDirPath);
//             await driver.saveScreenshot(`${screenshotsDirPath}/${date}_${fileName}.png`);
//             // attach the screenshot to allure report on failure
//             await driver.takeScreenshot();

//             // The beneath snippet is used for the exceptional handling only in mobile
//             // In web the session is restarted for every scenario unlike in mobile
//             // This global.error is set only in exception handler for mobile
//             if (global.error === true) {
//                 await bootTheAppSession();
//                 global.error = false;
//             }
//         }
//     },
// };

// exports.config = config;
