from flask import Flask, send_from_directory
from pathlib import Path

ROOT = Path(__file__).parent
app = Flask(__name__, static_folder="site", static_url_path="")


@app.get("/")
def home():
    return send_from_directory(app.static_folder, "index.html")


@app.get("/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
