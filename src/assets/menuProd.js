export default [
  {
    id: 1,
    label: 'DADOS GERAIS',
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
        router: '/dados-gerais/alterar-senha'
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
    label: 'SERVIÇOS',
    header: 'root',
    icon: 'fas fa-toolbox',
    children: [
      {
        label: 'Consultar Protocolo',
        header: 'children',
        router: '/servicos/consultar-protocolo'
      }
    ]
  }
]
