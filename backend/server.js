//Importando a lib Express
//Framework muito utlizado para criar servidores e API no Node
//Facilita a criação de rotas e tratamento de requisições HTTP
const express = require("express")

//Importando a lib jsonwebtoken(JWT)
const jwt = require("jsonwebtoken")

//Importanto a lib Cors
//CORS permite que aplicações de outros domínios(nosso app React Native)
//acesse a API sem bloqueio
const cors = require("cors")

//Cria uma aplicação Express
//Iniciando configuração do nosso servidor backend
const app = express()

//Permitir que o servidor entenda requisições de dados em JSON
//Ex: Quando o cliente envia e-mail e senha no login
app.use(express.json())

//Habilita o CORS para permitir requisições externas.
//Sem o CORS configurado, apps com web e mobile poderiam ser bloqueados ao 
//acessar a api
app.use(cors())

//Chave secreta usada para gerar e validar os tokens JWT
//Funciona com assinatura digital do token
//Geralmente fica em uma variável de ambiente.
const  SECRET = "segredo_jwt_aula"

//ROTA DE LOGIN
//Essa rota vai receber e-mail e senha, estando tudo correto é gerado JWT
// e retornado para nosso APP
app.post("/login",(req,res)=>{
    //Mostrar o que usário tentou fazer login
    console.log("Requisições de login recebida...")

    //Pega os dados enviados no corpo da requisição(body)
    //{"email":"admin@email.com","senha":"123456"}
    const{email,senha}=req.body

    //Simulando usuário cadastrado no sistema
    if(email==="admin@email.com" && senha === "123456"){
        //Vamos gerar o JWT
        //Token possui informações do usuário
        const token = jwt.sign(
            //Payload -> Dados que serão armazenado dentro do token
            //Armazenando somente e-mail, nesse exemplo
            {email:email},
            //Chave secreta para assinar o token
            //Servidor usará essa mesma chave depois para validar o token
            SECRET,

            //Configurações adicionais
            {
                expiresIn:"10s" //Token expira em uma hora
            }
        )
       //Enviado o token para o cliente
       //o Cliente guarda o token(Async Storage) 
       //Enviá-lo nas próximas requisições protegidas
       return res.json({token})
    }

    //Se o email ou senha estiverem incorretos
    //Retornamos erro 401(não autorizado)
    return res.status(401).json({error:"Crendencias inválidas"})

})

//ROTA PROTEGIDA

//Essa rota somente será acessada se o cliente enviar um token JWT válido

app.get("/perfil",(req,res)=>{
    //Pegamos o Header Authorization da requisição
    //Header contém o token JWT enviado pelo cliente
    //Authorization: Bearer TOKEN
    const authHeader = req.headers.authorization

    if(!authHeader){
        //retornamos erro 401 (não autorizado)
        return res.status(401).json({error:"Crendencias inválidas"})
    }

    //O header vem no Bearer TOKEN
    //Usamos a função split para separar pelo espaço
    //Em seguida pegamos somente o token
    const token = authHeader.split(" ")[1]

    try{
        //Verificar se o token é válido
        const decoded = jwt.verify(token,SECRET)
        
        //Mostra no console o conteúdo do token
        console.log("Token validado: ", decoded)

        //Se o token for válido, vamos liberar o acesso
        return res.json({
            message:"Acesso permitido",
            //decoded contém os dados que estavam dentro do token
            user:decoded
        })
    }catch{
        return res.status(401).json({error:"Token Inválido"})
    }
})

//INICIANDO SERVIDOR
app.listen(3000,()=>{
    console.log("Servidor rodando na porta 3000")
})