const packages = require("../exportPaths");
const [{ path }, { webEnvPath }, { rootAbsolutePath }] = [
    packages.libs,
    packages.env,
    packages.paths,
];

export const getWebCapabilities = () => {
    require("dotenv").config(
        {
            path: `${path.join(rootAbsolutePath, webEnvPath)}`,
        }
    );
    let baseUrl = process.env.WEB_URL
    switch (process.env.BROWSER) {
        case "CHROME":
            return {
                baseUrl: String(baseUrl),
                services: ["chromedriver"],
                capabilities: [
                    {
                        browserName: "chrome",
                        maxInstances: 5,
                        acceptInsecureCerts: true,
                        "goog:chromeOptions": {},
                    },
                ],
            };

        case "FIREFOX":
            return {
                baseUrl: baseUrl,
                services: ["geckodriver"],
                capabilities: [
                    {
                        browserName: "firefox",
                        maxInstances: 5,
                        acceptInsecureCerts: true,
                        "moz:firefoxOptions": {},
                    },
                ],
            };
    }
};
