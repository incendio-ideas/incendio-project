<script lang="ts">
  import { page } from '$app/stores';
  import { trpc } from '$lib/trpc/client';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<pre>
  {JSON.stringify(data, null, 2)}
</pre>
