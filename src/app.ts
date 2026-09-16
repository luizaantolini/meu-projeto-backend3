// Importa a biblioteca Express e também o tipo Express
// O Express será utilizado para criar o servidor web
import express from "express";
import type { Express, Request, Response} from "express";

// importar a classe Player do arquivo Player.ts
/* Por que Player.ts deve ser importado com a extensão .js?
Porque o TypeScript, quando compila para JavaScript, 
gera arquivos .js. Portanto, ao importar um módulo TypeScript 
em outro arquivo TypeScript, você deve usar a extensão .js 
para que o Node.js consiga localizar o arquivo corretamente.
*/
import { Player } from "./models/Player.js"; 

// Cria uma aplicação Express
// A função express() devolve um objeto que representa o servidor da aplicação
const app: Express = express();

/* Middleware para permitir que o servidor aceite requisições com corpo em formato JSON
*/
app.use(express.json());

// Define a porta onde o servidor ficará disponível
// Neste caso, o servidor poderá ser acessado pela porta 8081
const PORT: number = 8081;

const player: Player = new Player("Luiza", 100, 1);

// Rota GET para obter informações de um jogador
/* quando um usuário acessar a rota "/player", 
o servidor irá retornar suas informações em formato JSON
*/
app.get("/player", (req: Request, res: Response) => {
    res.json({
        message: `Informações do player:`,
        player: player,
    });
});

// Rota POST para atacar o player
/* quando o usuario acessar a rota "/player/attack" via POST, o servidor irá executar o método attack() do jogador e retornar a mensagem de ataque em formato JSON. */
app.post("/player/attack", (req: Request, res: Response) => {
    // Executa o método attack() do jogador e retorna a mensagem de ataque
    const attackMessage = player.attack();
    res.json({ 
        message: attackMessage, 
    });
});

// Rota POST para causar dano ao player
/* quando o usuario acessar a rota "/player/damage" via POST, o servidor irá executar o método takeDamage() 
do jogador e retornar a mensagem de dano em formato JSON. */
app.post("/player/damage", (req: Request, res: Response) => {
    // Se o player já está derrotado, impede novos danos
    if (player.health <= 0) {
        return res.json({
            action: `player ${player.name} já está derrotado e não pode sofrer mais dano!`,
            currenthealth: 0,
            currentLevel: player.level
        });
    }

    const { damage } = req.body;
    player.takeDamage(damage);

    // Se a vida zerou ou ficou negativa, trava em 0 e avisa da derrota
    if (player.health <= 0) {
        player.health = 0;
        return res.json({ 
            action: `O player ${player.name} foi derrotado! Ele não poderá reviver.`,
            currenthealth: player.health,
            currentLevel: player.level
        });
    }

    res.json({ 
        action: `O player ${player.name} recebeu ${damage} de dano!`,
        currenthealth: player.health,
        currentLevel: player.level
    });
});

// Rota POST para recarregar a vida do player se ainda não estiver zerada e for menor que 30
app.post("/player/heal", (req: Request, res: Response) => {
    const {heal} = req.body;
    const healMessage = player.takeHeal(heal);
    res.json({ 
        action: healMessage,
        currentHealth: player.health,
        currentLevel: player.level
    });
});

// Inicializa o servidor utilizando a porta definida
// O método listen() faz o servidor começar a "escutar" requisições HTTP
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log("Rotas disponíveis:");
    console.log(`GET http://localhost:${PORT}/player - Obter informações do jogador`);
    console.log(`POST http://localhost:${PORT}/player/attack - Atacar o jogador`);
    console.log(`POST http://localhost:${PORT}/player/damage - Causar dano ao jogador`);
    console.log(`POST http://localhost:${PORT}/player/heal - Recarregar a vida do jogador`);
});