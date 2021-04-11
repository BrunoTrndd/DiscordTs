import ModelBase from "./ModelBase";

abstract class ModelBaseStatus extends ModelBase {

    protected status : any;

    async prepareModel(info : any) : Promise<void>{
        this.status = await this.getRecord(info);
    }

    /**
     * Formula for Players and Monsters: Strenght  *---  + buffs - debuffs (yet to be implemented)---*
     */
    public calcStrenght() : any {
        return this.status.strenght;
    }

    /**
     * Formula for Players : round(strenght * 0,5) + equips + buffs - debuffs
     * Formula for Monsters : round(strenght * 1,5) + buffs - debuffs
     */
    abstract calcAttack() : any;
    /**
     * Formula for Players : agility + equips + buffs - debuffs
     * Formula for Monsters : agility + buffs - debuffs
     */
    abstract calcAgility() : any;

    /**
     * @todo implemetar iniciativa
     */
    abstract calcAspd() : any;

    /**
     * @todo quando for feito esquiva     
     */
    abstract calcDexterity() : any;

    /**
     * @todo quanfo for feito esquiva
     */
    abstract calcAccuracy() : any;

    /**
     * @todo quando for feito magias
     */
    abstract calcIntelligence() : any;

    /**
     * @todo quando for feito magias
     */
    abstract calcMagicAttack() : any;

    /**
     * Formula for Players : round(vitality * 0,8) + equips + buffs - debuffs
     * Formula for Monsters : vitality * 2 + buffs - debuffs
     */
    abstract calcDefense() : any;

    /**
     * @todo quando for feito magias
     */
    abstract calcMagicDefense() : any;

}

export default ModelBaseStatus;