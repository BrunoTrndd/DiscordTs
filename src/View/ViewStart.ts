import ViewMessage from './ViewMessage';

class ViewStart extends ViewMessage {

    /**
     * @inheritdoc
     */
    public print(): void {
        this.message.reply(' usuário criado, pode ir a caça!');
    } 
    
}

export default ViewStart;