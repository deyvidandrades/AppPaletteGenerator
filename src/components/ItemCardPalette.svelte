<script lang="ts">
    import { onMount } from "svelte";
    import { Copy, Download, Moon, Sun } from "lucide-svelte";

    import { ItemColorPalette } from ".";
    import { type AndroidTheme, type ColorDictionary, copyThemeToClipboard, downloadThemeKt } from "@/lib";

    let { theme }: { theme: AndroidTheme } = $props();

    let isDark: boolean = $state(false);
    let colorDictionary: ColorDictionary | undefined = $state();

    onMount(() => {
        updateUI();
    });

    $effect(() => {
        updateUI();
    });

    function updateUI() {
        colorDictionary = isDark ? theme.dark : theme.light;
    }

    async function copyToClipboard() {
        await copyThemeToClipboard(theme);
    }
    function downloadTheme() {
        downloadThemeKt(theme);
    }
</script>

<section>
    <div class="card bg-base-100 shadow border-base-200">
        <div class="card-body">
            <div class="flex justify-between w-full mb-4">
                <div class="flex flex-wrap gap-2">
                    <h1 class="text-4xl font-medium mt-1">{isDark ? "Dark" : "Light"} Palette</h1>
                </div>

                <div class="flex flex-wrap gap-2">
                    <button class="btn" onclick={copyToClipboard}> <Copy /> Copy</button>
                    <button class="btn" onclick={downloadTheme}> <Download /> Export (Colors.kt)</button>
                    <label class="swap swap-rotate btn btn-circle rounded-2xl">
                        <!-- this hidden checkbox controls the state -->
                        <input type="checkbox" bind:checked={isDark} onchange={updateUI} class="theme-controller" value="black" />

                        <!-- sun icon -->
                        <Sun class="swap-on" />

                        <!-- moon icon -->
                        <Moon class="swap-off" />
                    </label>
                </div>
            </div>

            {#if colorDictionary != undefined}
                <div class="grid grid-cols-1 gap-1">
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-1">
                        <ItemColorPalette title="Primary" color={colorDictionary.primary} onColor={colorDictionary.onPrimary} />
                        <ItemColorPalette title="Secondary" color={colorDictionary.secondary} onColor={colorDictionary.onSecondary} />
                        <ItemColorPalette title="Tertiary" color={colorDictionary.tertiary} onColor={colorDictionary.onTertiary} />
                        <ItemColorPalette title="Error" color={colorDictionary.error} onColor={colorDictionary.onError} />

                        <ItemColorPalette title="Primary Container" color={colorDictionary.primaryContainer} onColor={colorDictionary.onPrimaryContainer} />
                        <ItemColorPalette title="Secondary Container" color={colorDictionary.secondaryContainer} onColor={colorDictionary.onSecondaryContainer} />
                        <ItemColorPalette title="Tertiary Container" color={colorDictionary.tertiaryContainer} onColor={colorDictionary.onTertiaryContainer} />
                        <ItemColorPalette title="Error Container" color={colorDictionary.errorContainer} onColor={colorDictionary.onErrorContainer} />
                    </div>

                    <div class="grid grid-cols-2 lg:grid-cols-3 gap-1">
                        <ItemColorPalette title="Surface Dim" color={colorDictionary.surfaceDim} onColor={colorDictionary.onSurface} isSingleColor={true} />
                        <ItemColorPalette title="Surface" color={colorDictionary.surface} onColor={colorDictionary.onSurface} isSingleColor={true} />
                        <ItemColorPalette title="Surface Bright" color={colorDictionary.surfaceBright} onColor={colorDictionary.onSurface} isSingleColor={true} />
                    </div>

                    <div class="grid grid-cols-2 lg:grid-cols-5 gap-1">
                        <ItemColorPalette title="Surface Container Lowest" color={colorDictionary.surfaceContainerLowest} onColor={colorDictionary.onSurface} isSingleColor={true} />
                        <ItemColorPalette title="Surface Container Low" color={colorDictionary.surfaceContainerLow} onColor={colorDictionary.onSurface} isSingleColor={true} />
                        <ItemColorPalette title="Surface Container" color={colorDictionary.surfaceContainer} onColor={colorDictionary.onSurface} isSingleColor={true} />
                        <ItemColorPalette title="Surface Container High" color={colorDictionary.surfaceContainerHigh} onColor={colorDictionary.onSurface} isSingleColor={true} />
                        <ItemColorPalette title="Surface Container Highest" color={colorDictionary.surfaceContainerHighest} onColor={colorDictionary.onSurface} isSingleColor={true} />
                    </div>

                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-1">
                        <ItemColorPalette title="On Surface" color={colorDictionary.onSurface} onColor={colorDictionary.surface} isSingleColor={true} isSlim={true} />
                        <ItemColorPalette title="On Surface Variant" color={colorDictionary.onSurfaceVariant} onColor={colorDictionary.surface} isSingleColor={true} isSlim={true} />
                        <ItemColorPalette title="Outline" color={colorDictionary.outline} onColor={colorDictionary.surface} isSingleColor={true} isSlim={true} />
                        <ItemColorPalette title="Outline Variant" color={colorDictionary.outlineVariant} onColor={colorDictionary.onSurface} isSingleColor={true} isSlim={true} />
                    </div>

                    <div class="grid grid-cols-2 lg:grid-cols-5 gap-1">
                        <ItemColorPalette title="Inverse Surface" color={colorDictionary.inverseSurface} onColor={colorDictionary.surface} isSingleColor={true} isSlim={true} />
                        <ItemColorPalette title="Inverse Surface" color={colorDictionary.onInverseSurface} onColor={colorDictionary.onSurface} isSingleColor={true} isSlim={true} />
                        <ItemColorPalette title="Inverse Primary" color={colorDictionary.inversePrimary} onColor={colorDictionary.onSurface} isSingleColor={true} isSlim={true} />
                        <ItemColorPalette title="Scrim" color={colorDictionary.scrim} onColor={colorDictionary.surface} isSingleColor={true} isSlim={true} />
                        <ItemColorPalette title="Shadow" color={colorDictionary.shadow} onColor={colorDictionary.surface} isSingleColor={true} isSlim={true} />
                    </div>
                </div>
            {/if}
        </div>
    </div>
</section>
