'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Wand2, Target, CheckCircle, Download, Save, Upload, Eye, BarChart3, Lightbulb, FileText, Users, TrendingUp } from 'lucide-react'

interface EbookProject {
  id: string
  title: string
  niche: string
  targetAudience: string
  painPoint: string
  solution: string
  chapters: Chapter[]
  conversionElements: ConversionElement[]
  createdAt: Date
  status: 'draft' | 'generating' | 'completed'
}

interface Chapter {
  id: string
  title: string
  content: string
  wordCount: number
  conversionScore: number
}

interface ConversionElement {
  type: 'hook' | 'cta' | 'social-proof' | 'urgency' | 'value-prop'
  content: string
  position: string
  effectiveness: number
}

interface ValidationMetrics {
  titleScore: number
  contentQuality: number
  conversionPotential: number
  marketFit: number
  overallScore: number
}

export default function Home() {
  const [currentProject, setCurrentProject] = useState<EbookProject | null>(null)
  const [projects, setProjects] = useState<EbookProject[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState<'create' | 'content' | 'validation' | 'preview'>('create')
  const [generationProgress, setGenerationProgress] = useState(0)
  const [validationMetrics, setValidationMetrics] = useState<ValidationMetrics | null>(null)

  // Simulação de nichos populares baseados em Ruyter
  const popularNiches = [
    'Marketing Digital',
    'Vendas Online',
    'Empreendedorismo',
    'Desenvolvimento Pessoal',
    'Finanças Pessoais',
    'Produtividade',
    'Liderança',
    'Copywriting',
    'Afiliados',
    'E-commerce'
  ]

  const conversionTemplates = [
    {
      name: 'Problema-Solução-Resultado',
      description: 'Identifica dor, apresenta solução, mostra resultados',
      effectiveness: 92
    },
    {
      name: 'Jornada do Herói',
      description: 'Narrativa envolvente com transformação pessoal',
      effectiveness: 88
    },
    {
      name: 'Método Passo-a-Passo',
      description: 'Guia prático com implementação imediata',
      effectiveness: 85
    },
    {
      name: 'Caso de Sucesso',
      description: 'Baseado em histórias reais de transformação',
      effectiveness: 90
    }
  ]

  useEffect(() => {
    const savedProjects = localStorage.getItem('ebookProjects')
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
  }, [])

  const saveProjects = (updatedProjects: EbookProject[]) => {
    localStorage.setItem('ebookProjects', JSON.stringify(updatedProjects))
    setProjects(updatedProjects)
  }

  const createNewProject = (formData: any) => {
    const newProject: EbookProject = {
      id: Date.now().toString(),
      title: formData.title,
      niche: formData.niche,
      targetAudience: formData.targetAudience,
      painPoint: formData.painPoint,
      solution: formData.solution,
      chapters: [],
      conversionElements: [],
      createdAt: new Date(),
      status: 'draft'
    }
    
    setCurrentProject(newProject)
    const updatedProjects = [...projects, newProject]
    saveProjects(updatedProjects)
    setActiveTab('content')
  }

  const generateEbook = async () => {
    if (!currentProject) return
    
    setIsGenerating(true)
    setGenerationProgress(0)
    
    // Simulação de geração com IA
    const steps = [
      'Analisando nicho e audiência...',
      'Criando estrutura otimizada...',
      'Gerando conteúdo de alta conversão...',
      'Inserindo elementos de persuasão...',
      'Validando métricas de conversão...',
      'Finalizando ebook profissional...'
    ]
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setGenerationProgress(((i + 1) / steps.length) * 100)
    }
    
    // Gerar capítulos simulados
    const generatedChapters: Chapter[] = [
      {
        id: '1',
        title: `O Maior Erro em ${currentProject.niche}`,
        content: `Descobra o erro #1 que 97% das pessoas cometem em ${currentProject.niche.toLowerCase()} e como evitá-lo...`,
        wordCount: 1200,
        conversionScore: 94
      },
      {
        id: '2',
        title: 'O Método Comprovado',
        content: `O sistema passo-a-passo que já transformou mais de 10.000 vidas...`,
        wordCount: 1800,
        conversionScore: 91
      },
      {
        id: '3',
        title: 'Casos de Sucesso Reais',
        content: `Histórias inspiradoras de quem aplicou este método e obteve resultados extraordinários...`,
        wordCount: 1500,
        conversionScore: 89
      },
      {
        id: '4',
        title: 'Implementação Prática',
        content: `Seu plano de ação detalhado para os próximos 30 dias...`,
        wordCount: 2000,
        conversionScore: 96
      },
      {
        id: '5',
        title: 'Próximos Passos',
        content: `Como acelerar seus resultados e ir além do que imagina...`,
        wordCount: 1000,
        conversionScore: 88
      }
    ]
    
    // Elementos de conversão
    const conversionElements: ConversionElement[] = [
      {
        type: 'hook',
        content: 'Atenção: Esta informação pode mudar sua vida em 30 dias',
        position: 'Início',
        effectiveness: 92
      },
      {
        type: 'social-proof',
        content: 'Mais de 50.000 pessoas já transformaram suas vidas com este método',
        position: 'Meio',
        effectiveness: 89
      },
      {
        type: 'cta',
        content: 'CLIQUE AQUI para acessar o treinamento completo (VAGAS LIMITADAS)',
        position: 'Final',
        effectiveness: 95
      }
    ]
    
    // Métricas de validação
    const metrics: ValidationMetrics = {
      titleScore: 94,
      contentQuality: 91,
      conversionPotential: 93,
      marketFit: 89,
      overallScore: 92
    }
    
    const updatedProject = {
      ...currentProject,
      chapters: generatedChapters,
      conversionElements: conversionElements,
      status: 'completed' as const
    }
    
    setCurrentProject(updatedProject)
    setValidationMetrics(metrics)
    
    const updatedProjects = projects.map(p => 
      p.id === currentProject.id ? updatedProject : p
    )
    saveProjects(updatedProjects)
    
    setIsGenerating(false)
    setActiveTab('validation')
  }

  const CreateTab = () => {
    const [formData, setFormData] = useState({
      title: '',
      niche: '',
      targetAudience: '',
      painPoint: '',
      solution: ''
    })

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Crie Seu Ebook de Alta Conversão
          </h2>
          <p className="text-lg text-gray-600">
            IA treinada com os melhores ebooks de marketing do mercado
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Título do Ebook
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Ex: Como Ganhar R$ 10.000 em 30 Dias"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nicho
              </label>
              <select
                value={formData.niche}
                onChange={(e) => setFormData({...formData, niche: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione um nicho</option>
                {popularNiches.map(niche => (
                  <option key={niche} value={niche}>{niche}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Público-Alvo
              </label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                placeholder="Ex: Empreendedores iniciantes de 25-45 anos"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Principal Dor/Problema
              </label>
              <textarea
                value={formData.painPoint}
                onChange={(e) => setFormData({...formData, painPoint: e.target.value})}
                placeholder="Ex: Dificuldade para gerar renda extra trabalhando de casa"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Solução Oferecida
              </label>
              <textarea
                value={formData.solution}
                onChange={(e) => setFormData({...formData, solution: e.target.value})}
                placeholder="Ex: Método passo-a-passo para criar negócio online lucrativo"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={() => createNewProject(formData)}
              disabled={!formData.title || !formData.niche || !formData.targetAudience}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <Wand2 className="inline-block mr-2" />
              Criar Projeto
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
          <h3 className="text-lg font-semibold text-orange-800 mb-3">
            🔥 Templates de Alta Conversão
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {conversionTemplates.map((template, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-orange-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">{template.name}</h4>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {template.effectiveness}% eficácia
                  </span>
                </div>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const ContentTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Geração de Conteúdo</h2>
        <button
          onClick={generateEbook}
          disabled={isGenerating}
          className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 disabled:opacity-50 transition-all duration-300"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin inline-block mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              Gerando...
            </>
          ) : (
            <>
              <Wand2 className="inline-block mr-2" />
              Gerar Ebook com IA
            </>
          )}
        </button>
      </div>

      {isGenerating && (
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center mb-4">
            <div className="animate-pulse bg-blue-600 w-3 h-3 rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold text-blue-800">IA Trabalhando...</h3>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${generationProgress}%` }}
            ></div>
          </div>
          <p className="text-blue-700">{generationProgress.toFixed(0)}% concluído</p>
        </div>
      )}

      {currentProject && currentProject.chapters.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Capítulos Gerados</h3>
          {currentProject.chapters.map((chapter, index) => (
            <div key={chapter.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-semibold text-gray-800">
                  Capítulo {index + 1}: {chapter.title}
                </h4>
                <div className="flex items-center space-x-3">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {chapter.wordCount} palavras
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {chapter.conversionScore}% conversão
                  </span>
                </div>
              </div>
              <p className="text-gray-600">{chapter.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const ValidationTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Validação e Métricas</h2>
      
      {validationMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Score de Conversão</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Título</span>
                  <span className="text-sm font-semibold">{validationMetrics.titleScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${validationMetrics.titleScore}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Qualidade do Conteúdo</span>
                  <span className="text-sm font-semibold">{validationMetrics.contentQuality}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${validationMetrics.contentQuality}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Potencial de Conversão</span>
                  <span className="text-sm font-semibold">{validationMetrics.conversionPotential}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${validationMetrics.conversionPotential}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Fit de Mercado</span>
                  <span className="text-sm font-semibold">{validationMetrics.marketFit}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full"
                    style={{ width: `${validationMetrics.marketFit}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <Target className="text-green-600 mr-2" />
                <span className="font-semibold text-green-800">Score Geral</span>
              </div>
              <div className="text-3xl font-bold text-green-800">
                {validationMetrics.overallScore}%
              </div>
              <p className="text-sm text-green-700 mt-1">
                Excelente potencial de conversão!
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Elementos de Conversão
              </h3>
              {currentProject?.conversionElements.map((element, index) => (
                <div key={index} className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-gray-700 capitalize">
                      {element.type.replace('-', ' ')}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {element.effectiveness}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{element.content}</p>
                  <p className="text-xs text-gray-500">Posição: {element.position}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                <Lightbulb className="inline-block mr-2" />
                Recomendações de Otimização
              </h3>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li>• Adicione mais prova social nos primeiros capítulos</li>
                <li>• Inclua CTAs mais específicos ao longo do conteúdo</li>
                <li>• Reforce a urgência na conclusão</li>
                <li>• Teste diferentes títulos para os capítulos</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const PreviewTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Preview do Ebook</h2>
        <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300">
          <Download className="inline-block mr-2" />
          Baixar PDF
        </button>
      </div>
      
      {currentProject && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-t-lg text-center">
            <h1 className="text-3xl font-bold mb-4">{currentProject.title}</h1>
            <p className="text-blue-100">
              O guia definitivo para {currentProject.niche.toLowerCase()}
            </p>
          </div>
          
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Índice</h2>
              <ul className="space-y-2">
                {currentProject.chapters.map((chapter, index) => (
                  <li key={chapter.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">
                      {index + 1}. {chapter.title}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {chapter.wordCount} palavras
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">
                🎯 Sobre Este Ebook
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 mb-1"><strong>Nicho:</strong> {currentProject.niche}</p>
                  <p className="text-gray-600 mb-1"><strong>Público:</strong> {currentProject.targetAudience}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1"><strong>Páginas:</strong> ~{Math.ceil(currentProject.chapters.reduce((acc, ch) => acc + ch.wordCount, 0) / 250)}</p>
                  <p className="text-gray-600 mb-1"><strong>Tempo de leitura:</strong> ~{Math.ceil(currentProject.chapters.reduce((acc, ch) => acc + ch.wordCount, 0) / 200)} min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <BookOpen className="inline-block mr-3 text-blue-600" />
            EbookAI Pro
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            IA especializada em criar ebooks de alta conversão no estilo dos melhores profissionais de marketing
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'create', label: 'Criar Projeto', icon: Wand2 },
                { id: 'content', label: 'Conteúdo', icon: FileText },
                { id: 'validation', label: 'Validação', icon: BarChart3 },
                { id: 'preview', label: 'Preview', icon: Eye }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="inline-block mr-2 w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'create' && <CreateTab />}
            {activeTab === 'content' && <ContentTab />}
            {activeTab === 'validation' && <ValidationTab />}
            {activeTab === 'preview' && <PreviewTab />}
          </div>
        </div>

        {projects.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              <Users className="inline-block mr-2" />
              Seus Projetos ({projects.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setCurrentProject(project)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md cursor-pointer transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800 truncate">{project.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : project.status === 'generating'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{project.niche}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}