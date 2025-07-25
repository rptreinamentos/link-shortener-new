import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Link, Copy, Edit, Trash2, ExternalLink, Plus } from 'lucide-react'
import './App.css'

const API_BASE_URL = 'https://rplink.net.br/api'

function App() {
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(false)

  // Carregar links ao iniciar
  useEffect(() => {
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/links`)
      const data = await response.json()
      if (data.success) {
        setLinks(data.data)
      }
    } catch (error) {
      console.error('Erro ao carregar links:', error)
    }
  }

  const shortenUrl = async () => {
    if (!url || !description) return

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          description: description
        })
      })

      const data = await response.json()
      if (data.success) {
        setLinks([data.data, ...links])
        setUrl('')
        setDescription('')
      } else {
        alert('Erro ao encurtar URL: ' + data.error)
      }
    } catch (error) {
      console.error('Erro ao encurtar URL:', error)
      alert('Erro ao encurtar URL')
    } finally {
      setLoading(false)
    }
  }

  const deleteLink = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este link?')) return

    try {
      const response = await fetch(`${API_BASE_URL}/links/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()
      if (data.success) {
        setLinks(links.filter(link => link.id !== id))
      } else {
        alert('Erro ao excluir link: ' + data.error)
      }
    } catch (error) {
      console.error('Erro ao excluir link:', error)
      alert('Erro ao excluir link')
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Link copiado para a área de transferência!'))
      .catch(err => console.error('Erro ao copiar:', err))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Link className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">RP Link</h1>
          </div>
          <p className="text-lg text-gray-600">
            Encurte seus links com identificação personalizada
          </p>
          <p className="text-sm text-gray-500 mt-2">
            🌐 rplink.net.br - Seu encurtador personalizado
          </p>
        </div>

        {/* Formulário de criação */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Criar Novo Link Encurtado
            </CardTitle>
            <CardDescription>
              Insira o URL original e uma identificação para o link
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Campo Identificação */}
            <div>
              <label className="block text-sm font-medium mb-2">Identificação *</label>
              <Input
                type="text"
                placeholder="Ex: Microfone Duplo Hollyland Lark M2 PRO"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Uma descrição para identificar facilmente este link
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">URL Original *</label>
              <Input
                type="url"
                placeholder="https://exemplo.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Button 
              onClick={shortenUrl} 
              disabled={!url || !description || loading}
              className="w-full"
            >
              {loading ? 'Encurtando...' : 'Encurtar URL'}
            </Button>
          </CardContent>
        </Card>

        {/* Lista de links */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Seus Links Encurtados</CardTitle>
            <CardDescription>
              Gerencie seus links encurtados
            </CardDescription>
          </CardHeader>
          <CardContent>
            {links.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Link className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum link encurtado ainda</p>
                <p className="text-sm">Crie seu primeiro link acima!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {links.map((link) => (
                  <div key={link.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Identificação */}
                        {link.description && (
                          <div className="mb-3">
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              Identificação
                            </label>
                            <p className="text-lg font-semibold text-gray-900 mt-1">
                              {link.description}
                            </p>
                          </div>
                        )}

                        {/* Link encurtado */}
                        <div className="mb-2">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Link Encurtado
                          </label>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm font-mono">
                              https://rplink.net.br/{link.short_code}
                            </code>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(`https://rplink.net.br/${link.short_code}`)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(`https://rplink.net.br/${link.short_code}`, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* URL original */}
                        <div className="mb-2">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            URL Original
                          </label>
                          <p className="text-sm text-gray-600 truncate mt-1">
                            {link.original_url}
                          </p>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteLink(link.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs text-gray-500">
                      <span>Criado em: {new Date(link.created_at).toLocaleString()}</span>
                      <Badge variant="outline">ID: {link.short_code}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App

