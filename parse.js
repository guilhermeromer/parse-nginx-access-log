const fs = require('fs');
const readline = require('readline');
const path = require('path');
const xlsx = require('xlsx'); // Biblioteca para criar XLSX

// Regex para extrair os campos do log
const logRegex = /^(\d+\.\d+\.\d+\.\d+)\s+-\s+-\s+\[([^\]]+)\]\s+"(\w+)\s+([^\s\?]+)(?:\?([^"]*))?\s+HTTP\/(\d+\.\d+)"\s+(\d{3})\s+(\d+)\s+"([^"]*)"\s+"([^"]*)"/;

// Pegar o caminho do arquivo do terminal
const inputPath = process.argv[2];
const filterPath = process.argv[3]; // Segundo argumento que será o filtro

if (!inputPath || !fs.existsSync(inputPath)) {
  console.error('❌ Caminho do arquivo access.log não fornecido ou inválido.\n\nUso: node parse-nginx-log.js /caminho/para/access.log [filtro]');
  process.exit(1);
}

// Ajusta o filtro de path, se presente (remover espaços e barras desnecessárias)
let filterPathAdjusted = filterPath ? filterPath.trim().replace(/^\/+/, '') : null;

// Gerar nome de saída baseado no arquivo de entrada
const baseName = path.basename(inputPath, path.extname(inputPath));
const outputPath = path.join(path.dirname(inputPath), `${baseName}.xlsx`); // Salva na mesma pasta do access.log

// Criar um array de objetos que iremos transformar em planilha
const data = [];
data.push(['IP', 'Timestamp', 'Method', 'Path', 'Query Params', 'HTTP Version', 'Status', 'Bytes', 'Referer', 'User-Agent']); // Cabeçalho

// Ler o arquivo linha por linha
const rl = readline.createInterface({
  input: fs.createReadStream(inputPath),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const match = logRegex.exec(line);
  if (match) {
    const [ , ip, timestamp, method, pathStr, queryParams, httpVersion, status, bytes, referer, userAgent ] = match;

    // Se há um filtro, verifica se a linha contém a string ajustada
    if (!filterPathAdjusted || line.includes(filterPathAdjusted)) {
      data.push([ip, timestamp, method, pathStr, queryParams || '', httpVersion, status, bytes, referer || '', userAgent || '']);
    }
  }
});

rl.on('close', () => {
  const ws = xlsx.utils.aoa_to_sheet(data);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Logs');
  xlsx.writeFile(wb, outputPath);

  console.log(`✅ Arquivo XLSX salvo em: ${outputPath}`);
});
