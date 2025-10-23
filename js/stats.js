document.addEventListener('DOMContentLoaded', function () {
    const uptimeBar = document.getElementById('uptimeBar');
    const uptimePercent = document.querySelector('.uptime__percent');
    const uptimeStatus = document.createElement('div');
    uptimeStatus.className = 'uptime__status';
    uptimeBar.parentNode.insertBefore(uptimeStatus, uptimeBar.nextSibling);

    const totalDays = 90;
    const checkUrl = window.location.hostname === 'localhost' ? '/statistics' : "https://fua.vtc.pp.ua";
    let results = JSON.parse(localStorage.getItem('uptimeHistory')) || [];
    let lastStatusChange = localStorage.getItem('lastStatusChange') || null;
    let currentDowntimeDuration = 0;
    let downtimeInterval = null;
    let lastDowntimeTimer = null;

    async function checkWebsite(url) {
        if (window.location.hostname === 'localhost') {
            try {
                const response = await fetch(url);
                return response.ok;
            } catch {
                return false;
            }
        }

        try {
            const controller = new AbortController();
            setTimeout(() => controller.abort(), 5000);

            try {
                const testUrl = new URL(url);
                if (testUrl.protocol === 'http:') {
                    testUrl.protocol = 'https:';
                }

                const headResponse = await fetch(testUrl, {
                    method: 'HEAD',
                    mode: 'cors',
                    cache: 'no-store',
                    signal: controller.signal,
                    credentials: 'omit'
                });
                return headResponse.ok;
            } catch {
                const getResponse = await fetch(url, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-store',
                    signal: controller.signal,
                    credentials: 'omit'
                });
                return getResponse.ok;
            }
        } catch (error) {
            console.error('Check failed:', error);
            return false;
        }
    }

    function saveHistory() {
        localStorage.setItem('uptimeHistory', JSON.stringify(results));
        localStorage.setItem('lastStatusChange', lastStatusChange);
    }

    function calculateUptime() {
        if (results.length === 0) return '100.000';
        const onlineDays = results.filter(r => r.status).length;
        return ((onlineDays / results.length) * 100).toFixed(3);
    }

    function updateDowntimeStatus(isOnline) {
        const now = new Date();

        if (!isOnline) {
            if (!downtimeInterval) {
                if (!lastStatusChange) {
                    lastStatusChange = now.toISOString();
                }
                startDowntimeCounter();
            }

            uptimeStatus.textContent = `🔴 Offline (${formatDuration(currentDowntimeDuration)})`;
            uptimeStatus.style.color = '#f44336';
        } else {
            if (downtimeInterval) {
                clearInterval(downtimeInterval);
                downtimeInterval = null;
            }

            if (lastStatusChange) {
                const downtimeDuration = Math.floor((now - new Date(lastStatusChange)) / 1000);
                if (downtimeDuration > 0) {
                    startLastDowntimeCounter(downtimeDuration);
                } else {
                    uptimeStatus.textContent = '🟢 Online';
                    uptimeStatus.style.color = '#4caf50';
                }
            } else {
                uptimeStatus.textContent = '🟢 Online';
                uptimeStatus.style.color = '#4caf50';
            }
            lastStatusChange = null;
            currentDowntimeDuration = 0;
        }
    }

    function startDowntimeCounter() {
        if (downtimeInterval) clearInterval(downtimeInterval);

        const startTime = new Date(lastStatusChange || new Date());
        currentDowntimeDuration = Math.floor((new Date() - startTime) / 1000);

        downtimeInterval = setInterval(() => {
            currentDowntimeDuration++;
            uptimeStatus.textContent = `🔴 Offline (${formatDuration(currentDowntimeDuration)})`;
        }, 1000);
    }

    function startLastDowntimeCounter(initialDuration) {
        let remainingTime = 10;
        let duration = initialDuration;

        if (lastDowntimeTimer) {
            clearInterval(lastDowntimeTimer);
        }

        uptimeStatus.textContent = `⚡ Last downtime: ${formatDuration(duration)}`;
        uptimeStatus.style.color = '#ff9800';

        lastDowntimeTimer = setInterval(() => {
            remainingTime--;
            duration++;

            if (remainingTime > 0) {
                uptimeStatus.textContent = `⚡ Last downtime: ${formatDuration(duration)}`;
            } else {
                clearInterval(lastDowntimeTimer);
                uptimeStatus.textContent = '🟢 Online';
                uptimeStatus.style.color = '#4caf50';
            }
        }, 1000);
    }

    function formatDuration(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${minutes}m ${secs}s`;
    }

    function renderChart() {
        if (!uptimeBar) return;

        uptimeBar.innerHTML = '';

        const now = new Date();
        const startDate = new Date();
        startDate.setDate(now.getDate() - totalDays + 1);
        
        const fullResults = [];
        for (let i = 0; i < totalDays; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            const dateStr = date.toLocaleDateString();
            
            const existingRecord = results.find(r => new Date(r.date).toLocaleDateString() === dateStr);
            fullResults.push(existingRecord || { date: date.toISOString(), status: true });
        }

        results = fullResults.slice(-totalDays);

        results.forEach((record, index) => {
            const day = document.createElement('div');
            day.className = 'uptime__day' + (record.status ? '' : ' downtime');

            const date = new Date(record.date);
            day.title = `${date.toLocaleDateString()}: ${record.status ? '✅ Online' : '❌ Offline'}`;

            uptimeBar.appendChild(day);
        });

        if (uptimePercent) {
            uptimePercent.textContent = `${calculateUptime()}% uptime`;
        }
    }

    async function updateUptime() {
        try {
            const status = await checkWebsite(checkUrl);
            const now = new Date();
            const today = now.toLocaleDateString();
            
            const lastRecordDate = results.length > 0 
                ? new Date(results[results.length - 1].date).toLocaleDateString() 
                : null;
            
            if (lastRecordDate !== today || results.length === 0) {
                if (results.length >= totalDays) {
                    results.shift();
                }
                
                results.push({
                    date: now.toISOString(),
                    status: status
                });
                
                lastStatusChange = status ? null : now.toISOString();
            } 
            else if (results.length > 0 && results[results.length - 1].status !== status) {
                results[results.length - 1].status = status;
                lastStatusChange = status ? null : now.toISOString();
            }

            renderChart();
            saveHistory();
            updateDowntimeStatus(status);

        } catch (error) {
            console.error('Update failed:', error);
            updateDowntimeStatus(false);
        }
    }

    function init() {
        if (lastStatusChange) {
            const now = new Date();
            currentDowntimeDuration = Math.floor((now - new Date(lastStatusChange)) / 1000);

            if (results.length > 0 && !results[results.length - 1].status) {
                startDowntimeCounter();
            }
        }

        renderChart();
        updateUptime();

        setInterval(updateUptime, 30 * 1000);
    }

    init();
})