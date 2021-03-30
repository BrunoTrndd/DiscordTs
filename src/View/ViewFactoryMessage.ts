import { Message } from 'discord.js';
import ViewPing from './ViewPing';
import ViewShop from './ViewShop';
import ViewInventory from './ViewInventory';
import ViewError from './ViewError';
import ViewBuy from './ViewBuy';
import ViewBattle from './ViewBattle';

class ViewFactoryMessage {
    
    /**
     * 
     * @param message 
     * @param content 
     * @returns 
     */
    getViewError(message : Message, content : any) {
        return new ViewError(message, content);
    }
    
    /**
     * 
     * @param message 
     * @param content 
     * @returns 
     */
    public getViewIntentory(message: Message, content: any) {
        return new ViewInventory(message, content);
    }
    
    /**
     * 
     * @param message 
     * @param content 
     * @returns 
     */
    public getViewShop(message: Message, content: any) : ViewShop {
        return new ViewShop(message, content);
    }

    /**
     * 
     * @param message 
     * @param content 
     * @returns 
     */
    public getViewPing(message : Message, content : any = '') : ViewPing {
        return new ViewPing(message, content);
    }
    
    /**
     * 
     * @param message 
     * @param content 
     * @returns 
     */
    public getViewBuy(message : Message, content : any) : ViewBuy{
        return new ViewBuy(message, content);
    }
    
    public getViewBattle(message : Message, content : any) : ViewBattle{
        return new ViewBattle(message, content);
    }
}

export default ViewFactoryMessage;