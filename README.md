# 📊 NGINX Access Log Parser to Excel XLSX

This Node.js script converts NGINX access log files into a structured Excel spreadsheet (`.xlsx`) for easier reading and analysis.

It automatically extracts the following fields from each log entry:

- **IP address**
- **Timestamp**
- **HTTP Method** (GET, POST, etc.)
- **Path**
- **Query Parameters**
- **HTTP Version**
- **Status Code**
- **Response Size (in bytes)**
- **Referer**
- **User-Agent**

---

## 🚀 Usage

### To parse ALL log entries

node parse.js "path/to/your/access.log"

This command will generate an Excel file containing all log lines, saved in the same directory as the provided access.log file.

### Optional: Filter log entries

You can filter the log by passing a search string as a second argument. Only lines containing this string (anywhere in the line) will be included in the output.

node parse.js "path/to/your/access.log" "some string or partial URL"

💡 The filter is applied loosely:

It's case-sensitive.

It ignores leading/trailing slashes and extra spaces.

It matches substrings (e.g., "wpp" matches "/api/wpp/v1").

### Output

After running the script, a .xlsx file will be generated and saved to the same directory as the .log file with a excel column-ready .xlsx.
