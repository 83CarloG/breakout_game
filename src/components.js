import background_img from './imgs/bg.jpg';
import level_img from './imgs/level.png';
import life_img from './imgs/life.png';
import score_img from './imgs/score.png';
import sound_off from './imgs/SOUND_OFF.png';
import sound_on from './imgs/SOUND_ON.png';
 

import wall_hit from './sounds/wall.mp3';
import life_lost from './sounds/life_lost.mp3';
import paddle_hit from './sounds/paddle_hit.mp3';
import win from './sounds/win.mp3';
import brick_hit from './sounds/brick_hit.mp3';

/////// LOAD IMAGES ///////
const BG_IMG = new Image();
BG_IMG.src = background_img;
const LEVEL_IMG = new Image();
LEVEL_IMG.src = level_img;
const LIFE_IMG = new Image();
LIFE_IMG.src = life_img;
const SCORE_IMG = new Image();
SCORE_IMG.src = score_img;
const SOUND_OFF = new Image();
SOUND_OFF.src = sound_off;
const SOUND_ON = new Image();
SOUND_ON.src = sound_on;
/////// END LOAD IMAGES ///////

// *********************** //

/////// LOAD SOUND ///////
const WALL_HIT = new Audio();
WALL_HIT.src = wall_hit;
const LIFE_LOST = new Audio();
LIFE_LOST.src = life_lost;
const PADDLE_HIT = new Audio();
PADDLE_HIT.src = paddle_hit;
const WIN = new Audio();
WIN.src = win;
const BRICK_HIT = new Audio();
BRICK_HIT.src = brick_hit;
/////// END LOAD SOUND ///////

export { BG_IMG, LEVEL_IMG, LIFE_IMG, SCORE_IMG, WALL_HIT, LIFE_LOST, PADDLE_HIT, WIN, BRICK_HIT, SOUND_OFF, SOUND_ON };