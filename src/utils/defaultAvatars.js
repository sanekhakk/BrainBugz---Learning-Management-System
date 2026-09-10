// ---------------------------------------------------------------------
// Default avatar gallery.
//
// Every image file placed in `src/assets/avatars/` is automatically
// picked up here — students and admins can only choose from these
// bundled images (no upload from their own device is offered anywhere
// in the app). To add or change the options, just drop PNG/JPG/WebP
// files into that folder; nothing else needs to change.
//
// We store the STABLE FILENAME (e.g. "avatar3.png") in Firestore rather
// than the built/hashed asset URL, then resolve it back to a real URL
// for the currently running build via resolveAvatarUrl() below. This
// means a saved choice keeps working even after a rebuild changes the
// hashed asset filenames. resolveAvatarUrl() also passes real URLs
// through unchanged, so any older data saved as a full URL still shows
// up fine.
// ---------------------------------------------------------------------

const avatarModules = import.meta.glob(
  "../assets/avatars/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}",
  { eager: true, import: "default" }
);

// Build a { "avatar1.png": "/assets/avatar1.a1b2c3.png", ... } map, keyed
// by the stable filename so it survives hash changes across rebuilds.
const avatarMap = {};
Object.keys(avatarModules).forEach((path) => {
  const filename = path.split("/").pop();
  avatarMap[filename] = avatarModules[path];
});

// The list the picker UI renders — one entry per image found in
// src/assets/avatars/, sorted by filename for a stable order.
export const DEFAULT_AVATARS = Object.keys(avatarMap)
  .sort()
  .map((filename) => ({ id: filename, url: avatarMap[filename] }));

// Resolve a stored value (a filename id, or a legacy full URL) to a
// displayable URL for the current build. Returns "" if unresolvable.
export function resolveAvatarUrl(value) {
  if (!value) return "";
  if (/^(https?:)?\/\//.test(value) || value.startsWith("/") || value.startsWith("data:")) {
    return value; // already a real URL (e.g. older data saved before this change)
  }
  return avatarMap[value] || "";
}