    let savedTrips = [];
    const jvOverlay = document.getElementById('jvOverlay');
    const tripsDrawer = document.getElementById('tripsDrawer');
    const pkgModal = document.getElementById('pkgModal');
    const savedNavLink = document.querySelector('.saved-link');
    const savedTripsList = document.getElementById('savedTripsList');

    function closeJvPopups() {
      tripsDrawer.classList.remove('open');
      pkgModal.classList.remove('open');
      jvOverlay.classList.remove('open');
    }

    document.getElementById('closeTripsBtn').addEventListener('click', closeJvPopups);
    document.getElementById('closePkgBtn').addEventListener('click', closeJvPopups);
    jvOverlay.addEventListener('click', closeJvPopups);

    // Open Saved Trips Drawer
    savedNavLink.addEventListener('click', (e) => {
      e.preventDefault();
      closeJvPopups();
      tripsDrawer.classList.add('open');
      jvOverlay.classList.add('open');
    });

    function renderTrips() {
      savedNavLink.textContent = `Saved Trips (${savedTrips.length})`;
      if (savedTrips.length === 0) {
        savedTripsList.innerHTML = '<p style="color:#5A7184; text-align:center; margin-top:2rem;">No destinations saved yet. Click "Save Trip" on any getaway!</p>';
        return;
      }

      savedTripsList.innerHTML = savedTrips.map((trip, index) => `
        <div class="saved-trip-card">
          <span class="saved-trip-name">${trip}</span>
          <button class="remove-trip-btn" onclick="removeSavedTrip(${index})">Remove</button>
        </div>
      `).join('');
    }

    window.removeSavedTrip = function(index) {
      savedTrips.splice(index, 1);
      renderTrips();
    };

    // Save Trip Buttons
    document.querySelectorAll('.save-trip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tripInfo = btn.getAttribute('data-trip');
        if (!savedTrips.includes(tripInfo)) {
          savedTrips.push(tripInfo);
          renderTrips();
        }

        const original = btn.innerHTML;
        btn.innerHTML = '&#9829; Saved to Itinerary';
        btn.style.backgroundColor = '#D4A359';
        btn.style.color = '#083D56';
        btn.style.borderColor = '#D4A359';

        setTimeout(() => {
          btn.innerHTML = original;
          btn.style.backgroundColor = '';
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 1000);
      });
    });

    // Package Inquiry Modal Logic
    const selectedPkgTitle = document.getElementById('selectedPkgTitle');
    const pkgForm = document.getElementById('pkgInquiryForm');
    const pkgConfirmMsg = document.getElementById('pkgConfirmMsg');

    document.querySelectorAll('.book-pkg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pkgName = btn.getAttribute('data-pkg');
        selectedPkgTitle.textContent = pkgName;
        pkgConfirmMsg.style.display = 'none';
        closeJvPopups();
        pkgModal.classList.add('open');
        jvOverlay.classList.add('open');
      });
    });

    pkgForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const guest = document.getElementById('travelerName').value.trim();
      const pkg = selectedPkgTitle.textContent;
      pkgConfirmMsg.textContent = `Bon voyage, ${guest}! Our concierge will send your ${pkg} itinerary shortly ✈️`;
      pkgConfirmMsg.style.display = 'block';
      pkgForm.reset();

      setTimeout(() => {
        closeJvPopups();
      }, 2800);
    });