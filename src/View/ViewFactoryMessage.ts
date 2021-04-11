import { Message } from 'discord.js';
import ViewPing from './ViewPing';
import ViewShop from './ViewShop';
import ViewInventory from './ViewInventory';
import ViewError from './ViewError';
import ViewBuy from './ViewBuy';
import ViewBattle from './ViewBattle';
import ViewStart from './ViewStart';
import ViewProfile from './ViewProfile';

class ViewFactoryMessage {
    /** 
     * @param message Mensagem do discord em objeto
     * @param content O que será mostrado ao usuário
     * @returns ViewPing
     */
     public getViewPing(message : Message, content : any = 'Pingou') : ViewPing {
        return new ViewPing(message, content);
    }
    
    /**
     * @param message 
     * @param content 
     * @returns ViewError
     */
    getViewError(message : Message, content : any) {
        return new ViewError(message, content);
    }
    
    /** 
     * @param message 
     * @param content 
     * @returns ViewInventory
     */
    public getViewIntentory(message: Message, content: any) {
        return new ViewInventory(message, content);
    }
    
    /** 
     * @param message 
     * @param content 
     * @returns ViewShop
     */
    public getViewShop(message: Message, content: any) : ViewShop {
        return new ViewShop(message, content);
    }

    
    /** 
     * @param message 
     * @param content 
     * @returns ViewBuy
     */
    public getViewBuy(message : Message, content : any) : ViewBuy{
        return new ViewBuy(message, content);
    }

    /** 
     * @param message 
     * @param content 
     * @returns ViewBattle
     */
    public getViewBattle(message : Message, content : any) : ViewBattle{
        return new ViewBattle(message, content);
    }

    /**
     * @param message 
     * @param content 
     * @returns ViewStart
     */
    public getViewStart(message : Message, content : any) : ViewStart{
        return new ViewStart(message, content);
    }

    /**
     * @param message 
     * @param content 
     * @returns 
     */
    getViewProfile(message : Message, content : any) {
        return new ViewProfile(message, content);
    }

}

export default ViewFactoryMessage;