export function clickOutside(node: HTMLElement) {
	function detect(evt: any) {
		if (!node.contains(evt.target)) {
			node.dispatchEvent(new CustomEvent('clickOutside'));
		}
	}
	document.addEventListener('click', detect, { passive: true, capture: true });
	return {
		destroy() {
			document.removeEventListener('click', detect);
		}
	};
}
