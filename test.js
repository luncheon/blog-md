const assert = require('assert/strict')
const md2html = require('./md2html')
const html = md2html(`
# Hello
\`\`\`js
const x = 1
\`\`\`
`.trim());
assert.equal(html.trim(), '<h1>Hello</h1>\n<pre><code class="hljs js"><span class="hljs-keyword">const</span> x = <span class="hljs-number">1</span>\n</code></pre>')
