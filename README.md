# Crud Tutorial
Tutorial para novos membros da APP Mastes sobre como fazer um CRUD usando nossos pacotes

Após clonar o repositório, instalar os pacotes necessários:
```
$ cd crud-tutorial
$ npm install
$ npm start
```
A área administrativa será aberta então no seu navegador no [localhost:3000](http://localhost:3000).

# Principais pacotes utilizados

### Material UI
Biblioteca com componentes React no padrão do [Material Design](https://material.io/)
- [Documentação](https://material-ui.com/)

### @app-masters/js-lib
Biblioteca da App Masters que integram as chamadas de CRUD da API diretamente com o Redux, fornecendo de maneira fácil as actions e reducers atravez do AMActions.
- [Github](https://github.com/app-masters/redux-lib)

### @app-masters/redux-lib
Biblioteca da App Masters que integram as chamadas de CRUD da API diretamente com o Redux, fornecendo de maneira fácil as actions e reducers atravez do AMActions.
- [Github](https://github.com/app-masters/redux-lib)

### @app-masters/sync-cache
Biblioteca da App Masters que ecapsula a criação de reducers e actions do AMAActions, permitindo a sua criação em apenas uma declaração de um objeto.
De forma secundária, diponibiliza uma alternativa ao AMActions que consegue lidar com o gerenciamento de objetos em cache e online.
- [Github](https://github.com/app-masters/sync-cache)


# Tarefas

## 1 - Conferir funcionamento do CRUD

Temos um CRUD de exemplo para que você possa conferir, abra ele no admin, espere a lista carregar, crie um registro novo, edite um registro existente.

1. Ver metodo que faz o render da table da lista do CRUD.
1. Conferir o que renderiza quando o CRUD está na versão mobile.
1. Olhar as rotas do navegador quando criando um registro novo e editando um já existente. Conferir formulário no mobile também.
1. Deletando o registro que você criou, conferir a mensagem.

## 2 - Criar nova lista

Hora de criar outro CRUD. Na pasta `~/src/views/category` os arquivos já estão criados para o CRUD de categorias.

1. Copiar código do `userList.js` para o `categoryList.js`, para visualizar a lista, clique no `CRUD em branco` na drawer.
1. No final do arquivo, no `connect` do redux, em vez de pegar os itens do `userReducer`, pegar do `categoryReducer`.
Igualmente, trocar as actions de `getObjects` e `deleteObject` para a category.
1. Agora, a lista já está fazendo a chamada para pegar as categorias no banco ao entrar nessa view. Conferir no console do navegador.
1. Exiba os dados referentes à categoria na tabela e na lista do mobile. A categoria virá no seguinte formato:
    ```json
    {
        "_id": 1,
        "title": "Título da categoria",
        "description": "Descrição da categoria"
    }
    ``` 
    Poderá vir mais alguns dados referentes ao banco de dados, como quando e por quem esse registro foi criado. Na lista mobile, exibir apenas o título.
    
1. Mudar strings que referenciavam usuários para categoria:
    - Título da lista - Conferir Mobile
    - Texto do dialogo de delete e sucesso
    - Rotas - botão de criar novo e editar levarem para `/categorias/{id}`

1. Mostrar para o Baraky antes de avançar.

## 3 - Criar novo formulário

1. Copiar código do `userForm.js` para o `categoryForm.js`, para visualizar a lista, clique no `INCLUIR` na lista, que deve levar para `/categorias/new`
1. No final do arquivo, no `connect` do redux, novamente mudar do `userReducer` para o `categoryReducer`.
Igualmente, trocar as actions para a `category`.
1. No formulário, além dos componentes do `material-ui`, utilizamos o `react-flexbox-grid` para criar a grid responsiva que vai posicionar os inputs.
Criar então 2 rows com 1 column tamanho 12 dentro de cada uma para conter os inputs.
1. Colocar um input para o `title` e um para o `description`. Você pode usar o input de `email` do user como padrão.
1. Mudar strings que referenciavam usuários para categoria:
    - Título do form - Conferir Mobile
    - Labels dos inputs
    - Rotas - sucesso fazer voltar para a rota certa
1. Todos inputs tem 2 atributos para mostrar os erros que vem da API: `error` (boleano) e `helperText` (string).
Para utilizar eles, basta utilizar os metodos `this.hasError()` e `this.getErrorByField()` passando como parametro o nome do campo. A API retorna os erros referentes a cada campo, que são então exibidos debaixo dele.
1. Conferir quais campos são obrigatórios. Você pode fazer isso tentando criar uma nova categoria com todos atributos vazios. A API vai te avisar o que não pode faltar, então você adiciona o atributo `required` ao input, marcando a label dele como obrigatória.
1. Tentar salvar uma nova categoria.
1. Tentar editar uma categoria já existente.
1. Mostrar para o Baraky antes de avançar.

## 4 - Criar novo CRUD completo

Agora que criamos as views de lista e formulário da categoria, vamos criar um CRUD completo, definindo também as rotas e declarando ele no redux.

1. Na pasta de `views`, criar nova pasta com o nome `place`. Esse será nosso CRUD de lugares. Criar também os arquivos de `placeList.js` e `placeForm.js`.
1. Antes de fazer a lista e o form funcionarem, declarar as rotas para esse CRUD.
    - No arquivo `~/src/routes/privateRoutes.js`, adicionar uma linha no retorno da função `PrivateRoutes` com o CRUD de places.
    - No arquivo `~/src/views/components/leftDrawer.js`, adicionar um `MenuItem` levando para a lista de locais. O ícones utilizados são também do `material-ui` e você pode conferir a [documentação](https://material-ui.com/style/icons/#icons) e a [lista de ícones do material design](https://material.io/tools/icons/?style=baseline)
    - Aproveite para alterar a label dos CRUDS na drawer para `Usuários`, `Categorias` e `Lugares`
1. Agora que já é possível navegar para o seu CRUD, vamos criar o reducer e actions para ele. Para isso, basta acrescentar o seguinte objeto no array `endpoints` do arquivo `~/src/actions/actionsConfig`:
    ```javascript
        {
            name: 'place',
            endPoint: '/place',
            nestedKey: 'data',
            prepareToServer: removeUnderlineId,
            prepareToClient: addUnderlineId
        }
    ``` 
    Pronto, agora sua view terá disponível o `placeReducer` e as actions estarão disponíveis no `AppActions.place`.
1. Tentar completar o CRUD de lugares, fazendo a lista e o formulário funcionarem. Mostrar para o Baraky o resultado.
