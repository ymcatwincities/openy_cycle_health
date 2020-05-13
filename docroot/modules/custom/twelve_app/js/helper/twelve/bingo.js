/**
 * Search {exercises_list} for bingo lines: 2 diagonal and 5 row lines
 * Result is represented by {bingo_bools} array with 7 indexes
 * Also {found_new_bingo} and {full_bingo} booleans are returned.
 *
 * @param {Exercise[]} exercises_list
 * @param {Integer[]} finished_list
 * @param {Boolean[]} old_bingo_bools
 * @returns {Object}
 */
function search(exercises_list, finished_list, old_bingo_bools) {
  let bingos = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let index = 5 * i + j;
      let fin = finished_list.includes(exercises_list[index].id);

      if (!fin) {
        continue;
      }

      //first diag
      if (i === j) {
        bingos[0]++;
      }

      //second diag
      if (4 - i === j) {
        bingos[1]++;
      }

      //rows
      bingos[i+2]++;
    }
  }

  let found_new_bingo = false;
  let bingo_bools = [];
  let full_bingo = true;
  for (let i = 0; i < 7; i++) {
    if (bingos[i] === 5) {
      bingo_bools[i] = true;
      if (old_bingo_bools[i] === false) {
        found_new_bingo = true;
      }
    } else {
      bingo_bools[i] = false;
      full_bingo = false;
    }
  }

  return {
    bingo_bools: bingo_bools,
    found_new_bingo: found_new_bingo,
    full_bingo: full_bingo
  };
}

export default {
  search,
}
