/**
 * Clears message from UI after specified time elapsed.
 * @param {*} message The message to be cleared.
 * @param {number} time Time (in ms) before message is cleared.
 */
export const clearMessage = (message, time) => {
  setInterval(() => {
    message(null)
  }, time)
}
