<script lang="ts">
	import "../styles/app.scss";

	import Snackbar, { Actions, Label } from "@smui/snackbar";
	import IconButton from "@smui/icon-button";
	import snackbar from "$lib/snackbar";
	import { post } from "$lib/api";

	let snackbarWithClose;
	let snackbarMsg;

	snackbar.notify = (msg) => {
		snackbarMsg = msg;
		snackbarWithClose.open();
	};
</script>

<main>
	<slot />
	<Snackbar bind:this={snackbarWithClose}>
		<Label>{snackbarMsg}</Label>
		<Actions>
			<IconButton class="material-icons" title="Dismiss">
				close
			</IconButton>
		</Actions>
	</Snackbar>
</main>
