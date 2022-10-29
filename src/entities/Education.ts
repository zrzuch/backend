import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: 'Education data' })
export class Education {
    @Field()
    school?: string;

    @Field()
    degree?: string;

    @Field()
    start?: string;

    @Field()
    end?: string;

    @Field()
    summary?: string;
}