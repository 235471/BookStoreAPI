const bookData = [
  {
    _id: '676078d421974ae371dd7231',
    titulo: 'A Menina que Roubava Livros',
    lancamento: '2005-01-01',
    descricao: 'Uma história comovente sobre uma menina judia que encontra refúgio nos livros durante a Segunda Guerra Mundial.',
    paginas: 480,
    preco: 51.38,
    editora: {
      endereco: {
        logradouro: 'Avenida das Américas',
        bairro: 'Barra da Tijuca',
        cidade: 'Rio de Janeiro',
        municipio: 'Rio de Janeiro',
        numero: '500',
        complemento: 'Blc 12 Salas 303 304',
        cep: '22640100',
      },
      _id: '676ef3af8ada01cd6aff48ba',
      razaoSocial: 'Editora Intrinseca Ltda.',
      nomeFantasia: 'Intrínseca',
      cnpj: '05660045000106',
      telefone: ['2132067400'],
      email: ['contato@intrinseca.com.br'],
      website: 'https://www.intrinseca.com.br',
      redesSociais: ['https://www.instagram.com/intrinsecaeditora', 'https://www.twitter.com/intrinseca'],
      status: 'ativa',
    },
    autor: {
      _id: '676162f137bedd7333432cc1',
      name: 'Markus Zusak',
      nationality: 'Australian',
      birthDate: '1975-06-23',
      biography:
        "Markus Zusak é um autor australiano conhecido por suas obras 'A Menina que Roubava Livros' e 'Eu Sou o Mensageiro'. Seus livros frequentemente exploram temas de amizade, perda e humanidade.",
    },
  },
  {
    _id: '6761a1cc0c47159def387014',
    titulo: 'O Hobbit',
    lancamento: '1937-07-21',
    descricao: 'Uma aventura épica de um hobbit que encontra um anel mágico.',
    paginas: 303,
    preco: 49.9,
    autor: {
      _id: '676340defc61f565b21a6cfa',
      name: 'J.R.R. Tolkien',
      nationality: 'British',
      birthDate: '1892-01-03',
      biography:
        "J.R.R. Tolkien foi um escritor, filólogo e professor britânico, famoso por ser o autor de 'O Hobbit' e da trilogia 'O Senhor dos Anéis'. Suas obras são reconhecidas mundialmente, e ele é considerado um dos pais da literatura de fantasia moderna.",
    },
    editora: {
      endereco: {
        logradouro: 'Rua Doutor Vila Nova',
        bairro: 'Vila Buarque',
        cidade: 'São Paulo',
        municipio: 'São Paulo',
        numero: '309',
        complemento: '',
        cep: '01222-020',
      },
      _id: '67643d118b0b24c53c3fac48',
      razaoSocial: 'Livraria Martins Fontes Editora Ltda',
      nomeFantasia: 'Martins Fontes',
      cnpj: '43641133000400',
      telefone: ['1132570697', '1132598836', '1132593391'],
      email: ['administrativo@martinseditora.com.br'],
      website: 'https://www.martinsfontes.com.br',
      redesSociais: ['https://www.instagram.com/martinsfontes', 'https://www.facebook.com/martinsfontes'],
      status: 'ativa',
    },
  },
];

const authorData = [
  {
    _id: '676162f137bedd7333432cc1',
    name: 'Markus Zusak',
    nationality: 'Australian',
    birthDate: '1975-06-23',
    biography:
      "Markus Zusak é um autor australiano conhecido por suas obras 'A Menina que Roubava Livros' e 'Eu Sou o Mensageiro'. Seus livros frequentemente exploram temas de amizade, perda e humanidade.",
  },
  {
    _id: '676340defc61f565b21a6cfa',
    name: 'J.R.R. Tolkien',
    nationality: 'British',
    birthDate: '1892-01-03',
    biography:
      "J.R.R. Tolkien foi um escritor, filólogo e professor britânico, famoso por ser o autor de 'O Hobbit' e da trilogia 'O Senhor dos Anéis'. Suas obras são reconhecidas mundialmente, e ele é considerado um dos pais da literatura de fantasia moderna.",
  },
  {
    _id: '676340defc61f565b21a6cfb',
    name: 'George Orwell',
    nationality: 'British',
    birthDate: '1903-06-25',
    biography:
      "George Orwell, pseudônimo de Eric Arthur Blair, foi um escritor e jornalista britânico. Sua obra mais conhecida, '1984', é uma das mais importantes do século XX e aborda temas como totalitarismo, vigilância e liberdade individual.",
  },
  {
    _id: '676340defc61f565b21a6cfc',
    name: 'Antoine de Saint-Exupéry',
    nationality: 'French',
    birthDate: '1900-06-29',
    biography:
      "Antoine de Saint-Exupéry foi um escritor e aviador francês, famoso por sua obra 'O Pequeno Príncipe'. O livro é uma das obras literárias mais traduzidas e lidas no mundo, e é conhecido por suas mensagens filosóficas e reflexões sobre a infância, o amor e a natureza humana.",
  },
  {
    _id: '676340defc61f565b21a6cfd',
    name: 'Jane Austen',
    nationality: 'British',
    birthDate: '1775-12-16',
    biography:
      "Jane Austen foi uma escritora britânica, conhecida principalmente por seus romances, incluindo 'Orgulho e Preconceito'. Seus livros são aclamados por suas observações sociais, inteligência e representações de mulheres fortes e independentes.",
  },
];

const publisherData = [
  {
    endereco: {
      logradouro: 'Rua Doutor Vila Nova',
      bairro: 'Vila Buarque',
      cidade: 'São Paulo',
      municipio: 'São Paulo',
      numero: '309',
      complemento: '',
      cep: '01222-020',
    },
    _id: '67643d118b0b24c53c3fac48',
    razaoSocial: 'Livraria Martins Fontes Editora Ltda',
    nomeFantasia: 'Martins Fontes',
    cnpj: '43641133000400',
    telefone: ['1132570697', '1132598836', '1132593391'],
    email: ['administrativo@martinseditora.com.br'],
    website: 'https://www.martinsfontes.com.br',
    redesSociais: ['https://www.instagram.com/martinsfontes', 'https://www.facebook.com/martinsfontes'],
    status: 'ativa',
  },
  {
    endereco: {
      logradouro: 'Avenida das Américas',
      bairro: 'Barra da Tijuca',
      cidade: 'Rio de Janeiro',
      municipio: 'Rio de Janeiro',
      numero: '500',
      complemento: 'Blc 12 Salas 303 304',
      cep: '22640100',
    },
    _id: '676ef3af8ada01cd6aff48ba',
    razaoSocial: 'Editora Intrinseca Ltda.',
    nomeFantasia: 'Intrínseca',
    cnpj: '05660045000106',
    telefone: ['2132067400'],
    email: ['contato@intrinseca.com.br'],
    website: 'https://www.intrinseca.com.br',
    redesSociais: ['https://www.instagram.com/intrinsecaeditora', 'https://www.twitter.com/intrinseca'],
    status: 'ativa',
  },
];

export { bookData, authorData, publisherData };
