import delay from "./delay";

const SCROLL_UNLOCK_ATTRIBUTE = "data-scroll-unlocked";
const DELAY_BEFORE_REMOVING_ATTRIBUTE = 200;

export default async function scrollUnlockToggler(
  isOpen: boolean
): Promise<void> {
  if (typeof window === "undefined") return;

  if (isOpen) {
    document.body.setAttribute(SCROLL_UNLOCK_ATTRIBUTE, "true");
    return;
  }

  await delay(DELAY_BEFORE_REMOVING_ATTRIBUTE);

  document.body.removeAttribute(SCROLL_UNLOCK_ATTRIBUTE);
}
