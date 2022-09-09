var modalEl = document.querySelector("#modal");


function modal(event) {
    console.log('click')
    openModal()
    document.querySelector("#close").addEventListener("click", closeModal)
    document.querySelector(".delete").addEventListener("click", closeModal)
}

    // Functions to open and close a modal
    function openModal() {
      modalEl.classList.add('is-active');
    }
    function closeModal($el) {
        modalEl.classList.remove('is-active');
    }
  

  document.querySelector("#add-post-btn").addEventListener("click", modal);