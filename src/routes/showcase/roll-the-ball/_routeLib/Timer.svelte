<script lang="ts">
	import { status, time } from "./state";
	let interval: ReturnType<typeof setInterval>;
	let delta = 0;
	let startTime: number;
	function reset(){
		if (interval){
			clearInterval(interval);
			delta = 0;
		}
	}
	
	function pause(){
		if (interval){
			clearInterval(interval);
		}
	}
	
	function start(){
		startTime = Date.now();
		interval = setInterval(() => {
			delta = (Date.now() - startTime) / 1000
		}, 50)
	}
	$: if ($status === "IDLE") {
		reset();
	} else if ($status === "PLAYING") {
		start();
	} else if ($status === "DONE"){
		pause();
	}
	
	$:	$time = delta.toFixed(2);
</script>