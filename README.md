# 📊 NGINX Access Log Parser to XLSX

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

After running the script, a .xlsx file will be generated:

✅ XLSX file saved to: /same/folder/access.xlsx
The output file will have the same name as the .log file, but with a .xlsx extension, and will be saved in the same directory.

📄 Excel Output Format
The spreadsheet will include the following columns:

#### IP	Timestamp	Method	Path	Query Params	HTTP Version	Status	Bytes	Referer	User-Agent
192.168.0.1	07/May/2025:10:00:00	GET	/example/path	id=123&user=test	1.1	200	512	http://referer.com	Mozilla/5.0 ...
