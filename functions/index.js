const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {getFileNameFromUrl} = require("./utils");

admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();

// on create userProfile add userFollowers document
exports.addAdminAsUserFollowersForProfile = functions.firestore
    .document("userProfile/{id}")
    .onCreate(async (snap, context) => {
      const {id} = context.params;
      const {name, logo} = snap.data();
      // admin user id
      const adminId = "c3ssJbzX7zsJvDDToB7umOgK8U0P";
      const data = {
        userId: adminId,
        profileData: {
          id,
          name,
          logo,
        },
        status: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      return await db.collection("userFollowers").add(data);
    });

exports.aggregateUserFollowerCount = functions.firestore
    .document("userFollowers/{id}")
    .onWrite(async (change, context) => {
      const {status, profileData} = change.after.data();
      const {id: profileId} = profileData;

      if (status) {
        return await db
            .collection("userProfile")
            .doc(profileId)
            .update({
              followers: {
                count: admin.firestore.FieldValue.increment(1),
              },
            });
      } else {
        const userProfileRef = db.collection("userProfile").doc(profileId);
        const userProfileSnap = await userProfileRef.get();
        const {followers} = userProfileSnap.data();
        const {count} = followers;
        console.log("count", count);
        if (count > 0) {
          return await userProfileRef.update({
            followers: {
              count: admin.firestore.FieldValue.increment(-1),
            },
          });
        }
      }
    });

// delete product images subcollection when product is deleted
exports.deleteProductImagesSubCollection = functions.firestore
    .document("product/{productId}")
    .onDelete(async (snap, context) => {
      const {productId} = context.params;
      const productImagesRef = db
          .collection("product")
          .doc(productId)
          .collection("images");
      const productImagesSnap = await productImagesRef.get();

      if (productImagesSnap) {
        const batch = db.batch();
        productImagesSnap.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      }

      const productVariantsRef = db
          .collection("productVariant")
          .where("productId", "==", productId);
      const productVariantsSnap = await productVariantsRef.get();

      if (productVariantsSnap) {
        const batch = db.batch();
        productVariantsSnap.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      }
    });

// delete product variant images sub collection
exports.deleteProductVariantImagesSubCollection = functions.firestore
    .document("productVariant/{productVariantId}")
    .onDelete(async (snap, context) => {
      const {productVariantId} = context.params;
      const productImagesRef = db
          .collection("productVariant")
          .doc(productVariantId)
          .collection("images");
      const productImagesSnap = await productImagesRef.get();
      if (productImagesSnap) {
        const batch = db.batch();
        productImagesSnap.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      }
    });

// disable product variants when product is disabled
exports.disableVariant = functions.firestore
    .document("product/{productId}")
    .onUpdate(async (change, context) => {
      const {productId} = context.params;
      const {status} = change.after.data();
      if (!status) {
        const productVariantsRef = db
            .collection("productVariant")
            .where("productId", "==", productId);
        const productVariantsSnap = await productVariantsRef.get();
        if (productVariantsSnap) {
          const batch = db.batch();
          productVariantsSnap.docs.forEach((doc) => {
            batch.update(doc.ref, {status: false});
          });
          await batch.commit();
        }
      }
    });

// delete product images from storage
exports.deleteProductImages = functions.firestore
    .document("product/{productId}/images/{imageId}")
    .onDelete(async (snap, context) => {
      const {url} = snap.data();
      const downloadURL = url.replace(
          "https://ik.imagekit.io/jg7ousac2",
          "https://firebasestorage.googleapis.com",
      );
      // delete reference from storage using downloadURL
      const fileName = getFileNameFromUrl(downloadURL);
      const bucket = storage.bucket("gs://clock-poc-11334.appspot.com");
      const file = bucket.file(`listing-images/${fileName}`);
      try {
        await file.delete();
      } catch (error) {
        console.log(error);
      }
    });

// delete product variant images from storage
exports.deleteProductVariantImages = functions.firestore
    .document("productVariant/{productVariantId}/images/{imageId}")
    .onDelete(async (snap, context) => {
      const {url} = snap.data();
      const downloadURL = url.replace(
          "https://ik.imagekit.io/jg7ousac2",
          "https://firebasestorage.googleapis.com",
      );

      // delete reference from storage using downloadURL
      const fileName = getFileNameFromUrl(downloadURL);
      const bucket = storage.bucket("gs://clock-poc-11334.appspot.com");
      const file = bucket.file(`listing-images/${fileName}`);
      try {
        await file.delete();
      } catch (error) {
        console.log(error);
      }
    });
