<script lang="ts">
    export let info: string;
</script>

<div class="infobox">
	<span class="material-symbols-sharp">
		help
		</span>
    <span class="infotext">{info}</span>
</div>

<style lang="scss">
    .infobox {
  		display: inline-flex;
		flex-direction: column;
        margin-right: 5px;
		float: inline-end;
        user-select: none;
	
        &:hover .infotext {
			visibility: visible;
  		    opacity: 0.9;
		}
	}

	/* Tooltip text */
	.infobox .infotext {
  		opacity: 0;
		visibility: hidden;
  		width: 350px;
  		background-color: #23272A;
  		color: #fff;
  		text-align: center;
  		padding: 5px;
 		border-radius: 6px;
		margin-left: 10px;
		margin-top: -16px;
  		position: absolute;
  		z-index: 1;
		transition: all 0.2s;
	}

	.material-symbols-sharp {
        font-variation-settings:
            'FILL' 1,
            'wght' 400,
            'GRAD' 0,
            'opsz' 48;
		font-size: 12px;
		width: 8px;
		color: var(--color-header-background);
    }

</style>