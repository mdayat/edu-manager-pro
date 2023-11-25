<script>
  import Loading from "../lib/components/Loading.svelte";
  import { handleLogOut, hasLoggedIn, loading } from "../lib/auth";

  let isLoading;
  loading.subscribe((state) => {
    isLoading = state;
  });

  const isLoggedIn = hasLoggedIn();
  if (isLoggedIn === false) {
    window.location.replace(window.location.origin + "/auth");
  } else {
    loading.set(false);
  }
</script>

{#if isLoading}
  <Loading />
{:else}
  <h1>Hello From Home Page</h1>
  <button type="button" on:click={handleLogOut}>Log Out</button>

  <style>
    h1 {
      color: salmon;
      font-size: 24px;
      font-weight: 700;
      text-align: center;
    }
  </style>
{/if}
