<h1 align="center"> <b style="color:white"> Autenticação JWT - API REST</b> </h1>

![Badge em Desenvolvimento](https://img.shields.io/badge/license-napolifabrizio-green)
![Badge em Desenvolvimento](https://img.shields.io/badge/status-desenvolvimento-yellow)

<section>
<h2><b>Descrição do Projeto</b></h2>

Faaaalaaaa, primeiramente queria dizer que esse projeto funciona com uma coleção do banco de dados MongoDB.

<p>
O projeto é uma API REST (-_-) onde crio uma API normal com verificação. Ela faz a criação de usuários, onde confere se o email já possui cadastro, se não tiver, então uma conta é criada Na criação a senha literal não é guardada no banco, o que fica guardado é uma hash da senha e quando ele for logar, a aplicação compara a hash guardada no banco com a hash da senha que o usuário está colocando para logar. Onde cada funcionalidade acompanha uma rota http.
</p><br>
</section>

<section>
<h2><b>Funcionalidades</b></h2>

<p>
 1 - Cadastrar usuário na aplicação.

 2 - Criptografar sua senha, e descriptografar para autentucação.

 3 - Criação do Token, para verificação.
</p>
</section>

<section>
<h2><b>Tecnologias Utilizadas</b></h2>
<p>
Esse projeto foi feito somente com javascript, usando o framework Express do NodeJs e o banco de dados Mongo DB.

Dependências: mongoose, bcrypt, dotenv, jsonwebtoken, nodemon e express

</p>
</section>

<section>
<h2>Atualizações</h2>
    <h4>27/09/2023</h4> - Começando implementação do cadastro de usuários.
    <h4>29/09/2023</h4> - Cadastro feito, criptografia das senhas e começando o login dos usuários.
    <h4>02/10/2023</h4> - Desenvolvimento do login e criação do token.
    <h4>02/10/2023</h4> - Desenvolvimento completo do conteúdo, faltando apenas organizar a estrutura - arquitetura do projeto.
    <h4>09/10/2023</h4> - Primeira parte da estrutura feita - dividindo o projeto em vários arquivos, cada um com sua função.
    <h4>10/10/2023</h4> - Segunda parte da estrutura feita - o projeto acaba aqui, cada arquivo possui sua função, trazendo um código muito mais limpo e legível.
</section>

<section>
<h2><b>Observações</b></h2>
    <h3>
    Primeira:
    </h3>
    No projeto, contém um arquivo .env, onde ele guarda informações de login do administrador, porém esse arquivo está oculto no .gitignore
    <br>
    
<h3>
Segunda:
</h3>
O projeto não possui frontend, ele é apenas backend onde é possivel utilizar em programas que dão suporte ás requisições feitas pela API, como o postman. Por enquanto não pretendo fazer frontend para o projeto.
    




