<script lang="ts">
    export let type: "primary" | "secondary";
    export let buttonName: string;
    export let disabled: boolean = false;

</script>

<button on:click|preventDefault class={type} disabled={disabled}>{buttonName}</button>

<style lang="scss">

    button {
        font-family: inherit;
        font-size: inherit;
        -webkit-padding: 0.4em 0;
        padding: 0.4em;
        margin: 0 0 0.5em 0;
    }

    .primary {
        background-color: #7289da;
        color: #ffffff;
        border: 0px solid;
        border-radius: 7px;
        box-sizing: border-box;
        outline: none;        

        &:disabled {
            background-color: #2c2f33;
        }

        &:not(:disabled):hover {
            background-color: #8799da;
            transition: all 0.2s;
        }

        &:focus {
            background-color: #a3aed6;
        }
    }

    .secondary {
        background-color: #5cc077;
        color: #ffffff;
        border: 0px solid;
        border-radius: 7px;
        box-sizing: border-box;
        outline: none;        

        &:disabled {
            background-color: #2c2f33;
        }

        &:not(:disabled):hover {
            background-color: #63d48e;
            transition: all 0.2s;
        }

        &:focus {
            background-color: #78d29f;
        }
    }
</style>