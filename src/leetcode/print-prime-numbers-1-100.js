// https://java2blog.com/print-prime-numbers-1-100-java/
// A prime number is a number which has only two divisors 1 and itself.
// To check if the number is prime or not, we need to see if it has
// any other factors other than 1 or itself. If it has, then
// number is not prime else number is prime.

function printPrimes(n) {
    const result = [];

    if (n <= 1) {
        return result;
    }

    function isPrime(k) {
        for (let i = 2; i <= Math.sqrt(k); i++) {
            if (k % i === 0) {
                return false;
            }
        }

        return true;
    }

    for (let i = 0; i < n; i++) {
        if (isPrime(i)) {
            result.push(i);
        }
    }

    return result;
}

console.log('primes up to 100:', printPrimes(100).join(', '));
