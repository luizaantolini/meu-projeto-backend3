/* 
a palavra-chave export é usada para exportar a classe Player 
para que ela possa ser utilizada em outros arquivos do projeto.
A palavra-chave class é usada para definir uma classe em TypeScript.
*/
export class Player {
    // ATRIBUTOS DA CLASSE PLAYER
    /* a palavra chave "public" é usada para definir propriedades públicas da classe,
    que podem ser acessadas de fora da classe
    */
    public name: string; //nome
    public health: number; //vida
    public level: number; //nível

    // CONSTRUTOR DA CLASSE PLAYER
    /* o construtor é um método especial que é chamado quando uma nova instância da classe é criada
    */
    constructor(name: string, health: number = 100, level: number = 1) {
        /* a palavra-chave "this" é usada para se referir a instância atual da classe, ou seja,
        "pegue o atributo 'health' da classe player e atribua o valor de 'health = 100' à ele"
        */
        this.name = name; //inicializa o nome do player
        this.health = health; //inicializa a vida do player
        this.level = level; //inicializa o nível do player
    }

    // MÉTODOS DA CLASSE PLAYER
    /* os métodos são funções que pertencem a uma classe e podem ser chamadas em instâncias da classe
    */
    // o método 'attack' é usado para atacar outro jogador, reduzindo sua vida
    public attack(): string {
        const damage = this.level * 10; // calcula o dano causado pelo ataque
        /* a palavra-chave "return" é usada para retornar um valor de uma função ou método, neste caso, uma string
        */
        return `O player ${this.name} atacou e causou ${damage} de dano!`; // retorna uma mensagem informando o ataque
    }

    // o método 'takeDamage' é usado para receber dano de outro jogador, reduzindo a vida do jogador
    public takeDamage(damage: number): string {
        this.health -= damage; // reduz a vida do jogador pelo valor do dano recebido
        if (this.health <= 0) { // verifica se a vida do jogador chegou a zero ou menos
            this.health = 0; // garante que a vida não fique negativa
            return `O player ${this.name} foi derrotado!`; 
        }
        return `O player ${this.name} recebeu ${damage} de dano e agora tem ${this.health} de vida!`; 
    }

    // o método 'takeHeal' é usado para curar o jogador, aumentando sua vida
    public takeHeal(heal: number): string {
        if (typeof heal !== "number" || heal <= 0) {
            return `Valor de cura inválido.`;
        }
        if (this.health <= 0) {
            return `O player ${this.name} está derrotado e não pode ser curado.`;
        }

        // ajusta vida e limite máximo (ex.: 100)
        const maxHealth = 100;
        const previous = this.health;
        this.health = Math.min(this.health + heal, maxHealth);
        const recovered = this.health - previous;

        return `O player ${this.name} recuperou ${recovered} de vida. Vida atual: ${this.health}.`;
    }
}