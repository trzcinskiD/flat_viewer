const { db } = require("./db");

const editFlat = (id, realPrice, love) => {
  try {
    return db
      .collection("flats")
      .findOneAndUpdate({ _id: id }, { $set: { realPrice: realPrice, love: love } }, { returnNewDocument: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports = editFlat;
