import { ControllerCommand } from "./ControllerBaseCommand";

class ControllerCommandPing extends ControllerCommand {

    /** Utilizado para comparação do comando do player */
    public static commandsAlias : string[] = ['ping', 'pi'];
 
    /**
     * @inheritdoc
     */
    getDescription(): string {
        return 'pingou'
    }

    /**
     * Comando de exemplo, ele só chama a mensagem e responde com o ping da api
     */
    execute(...args: any): void {
        //Chama a factory, para criar a view de ping, 
        //que manda uma mensagem no chat do canal onde o bot está logado.
        this.factoryMessage.getViewPing(args[0], args[1]).print();
    }
    
}
 
module.exports = ControllerCommandPing;