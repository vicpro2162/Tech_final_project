import http.server
import socketserver
import json
import os

PORT = 8000
DATA_FILE = 'inscriptions.json'


class MyHandler(http.server.SimpleHTTPRequestHandler):

    def _set_headers(self, status_code=200, content_type='text/html'):
        self.send_response(status_code)
        self.send_header('Content-type', content_type)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(status_code=204)

    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'

        elif self.path == '/inscriptions':
            self._set_headers(content_type='application/json')

            if os.path.exists(DATA_FILE):
                with open(DATA_FILE, 'r', encoding='utf-8') as f:
                    self.wfile.write(f.read().encode('utf-8'))
            else:
                self.wfile.write(b'[]')
            return

        return super().do_GET()

    # ✅ DOIT ÊTRE DANS LA CLASSE
    def do_POST(self):
        if self.path == '/inscriptions':

            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)

            try:
                new_entry = json.loads(post_data.decode('utf-8'))
            except json.JSONDecodeError:
                self._set_headers(400, 'application/json')
                self.wfile.write(json.dumps({'message': 'JSON invalide'}).encode('utf-8'))
                return

            registrations = []

            if os.path.exists(DATA_FILE):
                with open(DATA_FILE, 'r', encoding='utf-8') as f:
                    try:
                        registrations = json.load(f)
                    except json.JSONDecodeError:
                        registrations = []

            registrations.append(new_entry)

            with open(DATA_FILE, 'w', encoding='utf-8') as f:
                json.dump(registrations, f, indent=4, ensure_ascii=False)

            self._set_headers(200, 'application/json')
            self.wfile.write(
                json.dumps({'message': 'Inscription enregistrée avec succès!'}).encode('utf-8')
            )

        else:
            self._set_headers(404, 'application/json')
            self.wfile.write(json.dumps({'message': 'Not Found'}).encode('utf-8'))


# Créer le fichier s'il n'existe pas
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump([], f, indent=4)


with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"Serveur démarré sur http://localhost:{PORT}")
    httpd.serve_forever()