const fs = require('fs')
const path = require('path')

/**
 * Heuristically find the frontend directory within the repository workspace.
 * Strategy:
 * - Start from the current package root (two levels above this file)
 * - Walk up to 3 parent levels
 * - For each parent, examine its child directories and pick the first
 *   directory that looks like a React frontend (contains package.json and src/ or public/index.html)
 */
function findFrontendDir() {
  const start = path.resolve(__dirname, '..', '..') // package root (campusdao-blockchain)
  let current = start
  for (let depth = 0; depth <= 3; depth++) {
    try {
      // Check explicit candidate inside current (e.g., ./frontend)
      const explicit = path.join(current, 'frontend')
      if (fs.existsSync(explicit) && fs.statSync(explicit).isDirectory()) {
        if (looksLikeFrontend(explicit)) return explicit
      }

      // Examine sibling directories (children of the parent)
      const parent = path.dirname(current)
      const entries = fs.readdirSync(parent, { withFileTypes: true })
      for (const e of entries) {
        if (!e.isDirectory()) continue
        const candidate = path.join(parent, e.name)
        if (looksLikeFrontend(candidate)) return candidate
      }

      // Move up one directory for next iteration
      current = parent
    } catch (e) {
      // ignore and continue
    }
  }
  return null
}

function looksLikeFrontend(dir) {
  try {
    const pkg = path.join(dir, 'package.json')
    const src = path.join(dir, 'src')
    const publicIndex = path.join(dir, 'public', 'index.html')
    if (fs.existsSync(pkg)) {
      // Quick content check: package.json contains react or vite or next
      const data = fs.readFileSync(pkg, 'utf8')
      if (/react|vite|next|create-react-app/i.test(data)) return true
    }
    if (fs.existsSync(src) && fs.statSync(src).isDirectory()) return true
    if (fs.existsSync(publicIndex)) return true
    return false
  } catch (e) {
    return false
  }
}

function getFrontendEnvPath() {
  const dir = findFrontendDir()
  if (!dir) return null
  return path.join(dir, '.env')
}

function ensureEnvHasContractAddress(envPath, address) {
  let contents = ''
  if (fs.existsSync(envPath)) {
    contents = fs.readFileSync(envPath, 'utf8')
    if (/REACT_APP_CONTRACT_ADDRESS=/.test(contents)) {
      contents = contents.replace(/REACT_APP_CONTRACT_ADDRESS=.*/g, `REACT_APP_CONTRACT_ADDRESS=${address}`)
    } else {
      if (contents.trim().length > 0) contents = contents.trim() + '\n'
      contents = contents + `REACT_APP_CONTRACT_ADDRESS=${address}\n`
    }
  } else {
    // Create parent dir if needed
    const dir = path.dirname(envPath)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    contents = `REACT_APP_CONTRACT_ADDRESS=${address}\n`
  }
  fs.writeFileSync(envPath, contents, 'utf8')
}

module.exports = {
  findFrontendDir,
  getFrontendEnvPath,
  ensureEnvHasContractAddress,
}
