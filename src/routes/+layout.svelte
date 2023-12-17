<script>
  import "../app.css";
  import Loading from "../lib/components/Loading.svelte";
  import Navbar from "../lib/layouts/Navbar.svelte";
  import { hasLoggedIn, loading } from "../lib/auth";

  let isLoading;
  loading.subscribe((state) => {
    isLoading = state;
  });

  const isLoggedIn = hasLoggedIn();
  const pathname = window.location.pathname;
  if (isLoggedIn === true) {
    if (pathname === "/auth") {
      window.location.replace(window.location.origin);
    } else {
      loading.set(false);
    }
  } else if (isLoggedIn === false) {
    if (pathname !== "/auth") {
      window.location.replace(window.location.origin + "/auth");
    } else {
      loading.set(false);
    }
  }
</script>

{#if isLoading}
  <Loading />
{:else}
  {#if pathname !== "/auth"}
    <Navbar />
  {/if}
  <slot />
{/if}
