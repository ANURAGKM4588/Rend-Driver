<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Router & Deployment Guidelines
- **NEVER clear or mutate `window.location.hash`**: This project uses `@tanstack/react-router` with hash history (`createHashHistory()`). Never add code (such as `window.history.replaceState`) that strips `window.location.hash` on load/refresh, as this corrupts routing and causes a blank screen on GitHub Pages.
- **Fallback Components**: Always ensure `NotFoundComponent` and `ErrorComponent` render visible fallback UI components rather than returning empty elements.

