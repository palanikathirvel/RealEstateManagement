# 🔧 Quick Property Creation Test

## Step-by-Step Debug Process:

### 1. **Fill ONLY Required Fields:**

Try creating a property with ONLY the minimum required fields:

```
Type: land
Title: "Test Land Property Title"
Description: "This is a comprehensive test description for the property that should be more than twenty characters long to pass backend validation requirements."
Survey Number: "SF-123/456"
District: "Chennai"
Taluk: "Chennai North"
Area: "T.Nagar"
Address: "123 Main Street, T.Nagar, Chennai - Complete Address"
Pincode: "600017"
Square Feet: "1500"
Price: "1500000"
Owner Name: "Test Owner"
Owner Phone: "+919876543210"
```

**Leave these BLANK/EMPTY:**
- Owner Email (optional)
- Coordinates (optional)
- Bedrooms (optional)
- Bathrooms (optional)
- All other optional fields

### 2. **Common Validation Issues to Check:**

1. **Description too short**: Must be 20+ characters
2. **Phone format wrong**: Must be +91XXXXXXXXXX (X starting with 6-9)
3. **Address too short**: Must be 10+ characters
4. **Title too short**: Must be 5+ characters
5. **Invalid coordinates**: If provided, must be valid numbers
6. **Invalid email**: If provided, must be valid email format

### 3. **Updated Error Handling:**

The form will now show you the EXACT validation errors from the backend. When you submit the form and it fails, you'll see an alert with specific field errors like:

```
Validation failed:
title: Title must be between 5 and 100 characters
description: Description must be between 20 and 1000 characters
ownerDetails.phone: Owner phone must be a valid Indian number
```

### 4. **Test Process:**

1. Fill ONLY the required fields above (exactly as shown)
2. Click "Add Property"
3. If it fails, note the EXACT error message
4. Fix the specific fields mentioned in the error
5. Try again

### 5. **Most Likely Issues:**

Based on the error pattern, the most common issues are:
- **Description too short** (needs 20+ chars)
- **Phone format incorrect** (must start with +91 and digits 6-9)
- **Empty coordinates causing validation issues**

Try the minimal approach first - it should work now! 🚀