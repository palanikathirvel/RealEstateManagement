# TODO: Add Base64 Video Display with Play Button in PropertyDetails

## Steps to Complete
- [x] Step 1: Add `getVideoSrc` function to `frontend/src/utils/imageUtils.js` for handling base64 video sources
- [ ] Step 2: Update `frontend/src/pages/PropertyDetails.jsx` - Refactor gallery to use `mediaItems` array instead of images-only
- [ ] Step 3: Update `frontend/src/pages/PropertyDetails.jsx` - Add video rendering with play button overlay in gallery
- [ ] Step 4: Update `frontend/src/pages/PropertyDetails.jsx` - Implement `showMediaModal` for full-screen video playback
- [ ] Step 5: Update `frontend/src/pages/PropertyDetails.jsx` - Update navigation (prev/next) and thumbnail strip for mixed media
- [ ] Step 6: Test video display and playback in browser

## Notes
- Assumes `property.video` is a base64 string (e.g., MP4).
- Video displayed as thumbnail with play button; click opens modal with controls.
- Fallback to placeholder if video fails.
- Update progress after each step.
