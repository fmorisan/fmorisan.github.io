// Calculate and update job durations for current positions
function calculateDuration(startDate) {
  const start = new Date(startDate);
  const end = new Date();
  
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  
  // Adjust if current month is before start month
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Adjust if current day is before start day
  if (end.getDate() < start.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }
  
  // Format duration string
  const parts = [];
  if (years > 0) {
    parts.push(`${years}yr`);
  }
  if (months > 0) {
    parts.push(`${months} mos`);
  }
  
  return parts.length > 0 ? parts.join(', ') : '0 mos';
}

// Update all current job durations
function updateJobDurations() {
  const currentJobs = document.querySelectorAll('p[data-is-current="true"]');
  
  currentJobs.forEach(job => {
    const startDate = job.getAttribute('data-start-date');
    const durationSpan = job.querySelector('.duration');
    
    if (startDate && durationSpan) {
      const newDuration = calculateDuration(startDate);
      durationSpan.textContent = newDuration;
    }
  });
}

// Position cursor-blink after header-content
function positionCursor() {
  const headers = document.querySelectorAll('.terminal-header');
  
  headers.forEach(header => {
    const content = header.querySelector('.header-content');
    const cursor = header.querySelector('.cursor-blink');
    
    if (content && cursor) {
      const contentRect = content.getBoundingClientRect();
      const headerRect = header.getBoundingClientRect();
      
      // Calculate position: center of header + half of content width + spacing
      const centerOffset = headerRect.width / 2;
      const contentHalfWidth = contentRect.width / 2;
      const spacing = 0.5; // em spacing
      const spacingPx = parseFloat(getComputedStyle(cursor).fontSize) * spacing;
      
      const leftPosition = centerOffset + contentHalfWidth;
      cursor.style.left = `${leftPosition}px`;
    }
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  updateJobDurations();
  positionCursor();
  
  // Reposition on window resize
  window.addEventListener('resize', positionCursor);
});
