<script lang="ts">
	import Sidenav from "./global/Sidenav.svelte";
	
	import StartPage from "./routes/StartPage.svelte"
	import ArkLevelEditorTool from "./routes/arktools/LevelsEditorTool.svelte"
	
    let toggleStates: boolean[] = [ true, false ]

	const togglePages = (details) => {
		toggleStates = Array.from(details.detail)
	}
</script>


<main>
	<Sidenav on:togglePage={togglePages} />
	<div class="main-body">
		{#if toggleStates[0]} <StartPage /> {/if}
		{#if toggleStates[1]} <ArkLevelEditorTool /> {/if}
	</div>
</main>

<style lang="scss">
    main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	.main-body {
		margin-left: 160px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>