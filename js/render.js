function renderGame() {
  $("#area").addClass("background").removeClass("noDisplay"),
    $("#splashPg").addClass("noDisplay").removeClass("background");
}
function renderSplash() {
  $("#splashPg").addClass("background").removeClass("noDisplay"),
    $("#loading").addClass("noDisplay").removeClass("background");
}
function enemyShake(e, a) {
  e >= a && $("#enemy").addClass("animated shake");
}
$("#attack").click(function () {
  hero.move("attack", getStrength(0), 1, 0, 0, 0, !0, "#iced");
}),
  $("#defend").click(function () {
    hero.move("defend", 0, 0, 1, 0, hero.armorMod, !1, "#miscd");
  }),
  $("#fire").click(function () {
    hero.move("fire", getStrength(5), 5, 0, 0, 0, !0, "#fired");
  }),
  $("#heal").click(function () {
    hero.move("heal", 0, 10, 0, 50, 0, !1, "#miscd");
  }),
  $("#wait").click(function () {
    hero.move("wait", 0, 0, 10, 0, 0, !1, "#waitd");
  }),
  $("#charge").click(function () {
    hero.move(
      "charge",
      0,
      0,
      hero.staminaMax,
      0,
      -(2 * hero.armorMod),
      !1,
      "#heald"
    );
  }),
  $("#lightning").click(function () {
    hero.move("lightning", getStrength(10), 15, 0, 0, 0, !0, "#windd");
  }),
  $("#restore").click(function () {
    hero.move("restore", 0, 20, 0, 150, 0, !1, "#heald");
  });
var ststusMenu = document.getElementById("ststusMenu"),
  health = document.getElementById("health"),
  stamina = document.getElementById("stamina");
function renderHealth() {
  $("#health").text("Health: " + hero.health);
}
function renderStamina() {
  $("#stamina").text("Stamina: " + hero.stamina);
}
var enemyAvatar = document.getElementById("enemy"),
  enemydammage = document.getElementById("dammage"),
  enemyAttack = document.getElementById("dammageTaken");
function renderEnemy() {
  $("#enemy").fadeIn("fast"),
    (enemyAvatar.style.backgroundImage = getAvatarBgImg()),
    renderEHealth();
}
function getAvatarBgImg() {
  return "stalion" === area[0].name
    ? "url('art/stalion1.png')"
    : "goul" === area[0].name
    ? "url('art/soul1.png')"
    : "skywhale" === area[0].name
    ? "url('art/skywhale1.png')"
    : "darkness" === area[0].name
    ? "url('art/darkness1.png')"
    : "wasp" === area[0].name
    ? "url('art/wasp1.png')"
    : "whyvern" === area[0].name
    ? "url('art/whyvern1.png')"
    : "chest" === area[0].name
    ? "url('art/chest.png')"
    : void 0;
}
function renderSkill(e) {
  enemydammage.style.backgroundImage = 'url("art/' + e + '.png")';
}
function renderEHealth() {
  $("#eHealth").text("Health: " + area[0].health);
}
function renderPlayerStats() {
  for (
    var e = $("<div>").attr("id", "player").appendTo("div#area.background"),
      a = $("<ul>").appendTo(e),
      n = 0;
    n < 10;
    n++
  )
    $("<li>")
      .appendTo(a)
      .text([Object.keys(hero)[n + 0]] + ": " + hero[Object.keys(hero)[n + 0]]);
  $("#player").click(function () {
    $("#player").remove();
  });
}
function renderLevelUp() {
  var e = [
    "LEVEL UP!",
    "level: " + hero.level,
    "health + 10",
    "stamina + 2",
    "armor + 1",
    "strength + 1",
    "next lv: " + hero.nextLv,
  ];
  $("#lvu")[0].play();
  for (
    var a = $("<div>").attr("id", "playerLvUp").appendTo("div#area.background"),
      n = $("<ul>").appendTo(a),
      t = 0;
    t < e.length;
    t++
  )
    $("<li>").appendTo(n).text(e[t]);
  $("#playerLvUp").click(function () {
    $("#playerLvUp").remove();
  }),
    renderHealth(),
    renderStamina();
}
function renderEnemyStats() {
  for (
    var e = $("<div>").attr("id", "enemyStat").appendTo("div#area.background"),
      a = $("<ul>").appendTo(e),
      n = 0;
    n < 5;
    n++
  )
    $("<li>")
      .appendTo(a)
      .text(
        [Object.keys(area[0])[n + 0]] +
          ": " +
          area[0][Object.keys(area[0])[n + 0]]
      );
  $("#enemyStat").click(function () {
    $("#enemyStat").remove();
  }),
    $("#enemyStat").css("background-image", getAvatarBgImg());
}
function renderGetItem(e, a, n) {
  $("#lvu")[0].play();
  var t = $("<div>").attr("id", "event").appendTo("div#area.background"),
    r = $("<ul>").appendTo(t),
    d = $("<li>").text("NEW ITEM!!!").appendTo(r);
  (d = $("<li>").text(n).appendTo(r)),
    (d = $("<li>").text(a).appendTo(r)),
    $("#event").click(function () {
      $("#event").remove();
    }),
    $("#event").css("background-image", 'url("art/' + e + '.png")');
}
function enemyDie() {
  $("#enemy").fadeOut(2e3, function () {
    levelUp(), renderEnemy(), (input = !0);
  });
}
function attackedFade(e) {
  $("#hurt")[0].play(),
    $("#area").addClass("animated bounce"),
    $("#dmg").text("Damage"),
    $("#dammageTaken").fadeIn("fast", function () {
      $("#dammageTaken").fadeOut("fast", function () {
        $("#dmg").text(" "),
          $("#area").removeClass("animated bounce"),
          (input = !0);
      });
    });
}
function spellFadeOut() {
  $("<p>"),
    $("#dammage").fadeOut("slow", function () {
      (enemydammage.style.backgroundImage = 'url("art/undefined.png")'),
        $("#enemy").removeClass("animated infinite shake");
    });
}
function spellFadein() {
  $("#dammage").fadeIn("fast", function () {
    spellFadeOut();
  });
}
function fadeDeath() {
  $("#music")[0].pause(),
    $(".button").remove(),
    $(".status").remove(),
    $("#area").attr("class", "dead"),
    $("#area").fadeOut(4e3, function () {
      $(".gameover").fadeIn("fast", function () {
        $("#dead")[0].play(),
          $(".gameover").text("GAME OVER"),
          tryAgain(),
          $(".progress").text("Enemies Defeated: " + hero.enemyDefeated);
      });
    });
}
function fadeStrength(e) {
  $("#str").text(e),
    setTimeout(function () {
      $("#str").text(" ");
    }, 600);
}
function tryAgain() {
  var e = $("<div>");
  e.attr("id", "retry"),
    e.attr("class", "button"),
    e.text("Try Again?"),
    e.appendTo("body"),
    e.click(function () {
      location.reload();
    });
}
function playMoveSound(e) {
  $(e)[0].play();
}
$("#statusMenu").click(function () {
  renderPlayerStats();
}),
  $("#enemy").click(function () {
    renderEnemyStats();
  }),
  $("#start").click(function () {
    !0 === loaded && (renderGame(), gameInit());
  }),
  setTimeout(function () {
    renderSplash(), $("#music")[0].play(), (loaded = !0);
  }, 3e3);
