import { prisma } from '@/utils/prisma'

// Interface para os dados do produto, para tipagem forte
interface ProductSeedData {
  name: string
  description: string
  originalPrice: number
  discount?: number
  thumbnail: string
  gallery?: string[]
  stock: number
  highlight?: boolean
  sold?: number
  active?: boolean
  categoryId: string
}

async function createProductIfNotExists(data: ProductSeedData) {
  const exists = await prisma.product.findFirst({
    where: { name: data.name }
  })

  if (exists) {
    console.log(`Produto já existe, pulando: ${data.name}`)
    return
  }

  const discount = data.discount || 0
  const salePrice = data.originalPrice * (1 - discount / 100)

  await prisma.product.create({
    data: {
      ...data,
      originalPrice: data.originalPrice,
      salePrice: salePrice,
      discount: discount,
      gallery: data.gallery || [data.thumbnail],
      highlight: data.highlight || false,
      sold: data.sold || 0,
      active: data.active !== undefined ? data.active : true
    }
  })
  console.log(`✅ Produto criado: ${data.name}`)
}

async function main() {
  console.log('🚀 Iniciando o script de seed...')

  // 🔹 Garante que a categoria 'Canecas' exista
  const canecasCategory = await prisma.category.upsert({
    where: { slug: 'canecas' },
    update: {},
    create: {
      name: 'Canecas',
      slug: 'canecas'
    }
  })
  console.log(`📦 Categoria garantida: ${canecasCategory.name}`)

  // 🔹 Lista de produtos a serem criados
  const productsToSeed: ProductSeedData[] = [
    {
      name: 'Caneca Gato Cósmico',
      categoryId: canecasCategory.id,
      description:
        'Para os amantes de felinos e mistérios do universo. Esta caneca de cerâmica preta possui uma estampa de um gato flutuando entre estrelas e nebulosas. Perfeita para seu café ou chá intergaláctico.',
      originalPrice: 39.9,
      thumbnail: '/images/canecasIMG (1).png',
      gallery: ['/images/canecasIMG (1).png', '/images/canecasIMG (2).png', '/images/canecasIMG (3).png'],
      stock: 20,
      highlight: true,
      sold: 42
    },
    {
      name: 'Caneca "Hello World" para Devs',
      categoryId: canecasCategory.id,
      description:
        'A primeira caneca de todo programador. Feita com cerâmica de alta qualidade, resistente a longas noites de codificação e incontáveis xícaras de café. O presente ideal para aquele seu amigo dev.',
      originalPrice: 34.99,
      discount: 10,
      thumbnail: '/images/canecasIMG (2).png',
      gallery: ['/images/canecasIMG (1).png', '/images/canecasIMG (2).png', '/images/canecasIMG (3).png'],
      stock: 15,
      highlight: false,
      sold: 35
    },
    {
      name: 'Caneca Aconchego de Outono',
      categoryId: canecasCategory.id,
      description:
        'Com tons terrosos e uma ilustração de folhas de outono, esta caneca traz a sensação de um abraço quentinho. Ideal para chás, chocolate quente e momentos de tranquilidade.',
      originalPrice: 36.5,
      thumbnail: '/images/canecasIMG (3).png',
      gallery: ['/images/canecasIMG (1).png', '/images/canecasIMG (2).png', '/images/canecasIMG (3).png'],
      stock: 25,
      highlight: false,
      sold: 18
    },
    {
      name: 'Caneca Aventura na Montanha',
      categoryId: canecasCategory.id,
      description:
        'Inspire suas manhãs com esta caneca que retrata uma paisagem montanhosa ao amanhecer. Robusta e com grande capacidade, é a companheira perfeita para planejar sua próxima aventura.',
      originalPrice: 42.0,
      discount: 15,
      thumbnail: '/images/canecasIMG (4).png',
      gallery: ['/images/canecasIMG (1).png', '/images/canecasIMG (2).png', '/images/canecasIMG (3).png'],
      stock: 10,
      highlight: true,
      sold: 22
    },
    {
      name: 'Caneca Minimalista "Ponto e Vírgula"',
      categoryId: canecasCategory.id,
      description:
        'Um design simples e poderoso. A caneca "Ponto e Vírgula" é um símbolo de resiliência e continuação. Feita em cerâmica branca com um design elegante e minimalista.',
      originalPrice: 34.99,
      thumbnail: '/images/canecasIMG (5).png',
      gallery: ['/images/canecasIMG (1).png', '/images/canecasIMG (2).png', '/images/canecasIMG (3).png'],
      stock: 30,
      highlight: false,
      sold: 5
    },
    {
      name: 'Caneca "Game Over" Pixel Art',
      categoryId: canecasCategory.id,
      description:
        'Para os gamers nostálgicos. Com uma arte em pixel que muda de "Continue?" para "Game Over" com líquido quente, é a caneca mais divertida para sua estação de jogos.',
      originalPrice: 45.0,
      discount: 20,
      thumbnail: '/images/canecasIMG (6).png',
      gallery: ['/images/canecasIMG (1).png', '/images/canecasIMG (2).png', '/images/canecasIMG (3).png'],
      stock: 8,
      highlight: false,
      sold: 40
    },
    {
      name: 'Caneca Jardim Secreto',
      categoryId: canecasCategory.id,
      description:
        'Delicada e charmosa, esta caneca é adornada com flores silvestres e pequenos pássaros. Leve a beleza de um jardim secreto para a sua pausa para o café.',
      originalPrice: 38.9,
      thumbnail: '/images/canecasIMG (7).png',
      gallery: ['/images/canecasIMG (1).png', '/images/canecasIMG (2).png', '/images/canecasIMG (3).png'],
      stock: 12,
      highlight: true,
      sold: 11
    },
    {
      name: 'Caneca "Não Fale Comigo Antes do Café"',
      categoryId: canecasCategory.id,
      description:
        'Um aviso claro e bem-humorado para as manhãs difíceis. A caneca perfeita para quem precisa de um tempo (e cafeína) para engrenar. Letras grandes e diretas ao ponto.',
      originalPrice: 34.99,
      thumbnail: '/images/canecasIMG (8).png',
      gallery: ['/images/canecasIMG (1).png', '/images/canecasIMG (2).png', '/images/canecasIMG (3).png'],
      stock: 50,
      highlight: false,
      sold: 105
    },
    {
      name: 'Caneca "O Mundo de Gatos"',
      categoryId: canecasCategory.id,
      description:
        'A caneca de cerâmica preta com uma estampa de um gato flutuando entre estrelas e nebulosas. Perfeita para seu Café ou chá intergaláctico.',
      originalPrice: 34.99,
      thumbnail: '/images/canecasIMG (9).png',
      gallery: ['/images/canecasIMG (1).png', '/images/canecasIMG (2).png', '/images/canecasIMG (3).png'],
      stock: 20,
      highlight: true,
      sold: 30
    },
    {
      name: 'Caneca "Amor é uma Xícara"',
      categoryId: canecasCategory.id,
      description: 'Uma caneca romântica e charmosa, perfeita para o café da manhã. Com uma estampa de um coração de flores e um olhar de amor.',
      originalPrice: 34.99,
      thumbnail: '/images/canecasIMG (10).png',
      gallery: ['/images/canecasIMG (1).png', '/images/canecasIMG (2).png', '/images/canecasIMG (3).png'],
      stock: 15,
      highlight: false,
      sold: 20
    },
    {
      name: 'Caneca 11',
      categoryId: canecasCategory.id,
      description:
        'Uma caneca com um design minimalista e uma estampa de um gato flutuando entre estrelas e nebulosas. Perfeita para o seu café ou chá intergaláctico.',
      originalPrice: 34.99,
      thumbnail: '/images/canecasIMG (11).png',
      gallery: ['/images/canecasIMG (1).png', '/images/canecasIMG (2).png', '/images/canecasIMG (3).png'],
      stock: 25,
      highlight: false,
      sold: 10
    }
  ]

  // 🔹 Itera sobre a lista e cria cada produto
  for (const productData of productsToSeed) {
    await createProductIfNotExists(productData)
  }

  console.log('🏁 Script de seed finalizado com sucesso!')
}

main()
  .catch(e => {
    console.error('❌ Erro durante a execução do seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
