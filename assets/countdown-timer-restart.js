/* countdown-timer-restart.js
   - Supports:
     - data-time: ISO date string or numeric timestamp (e.g. "2025-11-20T12:00:00Z" or "1730000000000")
     - data-interval: duration in "48h", "3600s", "2d", or milliseconds numeric string. Default: "48h"
   - If data-time is provided and already past, it will find the next future occurrence spaced by data-interval.
   - If no data-time provided, creates repeating cycle anchored to epoch (so repeats every interval).
*/

(function () {
  'use strict';

  // Utilities
  function parseInterval(str) {
    if (!str && str !== 0) return 48 * 3600 * 1000; // default 48h in ms
    if (typeof str === 'number') return str;
    str = String(str).trim().toLowerCase();

    // direct numeric ms
    if (/^\d+$/.test(str)) return parseInt(str, 10);

    // e.g., "48h", "2d", "3600s", "30m"
    var m = str.match(/^(\d+(?:\.\d+)?)(ms|s|m|h|d)?$/);
    if (!m) return 48 * 3600 * 1000;
    var val = parseFloat(m[1]);
    var unit = m[2] || 'ms';
    switch (unit) {
      case 'ms': return val;
      case 's': return val * 1000;
      case 'm': return val * 60 * 1000;
      case 'h': return val * 3600 * 1000;
      case 'd': return val * 24 * 3600 * 1000;
      default: return val;
    }
  }

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function findNextTargetFromAnchor(anchorTimeMs, intervalMs, nowMs) {
    // Returns the smallest time >= nowMs that equals anchorTimeMs + k * intervalMs
    if (intervalMs <= 0) return anchorTimeMs > nowMs ? anchorTimeMs : nowMs;
    var diff = nowMs - anchorTimeMs;
    if (diff < 0) return anchorTimeMs;
    var k = Math.floor(diff / intervalMs) + 1;
    return anchorTimeMs + k * intervalMs;
  }

  function initTimer(node) {
    var el = node;
    var dayEl = el.querySelector('.countdown-timer-day');
    var hourEl = el.querySelector('.countdown-timer-hour');
    var minEl = el.querySelector('.countdown-timer-minute');
    var secEl = el.querySelector('.countdown-timer-sec');

    // read attributes
    var dataTime = el.getAttribute('data-time');
    var dataInterval = el.getAttribute('data-interval') || '48h';
    var intervalMs = parseInterval(dataInterval);

    var now = Date.now();
    var targetMs = null;

    // Try parse dataTime
    if (dataTime) {
      // try numeric
      var num = Number(dataTime);
      if (!isNaN(num) && String(num) === dataTime.trim()) {
        targetMs = num;
      } else {
        var parsed = Date.parse(dataTime);
        if (!isNaN(parsed)) targetMs = parsed;
      }
    }

    if (targetMs) {
      // If target is in the past, compute next occurrence spaced by interval
      if (targetMs <= now && intervalMs > 0) {
        // Anchor is the original target; find next anchored occurrence
        targetMs = findNextTargetFromAnchor(targetMs, intervalMs, now);
      } else if (targetMs <= now && intervalMs <= 0) {
        // Already past and no repeating interval: set to now (zero)
        targetMs = now;
      }
    } else {
      // No data-time: create a repeating schedule anchored to epoch (0)
      // next target = now + (interval - (now % interval))
      var remainder = intervalMs - (now % intervalMs);
      if (remainder === intervalMs) remainder = 0;
      targetMs = now + remainder;
      if (remainder === 0) {
        // exactly on boundary; next is now + interval
        targetMs = now + intervalMs;
      }
    }

    // fade in element (was style opacity:0 in Liquid)
    el.style.opacity = '';

    // update loop
    var tick = function () {
      var now2 = Date.now();
      var diff = Math.max(0, targetMs - now2);

      var totalSeconds = Math.floor(diff / 1000);
      var days = Math.floor(totalSeconds / 86400);
      var hours = Math.floor((totalSeconds % 86400) / 3600);
      var minutes = Math.floor((totalSeconds % 3600) / 60);
      var seconds = totalSeconds % 60;

      if (dayEl) dayEl.textContent = pad(days);
      if (hourEl) hourEl.textContent = pad(hours);
      if (minEl) minEl.textContent = pad(minutes);
      if (secEl) secEl.textContent = pad(seconds);

      // When we reach zero, compute the next target (if interval defined) and continue
      if (diff <= 0) {
        if (intervalMs > 0) {
          // advance to next target in future (avoid drift by using previous target + interval)
          // but ensure strictly in future relative to now
          var next = targetMs + intervalMs;
          if (next <= now2) {
            // if somehow in past due drift, compute relative
            next = findNextTargetFromAnchor(targetMs, intervalMs, now2);
          }
          targetMs = next;
        } else {
          // non-repeating: stop ticking
          // set zeros (already set) and clear interval below
          // We don't remove the interval here, allow outer controller to clear
        }
      }
    };

    // Run immediately then every 1s
    tick();
    var timerId = setInterval(tick, 1000);

    // Store timerId to node so we can clear if needed
    el.__countdown_timer_id = timerId;
  }

  function initAll() {
    var nodes = document.querySelectorAll('m-countdown-timer.m-countdown-timer');
    if (!nodes || nodes.length === 0) {
      // Also support elements without duplicated class (in case)
      nodes = document.querySelectorAll('m-countdown-timer');
    }

    nodes.forEach(function (node) {
      try {
        // avoid double init
        if (node.__countdown_timer_id) {
          clearInterval(node.__countdown_timer_id);
          node.__countdown_timer_id = null;
        }
        initTimer(node);
      } catch (err) {
        // swallow per-element errors
        // eslint-disable-next-line no-console
        console.error('Countdown timer init error', err);
      }
    });
  }

  // Auto-init on DOMContentLoaded (works with defer)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Expose a simple API to re-init timers if theme updates DOM via JS:
  window.countdownTimerRestart = {
    initAll: initAll
  };

})();
