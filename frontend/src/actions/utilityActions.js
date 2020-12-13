/**
 * Clears state from UI after specified time elapsed.
 * @param {*} state The state to be cleared.
 * @param {number} time Time (in ms) before state is cleared.
 * @description Initially built to only clear message states from UI, but modularized it to be able to clear any states.
 */
export const clearState = (state, time) => {
  setInterval(() => {
    state(null)
  }, time)
}
