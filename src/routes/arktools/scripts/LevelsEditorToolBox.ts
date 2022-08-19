import type { GameFile, GameUserFile } from "../ArkFiles";

export class PlayerLevelsGen {

    file: GameFile;
    maxLevel: number;
    baseValue: number;
    IncreasePercentMin: number;
    IncreasePercentMax: number;
    AIncreasePercentMin: number;
    AIncreasePercentMax: number;
    AIincreaseAfterLvl: number;

    constructor(file: GameFile, maxLevel: number, baseValue: number, IncreasePercentMin: number, IncreasePercentMax: number, AIncreasePercentMin: number, AIncreasePercentMax: number, AIincreaseAfterLvl: number) {
        this.file = file;
        this.maxLevel = maxLevel;
        this.baseValue = baseValue;

        this.IncreasePercentMin = IncreasePercentMin == undefined ? 0 : IncreasePercentMin;
        this.IncreasePercentMax = IncreasePercentMax == undefined ? 0 : IncreasePercentMax;
        this.AIncreasePercentMin = AIncreasePercentMin == undefined ? 0 : AIncreasePercentMin;
        this.AIncreasePercentMax = AIncreasePercentMax == undefined ? 0 : AIncreasePercentMax;
        this.AIincreaseAfterLvl = AIincreaseAfterLvl == undefined ? 0 : AIincreaseAfterLvl;



    }

    public async run() {
        const levelSet: string[] = [];
        let xp: number = 0;
        let overrideMax = "OverrideMaxExperiencePointsPlayer=";
        let rampOverrieds = "LevelExperienceRampOverrides=(";
        // main loop
        for (let i = 0; i <= this.maxLevel; i++) {
            const inceasePercentage = this.getRandomInt(this.IncreasePercentMin, this.IncreasePercentMax);
            
            // increase with baseValue
            xp = this.baseValue + xp;
            // increase with normal percentage value
            xp = (inceasePercentage / 100) * xp + xp;
            // increase with advanced percentage value
            if (this.AIincreaseAfterLvl != -1 && i > this.AIincreaseAfterLvl) {
                const advancedPercentage = this.getRandomInt(this.AIncreasePercentMin, this.AIncreasePercentMax);
                xp = (advancedPercentage / 100) * xp + xp;
            }
            // ensure floored values
            xp = Math.floor(xp);

            levelSet.push(`ExperiencePointsForLevel[${i}]=${xp}`)
        }

        overrideMax = overrideMax + (xp + this.baseValue)
        rampOverrieds = rampOverrieds + levelSet.join() + ")"

        this.file.writeMultiple(overrideMax, rampOverrieds);

    }

    private getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
}


export class DinoLevelsGen {

    file: GameFile;
    maxLevel: number;
    baseValue: number;
    IncreasePercentMin: number;
    IncreasePercentMax: number;
    AIncreasePercentMin: number;
    AIncreasePercentMax: number;
    AIincreaseAfterLvl: number;

    constructor(file: GameFile, maxLevel: number, baseValue: number, IncreasePercentMin: number, IncreasePercentMax: number, AIncreasePercentMin: number, AIncreasePercentMax: number, AIincreaseAfterLvl: number) {
        this.file = file;
        this.maxLevel = maxLevel;
        this.baseValue = baseValue;

        this.IncreasePercentMin = IncreasePercentMin == undefined ? 0 : IncreasePercentMin;
        this.IncreasePercentMax = IncreasePercentMax == undefined ? 0 : IncreasePercentMax;
        this.AIncreasePercentMin = AIncreasePercentMin == undefined ? 0 : AIncreasePercentMin;
        this.AIncreasePercentMax = AIncreasePercentMax == undefined ? 0 : AIncreasePercentMax;
        this.AIincreaseAfterLvl = AIincreaseAfterLvl == undefined ? 0 : AIincreaseAfterLvl;



    }

    public async run() {
        const levelSet: string[] = [];
        let xp: number = 0;
        let overrideMax = "OverrideMaxExperiencePointsDino=";
        let rampOverrieds = "LevelExperienceRampOverrides=(";
        // main loop
        for (let i = 0; i <= this.maxLevel; i++) {
            const inceasePercentage = this.getRandomInt(this.IncreasePercentMin, this.IncreasePercentMax);
            
            // increase with baseValue
            xp = this.baseValue + xp;
            // increase with normal percentage value
            xp = (inceasePercentage / 100) * xp + xp;
            // increase with advanced percentage value
            if (this.AIincreaseAfterLvl != -1 && i > this.AIincreaseAfterLvl) {
                const advancedPercentage = this.getRandomInt(this.AIncreasePercentMin, this.AIncreasePercentMax);
                xp = (advancedPercentage / 100) * xp + xp;
            }
            // ensure floored values
            xp = Math.floor(xp);

            levelSet.push(`ExperiencePointsForLevel[${i}]=${xp}`)
        }

        overrideMax = overrideMax + (xp + this.baseValue)
        rampOverrieds = rampOverrieds + levelSet.join() + ")"

        this.file.writeMultiple(overrideMax, rampOverrieds);

    }

    private getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
}


export class WildDinoGen {

    file: GameUserFile
    difficulty: number;

    constructor(file: GameUserFile, difficulty: number) {
        this.file = file;
        this.difficulty = difficulty;
    }

    public async run() {
        this.file.writeMultiple("[ServerSettings]", "DifficultyOffset=1.0", `OverrideOfficialDifficulty=${this.difficulty}`);
    }
}

export class EngramsGen {

    file: GameFile
    maxLevel: number
    baseValue: number
    increaseValue: number
    multiplyIncrease: boolean
    AIncreaseValue: number
    AIncreaseLvl: number
    multiplyAIncrease: boolean
    skippable: number
    skipuntil: number;

    constructor(file: GameFile, maxLevel: number, baseValue: number, increaseValue: number, multiplyIncrease: boolean, AIncreaseValue: number, AIncreaseLvl: number, multiplyAIncrease: boolean, skippable: number, skipuntil: number) {
        this.file = file
        this.maxLevel = maxLevel
        this.baseValue = baseValue
        this.increaseValue = increaseValue == undefined ? 0 : increaseValue
        this.multiplyIncrease = multiplyIncrease == undefined ? false : multiplyIncrease
        this.AIncreaseValue = AIncreaseValue == undefined ? 0 : AIncreaseValue
        this.AIncreaseLvl = AIncreaseLvl == undefined ? 0 : AIncreaseLvl
        this.multiplyAIncrease = multiplyAIncrease == undefined ? false : multiplyAIncrease
        this.skippable = skippable == undefined ? 0 : skippable
        this.skipuntil = skipuntil == undefined ? 0 : skipuntil
    }

    public async run() {
        let value: number = this.baseValue;
        // main loop e for skipping
        for (let i = 0, e = 0; i <= this.maxLevel; i++, e++) {
            if (i < this.skipuntil) {
                if (e < this.skippable) {
                    this.file.write(`OverridePlayerLevelEngramPoints=${value}`)
                    continue;
                }
                // reset skip counter
                e = 0;
            }

            value += this.multiplyIncrease ? this.increaseValue * i : this.increaseValue;

            if (this.AIncreaseLvl != -1 && i > this.AIncreaseLvl) {
                value += this.multiplyAIncrease ? this.AIncreaseValue * i : this.AIncreaseValue;
            }

            this.file.writeMultiple(`OverridePlayerLevelEngramPoints=${value}`);
        }
    }
}