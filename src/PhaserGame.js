import Phaser from 'phaser';

window.gameScore = 0;

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const _GRAVITY = 800;
const _MAX_UPWARDS_VELOCITY = -300;
const _UPWARDS_ACCELERATION = -450;
const _TERMINAL_VELOCITY = 400;
const _PIPE_SPACING_Y = 200;
const _TREADMILL_SPEED = -125;

const _CONFIG_WIDTH = 960;
const _CONFIG_HEIGHT = 540;
const _GROUND_Y = _CONFIG_HEIGHT;

class FlappyBirdObject {
  constructor(scene) {
    this._sprite = scene.add.sprite(50, 100, 'bird');
    this._sprite.setScale(1.5);
    this._velocity = 0;
    this._scene = scene;

    this._sprite.setInteractive();
    this._sprite.on('pointerdown', () => {
      this._velocity += _UPWARDS_ACCELERATION;
    });
  }

  Destroy() {
    this._sprite.destroy();
  }

  Update(timeElapsed, keyboard) {
    // Apply gravity and upward impulses
    this._ApplyGravity(timeElapsed);
    this._HandleInput(timeElapsed, keyboard);
    this._velocity = Math.min(
      Math.max(this._velocity, _MAX_UPWARDS_VELOCITY),
      _TERMINAL_VELOCITY
    );

    this._sprite.y += this._velocity * timeElapsed;

    const v = new Phaser.Math.Vector2(-1 * _TREADMILL_SPEED * timeElapsed, 0);
    v.add(new Phaser.Math.Vector2(0, this._velocity));
    v.normalize();

    const rad = Math.atan2(v.y, v.x);
    const deg = (180.0 / Math.PI) * rad;

    this._sprite.angle = deg * 0.75;
  }

  get Bounds() {
    const bounds = this._sprite.getBounds();
    return bounds;
  }

  getCustomBounds(width, height) {
    const bounds = this._sprite.getBounds();
    const offsetX = (this._sprite.width - width) / 2;
    const offsetY = (this._sprite.height - height) / 2;

    bounds.setSize(width, height);
    bounds.setPosition(bounds.x + offsetX, bounds.y + offsetY);

    return bounds;
  }

  _ApplyGravity(timeElapsed) {
    this._velocity += _GRAVITY * timeElapsed;
  }

  _HandleInput(timeElapsed, keys) {
    if (!Phaser.Input.Keyboard.JustDown(keys.up)) {
      return;
    }

    this._velocity += _UPWARDS_ACCELERATION;
  }
}

class PipePairObject {
  constructor(scene, x) {
    const height = _CONFIG_HEIGHT * (0.25 + 0.5 * Math.random());
    this._sprite1 = scene.add.sprite(x, height + _PIPE_SPACING_Y * 0.5, 'pipe');
    this._sprite1.displayOriginX = 0;
    this._sprite1.displayOriginY = 0;

    this._sprite2 = scene.add.sprite(x, height - _PIPE_SPACING_Y * 0.5, 'pipe');
    this._sprite2.displayOriginX = 0;
    this._sprite2.displayOriginY = 0;
    this._sprite2.displayHeight = -1 * this._sprite2.height;
  }

  Destroy() {
    this._sprite1.destroy();
    this._sprite2.destroy();
  }

  Update(timeElapsed) {
    this._sprite1.x += timeElapsed * _TREADMILL_SPEED;
    this._sprite2.x += timeElapsed * _TREADMILL_SPEED;
  }

  Intersects(aabb) {
    const b1 = this._sprite1.getBounds();
    const b2 = this._sprite2.getBounds();
    b2.y -= this._sprite2.height;

    return (
      Phaser.Geom.Intersects.RectangleToRectangle(b1, aabb) ||
      Phaser.Geom.Intersects.RectangleToRectangle(b2, aabb)
    );
  }

  Reset(x) {
    const height = _CONFIG_HEIGHT * (0.25 + 0.5 * Math.random());
    this._sprite1.x = x;
    this._sprite1.y = height + _PIPE_SPACING_Y * 0.5;
    this._sprite2.x = x;
    this._sprite2.y = height - _PIPE_SPACING_Y * 0.5;
  }

  get X() {
    return this._sprite1.x;
  }

  get Width() {
    return this._sprite1.width;
  }
}

class FlappyBirdGame {
  constructor(containerId) {
    this._containerId = containerId;
    this._game = this._CreateGame();
    this._previousFrame = null;
    this._bird = null;
    this._gameOver = false;
    this._score = 0;
    this._scoreText = null;
    this._gameOverText = null;
    this._pipes = [];

    this._startButton = null;
    this._gameStarted = false;

    this._eventEmitter = new Phaser.Events.EventEmitter();
  }

  _Destroy() {
    this._bird.Destroy();
    for (let p of this._pipes) {
      p.Destroy();
    }
    this._scoreText.destroy();
    if (this._gameOverText !== null) {
      this._gameOverText.destroy();
    }
    this._bird = null;
    this._pipes = [];
    this._previousFrame = null;
  }

  _Init() {
    if (this._gameStarted)
      for (let i = 0; i < 5; i += 1) {
        this._pipes.push(new PipePairObject(this._scene, 500 + i * 250));
      }

    if (this._gameStarted) this._bird = new FlappyBirdObject(this._scene);
    this._gameOver = false;
    this._score = 0;
  }

  _CreateGame() {
    const self = this;
    const config = {
      type: Phaser.AUTO,
      parent: this._containerId,
      scene: {
        preload: function () {
          self._OnPreload(this);
        },
        create: function () {
          self._OnCreate(this);
        },
        update: function () {
          self._OnUpdate(this);
        },
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: _CONFIG_WIDTH,
        height: _CONFIG_HEIGHT,
      },
    };

    return new Phaser.Game(config);
  }

  _OnPreload(scene) {
    this._scene = scene;
    this._scene.load.image('sky', SERVER_URL + '/background.jpeg');
    this._scene.load.image('pipe', SERVER_URL + '/pipe.png');
    this._scene.load.image('bird', SERVER_URL + '/bird.png');
  }

  _OnCreate() {
    const s = this._scene.add.image(0, 0, 'sky');
    s.displayOriginX = 0;
    s.displayOriginY = 0;
    s.displayWidth = _CONFIG_WIDTH;
    s.displayHeight = _CONFIG_HEIGHT;

    this._keys = {
      up: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
    };

    this._startButton = this._scene.add.text(
      _CONFIG_WIDTH / 2,
      _CONFIG_HEIGHT / 2,
      'Start Game',
      {
        font: '100px Roboto',
        fill: '#FFFFFF',
        align: 'center',
        fixedWidth: _CONFIG_WIDTH / 2,
        backgroundColor: '#97A741',
        borderRadius: '50px',
        borderColor: '#2980b9',
        borderThickness: 10,
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: '#000',
          blur: 2,
          fill: true,
        },
      }
    );
    this._startButton.setOrigin(0.5);

    this._startButton.setInteractive();
    this._startButton.on('pointerdown', () => {
      this.startGame();
      this._startButton.destroy();
    });

    this._Init();
    this._DrawScore();
  }

  _OnUpdate(scene) {
    if (this._gameOver) {
      return;
    }

    const currentFrame = scene.time.now;
    if (this._previousFrame == null) {
      this._previousFrame = currentFrame;
    }

    const timeElapsedInS = (currentFrame - this._previousFrame) / 1000.0;

    if (this._gameStarted) {
      this._bird.Update(timeElapsedInS, this._keys);
      this._UpdatePipes(timeElapsedInS);
    }
    this._CheckGameOver();

    this._previousFrame = currentFrame;
  }

  _CheckGameOver() {
    const birdAABB = this._bird?.getCustomBounds(60, 50);

    if (birdAABB?.top >= _GROUND_Y - 100) {
      this._GameOver();
      return;
    }

    for (const p of this._pipes) {
      if (p.Intersects(birdAABB)) {
        this._GameOver();
        return;
      }
    }
  }

  _UpdatePipes(timeElapsed) {
    const oldPipeX = this._pipes[0].X + this._pipes[0].Width;

    for (const p of this._pipes) {
      p.Update(timeElapsed);
    }

    const newPipeX = this._pipes[0].X + this._pipes[0].Width;

    if (oldPipeX > 50 && newPipeX <= 50) {
      this._score += 1;
      window.gameScore += 1;
      this._scoreText.text = 'Score: ' + this._score;
    }

    if (this._pipes[0].X + this._pipes[0].Width <= 0) {
      const p = this._pipes.shift();
      p.Reset(this._pipes[this._pipes.length - 1].X + 200.0);
      this._pipes.push(p);
    }
  }

  _GameOver() {
    const text = 'GAME OVER';
    const style = {
      font: '100px Roboto',
      fill: '#FFFFFF',
      align: 'center',
      fixedWidth: _CONFIG_WIDTH,
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: '#000',
        blur: 2,
        fill: true,
      },
    };

    this._gameOverText = this._scene.add.text(
      0,
      _CONFIG_HEIGHT * 0.25,
      text,
      style
    );
    this._gameOver = true;

    this._startButton = this._scene.add.text(
      _CONFIG_WIDTH / 2,
      _CONFIG_HEIGHT / 2 + 100, // Adjust the Y position
      'Play Again',
      {
        font: '100px Roboto',
        fill: '#FFFFFF',
        align: 'center',
        fixedWidth: _CONFIG_WIDTH / 2,
        backgroundColor: '#97A741',
        borderRadius: '50px',
        borderColor: '#2980b9',
        borderThickness: 10,
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: '#000',
          blur: 2,
          fill: true,
        },
      }
    );
    this._startButton.setOrigin(0.5);

    this._startButton.setInteractive();
    this._startButton.on('pointerdown', () => {
      this.restartGame(); // Add the restartGame function
      this._startButton.destroy();
    });

    this._eventEmitter.emit('gameover');
  }

  _DrawScore() {
    const text = 'Score: 0';
    const style = {
      font: '40px Roboto',
      fill: '#FFFFFF',
      align: 'center',
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: '#000',
        blur: 2,
        fill: true,
      },
    };

    this._scoreText = this._scene.add.text(0, 0, text, style);
  }

  startGame() {
    if (!this._gameStarted) {
      this._gameStarted = true;
      this._Init();
      this._DrawScore();
    }
  }

  restartGame() {
    this._Destroy();
    this._Init();
    this._DrawScore();
  }

  getFinalScore() {
    return this._score;
  }

  onGameOver(callback) {
    this._eventEmitter.on('gameover', callback);
  }
}

export default FlappyBirdGame;
