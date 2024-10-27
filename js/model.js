var loaded = !1,
  input = !0,
  enemyLV = 0,
  area = [],
  hero = {
    name: "Akari",
    level: 1,
    healthMax: 100,
    armor: 0,
    armorMod: 5,
    strength: 15,
    strengthMod: 0,
    staminaMax: 100,
    exp: 0,
    nextLv: 25,
    enemyDefeated: 0,
    health: 100,
    stamina: 100,
    move: function e(t, a, r, h, o, n, m, i) {
      !0 === input &&
        hero.health >= 1 &&
        r <= hero.stamina &&
        (!0 === m && enemyShake(hero.stamina, r),
        (area[0].health -= a),
        (hero.armor += n),
        (hero.stamina -= r),
        (hero.stamina += h),
        (hero.health += o),
        hero.health > hero.healthMax && (hero.health = hero.healthMax),
        hero.stamina > hero.staminaMax && (hero.stamina = hero.staminaMax),
        playMoveSound(i),
        renderHealth(),
        renderSkill(t),
        renderStamina(),
        spellFadein(),
        area[0].attack(hero),
        setTimeout(function () {
          hero.armor -= n;
        }, 1700),
        (input = !1));
    },
  },
  Enemy = function e(t, a, r, h, o) {
    (this.name = t),
      (this.level = a),
      (this.health = r),
      (this.strength = h),
      (this.exp = o);
  },
  item = {
    strengthitem1: function e() {
      (hero.strengthMod += 2),
        renderGetItem("strengthitem1", "Strength: + 2", "Dagger");
    },
    strengthitem2: function e() {
      (hero.strengthMod += 4),
        renderGetItem("strengthitem2", "Strength: + 4", "Sword");
    },
    strengthitem3: function e() {
      (hero.strengthMod += 6),
        renderGetItem("strengthitem3", "Strength: + 6", "Axe");
    },
    armoritem1: function e() {
      (hero.armorMod += 1), renderGetItem("armoritem1", "Armor: + 1", "Helmit");
    },
    armoritem2: function e() {
      (hero.armorMod += 2), renderGetItem("armoritem2", "Armor: + 2", "Shield");
    },
    armoritem3: function e() {
      (hero.armorMod += 3),
        renderGetItem("armoritem3", "Armor: + 3", "Breastplate");
    },
    magicorb: function e() {
      (hero.level += 1),
        (hero.healthMax += 10),
        (hero.health = hero.healthMax),
        (hero.armor += 1),
        (hero.strength += 1),
        (hero.stamina += 2),
        (hero.exp = 0),
        (hero.nextLv = Math.floor(1.3 * hero.nextLv)),
        renderGetItem("magicorb", "Level Up!", "Magic Tome");
    },
    vitalitycrystal: function e() {
      (hero.healthMax += 15),
        (hero.health = hero.healthMax),
        renderGetItem("vitalitycrystal", "Max Health: + 15", "Vital Crystal");
    },
    staminashard: function e() {
      (hero.staminaMax += 5),
        (hero.stamina = hero.staminaMax),
        renderGetItem("staminashard.name", "Max Stamina: + 5", "Stamina Shard");
    },
    luckcharm: function e() {
      (enemyLV -= 1),
        renderGetItem("luckcharm", "Enemy Lv Down!", "Luck Charm");
    },
  };
