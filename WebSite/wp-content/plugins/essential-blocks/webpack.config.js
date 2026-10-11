const { resolve, basename } = require("path");
const getEntries = require("./.config/getEntries");
const getModuleEntries = require("./.config/getModuleEntries");
const getAssetsEntries = require("./.config/getAssetsEntries");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const { getWebpackEntryPoints } = require("@wordpress/scripts/utils");
const ImportValidationPlugin = require("./.config/import-validation-plugin");

const plugins = defaultConfig.plugins.filter(
    (plugin) =>
        plugin.constructor.name != "MiniCssExtractPlugin" &&
        plugin.constructor.name != "CleanWebpackPlugin",
);

const EDITOR_CONTROL_NAME = process?.env?.EDITOR_CONTROL_NAME ?? "EBControls";
const FRONTEND_CONTROL_NAME =
    process?.env?.FRONTEND_CONTROL_NAME ?? "eb_frontend";

const sourceFolder = __dirname + "/src";
const blocksFolder = __dirname + "/src/blocks";
const ignoreBlocks = [];
const blockEntries = getEntries(blocksFolder, false, ignoreBlocks);

const blockFrontEndEntries = getEntries(blocksFolder, true);

const cssEntries = getAssetsEntries(__dirname + "/src/assets/css", "css");
const jsEntries = getAssetsEntries(__dirname + "/src/assets/js", "js", [], ".js");
const blockStylesEntries = getAssetsEntries(__dirname + "/src/blocks/", "blocks", ["editor.scss"], ".scss");

let allEntries = {
    // Controls
    "admin/controls/controls": {
        import: [
            "./src/admin/pro-block-register.js",
            "./src/controls/src/index.js",
        ],
        library: {
            name: EDITOR_CONTROL_NAME,
            type: "window",
        },
    },
    "admin/controls/frontend-controls": {
        import: "./src/controls/frontend/index.js",
        library: {
            name: FRONTEND_CONTROL_NAME,
            type: "window",
        },
    },
    // Blocks FrontEnd
    ...blockFrontEndEntries,
    // Advanced Video: React-free runtime for self-hosted files rendered as a
    // native <video> by AdvancedVideo::render_callback(). A second frontend
    // entry for one block, so it can't come from getEntries (frontend.js only).
    "blocks/advanced-video/native": "./src/blocks/advanced-video/src/native.js",
    "admin/global-styles/global-styles": "./src/global-styles/index.js",
    "admin/global-styles/copy-paste-styles": "./src/global-styles/copy-paste-styles.js",
    // Blocks Backend
    "admin/editor/editor": Object.values(blockEntries),
    // Blocks Frontend Combined
    "admin/editor/frontend": Object.values(blockStylesEntries),

    // Admin Assets
    "admin/dashboard/admin": "./src/admin/dashboard/index.js",
    "admin/quick-setup/index": "./src/admin/quick-setup/index.js",
    "admin/pointer-notices/pointer-notices": "./src/admin/pointer-notices/index.js",
    "admin/store/store": "./src/store/index.js",
    ...getModuleEntries("./src/modules", "modules", __dirname),

    // Assets Generation (./src/assets)
    ...cssEntries,
    ...jsEntries,
    // Block-wise style.css
    ...blockStylesEntries,
};

console.log("Blocks Count:", Object.values(blockEntries).length);

/**
 * This gets import under a global object we assigned.
 * i.e: This -> import { Something } from '~essential-blocks/controls';
 * will converted to const { Something } = window.EBControls;
 */
const controlsExternals = [
    // List of controls sub-directory if you want
].reduce(
    (externals, name) => ({
        ...externals,
        [`@essential-blocks/controls/${name}`]: `${EDITOR_CONTROL_NAME}.${name}`,
    }),
    {
        "@essential-blocks/controls": EDITOR_CONTROL_NAME,
    },
);

/**
 * Filtering out OLD SVGR rules from the existing rule set.
 */
const rules = defaultConfig.module.rules.filter((rule) => {
    return !rule.use?.includes("@svgr/webpack");
});

const blocksNameRegex = /\/essential-blocks\/src\/(blocks\/[\w-]+)\//;

const config = {
    ...defaultConfig,
    entry: allEntries,
    output: {
        path: resolve(__dirname, "assets"),
        filename: "[name].js",
    },
    plugins: [
        ...plugins,
        new RemoveEmptyScriptsPlugin(),
        // Copy block.json file into assets/blocks/[name]/block.json
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: blocksFolder + "/**/block.json",
                    to: `./blocks`,
                    toType: "dir",
                    context: blocksFolder,
                },
                {
                    from: "**/*.svg",
                    to: (pathData) => {
                        const match =
                            pathData.absoluteFilename.match(blocksNameRegex);
                        return `./${match[1]}/icon.svg`;
                    },
                    toType: "file",
                    context: blocksFolder,
                    filter: (resourcePath) => {
                        return basename(resourcePath) === "icon.svg";
                    },
                },
                {
                    from: "**/*",
                    to: `./fonts`,
                    toType: "dir",
                    context: sourceFolder + "/assets/fonts",
                },
                {
                    from: "**/*.css",
                    to: `./css`,
                    toType: "dir",
                    context: sourceFolder + "/assets/vendors/css",
                },
                {
                    from: "**/*.js",
                    to: `./js`,
                    toType: "dir",
                    context: sourceFolder + "/assets/vendors/js",
                },
                {
                    from: "./fontawesome",
                    to: `./fontawesome`,
                    toType: "dir",
                    context: sourceFolder + "/assets",
                },
                {
                    from: "./images",
                    to: `./images`,
                    toType: "dir",
                    context: sourceFolder + "/assets",
                },
                // Monaco for the Custom CSS editor, served from the plugin instead of
                // a CDN (WP.org Guideline 8). Only the CSS language is used, so the
                // TypeScript / HTML / JSON workers are left out.
                {
                    from: "**/*",
                    to: `./vendors/monaco/vs`,
                    toType: "dir",
                    context: resolve(__dirname, "node_modules/monaco-editor/min/vs"),
                    globOptions: {
                        ignore: [
                            "**/assets/ts.worker-*.js",
                            "**/assets/html.worker-*.js",
                            "**/assets/json.worker-*.js",
                            // Only the English UI strings are used (no locale is configured).
                            "**/nls.messages.*.js.js",
                        ],
                    },
                },
                // dotLottie player WASM, served locally instead of jsdelivr/unpkg.
                {
                    from: resolve(__dirname, "node_modules/@lottiefiles/dotlottie-web/dist/dotlottie-player.wasm"),
                    to: `./vendors/dotlottie/dotlottie-player.wasm`,
                    toType: "file",
                },
            ],
            options: {
                concurrency: 50,
            },
        }),
        new MiniCSSExtractPlugin({
            filename: ({ chunk }) => {
                return "[name].css";
                // return `${chunk.name.replace("/js/", "/css/")}.css`;
            },
        }),
        // Add import validation plugin for build-time import checking
        new ImportValidationPlugin({
            failOnError: true, // Set to true to fail build on import errors
            checkUnusedImports: true
        }),
    ],
    module: {
        ...defaultConfig.module,
        rules: [
            ...rules,
            // Rewrite react-player's hls.js / dash.js / flv.js CDN fallbacks to
            // the plugin's local copies (WP.org Guideline 8).
            {
                test: /[\\/]node_modules[\\/]react-player[\\/]lib[\\/]players[\\/]FilePlayer\.js$/,
                loader: resolve(__dirname, ".config/local-streaming-sdk-loader.js"),
            },
            // Rewrite Monaco's and dotLottie's CDN defaults to the local copies
            // in assets/vendors/ (WP.org Guideline 8).
            {
                test: /[\\/]node_modules[\\/]@monaco-editor[\\/]loader[\\/]lib[\\/](es|cjs)[\\/]config[\\/]index\.js$/,
                loader: resolve(__dirname, ".config/local-cdn-defaults-loader.js"),
                options: { preset: "monaco" },
            },
            {
                test: /[\\/]node_modules[\\/]@lottiefiles[\\/]dotlottie-web[\\/]dist[\\/]index\.(js|cjs)$/,
                loader: resolve(__dirname, ".config/local-cdn-defaults-loader.js"),
                options: { preset: "dotlottie" },
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                type: "asset/resource",
                generator: {
                    filename: (pathData, assetInfo) => {
                        /**
                         * This helps to generate images into respective blocks folder.
                         * if it is imported from the block itself.
                         */
                        const match =
                            pathData.module.resource.match(blocksNameRegex);

                        if (match !== null && match?.[1] !== undefined) {
                            return `${match[1]}/images/[name][ext]`;
                        }

                        return "images/[name][ext]";
                    },
                },
            },
            {
                test: /\.svg$/,
                issuer: /\.(j|t)sx?$/,
                use: [
                    {
                        loader: "@svgr/webpack",
                        options: {
                            // this helps to import/render .svg file into [blocks]/index.js as icon
                            icon: true,
                        },
                    },
                    "url-loader",
                ],
                type: "javascript/auto",
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module, chunks, cacheGroupKey) {
                        const packageName = module.context.match(
                            /.*[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                        )?.[1];
                        if (packageName === "@babel") {
                            return `vendors/js/bundle.${packageName.replace(
                                "@",
                                "",
                            )}`;
                        }
                        // if (packageName === "react-slick") {
                        //     return `vendors/js/react-slick`;
                        // }
                        return `vendors/js/bundles`;
                    },
                    chunks: "all",
                },
            },
        },
    },
    resolve: {
        ...defaultConfig.resolve,
        alias: {
            ...defaultConfig.resolve.alias,
            "@essential-blocks/controls": resolve(
                __dirname,
                "./src/controls/src",
            ),
            "@essential-blocks": resolve(__dirname, "./src"),
        },
    },
    externals: {
        react: "React",
        "react-dom": "wp.element",
        ...controlsExternals,
    },
};

module.exports = config;
