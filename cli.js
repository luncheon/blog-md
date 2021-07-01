#!/usr/bin/env node
const fs = require('fs')
const textlintEngine = new (require('textlint').TextLintEngine)()
const md2html = require('./md2html')

const compile = async inputFilename => {
  const markdownContent = fs.readFileSync(inputFilename, 'utf-8')
  const lintResults = await textlintEngine.executeOnText(markdownContent, '.md')
  console.warn(textlintEngine.formatResults(lintResults))

  const outputFilename = inputFilename.replace(/\.md$/, '') + '.html'
  const htmlContent = md2html(markdownContent)
  fs.writeFileSync(outputFilename, htmlContent.replace(/.+\n/, ''), 'utf-8')
  console.log(`[${new Date().toLocaleTimeString()}] compiled: ${outputFilename}`)
}

const watching = process.argv.includes('-w')
for (const inputFilename of process.argv.slice(2).filter(s => !s.startsWith('-'))) {
  compile(inputFilename)
  watching && fs.watch(inputFilename, event => event === 'change' && compile(inputFilename))
}
