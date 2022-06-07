const db = require('../config/connection');
const { User, Post, Exercise, Meal } = require('../models');
const userSeeds = require('./userSeeds.json');
const exerciseSeeds = require('./exerciseSeeds.json');
const mealSeeds = require('./mealSeeds.json');
const postSeeds = require('./postSeeds.json');

db.once('open', async () => {
  try {
    await Post.deleteMany({});
    await User.deleteMany({});
    await Exercise.deleteMany({});
    await Meal.deleteMany({});

    await User.create(userSeeds);

    const johnwick1 = await User.findOne({username: 'johnwick1'});
    const fitguy = await User.findOne({username: 'fitguy'});
    
    await User.findOneAndUpdate(
      { username: 'fitguy' },
      {
        $addToSet: {
          friends: johnwick1._id
        },
      }
    );

    await User.findOneAndUpdate(
      { username: 'johnwick1' },
      {
        $addToSet: {
          friends: fitguy._id
        },
      }
    );

    for (let i = 0; i < postSeeds.length; i++) {
      const { _id, postAuthor } = await Post.create(postSeeds[i]);
      await User.findOneAndUpdate(
        { username: postAuthor },
        {
          $addToSet: {
            posts: _id,
          },
        }
      );
    }

    for (let i = 0; i < exerciseSeeds.length; i++) {
      const { _id } = await Exercise.create(exerciseSeeds[i]);

      if (i === 0) {
        await User.findOneAndUpdate(
          { username: 'johnwick1'},
          {
            $addToSet: {
              exercisePlan: _id,
            },
          }
        );

        await Post.findOneAndUpdate(
          {postAuthor: 'johnwick1'},
          {
            $addToSet: {
              exercises: _id
            }
          }
        )
      }

      if (i === 3) {
        await User.findOneAndUpdate(
          { username: 'johnwick1'},
          {
            $addToSet: {
              goal: {
                goalExercise: _id
              }
            },
          }
        );
      }

      if (i === 1 || i === 2) {
        await User.findOneAndUpdate(
          { username: 'fitguy'},
          {
            $addToSet: {
              exercisePlan: _id,
            },
          }
        );

        await Post.findOneAndUpdate(
          {postAuthor: 'fitguy'},
          {
            $addToSet: {
              exercises: _id
            }
          }
        )
      }

      if (i === 4 || i == 5) {
        await User.findOneAndUpdate(
          { username: 'fitguy'},
          {
            $addToSet: {
              goal: {
                goalExercise: _id
              }
            },
          }
        );
      }
    }

    for (let i = 0; i < mealSeeds.length; i++) {
      const { _id } = await Meal.create(mealSeeds[i]);

      if (i < 3) {
        await User.findOneAndUpdate(
          { username: 'johnwick1'},
          {
            $addToSet: {
              mealPlan: _id
            },
          }
        );

        await Post.findOneAndUpdate(
          { postAuthor: 'johnwick1'},
          {
            $addToSet: {
              meals: _id
            }
          }
        );
      } else {
        await User.findOneAndUpdate(
          { username: 'fitguy'},
          {
            $addToSet: {
              mealPlan: _id
            },
          }
        );
        
        await Post.findOneAndUpdate(
          { postAuthor: 'fitguy'},
          {
            $addToSet: {
              meals: _id
            }
          }
        );
      }
    }
    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
