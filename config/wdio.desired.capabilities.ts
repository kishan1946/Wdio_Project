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
    let browserOption;
    if(process.env.MODE == "HEAD"){
        browserOption = {}
    }else if(process.env.MODE == "HEADLESS" && process.env.BROWSER == "CHROME"){
        browserOption = {
            args: ['--headless', '--disable-gpu', '--disable-dev-shm-usage', '--no-sandbox']
        }
    }else if(process.env.MODE == "HEADLESS" && process.env.BROWSER == "FIREFOX"){
        browserOption = {
            args: ['-headless']
        }
    }
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
                        "goog:chromeOptions": browserOption,
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
                        "moz:firefoxOptions": browserOption,
                    },
                ],
            };
    }
};
