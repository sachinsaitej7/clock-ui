export const getPayload = async (items, user, activeAddress) => {
  const idToken = await user.getIdToken();
  const payload = {
    items: items,
    id_token: idToken,
    delivery_address_id: activeAddress.id,
  };
  return payload;
};
