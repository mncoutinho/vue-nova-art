const routes = [
  {
    path: '/login',
    component: () => import('pages/login')
  },
  {
    path: '/ouvidoria-publica',
    component: () => import('pages/ouvidoria-publico')
  }
]

const showhome = {
  path: '/',
  component: () => import('layouts/menu'),
  children: [
    { path: '', component: () => import('pages/index') },
    { path: 'art/novo', component: () => import('pages/art/art') },
    { path: 'art/modelo', component: () => import('pages/art/art') },
    { path: 'art/modelo/:numero', component: () => import('pages/art/art'), props: true },
    { path: 'art/finaliza/:numero/:codigoDivida/:temTaxaDeIncorporacao', component: () => import('pages/art/art-finaliza'), props: true },
    { path: 'art/em-cadastramento', component: () => import('pages/art/em-cadastramento') },
    { path: 'art/modelos', component: () => import('pages/art/modelos') },
    { path: 'art/contrato', component: () => import('components/contrato/contrato') },
    { path: 'art/editar/:numero', component: () => import('pages/art/art'), props: true },
    { path: 'art/consultas', component: () => import('pages/art/consultas') },
    { path: 'dados-gerais/dados-cadastrais', component: () => import('pages/dados-gerais/dados-cadastrais') },
    { path: 'dados-gerais/alterar-senha', component: () => import('pages/dados-gerais/alterar-senha') },
    { path: 'dados-gerais/curriculo', component: () => import('pages/dados-gerais/curriculo') },
    { path: 'servicos/consultar-protocolo', component: () => import('pages/servicos/consultar-protocolo') },
    { path: 'servicos/certidoes', component: () => import('pages/servicos/certidao') },
    { path: 'servicos/carteira', component: () => import('pages/servicos/carteira/carteira') },
    { path: 'servicos/carteira/solicitada/:protocolo/:divida', component: () => import('pages/servicos/carteira/carteira-solicitada'), props: true },
    { path: 'financeiro/emissao-guias', component: () => import('pages/financeiro/emissao-guias') },
    { path: 'financeiro/parcelamento', component: () => import('pages/financeiro/parcelamento') },
    { path: 'financeiro/devolucao-transferencia-credito', component: () => import('pages/financeiro/devolucao-transferencia-credito') },
    { path: '/fale-conosco', component: () => import('pages/fale-conosco') },
    { path: '/ouvidoria', component: () => import('pages/ouvidoria') }
  ]
}

routes.push(showhome)

export default routes
