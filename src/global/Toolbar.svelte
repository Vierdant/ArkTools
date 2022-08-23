<script lang="ts">
    import ThemeButton from "../components/ThemeButton.svelte";
    export let name: string;
    export let link: string;


</script>

<nav>
    <div class="left">
        {#if name != "null"}
            <span class="material-symbols-sharp">
                videogame_asset
                </span>
            <span> Wiki: <a target="_blank" href={link}>{name}</a></span>
        {/if}
    </div>
    <div class="right">
        <ThemeButton />
    </div>
</nav>

<style lang="scss">

    .left {
        display: inline-flex;
        flex-direction: row;
        left: 0;
        position: absolute;
        margin-left: calc(160px + 25px);

        a {
            color: var(--color-text);
        }
    }

    .right {
        display: inline-flex;
        flex-direction: row-reverse;
        height: 25px;
        right: 0;
        position: absolute;
        margin-right: 25px;
    }

    nav {
        gap: 1px;
        //background-color: var(--color-background);
        margin: 0;
        padding: 0;
        list-style-type: none;
        align-items: flex-end;
        height: 25px;
        width: 100%;
    }

    .material-symbols-sharp {
        font-variation-settings:
            'FILL' 100,
            'wght' 400,
            'GRAD' 0,
            'opsz' 48
    }
</style>