import local_storage from "../local_storage";
import user from "../user";

function create_bingo() {
  create('bingo');
}

function create_full_bingo() {
  create('full_bingo');
}

function create_hidden_image() {
  create('hidden_image');
}

function create(badge_type) {
  let local_storage_progress_id = local_storage.get_progress_nid(game_nid);

  //@TODO
  let badget_type_id = '';

  let data = {
    'type': 'badge',
    'title': {
      'value': badge_type
    },
    'field_badge_type': {
      'value': badget_type_id,
    },
    'field_results': {
      'value': local_storage_progress_id,
    },
  };

  // axios
}

export default {
  create_bingo,
  create_full_bingo,
  create_hidden_image
}
