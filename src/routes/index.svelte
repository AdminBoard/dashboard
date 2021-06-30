<script lang="ts">
	import Drawer, { AppContent, Content } from "@smui/drawer";
	import List, { Item, Text } from "@smui/list";
</script>

<div class="drawer-container">
	<Drawer>
		<Content>
			<div class="menu">
				<List>
					<Item href="/test"><Text>Test</Text></Item>
					<!-- <Item href="javascript:void(0)" on:click={() => (clicked = 'Gray Kittens')}>
						<Text>Gray Kittens</Text>
					</Item> -->
				</List>
			</div>
		</Content>
	</Drawer>

	<AppContent class="app-content">
		<main class="main-content">
			App content.
			<br />
			<pre class="status">Clicked: </pre>
		</main>
	</AppContent>
</div>

<style lang="scss">
	.drawer-container {
		// position: relative;
		display: flex;
		height: 350px;
		// max-width: 600px;
		border: 1px solid
			var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
		overflow: hidden;
		z-index: 0;
	}

	.menu {
		width: 120px;
	}
	// * :global(.app-content) {
	// 	flex: auto;
	// 	overflow: auto;
	// 	position: relative;
	// 	flex-grow: 1;
	// }

	.main-content {
		overflow: auto;
		padding: 16px;
		height: 100%;
		box-sizing: border-box;
	}
</style>
