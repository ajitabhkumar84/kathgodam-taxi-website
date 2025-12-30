/**
 * Migration Script: Convert Embedded Attractions to Referenced Documents
 *
 * This script migrates attractions from embedded objects within routes
 * to standalone attraction documents that can be referenced across routes.
 *
 * IMPORTANT: Backup your Sanity dataset before running this migration!
 *
 * Usage:
 *   node migrate-attractions.js
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create Sanity client with write permissions
const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Required for write operations
  useCdn: false, // Must be false for mutations
});

/**
 * Creates a unique key for an attraction based on its name
 * Used to prevent duplicate attractions
 */
function createAttractionKey(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

/**
 * Main migration function
 */
async function migrateAttractions() {
  console.log('🚀 Starting attraction migration...\n');

  try {
    // Step 1: Fetch all routes with embedded attractions
    console.log('📋 Fetching routes with embedded attractions...');
    const routes = await client.fetch(`
      *[_type == "route" && defined(attractions) && count(attractions) > 0] {
        _id,
        _rev,
        from,
        to,
        attractions
      }
    `);

    console.log(`✅ Found ${routes.length} routes with attractions\n`);

    if (routes.length === 0) {
      console.log('✨ No routes with embedded attractions found. Migration complete!');
      return;
    }

    // Step 2: Collect all unique attractions
    console.log('🔍 Analyzing attractions...');
    const attractionMap = new Map(); // key -> attraction data
    const routeUpdates = []; // Array to store route update operations

    for (const route of routes) {
      const routeName = `${route.from} → ${route.to}`;
      console.log(`\n  Processing: ${routeName}`);

      const attractionRefs = [];

      for (const attraction of route.attractions) {
        // Skip if attraction is already a reference (has _ref property)
        if (attraction._ref) {
          console.log(`    ⏭️  Skipping already referenced: ${attraction._ref}`);
          attractionRefs.push({ _type: 'reference', _ref: attraction._ref, _key: attraction._key });
          continue;
        }

        // Create unique key based on attraction name
        const key = createAttractionKey(attraction.name);

        if (!attractionMap.has(key)) {
          // New attraction - add to map
          attractionMap.set(key, {
            _type: 'attraction',
            name: attraction.name,
            description: attraction.description,
            image: attraction.image,
            highlights: attraction.highlights,
          });
          console.log(`    ➕ New attraction: ${attraction.name}`);
        } else {
          console.log(`    ♻️  Reusing attraction: ${attraction.name}`);
        }

        // Store the key to create reference later
        attractionRefs.push({
          key,
          originalKey: attraction._key,
        });
      }

      routeUpdates.push({
        routeId: route._id,
        routeRev: route._rev,
        routeName,
        attractionRefs,
      });
    }

    console.log(`\n✅ Found ${attractionMap.size} unique attractions to create\n`);

    // Step 3: Create attraction documents
    console.log('📝 Creating attraction documents...');
    const createdAttractions = new Map(); // key -> document ID

    for (const [key, attractionData] of attractionMap.entries()) {
      try {
        const doc = await client.create(attractionData);
        createdAttractions.set(key, doc._id);
        console.log(`  ✅ Created: ${attractionData.name} (ID: ${doc._id})`);
      } catch (error) {
        console.error(`  ❌ Failed to create ${attractionData.name}:`, error.message);
        throw error;
      }
    }

    console.log(`\n✅ Successfully created ${createdAttractions.size} attraction documents\n`);

    // Step 4: Update routes to reference the new attraction documents
    console.log('🔄 Updating routes to use references...\n');

    for (const update of routeUpdates) {
      try {
        // Build the new attractions array with references
        const newAttractions = update.attractionRefs.map((ref) => {
          // If already a reference, keep it
          if (ref._ref) {
            return ref;
          }

          // Otherwise, create new reference
          const attractionId = createdAttractions.get(ref.key);
          return {
            _type: 'reference',
            _ref: attractionId,
            _key: ref.originalKey, // Preserve original key for stability
          };
        });

        // Update the route
        await client
          .patch(update.routeId)
          .set({ attractions: newAttractions })
          .commit();

        console.log(`  ✅ Updated: ${update.routeName}`);
      } catch (error) {
        console.error(`  ❌ Failed to update ${update.routeName}:`, error.message);
        throw error;
      }
    }

    console.log('\n🎉 Migration completed successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   - Routes processed: ${routes.length}`);
    console.log(`   - Attractions created: ${createdAttractions.size}`);
    console.log(`   - Routes updated: ${routeUpdates.length}`);

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    console.error('\nPlease check your Sanity credentials and try again.');
    console.error('If the error persists, restore from backup and contact support.');
    process.exit(1);
  }
}

// Run the migration
migrateAttractions();
