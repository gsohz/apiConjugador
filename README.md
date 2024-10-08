# API CONJUGADOR

Esta é uma API simples para conjugar verbos em português usando web scraping.

## Tecnologias
* Nodejs: Uma plataforma construída sobre o motor JavaScript do Chrome para facilmente construir aplicativos de rede rápidos e escaláveis.
* Express: Um framework web para Node.js, projetado para construir aplicações web e APIs de forma rápida e fácil.
* Axios: Uma biblioteca de cliente HTTP baseada em Promises para fazer requisições HTTP, facilitando a comunicação com APIs externas.
* Cheerio: Uma biblioteca que fornece uma implementação rápida, flexível e leve do núcleo jQuery projetada especificamente para o servidor, útil para manipulação e análise de HTML.

## Funcionalidades
Esta API utiliza web scraping para buscar conjugações de verbos em português no site [conjugacao.com.br](https://www.conjugacao.com.br/).

## Rotas
| URL  |  TIPO | PARÂMETRO  |  RETORNO |   
|---|---|---|---|
| `/:verb`  | `GET` | `verb` | Conjugação do verbo  |   

### Exemplo de uso
#### GET /amar
```json
// http://localhost:3000/amar

{
  "indicativo": {
    "presente": [
      "amo",
      "amas",
      "ama",
      "amamos",
      "amais",
      "amam"
    ],
    "preteritoImperfeito": [
      "amava",
      "amavas",
      "amava",
      "amávamos",
      "amáveis",
      "amavam"
    ],
    "preteritoPerfeito": [
      "amei",
      "amaste",
      "amou",
      "amamos",
      "amastes",
      "amaram"
    ],
    "preteritoMaisQuePerfeito": [
      "amara",
      "amaras",
      "amara",
      "amáramos",
      "amáreis",
      "amaram"
    ],
    "futuroDoPresente": [
      "amarei",
      "amarás",
      "amará",
      "amaremos",
      "amareis",
      "amarão"
    ],
    "futuroDoPreterito": [
      "amaria",
      "amarias",
      "amaria",
      "amaríamos",
      "amaríeis",
      "amariam"
    ]
  },
  "subjuntivo": {
    "presente": [
      "ame",
      "ames",
      "ame",
      "amemos",
      "ameis",
      "amem"
    ],
    "preteritoImperfeito": [
      "amasse",
      "amasses",
      "amasse",
      "amássemos",
      "amásseis",
      "amassem"
    ],
    "futuro": [
      "amar",
      "amares",
      "amar",
      "amarmos",
      "amardes",
      "amarem"
    ]
  },
  "imperativo": {
    "imperativoAfirmativo": [
      "ama",
      "ame",
      "amemos",
      "amai",
      "amem"
    ],
    "imperativoNegativo": [
      "ames",
      "ame",
      "amemos",
      "ameis",
      "amem"
    ]
  },
  "infinitivo": {
    "infinitivoPessoal": [
      "amar",
      "amares",
      "amar",
      "amarmos",
      "amardes",
      "amarem"
    ]
  }
}
```

## Como utilizar
1. Clone este repositório:
   ```console
   git clone https://github.com/gsohz/apiConjugador.git
   ```
2. Abra o terminal no arquivo clonado e instale as dependências com:
   ```console
   npm install
   ```
3. Inicie o servidor com:
   ```console
   node server.js
   ```
4. O servidor será iniciado na porta `3000`. Você pode acessar a API em `http://localhost:3000`.
