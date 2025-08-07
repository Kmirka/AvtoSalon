let selectedRating = 0;

const stars = document.querySelectorAll('#rating-stars span');
const ratingInput = document.createElement('input');
ratingInput.type = 'hidden';
ratingInput.id = 'rating-value';
document.getElementById('comment-form').appendChild(ratingInput);

stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.getAttribute('data-rate'));
    updateStars(selectedRating);
  });
});

function updateStars(rating) {
  stars.forEach(star => {
    star.classList.toggle('active', parseInt(star.getAttribute('data-rate')) <= rating);
  });
  ratingInput.value = rating;
}

function getComments() {
  const cookie = document.cookie.split('; ').find(row => row.startsWith('comments='));
  if (!cookie) return [];
  try {
    return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
  } catch {
    return [];
  }
}

function saveComments(comments) {
  document.cookie = 'comments=' + encodeURIComponent(JSON.stringify(comments)) + ';path=/;max-age=31536000';
}

function renderComments() {
  const comments = getComments();
  const list = document.getElementById('comments-list');
  list.innerHTML = '';
  comments.forEach(({ text, rating }) => {
    const div = document.createElement('div');
    div.className = 'comment';
    div.innerHTML = `
      <div class="stars">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
      <div class="text">${escapeHtml(text)}</div>
    `;
    list.appendChild(div);
  });
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function (m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
  });
}

document.getElementById('comment-form').addEventListener('submit', e => {
  e.preventDefault();
  const text = document.getElementById('comment-text').value.trim();
  if (text === '' || selectedRating === 0) {
    alert('Введіть коментар і поставте оцінку зірками!');
    return;
  }

  const comments = getComments();
  comments.push({ text, rating: selectedRating });
  saveComments(comments);
  renderComments();

  document.getElementById('comment-text').value = '';
  selectedRating = 0;
  updateStars(0);
});

window.onload = renderComments;

document.addEventListener('DOMContentLoaded', function () {
  const ratingStars = document.querySelectorAll('#rating-stars span');
  const ratingDisplay = document.getElementById('rating-display'); // This is where we'll show the rating

  ratingStars.forEach(star => {
    // When hovering over a star, highlight the corresponding number of stars
    star.addEventListener('mouseover', function () {
      const rating = parseInt(star.getAttribute('data-rate'));
      ratingStars.forEach(s => {
        s.style.color = s.getAttribute('data-rate') <= rating ? '#ffcc00' : '#ddd';
      });
    });

    // Reset colors when not hovering over stars
    star.addEventListener('mouseout', function () {
      ratingStars.forEach(s => {
        s.style.color = s.classList.contains('selected') ? '#ffcc00' : '#ddd';
      });
    });

    // When clicking on a star, mark it as selected and update rating
    star.addEventListener('click', function () {
      const rating = parseInt(star.getAttribute('data-rate'));

      // Reset all stars
      ratingStars.forEach(s => {
        s.classList.remove('selected');
      });

      // Mark selected stars
      ratingStars.forEach(s => {
        if (parseInt(s.getAttribute('data-rate')) <= rating) {
          s.classList.add('selected');
        }
      });

      // Update the rating result text
      ratingDisplay.textContent = `You have rated: ${rating} star${rating > 1 ? 's' : ''}`;
    });
  });
});