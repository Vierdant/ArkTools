<style lang="scss" src="./styles/LevelsEditorToolStyle.scss"></style>
<script lang="ts">
    import { open } from "@tauri-apps/api/dialog";
    import Toolbar from "../../global/Toolbar.svelte"
    import { fade } from 'svelte/transition';
    import { GameFile, GameUserFile } from "./ArkFiles";
    import { DinoLevelsGen, EngramsGen, PlayerLevelsGen, WildDinoGen } from "./scripts/LevelsEditorToolBox";
    import Infobox from "../../components/Infobox.svelte";
    import MainButton from "../../components/MainButton.svelte";

    /* DISPLAY CONTROLS */
    let displayPlayerLevels: boolean = true;
    let displayDinoLevels: boolean = false;
    let displayWildDinoLevels: boolean = false;
    let displayEngrams: boolean = false;
    let displayOutputBox: boolean = false;

    /* SECTION VALIDATORS */
    let validPlayerLevels: boolean = false;
    let validDinoLevels: boolean = false;
    let validWildDinoLevels: boolean = false;
    let validEngrams: boolean = false;

    /* PLAYER LEVELS */
    // toggles
    let playerCanFillForm: boolean = false;
    // max level
    let playerMaxLevel: number;
    // base value
    let playerBaseValue: number;
    // increase percentage
    let playerIPercentMin: number;
    let playerIPercentMax: number;
    // advanced increase percentage
    let playerAIncreaseLvl: number; // after level
    let playerAIPercentMin: number;
    let playerAIPercentMax: number;
    let canTypeAIncreaseValues: boolean = true;

    /* TAMED DINO LEVELS */
    // toggles
    let dinoCanFillForm: boolean = false;
    // max level
    let dinoMaxLevel: number;
    // base value
    let dinoBaseValue: number;
    // increase percentage
    let dinoIPercentMin: number;
    let dinoIPercentMax: number;
    // advanced increase percentage
    let dinoAIncreaseLvl: number; // after level
    let dinoAIPercentMin: number;
    let dinoAIPercentMax: number;
    let canTypeAIncreaseValuesDino: boolean = true;

    /* WILD DINO LEVLES */
    // max level
    let wildDinoMaxLevel: number = 150;
    // readonly values
    let readOnlyWildLootScale: string;
    let readOnlyWildDifficultyValue: number;
    let readOnlyWildDifficultyOffset: number = 1.00;
    let readOnlyWildOverrideOfficialDifficulty: number;
    let readOnlyWildMaxTekLevel: number;
    let readOnlyWildMaxWyvernLevel: number;
    let readOnlyWildMaxCrystalWyvernLevel: number;

    /* CUSTOM ENGRAMS */
    // toggles
    let engramsCanFillForm: boolean = false;
    // base value
    let engramBaseValue: number;
    // increase
    let engramIncreaseValue: number;
    let engramMultiplyIncreaseValue: boolean = false;
    // advanced increase
    let engramMultiplyAIncreaseValue: boolean = false;
    let engramAIncreaseValue: number;
    let engramAIncreaseLvl: number;
    let canTypeAIncreaseValuesEngram: boolean = false;
    // skippable
    let engramSkippable: number;
    let engramSkippableUntil: number;

    let genPath: string;

    const generate = async () => {
        const path = await open({
            directory: true,
            multiple: false,
            filters: [{ name: "Config", extensions: ["yml", "json"] }],
        });
        if (!Array.isArray(path) && path !== null) genPath = path;
        
        let gameFile = new GameFile(genPath);
        let gameUserFile = new GameUserFile(genPath);
        if (validPlayerLevels) {
            await new PlayerLevelsGen(gameFile, playerMaxLevel, playerBaseValue, playerIPercentMin, playerIPercentMax, playerAIPercentMin, playerAIPercentMax, playerAIncreaseLvl).run();
            gameFile.write("\n");
        }
        if (validDinoLevels) {
            await new DinoLevelsGen(gameFile, dinoMaxLevel, dinoBaseValue, dinoIPercentMin, dinoIPercentMax, dinoAIPercentMin, dinoAIPercentMax, dinoAIncreaseLvl).run();
            gameFile.write("\n");
        }
        if (validWildDinoLevels) {
            await new WildDinoGen(gameUserFile, readOnlyWildOverrideOfficialDifficulty).run();
        }
        if (validEngrams) {
            await new EngramsGen(gameFile, playerMaxLevel, engramBaseValue, engramIncreaseValue, engramMultiplyIncreaseValue, engramAIncreaseValue, engramAIncreaseLvl, engramMultiplyAIncreaseValue, engramSkippable, engramSkippableUntil).run();
        }
        

        gameFile.update();
        gameUserFile.update();
    }



    $: {
        /* PLAYER LEVELS */
        // ensure no illegal values
        playerMaxLevel = playerMaxLevel < 1  && playerMaxLevel != null ? 1 : playerMaxLevel;
        playerBaseValue = playerBaseValue < 1  && playerBaseValue != null ? 1 : playerBaseValue;
        playerAIncreaseLvl = playerAIncreaseLvl < 1  && playerAIncreaseLvl != null ? 1 : playerAIncreaseLvl;
        
        // toggle inputs
        canTypeAIncreaseValues = (playerAIncreaseLvl != null);
        playerCanFillForm = (playerMaxLevel != null);

        
        /* DINO LEVELS */
        // ensure no illegal values
        dinoMaxLevel = dinoMaxLevel < 1  && dinoMaxLevel != null ? 1 : dinoMaxLevel;
        dinoBaseValue = dinoBaseValue < 1  && dinoBaseValue != null ? 1 : dinoBaseValue;
        dinoAIncreaseLvl = dinoAIncreaseLvl < 1  && dinoAIncreaseLvl != null ? 1 : dinoAIncreaseLvl;
        
        // toggle inputs
        canTypeAIncreaseValuesDino = (dinoAIncreaseLvl != null);
        dinoCanFillForm = (dinoMaxLevel != null);


        /* WILD DINO LEVELS */
        // ensure no illegal values
        wildDinoMaxLevel = wildDinoMaxLevel < 1  && wildDinoMaxLevel != null ? 1 : wildDinoMaxLevel;
        
        // readonly variables changes
        readOnlyWildLootScale = Math.floor(3.33337 * wildDinoMaxLevel) + "%";
        readOnlyWildDifficultyValue = wildDinoMaxLevel / 30;
        readOnlyWildOverrideOfficialDifficulty = wildDinoMaxLevel / 30;
        readOnlyWildMaxTekLevel = Math.floor((20 / 100) * wildDinoMaxLevel + wildDinoMaxLevel);
        readOnlyWildMaxWyvernLevel = Math.floor((26.67 / 100) * wildDinoMaxLevel + wildDinoMaxLevel);
        readOnlyWildMaxCrystalWyvernLevel = Math.floor((50 / 100) * wildDinoMaxLevel + wildDinoMaxLevel);


        /* CUSTOM ENGRAMS */
        engramBaseValue = engramBaseValue < 1  && engramBaseValue != null ? 1 : engramBaseValue;
        engramSkippable = engramSkippable < 1  && engramSkippable != null ? 1 : engramSkippable;
        engramSkippableUntil = engramSkippableUntil < 1  && engramSkippableUntil != null ? 1 : engramSkippableUntil;
        canTypeAIncreaseValuesEngram = (engramAIncreaseLvl != null);

        // toggle inputs
        engramsCanFillForm = (engramBaseValue != null);

    
        /* VALIDATORS */
        validPlayerLevels = (playerMaxLevel != undefined && playerBaseValue != undefined) 
                            && ((playerIPercentMin != undefined && playerIPercentMax != undefined) || (playerIPercentMin == undefined && playerIPercentMax == undefined)) 
                            && ((playerAIncreaseLvl != undefined && playerAIPercentMin != undefined && playerAIPercentMax != undefined) || (playerAIncreaseLvl == undefined && playerAIPercentMin == undefined && playerAIPercentMax == undefined));
        validDinoLevels = (dinoMaxLevel != undefined && dinoBaseValue != undefined) 
                            && ((dinoIPercentMin != undefined && dinoIPercentMax != undefined) || (dinoIPercentMin == undefined && dinoIPercentMax == undefined)) 
                            && ((dinoAIncreaseLvl != undefined && dinoAIPercentMin != undefined && dinoAIPercentMax != undefined) || (dinoAIncreaseLvl == undefined && dinoAIPercentMin == undefined && dinoAIPercentMax == undefined));
        validWildDinoLevels = (wildDinoMaxLevel != null && wildDinoMaxLevel != 150)
        validEngrams = (engramBaseValue != undefined && validPlayerLevels)
                            && ((engramIncreaseValue != undefined) || (engramIncreaseValue == undefined))
                            && ((engramSkippable != undefined) || (engramSkippable == undefined))
                            && ((engramAIncreaseLvl != undefined && engramAIncreaseValue != undefined) || (engramAIncreaseLvl == undefined && engramAIncreaseValue == undefined));


        /* OUTPUT BOX */
        displayOutputBox = (playerMaxLevel != undefined || dinoMaxLevel != undefined || validWildDinoLevels || engramBaseValue != undefined)
                            && (validPlayerLevels || validDinoLevels || validWildDinoLevels || validEngrams)
                            && ((playerMaxLevel != undefined && validPlayerLevels) || (playerMaxLevel == undefined && !validPlayerLevels))
                            && ((dinoMaxLevel != undefined && validDinoLevels) || (dinoMaxLevel == undefined && !validDinoLevels))
                            && ((engramBaseValue != undefined && validEngrams) || (engramBaseValue == undefined && !validEngrams))
    }
</script>

<Toolbar link="https://survivetheark.com" name="Ark: Survival Evolved"/>
<h1>Ark: Levels Editor</h1>

<div class="displayCheckbox" on:click={() => displayPlayerLevels = !displayPlayerLevels}>
    <span class="material-symbols-sharp">
        {#if displayPlayerLevels}
            expand_less
        {:else}
            expand_more
        {/if}
        </span>
    Include Player Levels
</div>

{#if displayPlayerLevels}
    <div class="playerlevels" transition:fade>
        <h3>Player Levels</h3>
        <div class="inputDiv">
            
            <span><Infobox
                info="none"/>
                Max Level: </span>
            <input bind:value={playerMaxLevel} class="defaultInput" type="number" placeholder="Max Player lvl">
        </div>
        <div class="inputDiv">
            <span><Infobox
                info="none"/>
                Base Value: </span>
            <input bind:value={playerBaseValue} class="defaultInput" type="number" placeholder="Base Value" disabled={!playerCanFillForm}>
        </div>
        <div class="inputDiv">
            <span><Infobox
                info="none"/>
                Increase Percentage: </span>
            <input bind:value={playerIPercentMin} class="defaultInput smallInput" type="number" placeholder="Min %" disabled={!playerCanFillForm}>
            <input bind:value={playerIPercentMax} class="defaultInput smallInput" style="margin-left: 16px;" type="number" placeholder="Max %" disabled={!playerCanFillForm}>
        </div>
        <div class="inputDiv">
            <span style="font-size: 13.7px;"><Infobox
                info="none"/>
                (A) Increase Percentage: </span>
            <input bind:value={playerAIPercentMin} class="defaultInput smallInput" type="number" placeholder="Min %" disabled={!canTypeAIncreaseValues}>
            <input bind:value={playerAIPercentMax} class="defaultInput smallInput" style="margin-left: 16px;" type="number" placeholder="Max %" disabled={!canTypeAIncreaseValues}>
            <input bind:value={playerAIncreaseLvl} class="defaultInput smallInput" style="margin-left: 16px;" type="number" placeholder="After lvl" disabled={!playerCanFillForm}>
        </div>
    </div>
{/if}

<div class="displayCheckbox" on:click={() => displayDinoLevels = !displayDinoLevels}>
    <span class="material-symbols-sharp">
        {#if displayDinoLevels}
            expand_less
        {:else}
            expand_more
        {/if}
        </span>
    Include Tamed Dino Levels
</div>

{#if displayDinoLevels}
    <div class="dinolevels" transition:fade>
        <h3>Tamed Dino Levels</h3>
        <div class="inputDiv">
            <span><Infobox
                info="none"/>
                Max Level: </span>
            <input bind:value={dinoMaxLevel} class="defaultInput" type="number" placeholder="Max Dino lvl">
        </div>
        <div class="inputDiv">
            <span><Infobox
                info="none"/>
                Base Value: </span>
            <input bind:value={dinoBaseValue} class="defaultInput" type="number" placeholder="Base Value" disabled={!dinoCanFillForm}>
        </div>
        <div class="inputDiv">
            <span><Infobox
                info="none"/>
                Increase Percentage: </span>
            <input bind:value={dinoIPercentMin} class="defaultInput smallInput" type="number" placeholder="Min %" disabled={!dinoCanFillForm}>
            <input bind:value={dinoIPercentMax} class="defaultInput smallInput" style="margin-left: 16px;" type="number" placeholder="Max %" disabled={!dinoCanFillForm}>
        </div>
        <div class="inputDiv">
            <span style="font-size: 13.7px;"><Infobox
                info="none"/>
                (A) Increase Percentage: </span>
            <input bind:value={dinoAIPercentMin} class="defaultInput smallInput" type="number" placeholder="Min %" disabled={!canTypeAIncreaseValuesDino}>
            <input bind:value={dinoAIPercentMax} class="defaultInput smallInput" style="margin-left: 16px;" type="number" placeholder="Max %" disabled={!canTypeAIncreaseValuesDino}>
            <input bind:value={dinoAIncreaseLvl} class="defaultInput smallInput" style="margin-left: 16px;" type="number" placeholder="After lvl" disabled={!dinoCanFillForm}>
        </div>
    </div>
{/if}

<div class="displayCheckbox" on:click={() => displayWildDinoLevels = !displayWildDinoLevels}>
    <span class="material-symbols-sharp">
        {#if displayWildDinoLevels}
            expand_less
        {:else}
            expand_more
        {/if}
        </span>
    Include Wild Dino Levels
</div>

{#if displayWildDinoLevels}
    <div class="wildDinolevels" transition:fade>
        <h3>Wild Dino Levels</h3>
        <div class="inputDiv">
            <span><Infobox
                info="none"/>
                Max Level: </span>
            <input bind:value={wildDinoMaxLevel} class="defaultInput" type="number" placeholder="Max Dino lvl">
        </div>
    </div>
    <div class="referenceInnerTableWDL">
        <span class="referenceSpan">Reference Variables</span>
        <div class="innerContentWDL">
            <div class="inputDiv">
                <span>
                    Loot Scale: </span>
                <input bind:value={readOnlyWildLootScale} class="defaultInput readonlyInput" type="string" readonly={true} placeholder="Loot scale">
            </div>
            <div class="inputDiv">
                <span>
                    Difficulty Value: </span>
                <input bind:value={readOnlyWildDifficultyValue} class="defaultInput readonlyInput" type="number" readonly={true} placeholder="Difficulty Value">
            </div>
            <div class="inputDiv">
                <span>
                    Difficulty Offset: </span>
                <input bind:value={readOnlyWildDifficultyOffset} class="defaultInput readonlyInput" type="number" readonly={true} placeholder="Difficulty Offset">
            </div>
            <div class="inputDiv">
                <span>
                    Override Official Difficulty: </span>
                <input bind:value={readOnlyWildOverrideOfficialDifficulty} class="defaultInput readonlyInput" type="number" readonly={true} placeholder="Override Official Difficulty">
            </div>
            <div class="inputDiv">
                <span>
                    Max Tek Level: </span>
                <input bind:value={readOnlyWildMaxTekLevel} class="defaultInput readonlyInput" type="number" readonly={true} placeholder="Max Tek Level">
            </div>
            <div class="inputDiv">
                <span>
                    Max Wyvern Level: </span>
                <input bind:value={readOnlyWildMaxWyvernLevel} class="defaultInput readonlyInput" type="number" readonly={true} placeholder="Max Wyvern Level">
            </div>
            <div class="inputDiv">
                <span>
                    Max Crystal Wyvern Level: </span>
                <input bind:value={readOnlyWildMaxCrystalWyvernLevel} class="defaultInput readonlyInput" type="number" readonly={true} placeholder="Max Crystal Wyvern Level">
            </div>
        </div>
    </div>
{/if}

<div class="displayCheckbox" on:click={() => displayEngrams = !displayEngrams}>
    <span class="material-symbols-sharp">
        {#if displayEngrams}
            expand_less
        {:else}
            expand_more
        {/if}
        </span>
    Include Custom Engrams
</div>

{#if displayEngrams}
    <div class="engramsGen" transition:fade>
        <h3>Custom Engrams</h3>
        <div class="inputDiv">
            <span><Infobox
                info="none"/>
                Base Value: </span>
            <input bind:value={engramBaseValue} class="defaultInput" type="number" placeholder="Base Value">
        </div>
        <div class="inputDiv">
            <span><Infobox
                info="none"/>
                Increase: </span>
            <input bind:value={engramIncreaseValue} class="defaultInput" type="number" placeholder="Amount" disabled={!engramsCanFillForm}>
        </div>
        <div class="inputDiv">
            <span><Infobox
                info="none"/>
                Advanced Increase: </span>
            <input bind:value={engramAIncreaseValue} class="defaultInput" type="number" placeholder="Amount" disabled={!canTypeAIncreaseValuesEngram}>
            <input bind:value={engramAIncreaseLvl} class="defaultInput smallInput" style="margin-left: 16px;" type="number" placeholder="After lvl" disabled={!engramsCanFillForm}>
            
        </div>
        <div class="inputDiv">
            <span style="padding-bottom: 12px;"><Infobox
                info="none"/>
                Level Multiply: </span>
            <input type="checkbox" name="engramMultiplyIncreaseValue" bind:checked={engramMultiplyIncreaseValue} disabled={!engramsCanFillForm}>
            Normal
            <input type="checkbox" name="engramMultiplyIncreaseValue" bind:checked={engramMultiplyAIncreaseValue} disabled={!canTypeAIncreaseValuesEngram}>
            Advanced
        </div>
        <div class="inputDiv">
            <span><Infobox
                info="none"/>
                Skippable: </span>
            <input bind:value={engramSkippable} class="defaultInput smallInput" type="number" placeholder="Amount" disabled={!engramsCanFillForm}>
            <input bind:value={engramSkippableUntil} class="defaultInput smallInput" style="margin-left: 16px;" type="number" placeholder="Until" disabled={!engramsCanFillForm}>
        </div>
    </div>
{/if}

<div class="outputToolbox" class:display={displayOutputBox}>
    <h3>Session Info</h3>
    <div class="sessionInfo">
        {#if validPlayerLevels}
            <div class="sessionEntry">
                <span class="sessionSpanLabel">Max Player Levels:</span>
                <span class="sessionSpan">{playerMaxLevel}</span>
            </div>
        {/if}
        {#if validDinoLevels}
            <div class="sessionEntry">
                <span class="sessionSpanLabel">Max Tamed Dino Levels:</span>
                <span class="sessionSpan">{dinoMaxLevel}</span>
            </div>
        {/if}
        {#if validWildDinoLevels}
            <div class="sessionEntry">
                <span class="sessionSpanLabel">Max Wild Dino Levels:</span>
                <span class="sessionSpan">{wildDinoMaxLevel}</span>
            </div>
        {/if}
        {#if validEngrams}
            <div class="sessionEntry">
                <span class="sessionSpanLabel">Engrams:</span>
                <span class="sessionSpan">{engramBaseValue} / {engramIncreaseValue} / {engramSkippable}</span>
            </div>
        {/if}
    </div>
    <MainButton type="secondary" buttonName="Generate" on:click={generate} />
</div>