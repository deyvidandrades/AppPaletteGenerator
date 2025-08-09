<script lang="ts">
    let { projectTitle, projectVersion }: { projectTitle: string; projectVersion: string } = $props();
</script>

<footer class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content py-4">
    <aside>
        <p>{projectTitle} - {projectVersion} - <a href="https://x.com/deyvid_andrades" target="_blank"><b>@deyvidandrades</b></a></p>
    </aside>
</footer>
