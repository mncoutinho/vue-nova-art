export default [
  {
    id: 1,
    label: 'Dados Gerais',
    header: 'root',
    icon: 'account_box',
    children: [
      {
        label: 'Dados Cadastrais',
        header: 'children',
        router: '/dados-gerais/dados-cadastrais'
      },
      {
        label: 'Currículo',
        header: 'children',
        router: '/dados-gerais/curriculo'
      },
      {
        label: 'Alteração de senha',
        header: 'children',
        router: '/art/novo'
      }
    ]
  },
  {
    id: 2,
    label: 'ART',
    header: 'root',
    icon: 'library_books',
    children: [
      {
        label: 'Cadastrar',
        header: 'children',
        router: '/art/novo'
      },
      {
        label: 'Em cadastramento',
        header: 'children',
        router: '/art/em-cadastramento'
      },
      {
        label: 'Consultas',
        header: 'children',
        router: '/art/consultas'
      },
      {
        label: 'Modelos',
        header: 'children',
        router: '/art/modelos'
      }
    ]
  },
  {
    id: 3,
    label: 'Serviços',
    header: 'root',
    icon: 'settings',
    children: [
      {
        label: 'Certidões',
        header: 'children',
        router: '/servicos/certidoes'
      },
      {
        label: '2ª Via Carteira',
        header: 'children',
        router: 'arts'
      },
      {
        label: 'Consultar Protocolo',
        header: 'children',
        router: '/servicos/consultar-protocolo'
      }
    ]
  },
  {
    id: 4,
    label: 'Financeiro',
    header: 'root',
    icon: 'monetization_on',
    children: [
      {
        label: 'Emissão de Guias',
        header: 'children',
        router: '/financeiro/emissao-guias'
      },
      {
        label: 'Emissão de Taxas',
        header: 'children',
        router: '/financeiro/emissao-taxas'
      },
      {
        label: 'Gerar Parcelamentos',
        header: 'children',
        router: 'arts'
      },
      {
        label: 'Devolução / Transferência de Crédito',
        header: 'children',
        router: 'arts'
      }
    ]
  }
]
