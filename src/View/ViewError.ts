import ViewMessage from "./ViewMessage";

class ViewError extends ViewMessage{
        
    public print(): void { }
    
    /**
     * Mensagem que é disparada quando não é achado o nome da loja que o usuario digita
     */
    public printErrorShopNotFound() {
        this.message.reply(` a loja ${this.response} não existe!`);
    }
    
    /**
     * Mensagem que é disparada quando não é achado o nome do item
     */
    public printErrorItemNotFound() {
        this.message.reply(` o item ${this.response} não existe!`);
    }
    
    /**
     * Mensagem que é disparada quando não é achado o nome do item ao realizar a compra
     */
    public printErrorItemNotForSale() {
        this.message.reply(` o item ${this.response} não está a venda!`);
    }
    
    /**
     * Mensagem que é disparada quando o jogador não tem o dinheiro suficiente para realizar a compra
     * @param price preço da compra
     * @param having dinheiro atual
     */
    public printErrorNotEnoughtMoney(price: number, having: any) {
        this.message.reply(` são necessários ${price} Copper(s) para completar a compra, você tem ${having}.`);
        
    }
    
    /**
     * Mensagem que é disparada quando não é achado o monstro para o duelo
     */
    public printErrorMonsterNotExists() {
        this.message.reply(` o monstro ${this.response} não existe para duelo.`);
    }

    /**
     * Mensagem que é disparada quando o jogador está morto e tenta iniciar uma batalha
     */
    public printErrorPlayerIsDead() {
        this.message.reply(` Você está sem vida, use a estalagem ou uma poção para ir a batalha!`)
    }
    
    /**
     * Mensagem que é disparada quando o jogador tenta iniciar o jogo novamente
     */
    public printErrorPlayerIsAlreadyCreated() {
        this.message.reply(` o seu usuário já foi criado!`);
    }

    /**
     * Mensagem que irá aparecer quando tentar usar um item que não está no inventario
     */
    printErrorItemNotInInventory() {
        this.message.reply(` o item ${this.response} não está no seu inventario.`);
    }

    /**
     * Mensgem que aparece quando tenta usar um item que não é de cura
     */
    printErrorItemIsNotHealable() {
        this.message.reply(` esse item não um consumível.`);
    }

}

export default ViewError;