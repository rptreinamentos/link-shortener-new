# RP Link - Backend

Backend simplificado para o serviço de encurtamento de links RP Link.

## Características

- Encurtamento de URLs com códigos aleatórios
- Campo "Identificação" para descrever o link
- API RESTful com Flask
- Armazenamento no Supabase
- Domínio personalizado: rplink.net.br

## Estrutura do Projeto

```
link-shortener-backend-new/
├── app.py              # Aplicação principal Flask
├── config.py           # Configuração do Supabase
├── models/
│   └── link.py         # Modelo Link
├── requirements.txt    # Dependências
├── .env                # Variáveis de ambiente (não incluir no Git)
└── Procfile            # Configuração para o Railway
```

## Instalação

```bash
# Instalar dependências
pip install -r requirements.txt

# Executar localmente
python app.py
```

## API Endpoints

- `GET /` - Informações da API
- `POST /api/shorten` - Encurtar URL
- `GET /<short_code>` - Redirecionar para URL original
- `GET /api/links` - Listar todos os links
- `GET /api/links/<link_id>` - Obter link específico
- `DELETE /api/links/<link_id>` - Excluir link

## Deployment

Este projeto está configurado para deployment no Railway.

## Variáveis de Ambiente

- `SUPABASE_URL` - URL do projeto Supabase
- `SUPABASE_KEY` - Chave de API do Supabase

