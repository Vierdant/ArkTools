<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let activeTool: boolean = false;
    export let toolId: string = "0";

    let dispatch = createEventDispatcher();

    const handleClick = () => {
        const toggles: boolean[] = [
            false,
            false
        ];

        toggles[toolId] = true;

        dispatch("toggleChange", toggles)
    }

</script>

<div class="image" class:active={activeTool} on:click={handleClick}>
    <slot name="image" />
</div>
<div class="tool" class:active={activeTool} on:click={handleClick}>
    <slot />
</div>

<style lang="scss">

    .tool {
        transition: all 300ms ease;

        &:hover:not(.active) {
            margin-left: 0.5rem;
        }
    }

    .active {
        background-color: rgba(#648cb3, 0.3);
        min-width: 150px;
        margin-left: 2px;
        display: flex;

        &::before {
            content: '';
            width: 6px;
            height: 100%;
            background: #648cb3;
        }
    }
</style>