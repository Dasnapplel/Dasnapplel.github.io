const url = 'https://old-wind-3475.diegodejongbus.workers.dev/';

function timeConverter(time) {
    const time24 = time.slice(17, 22);
    console.log(time24);

    // Validate input format
    const match = time24.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) throw new Error("Invalid time format. Use HH:MM");

    let hours = parseInt(match[1], 10);
    const minutes = match[2];

    if (hours < 0 || hours > 23 || parseInt(minutes) < 0 || parseInt(minutes) > 59) {
        throw new Error("Invalid time values");
    }

    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 -> 12, 13 -> 1, etc.

    return `${String(hours).padStart(2, '0')}:${minutes} ${period}`;
}

const table = document.querySelector('.events-table');

(async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const text = await response.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'application/xml');

    const keywords = [
      'food', 'breakfast', 'lunch', 'dinner', 'snack', 'drink', 'beverage',
      'pizza', 'coffee', 'donuts', 'bagels', 'refreshments', 'catering',
      'reception', 'buffet', 'dessert', 'cake', 'cookies', 'meal', ' eat '
    ];
    const categoryChecks = [
      'student', 'alumni', 'community'
    ];
    const exclude = [
      /food\s+(drive|bank|pantry|donation|science|truck\s+design)/i,
      /\bvirtual\b/i,           
      /\bno\s+food\b/i,
      /\bfood\s+not\s+(provided|included|available)\b/i,
      /\b(cost|price|fee|value):\s+\$(?!0(?:\.0+)?\b)/i,
      /\$(?!0(?:\.0+)?\b)/i // any fee that isn't $0
    ];


    const items = xml.querySelectorAll('item');

    items.forEach(item => {
      const description = item.querySelector('description')?.textContent.toLowerCase() || '';
      const keywordsMatched = keywords.filter(word => description.includes(word));
      const categoryEls = item.querySelectorAll('category');
      // Extract their text content (case-insensitive)
      const categories = Array.from(categoryEls).map(el =>
        el.textContent.trim().toLowerCase()
      );
      // Check if any category matches (or contains) any keyword
      return categoryChecks.some(keyword =>
        categories.some(category => category.includes(keyword.toLowerCase()))
      );

      if (keywordsMatched.length > 0 && !exclude.some(p => p.test(description))) {
          const title = item.querySelector('title')?.textContent;
          let date = item.querySelector('pubDate')?.textContent;
          date = date.replaceAll(":00 ", " ");
          time = timeConverter(date);
          date = date.slice(0, 17) + time;
          const link = item.querySelector('link')?.textContent;

          const currEvent = document.createElement('tr');
          currEvent.innerHTML += `<td><a href="${link}">${title}</a></td>`;
          currEvent.innerHTML += `<td>${date}</td>`;
          currEvent.innerHTML += `<td>${keywordsMatched.join(', ')}</td>`;
          table.appendChild(currEvent);
      }

    });
  } catch (error) {
    const currEvent = document.createElement('tr');
    currEvent.innerHTML += `<td>${error}</td>`;
    currEvent.innerHTML += `<td>Router or ad blockers may be blocking url fetch</td>`;
    currEvent.innerHTML += `<td>Try using mobile data</td>`;
    table.appendChild(currEvent);
  }
  console.log(table.childElementCount);
  if (table.childElementCount == 1) {
    const currEvent = document.createElement('tr');
    currEvent.innerHTML += `<td>No Food Events</td>`;
    currEvent.innerHTML += `<td>Rip</td>`;
    currEvent.innerHTML += `<td>Check tomorrow</td>`;
    table.appendChild(currEvent);
  }
})();

