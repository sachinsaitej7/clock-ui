import { useState, useCallback, useEffect } from "react";
import omit from "lodash/omit";
import {
  useCollectionDataOnce,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  collection,
  query,
  where,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
  collectionGroup,
} from "firebase/firestore";

import { getFirebase } from "@firebase-app";
import { useAuth } from "@app/store";
import { createProductData, createPlaceData } from "./utils";

const { db } = getFirebase();

const idConverter = {
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return { ...data, id: snapshot.id };
  },
};

const userConvertor = {
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      id: data.userId,
      name: data.userData?.name || "",
      logo: data.userData?.logo || "",
      createdAt: data.createdAt,
    };
  },
};

const profileConvertor = {
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      id: data.profileData.id,
      name: data.profileData?.name || "",
      logo: data.profileData?.logo || "",
      createdAt: data.createdAt,
    };
  },
};

const productRef = collection(db, "product");
const brandRef = collection(db, "brand");
const productVariantRef = collection(db, "productVariant");
const userFollowersColRef = collection(db, "userFollowers");

// hook to get userProfile data
export const useUserProfile = (id) => {
  const userProfileDoc = id
    ? doc(db, "userProfile", id).withConverter(idConverter)
    : undefined;
  const data = useDocumentData(userProfileDoc);
  return data;
};

export const useUserSavedProducts = (id) => {
  const userSavedProductsQuery = id
    ? collection(db, "userProfile", id, "savedProducts").withConverter(
        idConverter
      )
    : undefined;
  const data = useCollectionData(userSavedProductsQuery);
  return data;
};

// hook to get product data by brand id
export const useProductsByProfileId = (uid) => {
  const productQuery = uid
    ? query(
        productRef,
        where("createdBy", "==", uid),
        where("status", "==", true)
      ).withConverter(idConverter)
    : undefined;
  const data = useCollectionData(productQuery);
  return data;
};

// hook to get products with delivery='instant' and status=true
export const useInstantProducts = (uid) => {
  const productQuery = uid
    ? query(
        productRef,
        where("status", "==", true),
        where("createdBy", "==", uid)
      ).withConverter(idConverter)
    : undefined;
  const data = useCollectionData(productQuery);
  return data;
};

// hook to get products with delivery='on-demand' and status=true
export const useOnDemandProducts = (uid) => {
  const productQuery = uid
    ? query(
        productRef,
        where("delivery", "==", "on-demand"),
        where("status", "==", true),
        where("createdBy", "==", uid)
      ).withConverter(idConverter)
    : undefined;
  const data = useCollectionData(productQuery);
  return data;
};

// hook to get brands data
export const useBrands = () => {
  const brandQuery = query(brandRef, where("status", "==", true)).withConverter(
    idConverter
  );
  const data = useCollectionDataOnce(brandQuery);
  return data;
};

// hook to get product variants by product id
export const useProductVariantsByProductId = (productId = "") => {
  const productVariantQuery = query(
    productVariantRef,
    where("productId", "==", productId)
  ).withConverter(idConverter);
  const data = useCollectionData(productVariantQuery);
  return data;
};

// delete product data by id
export const deleteProduct = async (id) => {
  const productDoc = doc(db, "product", id);
  await deleteDoc(productDoc);
};

// delete product variant data by id
export const deleteProductVariant = async (id) => {
  const productVariantDoc = doc(db, "productVariant", id);
  await deleteDoc(productVariantDoc);
};

// delete product variants by ids
export const deleteProductVariants = async (ids) => {
  const productVariantDocs = ids.map((id) => doc(db, "productVariant", id));
  await Promise.all(productVariantDocs.map((doc) => deleteDoc(doc)));
};

// get all subcategory data
export const useSubCategories = () => {
  const subCategoryRef = collectionGroup(db, "subcategory").withConverter(
    idConverter
  );
  const q = query(subCategoryRef, where("status", "==", true));
  const data = useCollectionDataOnce(q);
  return data;
};

//get all category data
export const useCategories = () => {
  const categoryRef = collection(db, "category").withConverter(idConverter);
  const q = query(categoryRef, where("status", "==", true));
  const data = useCollectionDataOnce(q);
  return data;
};

// get all size data
export const useSizes = () => {
  const sizeRef = collection(db, "size").withConverter(idConverter);
  const q = query(sizeRef, where("status", "==", true));
  const data = useCollectionDataOnce(q);
  return data;
};

// get all color data
export const useColors = () => {
  const colorRef = collection(db, "color").withConverter(idConverter);
  const q = query(colorRef, where("status", "==", true));
  const data = useCollectionDataOnce(q);
  return data;
};

// add product data
export const addProduct = async (data, type) => {
  const productData =
    type === "place" ? createPlaceData(data) : createProductData(data);
  const newProduct = {
    ...productData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const docRef = await addDoc(productRef, newProduct);
  const subColRef = collection(db, "product", docRef.id, "images");
  await addImages(subColRef, data.images);
  return docRef.id;
};

const addImages = async (colRef, urls) => {
  const images = urls.map((image) => {
    return {
      url: image,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
  });
  await Promise.all(images.map((image) => addDoc(colRef, image)));
  return;
};

// add product variant data
export const addProductVariants = async (data, productId) => {
  const variants = data.sizes.map((size) => {
    const productData = createProductData(data);

    const variantData = {
      ...productData,
      productId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      stock: {
        quantity: size.quantity || 1,
      },
      size: omit(
        size,
        "quantity",
        "createdAt",
        "updatedAt",
        "size_chart_image"
      ),
      color: null,
    };
    return variantData;
  });

  const refs = await Promise.all(
    variants.map((variant) => {
      return addDoc(productVariantRef, variant);
    })
  );
  await Promise.all(
    refs.map((ref) =>
      addImages(collection(db, "productVariant", ref.id, "images"), data.images)
    )
  );
  return;
};

// update product variant data with product id
export const updateProductVariant = async (productId, data) => {
  const productVariantDoc = doc(db, "productVariant", productId);
  await updateDoc(productVariantDoc, { ...data, updatedAt: serverTimestamp() });
  return;
};

export function useGetUserFollowersByProfile() {
  const [user] = useAuth();
  const profileId = user?.uid;
  const q = profileId
    ? query(
        userFollowersColRef,
        where("profileData.id", "==", profileId),
        where("status", "==", true)
      ).withConverter(userConvertor)
    : undefined;
  return useCollectionData(q);
}

export function useGetUserFollowersByUser() {
  const [user] = useAuth();
  const userId = user?.uid;
  const q = userId
    ? query(
        userFollowersColRef,
        where("userId", "==", userId),
        where("status", "==", true)
      ).withConverter(profileConvertor)
    : undefined;
  return useCollectionData(q);
}

export const useUpdateUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user] = useAuth();
  const userId = user?.uid;

  const updateProfile = useCallback(
    async (payload) => {
      if (!userId) return;
      const updatedProfileData = {
        ...payload,
        updatedAt: serverTimestamp(),
      };
      const userProfileDoc = doc(db, "userProfile", userId);
      try {
        setLoading(true);
        await updateDoc(userProfileDoc, updatedProfileData);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    },
    [userId]
  );

  return [updateProfile, loading, error];
};

export const getBrowserLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

// get address from lat and long
export const getAddressFromLatLong = async ({ latitude, longitude }) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2c${longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&type=clothing_store&radius=100&type=store&keyword=clothing&type=shopping_mall`;
    const response = await fetch(url);
    const data = await response.json();
    if (
      data.status === "ZERO_RESULTS" ||
      data.status === "OVER_QUERY_LIMIT" ||
      data.status === "REQUEST_DENIED"
    ) {
      return null;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useGetUserAddress = ({ latitude, longitude }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);

  const getUserAddress = useCallback(async () => {
    if (!latitude || !longitude) return;
    try {
      setLoading(true);
      const address = await getAddressFromLatLong({ latitude, longitude });
      setAddress(address);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }, [latitude, longitude]);

  useEffect(() => {
    getUserAddress();
  }, [getUserAddress, latitude, longitude]);

  return [address, loading, error];
};

// // get lat and long from address
// export const getLatLongFromAddress = async (address) => {
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
//   const response = await fetch(url);
//   const data = await response.json();
//   return data;
// };

export const useGetUserLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  const getUserLocation = useCallback(async () => {
    try {
      setLoading(true);
      const location = await getBrowserLocation();
      setLocation(location);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  return [location, loading, error, getUserLocation];
};
