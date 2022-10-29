import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: 'Experience data' })
export class Experience {
    @Field()
    title?: string;

    @Field()
    company?: string;

    @Field()
    start?: string;

    @Field()
    end?: string;

    @Field()
    summary?: string;
}