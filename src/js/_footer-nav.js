document.querySelectorAll("[data-footer-nav-toggler]").forEach((btn) => {
	btn.addEventListener("click", () => {
		const targetId = btn.getAttribute("aria-controls");
		const nav = document.getElementById(targetId);
		const isOpen = btn.getAttribute("aria-expanded") === "true";

		btn.setAttribute("aria-expanded", (!isOpen).toString());
		nav.classList.toggle("_active");
	});
});