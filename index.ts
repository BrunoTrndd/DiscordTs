import { Bot } from './src/bot'
import {Conf} from './src/Model/Config/config'
const bot = new Bot(Conf.prefix, Conf.apiKey);
bot.listen().then(()=>{
    console.log('Bot Logado');
})
.catch(error=>{
    console.log(`Ooops, bugo ein: ${error}`);
});