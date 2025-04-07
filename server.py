import http.server
import socketserver

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super().end_headers()

HOST = "127.0.0.1"  # Explicitly binding to localhost
PORT = 8888
Handler = CORSRequestHandler

print(f"Starting server at http://{HOST}:{PORT}")
with socketserver.TCPServer((HOST, PORT), Handler) as httpd:
    print(f"Server is running at http://{HOST}:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        httpd.server_close() 