export const getTodayDate = () => {
  const today = new Date();
  const hh = String(today.getHours()).padStart(2, "0");
  if (hh < 17) {
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return `Today (${dd + "/" + mm + "/" + yyyy})`;
  } else {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0"); //January is 0!

    const yyyy = tomorrow.getFullYear();

    return `Tomorrow (${dd + "/" + mm + "/" + yyyy})`;
  }
};
