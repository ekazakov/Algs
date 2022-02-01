function divAndMod(a, d) {
    let r = Math.abs(a);
    let q = 0;

    while (r >= d) {
        r = r - d;
        q = q + 1;
    }

    if (a < 0 && d > 0) {
        q = -1 * (q + 1);

    }
}
