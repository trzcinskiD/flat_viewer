const { db } = require("./db");

const getFlats = async () => {
  try {
    const flats = await db
      .collection("flats")
      .find({})
      .toArray();
    return flats;
  } catch (err) {
    console.log(err);
  }
};

export default getFlats;
