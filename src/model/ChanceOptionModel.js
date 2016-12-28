export default class Option {
  /**
   * @param {number} chance
   * @param {function} callback
   */
  constructor(chance, callback) {
    this.chance = chance;
    this.callback = callback;
  }
}