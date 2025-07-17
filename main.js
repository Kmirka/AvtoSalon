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
  comments.forEach(({text, rating}) => {
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
  return text.replace(/[&<>"']/g, function(m) {
    return {'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[m];
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
  comments.push({text, rating: selectedRating});
  saveComments(comments);
  renderComments();

  document.getElementById('comment-text').value = '';
  selectedRating = 0;
  updateStars(0);
});

window.onload = renderComments;
