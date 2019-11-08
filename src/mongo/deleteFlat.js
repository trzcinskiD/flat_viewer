// Delete from flats collections and add url to deletedFlats collection
const { db } = require("./db");

const deleteFlat = async (id, url) => {
  try {
    await db.collection("deletedFlats").insertOne({ url: url });
    await db.collection("flats").deleteOne({ _id: id });
    console.log(`succesfuly deleted ${id} doc + new deleted url: ${url}`);
  } catch (err) {
    console.log(err);
  }
};

export default deleteFlat;
