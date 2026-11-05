Ficha 4 – API de Cartas

Para executar o projeto
São necessários dois terminais.

Terminal 1 – Server
Na pasta principal do projeto, executar:
node --watch server.js
O servidor fica disponível em http://localhost:3000.

Terminal 2 – Client
Na pasta client executar:
npm run dev
A aplicação React fica disponível em http://localhost:5173.

Pergunta 3 – CORS

Quem bloqueia o pedido é o browser, através do CORS. O servidor consegue responder com os dados em JSON, mas sem o header Access-Control-Allow-Origin o browser impede que o JavaScript da aplicação React aceda à resposta. Sei que o problema é do CORS porque o endereço da API abre diretamente no browser, mas o fetch é bloqueado.

Pergunta 4 – Comparação com a Ficha 3

Na versão inicial da Ficha 4, a aplicação faz um pedido ao servidor quando abre e não faz novos pedidos ao filtrar, porque os dados já estão guardados no React. Os dados das cartas vêm do servidor e o HTML é construído pelo React no cliente.
Nesta versão também implementei o Extra 2, por isso o filtro por tipo faz um novo pedido ao servidor sempre que é alterado. A pesquisa pelo nome continua a ser feita localmente.
 
 
