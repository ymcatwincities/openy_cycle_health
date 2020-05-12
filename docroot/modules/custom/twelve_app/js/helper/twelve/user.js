import local_storage from "./local_storage";

/**
 *
 * @param {String} name
 */
function validate_name(name) {
  return typeof name === "string" && name.length > 0;
}

function get_active_player_name() {
  let name = drupalSettings.username;
  if(validate_name(name)) {
    return name;
  } else {
    return local_storage.get_user_name();
  }
}

function is_guest() {
  return drupalSettings.user.uid == 0;
}

export default {
  validate_name,
  get_active_player_name,
  is_guest
}
