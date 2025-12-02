from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# --- ŚCIEŻKA DO FOLDERU ZE ZDJĘCIAMI ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
IMAGES_DIR = os.path.join(BASE_DIR, "images")


# --- LISTA PRODUKTÓW (Twoje dane z Products.js) ---
products = [
    {
        "id": 1,
        "productName": "Test",
        "price": 399,
        "productImage": "gramofon-test.webp",
    },
    {
        "id": 2,
        "productName": "Test1",
        "price": 999,
        "productImage": "trombka.jpg",
    },
    {
        "id": 3,
        "productName": "Test2",
        "price": 2299,
        "productImage": "flet.jpg",
    },
    {
        "id": 4,
        "productName": "Test3",
        "price": 1299,
        "productImage": "gitara.jpg",
    },
    {
        "id": 5,
        "productName": "Test4",
        "price": 799,
        "productImage": "piano.jpg",
    },
    {
        "id": 6,
        "productName": "Test5",
        "price": 799,
        "productImage": "qq.jpg",
    },
    {
        "id": 7,
        "productName": "Test6",
        "price": 799,
        "productImage": "perkusja.jpg",
    },
    {
        "id": 8,
        "productName": "Test7",
        "price": 799,
        "productImage": "organy.jpg",
    },
    {
        "id": 9,
        "productName": "Test8",
        "price": 799,
        "productImage": "bemben.jpg",
    },
    {
        "id": 10,
        "productName": "Test9",
        "price": 799,
        "productImage": "skrzypce.jpg",
    },
]


# --- ENDPOINT Z LISTĄ PRODUKTÓW ---
@app.get("/api/products")
def get_products():
    return jsonify(products)


# --- ENDPOINT DO ZDJĘĆ ---
@app.get("/images/<path:filename>")
def serve_image(filename):
    return send_from_directory(IMAGES_DIR, filename)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
