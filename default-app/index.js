const http = require('http')
const os = require('os')
const process = require('process')
const port = process.env.PORT || 3000

function row(label, value) {
  return `<tr><td class="label">${label}</td><td class="value">${value}</td></tr>`
}

function section(title, rows) {
  return `
    <h2>${title}</h2>
    <table>
      <tbody>${rows.join('')}</tbody>
    </table>`
}

function formatBytes(bytes) {
  const mb = bytes / 1024 / 1024
  return mb.toFixed(1) + ' MB'
}

function formatUptime(seconds) {
  const d = Math.floor(seconds / 86400)
  const h = Math.floor((seconds % 86400) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return [d && `${d}d`, h && `${h}h`, m && `${m}m`, `${s}s`].filter(Boolean).join(' ')
}

http.createServer((req, res) => {
  const mem = process.memoryUsage()
  const cpus = os.cpus()

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>nodeinfo()</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: monospace; font-size: 14px; background: #f0f0f0; color: #333; }

    header {
      background: linear-gradient(135deg, #215732, #3d8a4e);
      color: white;
      padding: 24px 32px;
    }
    header h1 { font-size: 28px; font-weight: bold; letter-spacing: 1px; }
    header p  { margin-top: 6px; opacity: 0.85; font-size: 13px; }

    main { max-width: 900px; margin: 32px auto; padding: 0 16px 64px; }

    h2 {
      background: #215732;
      color: white;
      padding: 6px 12px;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 28px;
    }

    table { width: 100%; border-collapse: collapse; background: white; }
    tr:nth-child(even) td { background: #f7f7f7; }
    td { padding: 7px 12px; border-bottom: 1px solid #e0e0e0; vertical-align: top; word-break: break-all; }
    td.label { width: 35%; font-weight: bold; color: #215732; }
    td.value { color: #333; }

    .banner {
      background: white;
      border-left: 4px solid #3d8a4e;
      padding: 14px 18px;
      margin-top: 28px;
      font-size: 13px;
      line-height: 1.7;
    }
    .banner strong { color: #215732; }
    code { background: #f0f0f0; padding: 1px 5px; border-radius: 3px; }
  </style>
</head>
<body>
  <header>
    <h1>nodeinfo()</h1>
    <p>Node.js Runner &mdash; default placeholder &mdash; ${new Date().toUTCString()}</p>
  </header>

  <main>
    <div class="banner">
      <strong>No app deployed yet.</strong> Upload your Node.js app to <strong>File Browser</strong>,
      run the <strong>Set App Path</strong> action, and restart the service.
      Your app must listen on <code>process.env.PORT</code>.
    </div>

    ${section('Node.js', [
      row('Version', process.version),
      row('V8 Engine', process.versions.v8),
      row('OpenSSL', process.versions.openssl),
      row('Architecture', process.arch),
      row('Platform', process.platform),
      row('Executable', process.execPath),
    ])}

    ${section('Process', [
      row('PID', process.pid),
      row('Uptime', formatUptime(process.uptime())),
      row('Heap Used', formatBytes(mem.heapUsed)),
      row('Heap Total', formatBytes(mem.heapTotal)),
      row('RSS', formatBytes(mem.rss)),
      row('External', formatBytes(mem.external)),
    ])}

    ${section('Environment', Object.entries(process.env).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => row(k, v)))}

    ${section('OS', [
      row('Hostname', os.hostname()),
      row('Type', os.type()),
      row('Release', os.release()),
      row('Total Memory', formatBytes(os.totalmem())),
      row('Free Memory', formatBytes(os.freemem())),
      row('Load Average', os.loadavg().map(n => n.toFixed(2)).join(' / ')),
      row('CPU', cpus.length ? `${cpus.length}× ${cpus[0].model}` : 'unknown'),
    ])}

    ${section('Request', [
      row('Method', req.method),
      row('URL', req.url),
      row('HTTP Version', req.httpVersion),
      ...Object.entries(req.headers).map(([k, v]) => row(k, v)),
    ])}
  </main>
</body>
</html>`

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  res.end(html)
}).listen(port, () => {
  console.log('nodeinfo() listening on port ' + port)
})
