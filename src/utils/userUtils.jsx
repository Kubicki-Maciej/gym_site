export function getUserLabel(user) {
  if (!user) return "";

  const firstName = user.first_name?.trim() || "";
  const lastName = user.last_name?.trim() || "";

  // Jeśli jest imię lub nazwisko, połącz je
  if (firstName || lastName) {
    return `${firstName} ${lastName}`.trim();
  }

  // Fallback na email
  return user.email || "";
}
