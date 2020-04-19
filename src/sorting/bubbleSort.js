function bubbleSOrt(data) {
    let counter = 0;
    let sorted = false;
    for (let i = 0; i < data.length && !sorted; i++) {
        sorted = true;
        for (let j = 0; j < data.length; j++) {
            counter++;
            if (data[j] > data[j + 1]) {
                [data[j + 1], data[j]] = [data[j], data[j + 1]];
                sorted = false;
            }
        }
    }
    console.log('data:', data, 'counter:', counter);
    return data;
}

bubbleSOrt([2, 11, 5, 6, 7, 1, 4, 3, 8]);
bubbleSOrt([1, 2, 3, 4, 5, 6, 7, 8]);
bubbleSOrt([1, 2, 3, 4, 5, 6, 7, 8].reverse());
