import { NextRequest, NextResponse } from 'next/server'

// Interface para o corpo da requisição que nossa API recebe
interface ShippingRequest {
  cepDestino: string
  peso: number
  largura: number
  altura: number
  comprimento: number
}

// Interface para a resposta que nossa API envia de volta
interface ShippingResponse {
  price: number
  prazo: number
}

// --- Tipos para a resposta da API externa (Melhor Envio) ---

// Tipagem para uma única opção de frete retornada pela API do Melhor Envio
interface MelhorEnvioOption {
  id: number
  name: string
  price: string
  delivery_range: {
    min: number
    max: number
  }
  error?: string
}

// A resposta completa da API do Melhor Envio é um array dessas opções
type MelhorEnvioResponse = MelhorEnvioOption[]

// =============================================
// ROTA DA API
// =============================================

export async function POST(req: NextRequest) {
  try {
    // 1. Validação da chave de API
    if (!process.env.MELHOR_ENVIO_API_KEY) {
      console.error('ERRO DE CONFIGURAÇÃO: A variável de ambiente MELHOR_ENVIO_API_KEY não foi encontrada.')
      return NextResponse.json({ error: 'Configuração do servidor incompleta.' }, { status: 500 })
    }

    const { cepDestino, peso, largura, altura, comprimento }: ShippingRequest = await req.json()

    // 2. Construção do corpo da requisição para a API externa
    const requestBody = {
      from: { postal_code: process.env.CEP_ORIGEM?.replace('-', '') || '01001000' },
      to: { postal_code: cepDestino.replace('-', '') },
      package: {
        weight: peso,
        width: largura,
        height: altura,
        length: comprimento
      }
    }

    console.log('Enviando para Melhor Envio:', JSON.stringify(requestBody, null, 2))

    // 3. Chamada para a API do Melhor Envio
    const response = await fetch('https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.MELHOR_ENVIO_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    })

    // 4. Tratamento de respostas de erro da API externa
    if (!response.ok) {
      const errorBodyAsText = await response.text()
      console.error('----------------- ERRO DA API MELHOR ENVIO -----------------')
      console.error('Status da Resposta:', response.status, response.statusText)
      console.error('Corpo da Resposta (HTML/Erro):', errorBodyAsText)
      console.error('----------------------------------------------------------')

      let errorMessage = 'Erro ao se comunicar com a API de frete.'
      if (response.status === 401) errorMessage = 'Erro de autenticação. Verifique a chave da API.'
      else if (response.status === 400) errorMessage = 'Requisição inválida. Verifique os dados enviados.'

      return NextResponse.json({ error: errorMessage, details: errorBodyAsText }, { status: response.status })
    }

    // 5. Processamento da resposta de sucesso
    // Tipamos 'data' com o tipo que definimos, eliminando a necessidade de 'any'.
    const data: MelhorEnvioResponse = await response.json()

    if (!data || data.length === 0) {
      console.warn('A API do Melhor Envio retornou uma resposta vazia:', data)
      return NextResponse.json({ error: 'Nenhuma opção de frete encontrada para este CEP ou os dados do produto estão incorretos.' }, { status: 404 })
    }

    const melhorOpcao = data.find(opcao => !opcao.error)

    if (!melhorOpcao) {
      console.warn('Todas as transportadoras retornaram erro:', data)
      return NextResponse.json({ error: 'Não foi possível encontrar uma transportadora disponível para o CEP informado.' }, { status: 400 })
    }

    const result: ShippingResponse = {
      price: parseFloat(melhorOpcao.price),
      prazo: melhorOpcao.delivery_range.min
    }

    return NextResponse.json(result)
  } catch (err) {
    console.error('ERRO INESPERADO NO SERVIDOR:', err)
    return NextResponse.json({ error: 'Erro interno ao processar a solicitação de frete.' }, { status: 500 })
  }
}
