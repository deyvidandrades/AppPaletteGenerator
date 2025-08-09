<script lang="ts">
    import { Router, Route } from "svelte-routing";
    import { ViewHome } from "@/views";
    import { ItemFooter } from "@/components";
    import { getDefaultColor, project } from "@/lib";

    let { url }: { url: string } = $props();
</script>

<svelte:head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" href={project.faviconURL} />
    <title>{project.title}</title>

    <meta name="description" content={project.description} />
    <meta name="keywords" content={project.keywords} />
    <meta name="author" content={project.author} />

    <meta property="og:title" content={project.title} />
    <meta property="og:description" content={project.description} />
    <meta property="og:image" content={project.banner} />
    <meta property="og:url" content={project.url} />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content={project.banner} />
    <meta name="twitter:title" content={project.title} />
    <meta name="twitter:description" content={project.description} />
    <meta name="twitter:image" content={project.faviconURL} />
    <meta name="twitter:site" content={project.author} />

    <meta name="theme-color" content={getDefaultColor()} />
</svelte:head>

<div class="h-screen">
    <Router {url}>
        <Route path="/*" replace><ViewHome /></Route>
    </Router>

    <ItemFooter projectTitle={project.title} projectVersion={project.version} />
</div>
