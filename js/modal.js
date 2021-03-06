
(function () {
    // This is not a production ready code, just serves as an example
    // of how the focus should be controlled within the modal dialog.
    var currentDialog = null;
    var lastFocus = null;
    var ignoreFocusChanges = false;
    var focusAfterClose = null;
  
    // Traps the focus within the currently open modal dialog
    function trapFocus(event) {
      if (ignoreFocusChanges) return;
  
      if (currentDialog.contains(event.target)) {
        lastFocus = event.target;
      } else {
        focusFirstDescendant(currentDialog);
        if (lastFocus == document.activeElement) {
          focusLastDescendant(currentDialog);
        }
        lastFocus = document.activeElement;
      }
    }
  
    // Attempts to focus given element
    function attemptFocus(child) {
      if (child.focus) {
        ignoreFocusChanges = true;
        child.focus();
        ignoreFocusChanges = false;
        return document.activeElement === child;
      }
  
      return false;
    }
  
    // Focuses first child element
    function focusFirstDescendant(element) {
      for (var i = 0; i < element.childNodes.length; i++) {
        var child = element.childNodes[i];
        if (attemptFocus(child) || focusFirstDescendant(child)) {
          return true;
        }
      }
      return false;
    }
  
    // Focuses last child element
    function focusLastDescendant(element) {
      for (var i = element.childNodes.length - 1; i >= 0; i--) {
        var child = element.childNodes[i];
        if (attemptFocus(child) || focusLastDescendant(child)) {
          return true;
        }
      }
      return false;
    }
  
    /**
      Toggles visibility of modal dialog.
      @param {HTMLElement} modal Modal dialog to show or hide.
      @param {HTMLElement} sourceEl Element that triggered toggling modal
      @param {Boolean} open If defined as `true` modal will be opened, if `false` modal will be closed, undefined toggles current visibility.
    */
    function toggleModal(modal, sourceEl, open) {
      if (modal && modal.classList.contains('p-modal')) {
        if (typeof open === 'undefined') {
          open = modal.style.display === 'none';
        }
  
        if (open) {
          currentDialog = modal;
          modal.style.display = 'flex';
          focusFirstDescendant(modal);
          focusAfterClose = sourceEl;
          document.addEventListener('focus', trapFocus, true);
        } else {
          modal.style.display = 'none';
          if (focusAfterClose && focusAfterClose.focus) {
            focusAfterClose.focus();
          }
          document.removeEventListener('focus', trapFocus, true);
          currentDialog = null;
        }
      }
    }
  
    // Find and hide all modals on the page
    function closeModals() {
      var modals = [].slice.apply(document.querySelectorAll('.p-modal'));
      modals.forEach(function (modal) {
        toggleModal(modal, false, false);
      });
    }
  
    // Add click handler for clicks on elements with aria-controls
    document.addEventListener('click', function (event) {
      var targetControls = event.target.getAttribute('aria-controls');
      if (targetControls) {
        toggleModal(document.getElementById(targetControls), event.target);
      }
    });
  
    // Add handler for closing modals using ESC key.
    document.addEventListener('keydown', function (e) {
      e = e || window.event;
  
      if (e.code === 'Escape') {
        closeModals();
      } else if (e.keyCode === 27) {
        closeModals();
      }
    });
  
    // init the dialog that is initially opened in the example
    
//    toggleModal(document.querySelector('#modalInscreva'), document.querySelector('[aria-controls=modal]'), true);
    
    function chamarModalInscreva() {
      alert("Modal chamado");
      html = '<divclass="p-modal"id="modalInscreva"><sectionclass="p-modal__dialog"role="dialog"aria-modal="true"aria-hidden="true"aria-labelledby="modal-title"aria-describedby="modal-description"><headerclass="p-modal__header"><h2class="p-modal__title"id="modal-title">Help</h2><buttonclass="p-modal__close"aria-label="Closeactivemodal"aria-controls="modal">Close</button></header><pid="modal-description">Learnhowtooperateproduction-readyclusters.</p><divclass="p-heading-icon--small"><divclass="p-heading-icon__header"><imgclass="p-heading-icon__img"src="https://assets.ubuntu.com/v1/b81a45e4-kubernetes.svg"alt=""><p><aclass="p-heading-icon__title"href="#tutorial/get-started-canonical-kubernetes">Kubernetestutorial</a></p></div><divclass="p-heading-icon__header"><imgclass="p-heading-icon__img"src="https://assets.ubuntu.com/v1/5e3456e3-hadoop.svg"alt=""><p><aclass="p-heading-icon__title"href="#tutorial/get-started-hadoop-spark">HadoopSparktutorial</a></p></div></div></section></div>';
      document.createElement('div').innerHTML = html;
    }

  })();