# Attraction Reference System - Migration Guide

## Overview

Attractions have been converted from **embedded objects** to **reusable document references**. This allows you to:

✅ **Reuse attractions across multiple routes** - Create once, reference everywhere
✅ **Edit once, update everywhere** - Changes to an attraction reflect on all routes that use it
✅ **Mix and match** - Combine existing attractions with new ones on any route
✅ **Better content management** - No duplicate data, single source of truth

---

## What Changed?

### Before (Old System)
- Each route had its own copy of attractions (embedded objects)
- Editing an attraction only affected that specific route
- Duplicate attractions across routes

### After (New System)
- Attractions are **global documents** stored in a library
- Routes **reference** attractions instead of embedding them
- Edit an attraction once, it updates on all routes using it
- In Sanity Studio, you'll see a new **"Attraction"** document type

---

## Migration Steps

### Prerequisites

1. **Backup your Sanity dataset** (IMPORTANT!)
   - Go to your Sanity dashboard: https://www.sanity.io/manage
   - Navigate to your project → Datasets → Production
   - Create a backup/export before proceeding

2. **Verify your environment variables**
   ```bash
   # .env or .env.local should have:
   PUBLIC_SANITY_PROJECT_ID=2o6xnbku
   PUBLIC_SANITY_DATASET=production
   PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_API_TOKEN=<your-write-token>  # Required for migration
   ```

   **If you don't have `SANITY_API_TOKEN`:**
   - Go to https://www.sanity.io/manage
   - Select your project → API → Tokens
   - Create a new token with **Write** permissions
   - Add it to your `.env` file

### Run the Migration

1. **Install dependencies** (if needed):
   ```bash
   npm install
   ```

2. **Run the migration script**:
   ```bash
   node migrate-attractions.js
   ```

3. **Expected output**:
   ```
   🚀 Starting attraction migration...

   📋 Fetching routes with embedded attractions...
   ✅ Found 5 routes with attractions

   🔍 Analyzing attractions...
     Processing: Kathgodam → Nainital
       ➕ New attraction: Naini Lake
       ➕ New attraction: Naina Devi Temple
       ♻️  Reusing attraction: Snow View Point
   ...

   📝 Creating attraction documents...
     ✅ Created: Naini Lake (ID: abc123...)
     ✅ Created: Naina Devi Temple (ID: def456...)
   ...

   🔄 Updating routes to use references...
     ✅ Updated: Kathgodam → Nainital
     ✅ Updated: Haldwani → Nainital
   ...

   🎉 Migration completed successfully!

   📊 Summary:
      - Routes processed: 5
      - Attractions created: 12
      - Routes updated: 5
   ```

4. **Verify the migration**:
   - Open Sanity Studio: http://localhost:4321/studio
   - You should now see **"Attraction"** in the document types list
   - Check a few routes to ensure attractions are still visible
   - Try editing an attraction and verify it updates across routes

### If Migration Fails

If the migration script encounters errors:

1. **Check the error message** - It will indicate what went wrong
2. **Common issues**:
   - Missing `SANITY_API_TOKEN`: Add a write token to `.env`
   - Network errors: Check your internet connection
   - Permission errors: Ensure the token has write permissions
3. **Restore from backup** if needed
4. **Contact support** with the error message

---

## Using the New System

### In Sanity Studio

#### Adding Attractions to a Route

When editing a route, you'll see the **"Attractions"** field with two options:

**Option 1: Reference an Existing Attraction**
1. Click "+ Add item" in the Attractions field
2. Click "Select" to open the attraction picker
3. Choose from existing attractions in the dropdown
4. The attraction is now referenced on your route

**Option 2: Create a New Attraction**
1. Click "+ Add item" in the Attractions field
2. Click "Create new attraction"
3. Fill in the attraction details (name, description, image, highlights)
4. The new attraction is created in the global library AND added to your route
5. This attraction can now be reused on other routes

**Option 3: Mixed Approach**
- Add some attractions by referencing existing ones
- Add some by creating new ones
- You can have both on the same route!

#### Managing the Global Attraction Library

**View All Attractions:**
- In Sanity Studio sidebar, click **"Attraction"** document type
- You'll see all attractions across your entire site

**Edit an Attraction:**
- Click on any attraction from the list
- Make your changes
- Changes automatically apply to **all routes** using this attraction

**Delete an Attraction:**
- ⚠️ **Warning:** If you delete an attraction, it will be removed from all routes
- Sanity will warn you which routes are using it before deletion

#### Finding Which Routes Use an Attraction

1. Open an attraction in Sanity Studio
2. Look for the **"References"** section (usually at the bottom)
3. It shows all routes that reference this attraction

### In Your Code

The TypeScript types and components have been updated to handle references automatically.

**Fetching Routes with Attractions:**

The Sanity queries in `src/lib/sanity.ts` should be updated to dereference attractions:

```typescript
// Example GROQ query to fetch a route with attractions
const route = await client.fetch(`
  *[_type == "route" && slug.current == $slug][0] {
    ...,
    attractions[]-> {
      _id,
      name,
      description,
      image,
      highlights
    }
  }
`, { slug });
```

The `->` operator dereferences the attraction, fetching the full attraction document.

---

## Benefits of the New System

### 1. **Content Consistency**
- Update "Naini Lake" once, it updates everywhere
- No more outdated or inconsistent attraction descriptions

### 2. **Time Savings**
- Don't re-add "Nainital Lake" for every route to Nainital
- Just reference the existing attraction

### 3. **Better SEO**
- Consistent naming and descriptions across routes
- No duplicate content issues

### 4. **Flexibility**
- Mix referenced attractions with route-specific ones
- Choose what to share and what to keep unique

### 5. **Easy Maintenance**
- Central library makes it easy to audit all attractions
- Quick to find and update outdated information

---

## Example Workflow

### Scenario: Adding a New Route "Haldwani → Bhimtal"

1. Create the new route in Sanity Studio
2. In the **Attractions** field:
   - Reference "Bhimtal Lake" (existing attraction)
   - Reference "Folk Culture Museum" (existing attraction)
   - Create new "Hidimba Parvat" (new, route-specific attraction)
3. Save the route

**Result:**
- The route shows all three attractions
- "Bhimtal Lake" and "Folk Culture Museum" are shared with other routes
- "Hidimba Parvat" is now available for other routes too
- If you edit "Bhimtal Lake", it updates on all routes using it

---

## Rollback (If Needed)

If you need to revert to the old system:

1. **Restore from your Sanity backup**
2. **Revert the schema changes**:
   ```bash
   git revert <commit-hash>  # Revert the attraction reference commit
   ```
3. **Redeploy** your site

**Note:** We recommend keeping the new system as it's more maintainable long-term.

---

## Support

If you encounter issues:

1. Check the Sanity Studio console for errors
2. Review the migration script output
3. Verify your `.env` configuration
4. Ensure your Sanity API token has the correct permissions

For questions about this migration, refer to:
- `migrate-attractions.js` - Migration script with detailed comments
- `sanity/schemas/attraction.ts` - New attraction document schema
- `sanity/schemas/route.ts` - Updated route schema with references

---

## Technical Details

### Schema Changes

**`attraction.ts`:**
- Changed from `type: 'object'` to `type: 'document'`
- Now a top-level document type, not embedded

**`route.ts`:**
- Attractions field changed from:
  ```typescript
  of: [{type: 'attraction'}]  // Embedded object
  ```
  to:
  ```typescript
  of: [{type: 'reference', to: [{type: 'attraction'}]}]  // Reference
  ```

**`schemas/index.ts`:**
- Moved `attraction` from "Object types" to "Document types"

### Migration Logic

The `migrate-attractions.js` script:
1. Fetches all routes with embedded attractions
2. Extracts unique attractions (de-duplicates by name)
3. Creates attraction documents in Sanity
4. Updates routes to reference the new documents
5. Preserves `_key` values for stability

### GROQ Query Pattern

To fetch routes with dereferenced attractions:

```groq
*[_type == "route"] {
  ...,
  attractions[]-> {
    // Dereferences the attraction
    _id,
    name,
    description,
    image,
    highlights
  }
}
```

The `[]->` syntax:
- `[]` - Array of references
- `->` - Dereference operator (follows the reference)

---

## Next Steps

1. ✅ Run the migration script
2. ✅ Verify routes in Sanity Studio
3. ✅ Test the website to ensure attractions display correctly
4. ✅ Update any custom queries to dereference attractions (`[]->`)
5. ✅ Train content editors on the new workflow

Enjoy your new reusable attraction system! 🎉
