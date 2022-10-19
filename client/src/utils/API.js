export const searchFood = async (query, timezone) => {
  return await fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients/`, {
    method: 'POST',
    body: JSON.stringify({
      query,
      timezone
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': process.env.REACT_APP_NUTRITIONIX_ID,
      'x-app-key': process.env.REACT_APP_NUTRITIONIX_KEY
    }
  });
}

export const searchExercise = async (query, user) => {
  return await fetch(`https://trackapi.nutritionix.com/v2/natural/exercise`, {
    method: 'POST',
    body: JSON.stringify({
      query,
      gender: user?.gender,
      weight_kg: user?.weight,
      height_cm: user?.height,
      age: user?.age,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': process.env.REACT_APP_NUTRITIONIX_ID,
      'x-app-key': process.env.REACT_APP_NUTRITIONIX_KEY
    }
  });
}