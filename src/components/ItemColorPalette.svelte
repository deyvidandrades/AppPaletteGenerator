<script lang="ts">
    import { copyColorToClipboard } from "@/lib";
    import { Copy } from "lucide-svelte";

    let { title, color, onColor, isSingleColor = false, isSlim = false }: { title: string; color: string; onColor: string; isSingleColor?: boolean; isSlim?: boolean } = $props();
</script>

<div class="gap-4 border-1 border-base-300 {isSlim ? 'min-h-14' : ''}" style="background-color: {color};">
    <div class="col-span-1 w-full p-1 h-fit {isSlim ? 'min-h-14' : 'min-h-26'} font-medium" style=" color: {onColor};">
        <div class="flex justify-between w-full">
            <p class="flex flex-wrap max-w-48 text-lg px-4 my-auto">{title}</p>

            <div class="tooltip tooltip-accent" data-tip={color}>
                <button
                    class="btn btn-circle btn-ghost"
                    onclick={() => {
                        copyColorToClipboard(color);
                    }}
                >
                    <Copy />
                </button>
            </div>
        </div>
    </div>

    {#if !isSingleColor}
        <div class="col-span-1 w-full h-15 font-medium flex p-1" style="background-color: {onColor}; color: {color};">
            <div class="flex justify-between w-full my-auto">
                <p class="px-4 my-auto">On{title}</p>

                <div class="tooltip tooltip-accent" data-tip={onColor}>
                    <button
                        class="btn btn-circle btn-ghost"
                        onclick={() => {
                            copyColorToClipboard(onColor);
                        }}
                    >
                        <Copy />
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>
