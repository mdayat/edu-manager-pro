<script>
  import { handleLogOut } from "../lib/auth";
</script>

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
