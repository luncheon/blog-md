const marked = require('marked')
const hljs = require('highlight.js')
require('./hljs-mint')(hljs)

const renderer = new marked.Renderer()
renderer.link = (href, title, text) => `<a rel="noopener nofollow" target="_blank" href="${href}"${title ? ` title="${title}"` : ''} style="text-decoration: underline">${text}</a>`

module.exports = markdownContent => {
  return marked(markdownContent, {
    baseUrl: null,
    breaks: false,
    gfm: true,
    headerIds: false,
    headerPrefix: "",
    highlight: (code, language) => hljs.highlight(code, { language }).value,
    langPrefix: "hljs ",
    mangle: true,
    pedantic: false,
    renderer,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartLists: false,
    smartypants: false,
    tables: true,
    xhtml: false,
  }).replace(/<!--.+?-->\n?/g, '')
}
