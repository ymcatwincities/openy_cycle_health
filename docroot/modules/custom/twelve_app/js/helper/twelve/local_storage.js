/**
 * @returns {string}
 */
function get_progress_nid(game_nid) {
  let result_key = get_progress_nid_key(game_nid);
  return localStorage.getItem(result_key);
}

/**
 * @param {int} game_nid
 * @param {int} progress_nid
 */
function set_progress_nid(game_nid, progress_nid) {
  let result_key = get_progress_nid_key(game_nid);
  localStorage.setItem(result_key, progress_nid);
}

/**
 * @param game_nid
 * @returns {string}
 */
function get_progress_nid_key(game_nid) {
  return 'progress_nid_for_' + game_nid + '_' + drupalSettings.user.uid + '_' + drupalSettings.sub_account_id;
}

/**
 * @param {int} progress_nid
 * @param {String[]} finished_items
 */
function save_today_progress(progress_nid, finished_items) {
  let key = "progress_exercises_" + progress_nid + '_' + drupalSettings.user.uid + '_' + drupalSettings.sub_account_id;
  let value = JSON.stringify(finished_items);

  localStorage.setItem(key, value);
}

/**
 * @param {int} progress_nid
 * @returns {any}
 */
function load_today_progress(progress_nid) {
  let key = "progress_exercises_" + progress_nid + '_' + drupalSettings.user.uid + '_' + drupalSettings.sub_account_id;
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
  return localStorage.getItem('twelveUserName' + '_' + drupalSettings.user.uid + '_' + drupalSettings.sub_account_id);
}

/**
 * @param {String} name
 */
function set_user_name(name) {
  localStorage.setItem('twelveUserName' + '_' + drupalSettings.user.uid + '_' + drupalSettings.sub_account_id, name);
}

export default {
  get_progress_nid,
  set_progress_nid,
  save_today_progress,
  load_today_progress,
  get_user_name,
  set_user_name
}
