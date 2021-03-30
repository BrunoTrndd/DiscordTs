interface InterfaceModelRecord {

    /**
     * Inicializa o template do modelo para que seja feita as operações no banco
     */
    init() : any;

    /**
     * Método aberto(publico) para buscar o template do modelo do banco via outros Controllers
     */
    getModel() : any;

    /**
     * Recebe um Json com os dados para ser feito a inserção do registro no banco de dados
     * @param info 
     */
    addRecord(info: any) : any;

    /**
     * Busca o registro no banco de dados de acordo com o id passado como parâmetro
     * @param id 
     */
    getRecord(info : any) : Promise<any>;

    /**
     * Busca o registro de acordo com a sua descrição (name, description, etc...)
     * @param desc 
     */
    getRecordByDescription(desc : string) : Promise<any>;

}

export default InterfaceModelRecord;