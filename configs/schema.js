import { pgTable, boolean, varchar,serial, integer, json } from "drizzle-orm/pg-core";

export const Users=pgTable('users',{
    id:serial('id').primaryKey(),
    name:varchar('name'),
    email:varchar('email').notNull(),
    imageUrl:varchar('imageUrl'),
    subscription:boolean('subscription').default(false),
    credits:integer('credits').default(100) //100=10 videos
})


export const VideoData = pgTable('videoData', {
    id: serial('id').primaryKey(),
    videoScript: json('videoScript').notNull(),          // This stays as JSON for the video script
    audioFileUrl: varchar('audioFileUrl').notNull(),   // Single string for the audio file URL
    captions: json('captions').notNull(),      // Keep as JSON since captions are likely complex
    imageList: varchar('imageList').array().notNull(),  // Array of strings (image URLs)
    createdBy: varchar('createdBy').notNull()   // User's email or identifier
  });
  
