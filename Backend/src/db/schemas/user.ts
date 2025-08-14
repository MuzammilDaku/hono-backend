import { pgTable ,uuid,text} from "drizzle-orm/pg-core";


const user = pgTable("users", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name").notNull(),
});

export { user };