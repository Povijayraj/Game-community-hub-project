// ===== TIMERS =====
function updateAllTimers() {
  const now = new Date().getTime();

  document.querySelectorAll('.timer').forEach(timer => {
    const target = new Date(timer.dataset.date).getTime();
    const gap = target - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    if (gap <= 0) {
      timer.querySelector('.days').innerText = '00';
      timer.querySelector('.hours').innerText = '00';
      timer.querySelector('.minutes').innerText = '00';
      timer.querySelector('.seconds').innerText = '00';
      return;
    }

    timer.querySelector('.days').innerText = Math.floor(gap / day);
    timer.querySelector('.hours').innerText = Math.floor((gap % day) / hour);
    timer.querySelector('.minutes').innerText = Math.floor((gap % hour) / minute);
    timer.querySelector('.seconds').innerText = Math.floor((gap % minute) / second);
  });
}

updateAllTimers();
setInterval(updateAllTimers, 1000);

// ===== MODAL =====
const form = document.getElementById('tournamentForm');
const closeBtn = document.getElementById('closeBtn');
const modal = document.getElementById('modal');

// ===== FORM SUBMIT =====
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;

  const teamName = document.getElementById('teamName');
  if (!teamName.value.trim()) { showError(teamName); isValid = false; }
  else { hideError(teamName); }

  const captain = document.getElementById('captain');
  if (!captain.value.trim()) { showError(captain); isValid = false; }
  else { hideError(captain); }

  const email = document.getElementById('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailRegex.test(email.value)) { showError(email); isValid = false; }
  else { hideError(email); }

  const members = document.getElementById('members');
  if (!members.value.trim()) { showError(members); isValid = false; }
  else { hideError(members); }

  if (isValid) {
    form.reset();
    modal.style.display = 'none';

    // Show success popup
    const popup = document.getElementById('successPopup');
    popup.style.display = 'flex';

    let sec = 10;
    const countdownEl = document.getElementById('countdown');
    const countTimer = setInterval(() => {
      sec--;
      countdownEl.innerText = 'Closing in ' + sec + ' seconds...';
      if (sec <= 0) {
        clearInterval(countTimer);
        popup.style.display = 'none';
      }
    }, 1000);
  }
});

function showError(input) {
  input.parentElement.classList.add('error');
}

function hideError(input) {
  input.parentElement.classList.remove('error');
}

// Close modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Clear errors on input
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', () => {
    if (input.value.trim()) hideError(input);
  });
});
// Open modal when Register Now clicked
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });
});
// ===== LIVE DASHBOARD =====
const teams = [
  { name: 'Nova', kills: 0, points: 0 },
  { name: 'Dark Matter', kills: 0, points: 0 },
  { name: 'Eclipse', kills: 0, points: 0 },
  { name: 'Neon Wolves', kills: 0, points: 0 },
];

const feedMessages = [
  '⚔️ Nova eliminated a player!',
  '💀 Dark Matter got a double kill!',
  '🔥 Eclipse is on fire!',
  '🛡️ Neon Wolves defended the zone!',
  '💥 Nova destroyed the enemy base!',
  '🎯 Dark Matter sniper hit!',
  '⚡ Eclipse speed boost activated!',
  '🏆 Nova leads the scoreboard!',
];

let matchSeconds = 0;
let viewers = 1200;

function openDashboard() {
  document.getElementById('liveDashboard').style.display = 'block';
  startLiveDashboard();
}

function closeDashboard() {
  document.getElementById('liveDashboard').style.display = 'none';
}

function startLiveDashboard() {
  updateLeaderboard();

  setInterval(() => {
    // Update match time
    matchSeconds++;
    const m = String(Math.floor(matchSeconds / 60)).padStart(2, '0');
    const s = String(matchSeconds % 60).padStart(2, '0');
    document.getElementById('matchTime').innerText = m + ':' + s;

    // Update viewers
    viewers += Math.floor(Math.random() * 20) - 5;
    document.getElementById('viewerCount').innerText = viewers.toLocaleString();

    // Random score update
    if (matchSeconds % 5 === 0) {
      const t = Math.floor(Math.random() * teams.length);
      teams[t].kills += Math.floor(Math.random() * 2) + 1;
      teams[t].points += Math.floor(Math.random() * 10) + 5;

      document.getElementById('score1').innerText = teams[0].points;
      document.getElementById('score2').innerText = teams[1].points;
      document.getElementById('kills1').innerText = teams[0].kills;
      document.getElementById('kills2').innerText = teams[1].kills;

      updateLeaderboard();

      // Add live feed message
      const msg = feedMessages[Math.floor(Math.random() * feedMessages.length)];
      const feed = document.getElementById('liveFeed');
      const item = document.createElement('div');
      item.style = 'background:#ffffff08; padding:8px 12px; border-radius:8px; color:#ccc; font-size:13px; border-left:3px solid #00f7ff;';
      item.innerText = msg;
      feed.prepend(item);
    }
  }, 1000);
}

function updateLeaderboard() {
  const sorted = [...teams].sort((a, b) => b.points - a.points);
  const lb = document.getElementById('leaderboard');
  lb.innerHTML = '';
  sorted.forEach((t, i) => {
    const colors = ['#ffd700', '#c0c0c0', '#cd7f32', '#aaa'];
    lb.innerHTML += `
      <tr style="border-bottom:1px solid #ffffff11;">
        <td style="padding:10px; color:${colors[i]}; font-weight:bold;">${i + 1}</td>
        <td style="padding:10px;">${t.name}</td>
        <td style="padding:10px; color:#00f7ff;">${t.kills}</td>
        <td style="padding:10px; color:#ff6600; font-weight:bold;">${t.points}</td>
        <td style="padding:10px;"><span style="background:#00ff0022; color:#00ff00; padding:2px 8px; border-radius:5px; font-size:12px;">ALIVE</span></td>
      </tr>`;
  });
}

// Attach to Watch Live button
document.querySelectorAll('.btn2').forEach(btn => {
  btn.addEventListener('click', openDashboard);
});
document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector(".navbar");
    const mobileMenuButton = document.querySelector(".mobile-menu");
    const navigation = document.querySelector(".nav-links");

    const syncNavbarState = () => {
        navbar.classList.toggle("is-scrolled", window.scrollY > 50);
    };

    syncNavbarState();

    window.addEventListener("scroll", syncNavbarState, { passive: true });

    mobileMenuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("is-open");

        mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
        mobileMenuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("is-open");
            mobileMenuButton.setAttribute("aria-expanded", "false");
            mobileMenuButton.setAttribute("aria-label", "Open menu");
        });
    });

    window.addEventListener("resize", () => {
        if(window.innerWidth > 768){
            navigation.classList.remove("is-open");
            mobileMenuButton.setAttribute("aria-expanded", "false");
            mobileMenuButton.setAttribute("aria-label", "Open menu");
        }
    });

});