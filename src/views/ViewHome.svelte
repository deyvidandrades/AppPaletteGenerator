<script lang="ts">
    import { Link2 } from "lucide-svelte";
    import { onMount } from "svelte";

    import { type AndroidTheme, changeDefaultColor, type ColorDictionary, generatePalette, getDefaultColor, project } from "@/lib";
    import ItemCardPalette from "@/components/ItemCardPalette.svelte";

    let inputValue: string = $state("#9452ff");
    let baseColor: string = $state("");

    let arrayDictKeys: Array<string> = $state([]);
    let arrayDictValues: Array<string> = $state([]);
    let arrayDictValuesDark: Array<string> = $state([]);

    let baseTheme: AndroidTheme | undefined = $state();
    let colorDictionary: ColorDictionary | undefined = $state();
    let colorDictionaryDark: ColorDictionary | undefined = $state();

    onMount(() => {
        inputValue = getDefaultColor();
        updateColors();
    });

    function updateColors() {
        baseColor = inputValue;
        baseTheme = generatePalette(baseColor);

        arrayDictKeys = [];
        arrayDictValues = [];
        arrayDictValuesDark = [];

        colorDictionary = baseTheme.light;
        colorDictionaryDark = baseTheme.dark;

        for (const key in colorDictionary) {
            if (Object.prototype.hasOwnProperty.call(colorDictionary, key)) {
                const value = colorDictionary[key as keyof typeof colorDictionary];
                const valueDark = colorDictionaryDark[key as keyof typeof colorDictionaryDark];
                arrayDictKeys.push(key);
                arrayDictValues.push(value);
                arrayDictValuesDark.push(valueDark);
            }
        }
    }
</script>

<main class="h-fit flex justify-center bg-base-300">
    <div class="flex flex-col gap-4 w-6xl px-2">
        <div class="hero bg-base-200 min-h-96 rounded-b-2xl shadow">
            <div class="hero-content text-center">
                <div class="max-w-xs md:max-w-lg">
                    <div class="avatar pb-6">
                        <div class="mask mask-squircle w-24 p-4" style="background-color: {baseColor};">
                            <img src={project.faviconSVG} alt="favicon" />
                        </div>
                    </div>
                    <h1 class="text-5xl font-bold">{project.title}</h1>
                    <p class="pt-6 pb-3">{project.description}</p>
                    <p class="">{project.version}</p>

                    <fieldset class="fieldset my-6 w-full">
                        <legend class="fieldset-legend">Just pick a color here:</legend>
                        <input
                            class="input w-full rounded-xl"
                            bind:value={inputValue}
                            oninput={() => {
                                changeDefaultColor(inputValue);
                                updateColors();
                            }}
                            type="color"
                            placeholder="Type here"
                        />
                    </fieldset>

                    <div class="breadcrumbs max-w-xs md:max-w-lg text-sm flex justify-center mb-6">
                        <ul>
                            {#each project.links_nav as item}
                                <li><a href={item.url} target={item.is_new_tab ? "_blank" : ""}> <Link2 size={16} /> {item.text} </a></li>
                            {/each}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {#if baseTheme != undefined}
            <ItemCardPalette theme={baseTheme} />
        {/if}
    </div>
</main>
