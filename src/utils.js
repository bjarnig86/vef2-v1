function formatDate(timestamp) {
  const currentDate = new Date();
  const timeInMS = currentDate.getTime();

  const timeDifference = timeInMS - timestamp;
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 4 * week;
  const year = 12 * month;

  if (timeDifference < minute) {
    return 'Fyrir minna en mínútu síðan';
  }

  if (timeDifference < hour) {
    const x = Math.round(timeDifference / minute);
    if (x % 10 === 1 && x !== 11) {
      return `Fyrir ${x} mínútu síðan`;
    }
    return `Fyrir ${x} mínútum síðan`;
  }

  if (timeDifference < day) {
    const x = Math.round(timeDifference / hour);
    if (x % 10 === 1 && x !== 11) {
      return `Fyrir ${x} klukkustund síðan`;
    }
    return `Fyrir ${x} klukkustundum síðan`;
  }

  if (timeDifference < week) {
    const x = Math.round(timeDifference / day);
    if (x % 10 === 1 && x !== 11) {
      return `Fyrir ${x} degi síðan`;
    }
    return `Fyrir ${x} dögum síðan`;
  }

  if (timeDifference < month) {
    const x = Math.round(timeDifference / week);
    if (x % 10 === 1 && x !== 11) {
      return `Fyrir ${x} viku síðan`;
    }
    return `Fyrir ${x} vikum síðan`;
  }

  if (timeDifference < year) {
    const x = Math.round(timeDifference / month);
    if (x % 10 === 1 && x !== 11) {
      return `Fyrir ${x} mánuði síðan`;
    }
    return `Fyrir ${x} mánuðum síðan`;
  }

  if (timeDifference >= year) {
    const x = Math.round(timeDifference / year);
    if (x % 10 === 1 && x !== 11) {
      return `Fyrir ${x} ári síðan`;
    }
    return `Fyrir ${x} árum síðan`;
  }

  return `Unknown`;
}

function setDuration(duration) {
  const dur = duration;
  const m = parseInt(dur / 60, 10);
  const s = dur % 60;
  if (s < 10) {
    return `${m}:0${s}`;
  }
  return `${m}:${s}`;
}

module.exports = {
  setDuration,
  formatDate,
};
