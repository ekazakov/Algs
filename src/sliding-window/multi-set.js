export class MultiSet {
  constructor(values = []) {
    this.store = new Map();
    this._records = 0;
    values.forEach(value => {
      this.add(value);
    });
  }

  add(key) {
    this._records++;
    if (this.store.has(key)) {
      const count = this.store.get(key);
      this.store.set(key, count + 1);
    } else {
      this.store.set(key, 1);
    }
  }

  remove(key) {
    if (this.store.has(key)) {
      const count = this.store.get(key) - 1;

      if (count > 0) {
        this.store.set(key, count);
      } else {
        this.store.delete(key);
      }
      this._records--;
    }
  }

  get(key) {
    return this.store.get(key);
  }

  size() {
    return this.store.size;
  }

  records() {
    return this._records;
  }

  keys() {
    return this.store.keys();
  }

  has(key) {
    return this.store.has(key);
  }

  containsAll(multiset) {
    for (const key of multiset.keys()) {
      if (!this.store.has(key)) {
        return false;
      }

      const value = this.store.get(key);
      const other = multiset.get(key);

      if (value < other) {
        return false;
      }
    }

    return true;
  }

  toString() {
    return [...this.store.entries()].map(([k, v]) => `${k}: ${v}`).join("; ");
  }
}
