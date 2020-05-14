/**
 * @returns {string}
 */
function get_progress_nid(user_id, game_nid, sub_account_id) {
  let result_key = get_progress_nid_key(user_id, game_nid, sub_account_id);
  return localStorage.getItem(result_key);
}

/**
 * @param {int} user_id
 * @param {int} game_nid
 * @param {int} progress_nid
 * @param {int} sub_account_id
 */
function set_progress_nid(user_id, game_nid, progress_nid, sub_account_id) {
  let result_key = get_progress_nid_key(user_id, game_nid, sub_account_id);
  localStorage.setItem(result_key, progress_nid);
}

/**
 *
 * @param user_id
 * @param game_nid
 * @param sub_account_id
 * @returns {string}
 */
function get_progress_nid_key(user_id, game_nid, sub_account_id) {
  return 'progress_nid_for_' + game_nid + '_' + user_id + '_' + sub_account_id;
}

/**
 * @param {int} progress_nid
 * @param {String[]} finished_items
 */
function save_today_progress(progress_nid, finished_items) {
  let key = "progress_exercises_" + progress_nid;
  let value = JSON.stringify(finished_items);

  localStorage.setItem(key, value);
}

/**
 * @param {int} progress_nid
 * @returns {any}
 */
function load_today_progress(progress_nid) {
  let key = "progress_exercises_" + progress_nid;
  let cache = localStorage.getItem(key);
  if (cache === null) {
    cache = [];
  }
  else {
    cache = JSON.parse(cache);
  }

  return cache;
}

function get_user_name() {
  return localStorage.getItem('twelveUserName');
}

/**
 * @param {String} name
 */
function set_user_name(name) {
  localStorage.setItem('twelveUserName', name);
}

export default {
  get_progress_nid,
  set_progress_nid,
  save_today_progress,
  load_today_progress,
  get_user_name,
  set_user_name
}
