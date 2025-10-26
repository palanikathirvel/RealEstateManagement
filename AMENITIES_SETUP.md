# Google Maps Integration Setup

## Current Status
The nearby amenities feature is currently working with **mock data** for demonstration purposes.

## To Enable Real Google Maps Data:

1. **Get Google Maps API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the following APIs:
     - Maps JavaScript API
     - Places API
   - Create credentials (API Key)
   - Restrict the API key to your domain for security

2. **Update Environment Variables:**
   - Open `frontend/.env`
   - Replace `YOUR_GOOGLE_MAPS_API_KEY_HERE` with your actual API key:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

3. **Restart the development server:**
   ```bash
   cd frontend
   npm run dev
   ```

## Features Included:
- ✅ Nearby Amenities Modal with beautiful UI
- ✅ Mock data showing hospitals, schools, shopping malls, restaurants
- ✅ Distance calculations and ratings display
- ✅ Responsive design with icons and categories
- ✅ Loading states and error handling
- 🟡 Google Maps integration (requires API key)

## Mock Data Categories:
- **Hospitals** - Emergency and healthcare facilities
- **Schools** - Educational institutions
- **Shopping Malls** - Retail and shopping centers  
- **Restaurants** - Dining and food options

The UI is fully functional and will automatically switch to real Google Places data once you configure the API key!