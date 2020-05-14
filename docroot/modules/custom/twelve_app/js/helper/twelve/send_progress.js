const axios = require('axios');
import local_storage from "./local_storage";

/**
 * @param {int} user_id
 * @param {int} game_nid
 * @param {int} progress_nid
 * @param {[]} exercise_progress_list
 */
function send_progress(user_id, game_nid, progress_nid, exercise_progress_list) {
  let url = window.location.origin + '/node';
  let request_type = 'post';
  if (progress_nid > 0) {
    url += '/' + progress_nid;
    request_type = 'patch';
  }

  let data = {
    'type': '12_bursts_result',
    'title': {
      'value': localStorage.twelveUserName
    },
    'field_when': {
      'value': game_nid,
    },
    'field_finished_items': exercise_progress_list,
    'field_sub_user': {
      'value': drupalSettings.sub_account_id
    }
  };

  axios({url: '/session/token'}).then(token_data => {
    axios({
      method: request_type,
      url: url,
      data: data,
      headers: {
        "X-CSRF-Token": token_data.data
      },
    }).then(function (response) {
      let progress_nid = response.data.nid[0].value;
      local_storage.set_progress_nid(user_id, game_nid, progress_nid, drupalSettings.sub_account_id)
    }).catch(function (error) {
      //@TODO Add error handler
    });
  }).catch(function (error) {
  });
}

export default send_progress
