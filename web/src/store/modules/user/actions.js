import UserTypes from './types';

export function updateProfileRequest(data) {
  return {
    type: UserTypes.UPDATE_PROFILE_REQUEST,
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: UserTypes.UPDATE_PROFILE_SUCCESS,
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: UserTypes.UPDATE_PROFILE_FAILURE,
  };
}
