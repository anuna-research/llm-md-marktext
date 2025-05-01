### context >>>
marktext = "code2prompt ./docs --json"
electron  = "code2prompt ../electron/docs/api --exclude='**/structures/**' --include='*.md' --json"
architecture = "marktext-architecture.md"
electron-readme = "../electron/docs/README.md"
js-guide = "js-code-guide.md"
style-guide = "style-guide.md"
implementation = "implementation-plan.md"
marktext-main = "code2prompt src/main --json"
marktext-interface = "docs/dev/INTERFACE.md"
marktext-architecture = "docs/dev/ARCHITECTURE.md"
main-index = "src/main/index.js"
renderer-main = "src/renderer/main.js"
listen-for-main = "src/renderer/store/listenForMain.js"
llm-md-index = "src/renderer/llm-md/index.js"
build-script = ".electron-vue/build.js"
package-json = "package.json"


[llm-md]
tech-docs = "../llm-md/docs/tech-docs.txt"
