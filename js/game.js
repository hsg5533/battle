function gameInit() {
  nextEnemy(),
    renderEnemy(),
    $("#dammageTaken").fadeOut(0).addClass("dammageTaken"),
    $(".gameover").fadeOut(0);
}
function deadCheck() {
  hero.health <= 0 && fadeDeath();
}
function getStrength(e) {
  if (!0 === input) {
    var n = Math.floor(Math.random() * (hero.strength + e)) + hero.level + e;
    return fadeStrength(n), n;
  }
}
function enemyCalculation(e) {
  return parseInt(Math.random() * (e.strength - hero.armor + 1));
}
function getItem() {
  item[Object.keys(item)[Math.floor(10 * Math.random())]]();
}
function nextEnemy() {
  var e = Math.random();
  e >= 0.84
    ? area.push(
        new Enemy(
          "whyvern",
          enemyLV,
          10 + 5 * enemyLV,
          25 + enemyLV,
          15 + enemyLV
        )
      )
    : e >= 0.68
    ? area.push(
        new Enemy("goul", enemyLV, 15 + 5 * enemyLV, 10 + enemyLV, 10 + enemyLV)
      )
    : e >= 0.55
    ? area.push(
        new Enemy(
          "skywhale",
          enemyLV,
          30 + 10 * enemyLV,
          5 + enemyLV,
          30 + enemyLV
        )
      )
    : e >= 0.45
    ? area.push(
        new Enemy("wasp", enemyLV, 5 + 2 * enemyLV, 2 + enemyLV, 5 + enemyLV)
      )
    : e >= 0.3
    ? area.push(
        new Enemy(
          "stalion",
          enemyLV,
          15 + 5 * enemyLV,
          20 + enemyLV,
          40 + enemyLV
        )
      )
    : e >= 0.1
    ? area.push(
        new Enemy(
          "darkness",
          enemyLV,
          20 + 5 * enemyLV,
          25 + enemyLV,
          20 + enemyLV
        )
      )
    : area.push(new Enemy("chest", "0", 1, 0, 0));
}
function levelUp() {
  hero.exp >= hero.nextLv &&
    ((hero.level += 1),
    (hero.healthMax += 10),
    (hero.health = hero.healthMax),
    (hero.armor += 1),
    (hero.strength += 1),
    (hero.staminaMax += 2),
    (hero.stamina = hero.staminaMax),
    (hero.exp -= hero.nextLv),
    (hero.nextLv = Math.floor(1.3 * hero.nextLv)),
    renderLevelUp()),
    nextEnemy(),
    renderEnemy();
}
Enemy.prototype.attack = function (e) {
  renderEHealth(),
    this.health > 0
      ? setTimeout(function () {
          (e.health -= enemyCalculation(area[0])),
            attackedFade(),
            renderHealth(),
            deadCheck();
        }, 1e3)
      : ((e.exp += this.exp),
        area.shift(),
        (enemyLV += 1),
        (e.enemyDefeated += 1),
        (e.stamina += 1),
        enemyDie(),
        "chest" === this.name && getItem(),
        $("#die0")[0].play());
};
