const timeToNumber = time => {
    const [h, m] = time.split(':').map(val => parseInt(val, 10));

    return h * 60 + m;
};

const padLeft = value => {
    if (value < 10) {
        return `0${value}`;
    }

    return `${value}`;
};

const numberToTime = value => {
    const m = value % 60;
    const h = (value - m) / 60;

    return `${padLeft(h)}:${padLeft(m)}`;
};

function schedulingTalks(input) {
    const intervals = input.map(interval => interval.map(timeToNumber));

    intervals.sort((a, b) => a[1] - b[1]);
    // console.log(intervals);

    const results = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const last = results.length - 1;
        if (intervals[i][0] >= results[last][1]) {
            results.push(intervals[i]);
        }
    }

    return results.map(interval => interval.map(numberToTime));
}

const result = schedulingTalks([
    ['9:00', '9:45'],
    ['9:30', '10:00'],
    ['9:50', '10:15'],
    ['10:00', '10:30'],
    ['10:10', '10:25'],
    ['10:30', '10:55'],
    ['10:15', '10:45'],
    ['10:30', '11:00'],
    ['10:45', '11:30'],
    ['10:55', '11:25'],
    ['11:00', '11:15']
]);
console.log(result.map(interval => interval.join(' — ')).join('\n'));
