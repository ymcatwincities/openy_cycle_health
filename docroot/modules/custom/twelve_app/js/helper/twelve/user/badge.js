import axios from 'axios';
import local_storage from '../local_storage';

function create_bingo(badges_list, game_nid) {
  create('bingo', badges_list, game_nid);
}

function create_full_bingo(badges_list, game_nid) {
  create('blackout-bingo', badges_list, game_nid);
}

function create_hidden_image(badges_list, game_nid) {
  create('hidden-picture', badges_list, game_nid);
}

function create(badge_type, badges_list, game_nid) {
  let local_storage_progress_id = local_storage.get_progress_nid(game_nid);

  let data = {
    'type': 'badge',
    'title': {
      'value': badges_list[badge_type]['name']
    },
    'field_badge_type': {
      'value': badges_list[badge_type]['id'],
    },
    'field_results': {
      'value': local_storage_progress_id,
    },
  };

  axios({url: '/session/token'}).then(token_data => {
    axios({
      method: 'post',
      url: window.location.origin + '/node',
      data: data,
      headers: {
        "X-CSRF-Token": token_data.data
      },
    }).then(function (response) {
    }).catch(function (error) {
      console.log(error);
      //@TODO Add error handler
    });
  }).catch(function (error) {
    console.log(error);
  });
}

export default {
  create_bingo,
  create_full_bingo,
  create_hidden_image
}
