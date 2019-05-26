import { put, delay, select } from 'redux-saga/effects';
import { generateEnemy, updateEnemies } from '../actions/enemy';
import { deleteBullets } from '../actions/playerBullet';
import { Enemy } from '../reducers/enemy';
import { Bullet } from '../reducers/playerBullet';
import { checkInFrame, randRange } from '../utils';
import { enemySize, playerBulletSize } from '../config';

const velocity = 5;
const coolTimeMsec = 1000;
let enemyId = 1;

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
    // 枠外のenemyを削除
    let deletedEnemies = updatedEnemies.filter((enemy: Enemy) =>
      checkInFrame(enemy),
    );
    // enemyに当たったbulletのidを配列に格納し、削除するために利用
    const hitBulletIds: number[] = [];
    // bulletに当たった敵を削除
    deletedEnemies = deletedEnemies.filter((enemy: Enemy) => {
      const isHit = bullets.some((bullet: Bullet) => {
        const isHitBullet =
          ((enemy.x >= bullet.x && enemy.x <= bullet.x + playerBulletSize) ||
            (enemy.x + enemySize >= bullet.x &&
              enemy.x + enemySize < bullet.x + playerBulletSize)) &&
          ((enemy.y >= bullet.y && enemy.y <= bullet.y + playerBulletSize) ||
            (enemy.y + enemySize >= bullet.y &&
              enemy.y + enemySize <= bullet.y + playerBulletSize));
        if (isHitBullet) hitBulletIds.push(bullet.id);

        return isHitBullet;
      });

      return !isHit;
    });
    if (hitBulletIds.length > 0)
      yield put(deleteBullets({ ids: hitBulletIds }));
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
    yield delay(coolTimeMsec);
  }
}
