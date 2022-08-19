<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import NavComponent from "../components/nav/NavComponent.svelte";

    let toggleStates: boolean[] = [ true ]

    let dispatch = createEventDispatcher();

    const handleToggles = (details) => {
        toggleStates = Array.from(details.detail)

        dispatch("togglePage", details.detail)
    }
    
</script>

<aside>
    <div class="top">
        <div class="logo">
            <NavComponent activeTool={false} toolId="0" on:toggleChange={handleToggles}>
                <img slot="image" src="../assets/icon.png" alt="Program Icon" width="105.5" height="105.5">
            </NavComponent>
        </div>
    </div>
    <div class="sidebar">
            <NavComponent activeTool={toggleStates[1]} toolId="1" on:toggleChange={handleToggles}>
                <h3><span class="material-symbols-sharp">
                    arrow_forward_ios
                    </span> Ark: Levels</h3>
            </NavComponent>
            <NavComponent activeTool={toggleStates[2]} toolId="1" on:toggleChange={handleToggles}>
                <h3><span class="material-symbols-sharp">
                    arrow_forward_ios
                    </span> Placeholder</h3>
            </NavComponent>
            <NavComponent activeTool={toggleStates[3]} toolId="1" on:toggleChange={handleToggles}>
                <h3><span class="material-symbols-sharp">
                    arrow_forward_ios
                    </span> Placeholder</h3>
            </NavComponent>
    </div>
</aside>


<style lang="scss">


    .material-symbols-sharp {
        font-variation-settings:
            'FILL' 100,
            'wght' 400,
            'GRAD' 0,
            'opsz' 48
    }

    aside {
  		height: 100%;
 		width: 160px;
  		position: fixed;
  		z-index: 2;
  		top: 0;
  		left: 0;
  		background-color: var(--color-background); /* Black */
  		overflow: hidden; /* Disable horizontal scroll */
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        box-shadow: 4px 4px 10px var(--color-shadow);
        user-select: none;

        .top {
            margin-top: 10px;
        }

        .sidebar {
            display: flex;
            flex-direction: column;
            height: 86vh;
            position: relative;
            overflow: overlay;
            top: 2rem;
            align-items: baseline;
            margin-left: 4px;

            &::-webkit-scrollbar {
                width: 5px;
            }
            
            &::-webkit-scrollbar-thumb {
                background: rgb(90, 93, 94);
                border-radius: 2px;
            } 
        }

        span {
            font-size: small;
        }

        h3 {
            font-size: medium;
        }

	}
</style>