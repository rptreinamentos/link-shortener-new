from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
from models.link import Link

# Carregar variáveis de ambiente
load_dotenv()

app = Flask(__name__)
CORS(app)

# Rota principal
@app.route('/')
def index():
    return jsonify({
        "success": True,
        "message": "API de encurtamento de links RP Link",
        "version": "1.0.0"
    })

# Rota para encurtar URL
@app.route('/api/shorten', methods=['POST'])
def shorten_url():
    try:
        data = request.json
        url = data.get('url')
        description = data.get('description')
        
        if not url:
            return jsonify({
                "success": False,
                "error": "URL é obrigatório"
            }), 400
            
        if not description:
            return jsonify({
                "success": False,
                "error": "Identificação é obrigatória"
            }), 400
        
        # Criar link encurtado
        link = Link.create_link(url, description)
        
        if link:
            return jsonify({
                "success": True,
                "data": link.to_dict()
            })
        else:
            return jsonify({
                "success": False,
                "error": "Erro ao criar link encurtado"
            }), 500
    except Exception as e:
        print(f"Erro ao encurtar URL: {str(e)}")
        return jsonify({
            "success": False,
            "error": f"Erro ao encurtar URL: {str(e)}"
        }), 500

# Rota para redirecionar para URL original
@app.route('/<short_code>')
def redirect_to_url(short_code):
    try:
        link = Link.get_by_short_code(short_code)
        
        if link:
            return jsonify({
                "success": True,
                "data": {
                    "url": link.original_url
                }
            })
        else:
            return jsonify({
                "success": False,
                "error": "Link não encontrado"
            }), 404
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Erro ao redirecionar: {str(e)}"
        }), 500

# Rota para listar todos os links
@app.route('/api/links')
def get_links():
    try:
        links = Link.get_all_links()
        return jsonify({
            "success": True,
            "data": [link.to_dict() for link in links]
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Erro ao listar links: {str(e)}"
        }), 500

# Rota para obter um link específico
@app.route('/api/links/<link_id>')
def get_link(link_id):
    try:
        link = Link.get_by_id(link_id)
        
        if link:
            return jsonify({
                "success": True,
                "data": link.to_dict()
            })
        else:
            return jsonify({
                "success": False,
                "error": "Link não encontrado"
            }), 404
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Erro ao obter link: {str(e)}"
        }), 500

# Rota para excluir um link
@app.route('/api/links/<link_id>', methods=['DELETE'])
def delete_link(link_id):
    try:
        link = Link.get_by_id(link_id)
        
        if not link:
            return jsonify({
                "success": False,
                "error": "Link não encontrado"
            }), 404
            
        if link.delete():
            return jsonify({
                "success": True,
                "message": "Link excluído com sucesso"
            })
        else:
            return jsonify({
                "success": False,
                "error": "Erro ao excluir link"
            }), 500
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Erro ao excluir link: {str(e)}"
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)

