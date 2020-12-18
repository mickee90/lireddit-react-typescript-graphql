import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date"})
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date()}) 
  updatedAt = new Date();

  @Field(() => String)
  @Property({ type: "text"})
  title!: string;
} 

/**
 * @ObjectType and @Field transform the class to a GraphQl object
 * which we can use in the Resolver
 * 
 * Exclude the @Field for the properties you don't want to 
 * expose for the api
 */