import { put, delay, select } from 'redux-saga/effects';
import { updateKillCount } from '../actions/app';
import { generateEnemy, updateEnemies } from '../actions/enemy';
import { deleteBullets } from '../actions/playerBullet';
import { Enemy } from '../reducers/enemy';
import { Bullet } from '../reducers/playerBullet';
import { checkInFrame, randRange } from '../utils';
import { enemySize, playerBulletSize } from '../config';

const velocity = 5;
let enemyId = 1;
const LEVEL_TO_COOLTIME: { [key: number]: number } = {
  1: 3000,
  2: 2000,
  3: 1500,
  4: 1000,
  5: 800,
  6: 700,
  7: 600,
  8: 500,
};
const MAX_COOL_TIME = 500;

export function* updateEnemyWorker() {
  while (true) {
    yield delay(1000 / 30);
    const {
      app,
      enemy: { enemies },
      playerBullet: { bullets },
    } = yield select(state => state);
    if (!app.isPlaying) break;
    const updatedEnemies = enemies.map((enemy: Enemy) => {
      const newEnemy = enemy;
      newEnemy.x -= velocity;

      return newEnemy;
    });

    // 枠外に移動したenemyを削除
    let deletedEnemies = updatedEnemies.filter((enemy: Enemy) =>
      checkInFrame(enemy),
    );

    // enemyに当たったbulletのidを配列に格納し、bulletを削除するために利用
    // enemyのsagaにこのロジックがあるのはよくない。
    // TODO: 現状、enemy, player, bulletの描画位置をそれぞれ別でupdateしているが、一箇所にまとめるべき(´・ω・｀)
    const hitBulletIds: number[] = [];
    let killCount = 0;

    // bulletに当たったenemyを削除
    deletedEnemies = deletedEnemies.filter((enemy: Enemy) => {
      const isHit = bullets.some((bullet: Bullet) => {
        /* TODO: 当たり判定の条件式をutil化する */
        const isHitBullet =
          ((enemy.x >= bullet.x && enemy.x <= bullet.x + playerBulletSize) ||
            (enemy.x + enemySize >= bullet.x &&
              enemy.x + enemySize < bullet.x + playerBulletSize)) &&
          ((enemy.y >= bullet.y && enemy.y <= bullet.y + playerBulletSize) ||
            (enemy.y + enemySize >= bullet.y &&
              enemy.y + enemySize <= bullet.y + playerBulletSize));
        if (isHitBullet) {
          killCount += 1;
          hitBulletIds.push(bullet.id);
        }

        return isHitBullet;
      });

      return !isHit;
    });

    // bulletを消す、killCountをアップデートする。
    if (hitBulletIds.length > 0) {
      yield put(deleteBullets({ ids: hitBulletIds }));
      yield put(updateKillCount({ killCount }));
    }
    yield put(updateEnemies({ enemies: deletedEnemies }));
  }
}

export function* generateEnemyWorker() {
  while (true) {
    const { app } = yield select(state => state);
    if (!app.isPlaying) break;
    yield put(
      generateEnemy({
        id: enemyId,
        x: 700 - enemySize,
        y: randRange(0, 400 - enemySize),
      }),
    );
    enemyId += 1;
    yield delay(LEVEL_TO_COOLTIME[app.level] || MAX_COOL_TIME);
  }
}
