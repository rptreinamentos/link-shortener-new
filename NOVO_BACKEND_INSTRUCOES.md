# Instruções para o Novo Backend RP Link

## Visão Geral

Criamos um novo backend simplificado para o RP Link com as seguintes características:

- ✅ Suporte ao campo "description" (Identificação)
- ✅ Sem o campo "URL de Destino" (removido conforme solicitado)
- ✅ Links no formato `rplink.net.br/{codigo}`
- ✅ Código limpo e bem estruturado

## Estrutura do Projeto

```
link-shortener-backend-new/
├── app.py              # Aplicação principal Flask
├── config.py           # Configuração do Supabase
├── models/
│   └── link.py         # Modelo Link
├── requirements.txt    # Dependências
├── .env                # Variáveis de ambiente
└── Procfile            # Configuração para o Railway
```

## Passos para Deployment

### 1. Criar um novo repositório no GitHub

```bash
# No seu computador local
cd C:\
mkdir link-shortener-new
cd link-shortener-new

# Inicializar Git
git init

# Criar estrutura de diretórios
mkdir -p backend/models
```

### 2. Copiar os arquivos do backend

Copie todos os arquivos que criamos para o diretório `backend/`:

- `app.py` → `backend/app.py`
- `config.py` → `backend/config.py`
- `models/link.py` → `backend/models/link.py`
- `requirements.txt` → `backend/requirements.txt`
- `.env` → `backend/.env` (não inclua no Git)
- `Procfile` → `backend/Procfile`
- `.gitignore` → `backend/.gitignore`

### 3. Copiar o arquivo do frontend

Copie o arquivo `App.jsx` para o diretório `frontend/src/`:

- `App.jsx` → `frontend/src/App.jsx`

### 4. Commit e Push

```bash
# Adicionar arquivos
git add .
git commit -m "Initial commit: New simplified backend with description support"

# Criar repositório no GitHub e fazer push
git remote add origin https://github.com/rptreinamentos/link-shortener-new.git
git push -u origin main
```

### 5. Deployment no Railway

1. Acesse [Railway](https://railway.app/)
2. Clique em "New Project" → "Deploy from GitHub repo"
3. Selecione o repositório `link-shortener-new`
4. Configure o diretório de trabalho como `/backend`
5. Adicione as variáveis de ambiente:
   - `SUPABASE_URL` = `https://miciomavetocnxwbwgcp.supabase.co`
   - `SUPABASE_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pY2lvbWF2ZXRvY254d2J3Z2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2NjY3NTcsImV4cCI6MjAzNzI0Mjc1N30.JVG-LsS6RRy-nxQYRQqDGw3RDTHgRPd-dQlO_H_Yvh8`
6. Clique em "Deploy"

### 6. Configurar Domínio Personalizado

1. No Railway, vá para "Settings" → "Domains"
2. Adicione o domínio `rplink.net.br`
3. Configure os registros DNS conforme instruções

### 7. Deployment do Frontend no Vercel

1. Acesse [Vercel](https://vercel.com/)
2. Clique em "New Project" → "Import Git Repository"
3. Selecione o repositório `link-shortener-new`
4. Configure o diretório de trabalho como `/frontend`
5. Clique em "Deploy"

## Testando a Aplicação

Após o deployment, teste a aplicação:

1. Acesse o frontend: `https://link-shortener-new.vercel.app`
2. Crie um novo link com identificação
3. Verifique se o link é criado corretamente
4. Teste o redirecionamento: `https://rplink.net.br/{codigo}`

## Solução de Problemas

Se encontrar problemas:

1. Verifique os logs no Railway
2. Confirme que as variáveis de ambiente estão configuradas corretamente
3. Verifique se a tabela `links` no Supabase tem a coluna `description`

