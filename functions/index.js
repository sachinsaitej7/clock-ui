const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Razorpay = require('razorpay');
// const algoliasearch = require("algoliasearch");


// const algoliaClient = algoliasearch(
//   functions.config().algolia.appid,
//   functions.config().algolia.apikey
// );

const {
  getFileNameFromUrl,
  getSummaryData,
  transformPayload,
} = require('./utils');

admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();
const ADMIN_USER_ID = 'Gx0eO6PTNuWAf08dcxFXFriadJ33';
const ADMIN_DATA = {
  name: 'Barath',
  logo: 'https://ik.imagekit.io/jg7ousac2/v0/b/clock-poc-11334.appspot.com/o/listing-images%2F184C79EB-569E-4E91-8165-2036AEB6E10B.jpeg-1675653207087?alt=media&token=4ba335d6-5a32-4ba4-855b-23c643ebb1e6',
};

const RAZORPAY_KEY_ID = functions.config().razorpay.keyid;
const RAZORPAY_KEY_SECRET = functions.config().razorpay.secret;

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

const REGION = 'asia-south1';

const localRegionFns = functions.region(REGION);

// on create userProfile add userFollowers document
exports.addAdminAsUserFollowersForProfile = localRegionFns.firestore
  .document("userProfile/{id}")
  .onCreate(async (snap, context) => {
    const { id } = context.params;
    const { name, logo } = snap.data();
    const data = {
      userId: ADMIN_USER_ID,
      userData: ADMIN_DATA,
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

exports.aggregateUserFollowerCount = localRegionFns.firestore
  .document("userFollowers/{id}")
  .onWrite(async (change, context) => {
    const { status, profileData } = change.after.data();
    const { id: profileId } = profileData;

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
      const { followers } = userProfileSnap.data();
      const { count } = followers;
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
exports.deleteProductImagesSubCollection = localRegionFns.firestore
  .document("product/{productId}")
  .onDelete(async (snap, context) => {
    const { productId } = context.params;
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
exports.deleteProductVariantImagesSubCollection = localRegionFns.firestore
  .document("productVariant/{productVariantId}")
  .onDelete(async (snap, context) => {
    const { productVariantId } = context.params;
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
exports.productStatus = localRegionFns.firestore
  .document("product/{productId}")
  .onUpdate(async (change, context) => {
    const { productId } = context.params;
    const { status } = change.after.data();
    const { status: prevStatus } = change.before.data();
    if (status !== prevStatus) {
      const productVariantsRef = db
        .collection("productVariant")
        .where("productId", "==", productId);
      const productVariantsSnap = await productVariantsRef.get();
      if (productVariantsSnap) {
        const batch = db.batch();
        productVariantsSnap.docs.forEach((doc) => {
          batch.update(doc.ref, { status });
        });
        await batch.commit();
      }
    }
  });

// delete product images from storage
exports.deleteProductImages = localRegionFns.firestore
  .document("product/{productId}/images/{imageId}")
  .onDelete(async (snap, context) => {
    const { url } = snap.data();
    const downloadURL = url.replace(
      "https://ik.imagekit.io/jg7ousac2",
      "https://firebasestorage.googleapis.com"
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
exports.deleteProductVariantImages = localRegionFns.firestore
  .document("productVariant/{productVariantId}/images/{imageId}")
  .onDelete(async (snap, context) => {
    const { url } = snap.data();
    const downloadURL = url.replace(
      "https://ik.imagekit.io/jg7ousac2",
      "https://firebasestorage.googleapis.com"
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

// add size variants to product
exports.addSizeVariants = localRegionFns.firestore
  .document("productVariant/{productVariantId}")
  .onCreate(async (snap, context) => {
    const { productId, size } = snap.data();
    const productRef = db.collection("product").doc(productId);
    const productSnap = await productRef.get();
    const { sizes } = productSnap.data();
    if (!sizes?.includes(size.values)) {
      return await productRef.update({
        sizes: sizes
          ? admin.firestore.FieldValue.arrayUnion(size.values)
          : [size.values],
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  });

// send email to user when order is placed
exports.sendOrderEmail = localRegionFns.firestore
  .document("orders/{orderId}")
  .onWrite(async (change, context) => {
    const { orderId } = context.params;
    const { status } = change.after.data();
    const { status: prevStatus } = change.before.data();
    if (
      status !== prevStatus &&
      ["order_placed", "payment_received"].includes(status)
    ) {
      const orderRef = db.collection("orders").doc(orderId);
      const orderSnap = await orderRef.get();
      const { userId, address, paymentType, totalAmount } = orderSnap.data();
      const userRef = db.collection("userProfile").doc(userId);
      const userSnap = await userRef.get();
      const { name } = userSnap.data();

      const newMessageRef = db.collection("emails").doc();
      const messageData = {
        subject: `New Order placed by ${name || "New User"} || ${orderId}`,
        text: `New Order placed by ${name || "New User"}.
          \nAddress: ${address.address}, pincode: ${address.pincode}.\n
          Mobile: ${address.mobileNo}\
          \nPayment Type: ${paymentType}.\nTotal Amount: ${totalAmount}.\n 
          link: https://theclock.xyz/order/${orderId}`,
      };

      await newMessageRef.set({
        message: messageData,
        to: "barathms13@gmail.com",
        cc: "sachin.saitej.7@gmail.com",
      });
    }
  });

// create razorpay order with http callable function and return order id
// enable appcheck

exports.createRazorpayOrder = localRegionFns
  .runWith({
    enforceAppCheck: true,
  })
  .https.onCall(async (data, context) => {
    if (context.app === undefined) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called from an App Check verified app."
      );
    }
    const { items, address, paymentType } = data;

    const productVariantsRef = db.collection("productVariant").where(
      "__name__",
      "in",
      items.map((i) => i.id)
    );
    const productVariantsSnap = await productVariantsRef.get();

    const productVariants = productVariantsSnap.docs.map((doc) => {
      const quantity = items.find((i) => i.id === doc.id).quantity || 1;
      return { id: doc.id, ...doc.data(), quantity };
    });

    const { total, totalDiscount, totalItems } =
      getSummaryData(productVariants);

    const options = {
      amount: total * 100,
      currency: "INR",
      payment_capture: "1",
    };
    const order = await razorpay.orders.create(options);

    // eslint-disable-next-line camelcase
    const { id, amount, attempts, currency, amount_due, amount_paid } = order;
    const newPayload = transformPayload(address, productVariants);

    const orderData = {
      address: newPayload.address,
      userId: context.auth.uid,
      razorpayOrderId: id,
      totalAmount: amount,
      totalDiscount,
      totalItems,
      attempts,
      currency,
      // eslint-disable-next-line camelcase
      amountDue: amount_due,
      // eslint-disable-next-line camelcase
      amountPaid: amount_paid,
      status: "created",
      paymentType,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const orderRef = await db.collection("orders").add(orderData);
    await Promise.all(
      newPayload.items.map(async (item) => {
        return await db
          .collection("orders")
          .doc(orderRef.id)
          .collection("items")
          .add({
            ...item,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
      })
    );

    return {
      razorpayOrderId: id,
      orderId: orderRef.id,
    };
  });
