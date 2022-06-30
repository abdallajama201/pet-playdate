const addEvent = async (event) => {
    event.preventDefault();

    const date = document.querySelector('#event_date').value.trim();
    const location = document.querySelector('#event_location').value.trim();

    const response = await fetch('/api/events/', {
        method: 'POST',
        body: JSON.stringify({ date, location }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
    }
}

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', addEvent);