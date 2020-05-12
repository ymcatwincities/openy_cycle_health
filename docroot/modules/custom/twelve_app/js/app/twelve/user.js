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
  if(!validate_name(name)) {
    return local_storage.get_user_name();
  }
}

export default {
  validate_name,
  get_active_player_name
}
