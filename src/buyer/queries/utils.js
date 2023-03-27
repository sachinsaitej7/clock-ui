export function getLastDoc(snapshot) {
  if (!snapshot?.docs) return null;
  const lastDoc = snapshot.docs[snapshot.docs.length - 1];
  return lastDoc;
}

export function getIdConverter() {
  const idConverter = {
    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);
      return { ...data, id: snapshot.id };
    },
  };
  return idConverter;
}
