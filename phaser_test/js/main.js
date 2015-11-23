var game = new Phaser.Game("100%", "100%", Phaser.CANVAS);
var cursors;
var player;

var GameState = {
	preload: function(){
		this.load.image('background', 'assets/background.png');
		this.load.image('penis', 'assets/penis.png');
		this.load.image('ground', 'assets/ground.png');
	},
	create: function(){
		this.background = game.add.tileSprite(0, 0, 1280, 720, 'background');
		this.background.scale.setTo(1.8, 1.5);
		this.background.autoScroll(-25, 0);
		this.penis = game.add.sprite(500, game.world.height - 400, 'penis');
		player = this.penis;
		this.penis.scale.setTo(.5);
		player.anchor.setTo(.5, .5)

		platforms = game.add.group();
		platforms.enableBody = true;
		var ground = platforms.create(0, game.world.height - 64, 'ground');
		ground.scale.setTo(4, 2);
		ground.body.immovable = true;
		var ledge = platforms.create(700, 500, 'ground');
		// ledge.scale.setTo(.3);
		ledge.body.immovable = true;
		ledge = platforms.create(250, 350, 'ground');
		ledge.body.immovable = true;

		// game.physics.startSystem(Phaser.Physics.P2JS);
		// game.physics.p2.enable(this.penis);
		game.physics.arcade.enable(this.penis);
		this.penis.body.bounce.y = 0.0;
		this.penis.body.gravity.y = 300;
		this.penis.body.collideWorldBounds = true;

		cursors = game.input.keyboard.createCursorKeys();



	},
	update: function(){
		// this.penis.body.setZeroVelocity();

		// if (cursors.left.isDown)
  //   {
  //       this.penis.body.moveLeft(400);
  //       this.penis.scale.setTo(-.5, .5);
  //   }
  //   else if (cursors.right.isDown)
  //   {
  //       this.penis.body.moveRight(400);
  //       this.penis.scale.setTo(.5, .5);
  //   }

  //   if (cursors.up.isDown)
  //   {
  //       this.penis.body.moveUp(400);
  //   }
  //   else if (cursors.down.isDown)
  //   {
  //       this.penis.body.moveDown(400);
  //   }

   game.physics.arcade.collide(player, platforms);

   player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;
        this.penis.scale.setTo(-.5, .5);

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;
        this.penis.scale.setTo(.5, .5);

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
        this.penis.scale.setTo(.5, .5)
    }

	}
};

game.state.add('GameState', GameState);
game.state.start('GameState');











