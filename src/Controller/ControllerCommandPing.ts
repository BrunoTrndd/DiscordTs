import { ControllerCommand } from "./ControllerBaseCommand";

class ControllerCommandPing extends ControllerCommand {

    public static commandsAlias : string[] = ['ping', 'pi'];
 
    getDescription(): string {
        return 'pingou'
    }

    execute(...args: any): void {
        this.factoryMessage.getViewPing(args[0], args[1]).print();
    }
    
}
 
module.exports = ControllerCommandPing;