const { spawn } = require('child_process');
const { CSSResourcePlugin, CSSPlugin, EnvPlugin, FuseBox, QuantumPlugin, SassPlugin, Sparky } = require('fuse-box');


let isProduction = false;

let VENDOR_CSS = [
  "node_modules/@blueprintjs/core/lib/css/blueprint.css",
  "node_modules/antd/dist/antd.css",
  "node_modules/react-mosaic-component/react-mosaic-component.css",
  "node_modules/material-components-web/dist/material-components-web.min.css"
]

Sparky.task("copy-html", () => Sparky.src("src/app/index.html").dest("dist/app/$name"));
Sparky.task("copy-external-css", () => Sparky.src(VENDOR_CSS).dest("dist/app/assets/css/$name"));
Sparky.task("copy-fonts", () => Sparky.src("**/*.ttf", { base: "src/app/assets" }).dest("dist/app/assets"));


Sparky.task("build:desktop", () => {
        const fuse = FuseBox.init({
            homeDir: "src/desktop",
            output: "dist/desktop/$name.js",
            target: "electron@esnext",
            useTypescriptCompiler : true,
            cache: !isProduction,
            plugins: [
                EnvPlugin({ NODE_ENV: isProduction ? "production" : "development" }),
                isProduction && QuantumPlugin({
                    bakeApiIntoBundle: "desktop",
                    target: "server@esnext",
                    treeshake: true,
                    uglify: true,
                }),
            ],
        });

        const bundle = fuse
            .bundle("desktop")
            .target("server")
            .instructions("> [main.ts]");

        if (!isProduction) {
            bundle.watch();

            return fuse.run().then(() => {
                spawn('electron',[".", "--colors"],{ shell: true, stdio: "inherit" })
                .on('exit', () => process.exit(0))
            });
        }

        return fuse.run();
    });


Sparky.task("build:app", ["copy-html", "copy-external-css", "copy-fonts"], () => {
        const fuse = FuseBox.init({
            homeDir: "src/app",
            output: "dist/app/$name.js",
            target: "electron@esnext",
            useTypescriptCompiler : true,
            cache: !isProduction,
            plugins: [
                EnvPlugin({ NODE_ENV: isProduction ? "production" : "development" }),
                [/node_modules.*\.css$/,SassPlugin(), CSSResourcePlugin({inline: true}), CSSPlugin()],
                isProduction && QuantumPlugin({
                    bakeApiIntoBundle: "app",
                    target: "electron@esnext",
                    treeshake: true,
                    uglify: true,
                }),
            ],
        });

        if (!isProduction) {fuse.dev({port: 9696, httpServer: false,})}

        const bundle = fuse
            .bundle("app")
            .target("electron")
            .instructions("> [index.tsx] + fuse-box-css");

        if (!isProduction) {
            bundle
            .plugin([SassPlugin({importer: true}), CSSResourcePlugin(), CSSPlugin()])
            .plugin(CSSPlugin())
            .watch()
            .hmr();
        }


        return fuse.run();
    });

Sparky.task("clean:dist", () => Sparky.src("build/*").clean("dist/"));
Sparky.task("clean:cache", () => Sparky.src(".fusebox/*").clean(".fusebox/"));
Sparky.task("default", ["clean:build", "clean:cache", "build:app", "build:desktop"], () => { });

Sparky.task("set-prod-env", () => isProduction = true);
Sparky.task("build:production", ["set-prod-env", "default"], () => { });
