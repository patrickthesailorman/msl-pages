import _ from 'lodash';
import assert from 'assert';
import {EventEmitter} from 'events';

const EVENT_PLAYER_STATE_CHANGE = 'visibilityStateChange';

/**
 * This service stores state about currently playing song.
 * @name player
 * @param {songStore} songStore
 * @returns {*}
 */
export default function player (songStore) {
  'ngInject';

  const events = new EventEmitter();
  let songEntity, active;

  return {
    /**
     * Player state change listener.
     * @name player#addStateChangeListener
     * @param {Function} cb
     */
    addStateChangeListener(cb) {
      cb();
      events.on(EVENT_PLAYER_STATE_CHANGE, cb);
    },
    /**
     * Remove player stage listener.
     * @name player#removeStateChangeListener
     * @param {Function} cb
     */
    removeStateChangeListener(cb) {
      events.removeListener(EVENT_PLAYER_STATE_CHANGE, cb);
    },
    /**
     * Check if player is active.
     * @name player#isActive
     * @return {boolean}
     */
    isActive() {
      return !!active;
    },
    /**
     * Get currently playing song entity.
     * @name player#getSongEntity
     * @return {SongInfoEntity|undefined}
     */
    getSongEntity() {
      return songEntity;
    },
    /**
     * Start player and save current song state.
     * @name player#play
     * @param {string} songId
     */
    async play(songId) {
      assert.ok(_.isString(songId), 'Song Id must be defined as string!');
      songEntity = await songStore.fetch(songId);
      active = true;
      events.emit(EVENT_PLAYER_STATE_CHANGE);
    },
    /**
     * Remove currently playing song sate.
     * @name player#stop
     */
    stop() {
      songEntity = undefined;
      active = false;
      events.emit(EVENT_PLAYER_STATE_CHANGE);
    },
  };
}
