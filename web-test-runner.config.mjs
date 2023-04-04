import { esbuildPlugin } from "@web/dev-server-esbuild";
import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
    plugins: [esbuildPlugin({ ts: true, target: "auto" })],
    browsers: [
        playwrightLauncher({ product: 'chromium' }),
        playwrightLauncher({ product: 'firefox' }),
        playwrightLauncher({ product: 'webkit' }),
    ],
    testRunnerHtml: testFramework =>
        `<html>
        <head>
            <base href="/">
        </head>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`,
};