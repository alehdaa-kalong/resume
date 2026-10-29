async function fetchThailandTime() {
    const clockElement = document.getElementById('thailand-clock');

    try {
        // Fetch current time for Asia/Bangkok timezone
        const response = await fetch('https://timeapi.io/api/time/current/zone?timeZone=Asia/Bangkok');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // Parse time details
        let hour = data.hour;
        const minute = String(data.minute).padStart(2, '0');
        const second = String(data.seconds).padStart(2, '0');
        const period = hour >= 12 ? 'م' : 'ص'; // AM/PM in Arabic

        hour = hour % 12 || 12; // 12-hour format

        // Display time
        clockElement.textContent = `${hour}:${minute}:${second} ${period}`;
    } catch (error) {
        console.error('Error fetching time:', error);
        // Fallback to local client clock converted to Thailand offset (UTC+7) if API fails
        const now = new Date();
        const thailandTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
        clockElement.textContent = thailandTime.toLocaleTimeString('ar-SA');
    }
}

// Fetch time immediately on load
fetchThailandTime();

// Update every second
setInterval(fetchThailandTime, 1000);