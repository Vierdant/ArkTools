<script lang="ts">
	let darkMode = false;

    const toggle = () => {
		darkMode = !darkMode
        document.body.classList.toggle('dark-theme-variables')
    }
</script>

<button on:click={toggle}>
	{#if !darkMode}
		<span class="material-symbols-sharp">
			mode_night
			</span>
	{:else}
		<span class="material-symbols-sharp">
			light_mode
			</span>
	{/if}
</button>

<style lang="scss">
    button {
		color: var(--color-text);
		background-color: var(--color-background);
		border: 0px;
		border-radius: 10px;
		box-shadow: 4px 4px 10px var(--color-shadow);

		&:hover {
			background-color: var(--color-button-hover);
			color: var(--color-button-hover-text);
			transition: all 0.3s;
		}
	}

	span {
		font-size: 20px;
	}

	.material-symbols-sharp {
        font-variation-settings:
            'FILL' 1,
            'wght' 400,
            'GRAD' 0,
            'opsz' 48
    }
</style>