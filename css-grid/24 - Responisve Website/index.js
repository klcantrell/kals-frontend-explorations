(function() {
  function whenUserClicksMenuBtn(e) {
    openIcon.classList.toggle("menu__icon--hidden");
    closeIcon.classList.toggle("menu__icon--hidden");
    const menuExpanded =
      menuBtn.getAttribute("aria-expanded") === "true" || false;
    menuBtn.setAttribute("aria-expanded", !menuExpanded);
  }

  const menu = document.querySelector(".menu");
  const menuBtn = menu.querySelector(".menu__toggler");
  const openIcon = menu.querySelector(".open");
  const closeIcon = menu.querySelector(".close");

  menuBtn.addEventListener("click", whenUserClicksMenuBtn);
})();
